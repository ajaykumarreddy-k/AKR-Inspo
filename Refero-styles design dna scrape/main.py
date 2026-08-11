"""
Scrape styles.refero.design with Playwright (the catalog is infinite-scroll /
client-rendered, and each style has 4 tabs: DESIGN.md, Tailwind v4,
CSS Variables, Design Tokens — plain requests only ever got tab #1 and the
first static batch of cards).

For every style:
  <out>/<slug>-<uuid8>/DESIGN.md
  <out>/<slug>-<uuid8>/tailwind-v4.css
  <out>/<slug>-<uuid8>/css-variables.css
  <out>/<slug>-<uuid8>/design-tokens.json
  <out>/<slug>-<uuid8>/preview.mp4
  <out>/<slug>-<uuid8>/source.txt

Usage:
    uv sync --extra render
    uv run playwright install chromium
    uv run scrape_refero.py --out ./refero_bundle --workers 4
"""

from __future__ import annotations

import argparse
import asyncio
import re
import sys
import unicodedata
from dataclasses import dataclass
from pathlib import Path
from urllib.parse import urljoin

import httpx
from playwright.async_api import async_playwright, Page, BrowserContext
from tqdm import tqdm

BASE = "https://styles.refero.design"
STYLE_LINK_RE = re.compile(r"/style/([0-9a-fA-F-]{36})")
UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/125.0 Safari/537.36 refero-scraper/0.2"
)

TABS = [
    ("DESIGN.md", "DESIGN.md"),
    ("Tailwind v4", "tailwind-v4.css"),
    ("CSS Variables", "css-variables.css"),
    ("Design Tokens", "design-tokens.json"),
]


def slugify(text: str) -> str:
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode()
    text = re.sub(r"[^\w\s-]", "", text).strip().lower()
    text = re.sub(r"[\s_-]+", "-", text)
    return text or "untitled"


@dataclass
class StyleRef:
    uuid: str
    url: str
    title: str = ""


# --------------------------------------------------------------------------
# Discovery: scroll the homepage until no new /style/<uuid> links appear.
# --------------------------------------------------------------------------
async def discover_all_styles(page: Page, idle_rounds_to_stop: int, max_rounds: int) -> dict[str, StyleRef]:
    await page.goto(BASE, wait_until="networkidle", timeout=60000)
    refs: dict[str, StyleRef] = {}
    idle = 0
    rounds = 0
    pbar = tqdm(desc="discovering styles", unit="style")

    async def harvest() -> int:
        anchors = await page.eval_on_selector_all(
            "a[href*='/style/']",
            "els => els.map(e => ({href: e.getAttribute('href'), text: e.innerText}))",
        )
        before = len(refs)
        for a in anchors:
            href = a.get("href") or ""
            m = STYLE_LINK_RE.search(href)
            if not m:
                continue
            uid = m.group(1)
            if uid not in refs:
                title = (a.get("text") or uid).strip().split("\n")[0]
                refs[uid] = StyleRef(uuid=uid, url=urljoin(BASE, f"/style/{uid}"), title=title)
        return len(refs) - before

    await harvest()
    pbar.update(len(refs))

    while idle < idle_rounds_to_stop and rounds < max_rounds:
        rounds += 1
        # try a "load more" button first, then fall back to scrolling
        clicked = False
        for label in ("Load more", "Show more", "Load More", "See more"):
            btn = page.get_by_text(label, exact=False)
            try:
                if await btn.count() > 0 and await btn.first.is_visible():
                    await btn.first.click(timeout=2000)
                    clicked = True
                    await page.wait_for_timeout(800)
                    break
            except Exception:
                pass
        if not clicked:
            await page.mouse.wheel(0, 4000)
            await page.wait_for_timeout(700)

        new = await harvest()
        pbar.update(new)
        if new == 0:
            idle += 1
        else:
            idle = 0

    pbar.close()
    return refs


# --------------------------------------------------------------------------
# Per-style: click through the 4 tabs (using Extended where offered) and
# grab each tab's code panel text; grab the preview video src.
# --------------------------------------------------------------------------
# Finds the *visible* code/pre-like panel with the most text — tab panels on
# this site stay mounted in the DOM (just hidden) when you switch tabs, so
# picking "the last <pre>" grabs whatever panel happens to be last in the
# DOM regardless of which tab is actually showing. This scans only elements
# that are actually rendered on screen right now.
VISIBLE_CODE_JS = """
() => {
  const candidates = Array.from(document.querySelectorAll(
    "pre, code, [class*='language-'], [class*='hljs'], [class*='cm-content'], [class*='token']"
  ));
  let best = null, bestLen = 0;
  for (const el of candidates) {
    const rect = el.getBoundingClientRect();
    const style = window.getComputedStyle(el);
    const visible = rect.width > 0 && rect.height > 0
      && style.visibility !== 'hidden' && style.display !== 'none';
    if (!visible) continue;
    const text = el.innerText || el.textContent || '';
    if (text.trim().length > bestLen) {
      bestLen = text.trim().length;
      best = text;
    }
  }
  return best;
}
"""


