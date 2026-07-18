import re
import requests
from pathlib import Path
from bs4 import BeautifulSoup

BASE = "https://www.remotion.dev"
LIST_URL = BASE + "/prompts"
PROMPTS_DIR = Path("prompt")
THUMBS_DIR = Path("thumbnail")
PROMPTS_DIR.mkdir(exist_ok=True)
THUMBS_DIR.mkdir(exist_ok=True)

s = requests.Session()
s.headers["User-Agent"] = "Mozilla/5.0"


def slug_from_href(href: str) -> str:
    return href.rstrip("/").split("/")[-1]


def get_listing_pages():
    """Yield every /prompts page (1, 2, 3, ...)."""
    page = 1
    while True:
        url = LIST_URL if page == 1 else f"{LIST_URL}/{page}"
        r = s.get(url)
        if r.status_code != 200:
            break
        soup = BeautifulSoup(r.text, "html.parser")
        links = sorted(set(
            a["href"] for a in soup.select("a[href^='/prompts/']")
            if a["href"] not in ("/prompts/", "/prompts")
            and not re.match(r"^/prompts/\d+$", a["href"])
        ))
        if not links:
            break
        yield links
        # stop if there's no "next" page link
        if not soup.select_one(f"a[href='/prompts/{page + 1}']"):
            break
        page += 1


def scrape_detail(href: str):
    slug = slug_from_href(href)
    url = BASE + href
    r = s.get(url)
    if r.status_code != 200:
        print(f"  ! failed {url} ({r.status_code})")
        return
    soup = BeautifulSoup(r.text, "html.parser")

    # thumbnail: og:image meta tag
    og_image = soup.find("meta", property="og:image")
    thumb_url = og_image["content"] if og_image else None

    # prompt text: content inside the <pre><code> block
    code = soup.select_one("pre code") or soup.select_one("pre")
    prompt_text = code.get_text("\n").strip() if code else ""

    title_tag = soup.find("h1")
    title = title_tag.get_text(strip=True) if title_tag else slug

    # save prompt
    (PROMPTS_DIR / f"{slug}.txt").write_text(
        f"Title: {title}\nURL: {url}\n\nPrompt:\n{prompt_text}\n", encoding="utf-8"
    )

    # save thumbnail
    if thumb_url:
        ext = thumb_url.split("?")[0].split(".")[-1]
        ext = ext if ext in ("png", "jpg", "jpeg", "webp") else "png"
        img = s.get(thumb_url)
        if img.status_code == 200:
            (THUMBS_DIR / f"{slug}.{ext}").write_bytes(img.content)

    print(f"  ok {slug}")


def main():
    all_links = []
    for links in get_listing_pages():
        all_links.extend(links)
    all_links = sorted(set(all_links))
    print(f"Found {len(all_links)} prompts")
    for href in all_links:
        scrape_detail(href)


if __name__ == "__main__":
    main()