async def read_visible_code(page: Page) -> str | None:
    text = await page.evaluate(VISIBLE_CODE_JS)
    if text and len(text.strip()) >= 5:
        return text.strip()
    return None


async def poll_visible_code(page: Page, attempts: int = 12, interval_ms: int = 350) -> str | None:
    for _ in range(attempts):
        text = await read_visible_code(page)
        if text:
            return text
        await page.wait_for_timeout(interval_ms)
    return None


async def click_tab(page: Page, label: str, timeout: int = 3000) -> bool:
    """Try several strategies since raw text matching is brittle against
    icons/wrapper spans/decorative pseudo-elements in the tab buttons."""
    strategies = []

    # exact text node
    strategies.append(lambda: page.get_by_text(label, exact=True))
    # substring text match (handles "DESIGN" + ".md" split across spans etc.)
    strategies.append(lambda: page.get_by_text(label, exact=False))
    # accessible-name based (best for icon+label buttons)
    strategies.append(lambda: page.get_by_role("tab", name=label))
    strategies.append(lambda: page.get_by_role("button", name=label))
    strategies.append(lambda: page.get_by_role("link", name=label))

    for make_locator in strategies:
        try:
            loc = make_locator()
            n = await loc.count()
            for i in range(min(n, 5)):
                el = loc.nth(i)
                try:
                    if not await el.is_visible():
                        continue
                    await el.scroll_into_view_if_needed(timeout=timeout)
                    await el.click(timeout=timeout)
                    return True
                except Exception:
                    continue
        except Exception:
            continue
    return False


async def extract_style(page: Page, ref: StyleRef, folder: Path, debug: bool) -> dict[str, bool]:
    ok: dict[str, bool] = {}
    await page.goto(ref.url, wait_until="domcontentloaded", timeout=60000)
    try:
        await page.wait_for_load_state("networkidle", timeout=15000)
    except Exception:
        pass
    await page.wait_for_timeout(600)

    any_success = False
    for label, filename in TABS:
        clicked = await click_tab(page, label)
        if not clicked:
            ok[label] = False
            continue
        await page.wait_for_timeout(300)

        text_before = await poll_visible_code(page)

        # Prefer Extended over Compact when that toggle exists, but never
        # regress: keep whichever read is actually longer.
        if await click_tab(page, "Extended", timeout=1500):
            await page.wait_for_timeout(300)
            text_after = await poll_visible_code(page, attempts=6)
            if text_after and (not text_before or len(text_after) >= len(text_before)):
                text_before = text_after

        text = text_before
        if text is None:
            ok[label] = False
            if debug:
                try:
                    html = await page.content()
                    (folder / f"DEBUG_{filename}.html").write_text(html, encoding="utf-8")
                except Exception:
                    pass
            continue

        (folder / filename).write_text(text, encoding="utf-8")
        ok[label] = True
        any_success = True

    if not any_success:
        # Nothing worked for this style at all — always leave evidence so
        # this can actually be diagnosed against the real DOM.
        try:
            (folder / "DEBUG_full_page.html").write_text(await page.content(), encoding="utf-8")
        except Exception:
            pass
        try:
            await page.screenshot(path=str(folder / "DEBUG_screenshot.png"), full_page=True)
        except Exception:
            pass

    return ok


async def extract_video_url(page: Page) -> str | None:
    try:
        src = await page.eval_on_selector(
            "video", "el => el.currentSrc || el.getAttribute('src') || ''"
        )
        if src:
            return urljoin(BASE, src)
    except Exception:
        pass
    try:
        src = await page.eval_on_selector(
            "video source", "el => el.getAttribute('src') || ''"
        )
        if src:
            return urljoin(BASE, src)
    except Exception:
        pass
    return None


async def download_file(http: httpx.AsyncClient, url: str, dest: Path) -> None:
    async with http.stream("GET", url) as r:
        r.raise_for_status()
        with open(dest, "wb") as f:
            async for chunk in r.aiter_bytes(1 << 16):
                f.write(chunk)


def is_fully_done(folder: Path) -> bool:
    """A style is 'done' only if all 4 tabs + the done marker exist and there
    were no recorded failures — so an interrupted or partially-failed run is
    correctly picked back up, while a clean success is skipped."""
    if not (folder / ".done").exists():
        return False
    if (folder / "MISSING_TABS.txt").exists() or (folder / "ERROR.txt").exists():
        return False
    return all((folder / fname).exists() for _, fname in TABS)


def clear_status_files(folder: Path) -> None:
    for name in ("MISSING_TABS.txt", "ERROR.txt", "VIDEO_FAILED.txt", ".done"):
        p = folder / name
        if p.exists():
            p.unlink()


async def worker(
    name: str,
    context: BrowserContext,
    queue: "asyncio.Queue[StyleRef]",
    out_dir: Path,
    http: httpx.AsyncClient,
    resume: bool,
    debug: bool,
    pbar: tqdm,
) -> None:
    page = await context.new_page()
    while True:
        try:
            ref = queue.get_nowait()
        except asyncio.QueueEmpty:
            break

        folder = out_dir / f"{slugify(ref.title)}-{ref.uuid[:8]}"

        if resume and is_fully_done(folder):
            pbar.update(1)
            queue.task_done()
            continue

        folder.mkdir(parents=True, exist_ok=True)
        clear_status_files(folder)
        try:
            results = await extract_style(page, ref, folder, debug)
            (folder / "source.txt").write_text(ref.url, encoding="utf-8")

            if not (folder / "preview.mp4").exists():
                video_url = await extract_video_url(page)
                if video_url:
                    try:
                        await download_file(http, video_url, folder / "preview.mp4")
                    except Exception as e:  # noqa: BLE001
                        (folder / "VIDEO_FAILED.txt").write_text(str(e), encoding="utf-8")
                else:
                    (folder / "NO_VIDEO.txt").write_text("no preview video found", encoding="utf-8")

            missing = [label for label, got in results.items() if not got]
            if missing:
                (folder / "MISSING_TABS.txt").write_text(
                    "Could not extract: " + ", ".join(missing), encoding="utf-8"
                )
            (folder / ".done").write_text("", encoding="utf-8")
        except Exception as e:  # noqa: BLE001
            (folder / "ERROR.txt").write_text(str(e), encoding="utf-8")
            (folder / ".done").write_text("", encoding="utf-8")
        finally:
            pbar.update(1)
            queue.task_done()

    await page.close()


async def main_async(args: argparse.Namespace) -> None:
    out_dir = Path(args.out)
    out_dir.mkdir(parents=True, exist_ok=True)

    async with async_playwright() as p:
        browser = await p.chromium.launch()
        disc_context = await browser.new_context(user_agent=UA)
        disc_page = await disc_context.new_page()

        print("Discovering all styles (scrolling catalog)...", file=sys.stderr)
        refs = await discover_all_styles(disc_page, args.idle_rounds, args.max_scroll_rounds)
        await disc_context.close()
        print(f"Found {len(refs)} styles total.", file=sys.stderr)

        if args.limit:
            refs = dict(list(refs.items())[: args.limit])

        queue: asyncio.Queue[StyleRef] = asyncio.Queue()
        for r in refs.values():
            queue.put_nowait(r)

        pbar = tqdm(total=queue.qsize(), desc="scraping styles", unit="style")

        async with httpx.AsyncClient(headers={"User-Agent": UA}, timeout=60.0, follow_redirects=True) as http:
            contexts = [await browser.new_context(user_agent=UA) for _ in range(args.workers)]
            await asyncio.gather(
                *[
                    worker(f"w{i}", ctx, queue, out_dir, http, not args.overwrite, args.debug, pbar)
                    for i, ctx in enumerate(contexts)
                ]
            )
            for ctx in contexts:
                await ctx.close()

        pbar.close()
        await browser.close()

    print(f"\nDone. Output in {out_dir.resolve()}")


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Scrape styles.refero.design (all styles, all 4 tabs, video).")
    p.add_argument("--out", default="./refero_bundle")
    p.add_argument("--workers", type=int, default=4, help="concurrent browser tabs")
    p.add_argument("--limit", type=int, default=0, help="cap total styles (0 = no cap)")
    p.add_argument(
        "--overwrite",
        action="store_true",
        help="reprocess every style even if it already fully succeeded",
    )
    p.add_argument(
        "--debug",
        action="store_true",
        help="dump the rendered HTML for any tab that fails to extract, for troubleshooting",
    )
    p.add_argument("--idle-rounds", type=int, default=6, help="stop scrolling after N rounds with no new styles")
    p.add_argument("--max-scroll-rounds", type=int, default=2000, help="hard safety cap on scroll attempts")
    return p.parse_args()


if __name__ == "__main__":
    asyncio.run(main_async(parse_args()))
