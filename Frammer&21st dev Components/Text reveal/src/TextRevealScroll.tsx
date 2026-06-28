import * as React from "react";

// ─── Sibling DOM Traversal ────────────────────────────────────────────────────
// Returns ALL target elements found in siblings (covers multi-para cases)
function findTargetEls(overlayRef: React.RefObject<HTMLDivElement | null>, targetClass: string) {
  if (!overlayRef.current) return [];
  let node: HTMLElement | null = overlayRef.current;
  while (node) {
    const parent = node.parentElement;
    if (!parent) break;
    const siblings = Array.from(parent.children) as HTMLElement[];
    const selfIndex = siblings.indexOf(node);
    const results: HTMLElement[] = [];
    for (let i = 0; i < siblings.length; i++) {
      if (i === selfIndex) continue;
      if (siblings[i].classList.contains(targetClass)) {
        results.push(siblings[i]);
      }
      // Collect ALL target descendants (covers multi-paragraph rich text)
      const nested = Array.from(siblings[i].querySelectorAll(`.${targetClass}`)) as HTMLElement[];
      results.push(...nested);
    }
    if (results.length > 0) return results;
    node = parent;
  }
  return [];
}

// Returns the closest shared ancestor of all target els (for bounding rect)
function findScrollAnchor(els: HTMLElement[]) {
  if (els.length === 0) return null;
  let candidate = els[0].parentElement;
  while (candidate) {
    if (els.every((el) => candidate!.contains(el))) return candidate;
    candidate = candidate.parentElement;
  }
  return els[0];
}

// ─── MODE: Characters ─────────────────────────────────────────────────────────
function wrapChars(el: HTMLElement, dimOpacity: number) {
  const spans: HTMLSpanElement[] = [];
  function walk(node: Node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || "";
      if (!text) return;
      const frag = document.createDocumentFragment();
      for (const char of text) {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.cssText = `display:inline;opacity:${dimOpacity};will-change:opacity;`;
        spans.push(span);
        frag.appendChild(span);
      }
      node.parentNode?.replaceChild(frag, node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      Array.from(node.childNodes).forEach(walk);
    }
  }
  walk(el);
  return spans;
}

// ─── MODE: Words ──────────────────────────────────────────────────────────────
function wrapWords(el: HTMLElement, dimOpacity: number) {
  const spans: HTMLSpanElement[] = [];
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const textNodes: Node[] = [];
  let n;
  while ((n = walker.nextNode())) {
    const t = n;
    if (t.textContent?.trim()) textNodes.push(t);
  }
  textNodes.forEach((textNode) => {
    const raw = textNode.textContent || "";
    const tokens = raw.split(/(\s+)/);
    const frag = document.createDocumentFragment();
    tokens.forEach((token) => {
      if (!token) return;
      if (/^\s+$/.test(token)) {
        frag.appendChild(document.createTextNode(token));
        return;
      }
      const span = document.createElement("span");
      span.textContent = token;
      span.style.cssText = `display:inline;opacity:${dimOpacity};will-change:opacity;`;
      spans.push(span);
      frag.appendChild(span);
    });
    textNode.parentNode?.replaceChild(frag, textNode);
  });
  return spans;
}

export interface TextRevealScrollProps {
  revealMode?: "chars" | "words";
  startOffset?: number;
  endOffset?: number;
  dimOpacity?: number;
  targetClass?: string;
}

export default function TextRevealScroll({
  revealMode = "chars",
  startOffset = 90,
  endOffset = 30,
  dimOpacity = 0.2,
  targetClass = "reveal-text"
}: TextRevealScrollProps) {
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const segmentsRef = React.useRef<HTMLSpanElement[]>([]);
  const splitDoneRef = React.useRef(false);
  
  // Track viewport visibility — scroll/resize work is skipped when false
  const isVisibleRef = React.useRef(false);
  // Pending rAF handle — used to cancel any in-flight frame on cleanup
  const rafRef = React.useRef(0);
  
  const startOffsetRef = React.useRef(startOffset);
  const endOffsetRef = React.useRef(endOffset);
  const dimOpacityRef = React.useRef(dimOpacity);
  const revealModeRef = React.useRef(revealMode);
  
  startOffsetRef.current = startOffset;
  endOffsetRef.current = endOffset;
  dimOpacityRef.current = dimOpacity;
  revealModeRef.current = revealMode;

  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => setIsClient(true), []);

  // Reset split state whenever reveal mode changes
  React.useEffect(() => {
    splitDoneRef.current = false;
    segmentsRef.current = [];
  }, [revealMode]);

  React.useEffect(() => {
    if (!isClient) return;

    // ── All cleanup handles collected here so one return clears everything ──
    let initTimer: any = null;
    let intersectionObserver: IntersectionObserver | null = null;
    let mutationObserver: MutationObserver | null = null;

    // Bound listener refs so removeEventListener gets the exact same fn
    let scrollHandler: any = null;
    let resizeHandler: any = null;

    // ── Core reveal calculation (called inside rAF) ────────────────────────
    const computeReveal = () => {
      // Guard: skip entirely when scrolled out of the expanded viewport margin
      if (!isVisibleRef.current) return;
      
      const els = findTargetEls(overlayRef, targetClass);
      const anchor = findScrollAnchor(els);
      if (!anchor) return;
      
      const rect = anchor.getBoundingClientRect();
      const vh = window.innerHeight;
      const startPx = vh * (startOffsetRef.current / 100);
      const endPx = vh * (endOffsetRef.current / 100);
      
      const totalRange = rect.height + (startPx - endPx);
      const scrolled = startPx - rect.top;
      const progress = Math.min(Math.max(scrolled / totalRange, 0), 1);
      
      const total = segmentsRef.current.length;
      const litCount = Math.floor(progress * total);
      
      segmentsRef.current.forEach((seg, i) => {
        if (i < litCount) {
          seg.style.opacity = "1";
        } else if (i === litCount) {
          const frac = progress * total - litCount;
          seg.style.opacity = String(dimOpacityRef.current + frac * (1 - dimOpacityRef.current));
        } else {
          seg.style.opacity = String(dimOpacityRef.current);
        }
      });
    };

    // ── rAF-throttled wrapper — deduplicates rapid scroll/resize bursts ───
    const scheduleReveal = () => {
      // Cancel any frame already queued this tick
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(computeReveal);
    };

    initTimer = setTimeout(() => {
      if (splitDoneRef.current) return;
      const textElements = findTargetEls(overlayRef, targetClass);
      if (textElements.length === 0) return;
      
      // Wrap every paragraph and accumulate spans into one flat array
      const allSegments: HTMLSpanElement[] = [];
      for (const el of textElements) {
        const segs =
          revealModeRef.current === "words"
            ? wrapWords(el, dimOpacityRef.current)
            : wrapChars(el, dimOpacityRef.current);
        allSegments.push(...segs);
      }
      
      if (allSegments.length === 0) return;
      segmentsRef.current = allSegments;
      splitDoneRef.current = true;
      
      // ── IntersectionObserver — gates all scroll/resize work ────────────
      // rootMargin: 200px above/below viewport so reveal starts slightly
      // before the element fully enters, preventing a pop-in flash
      const anchor = findScrollAnchor(findTargetEls(overlayRef, targetClass));
      if (anchor) {
        intersectionObserver = new IntersectionObserver(
          (entries) => {
            // isIntersecting = true → element is near/in viewport
            isVisibleRef.current = entries[0].isIntersecting;
            // Run one immediate update when entering the zone
            if (isVisibleRef.current) scheduleReveal();
          },
          { rootMargin: "200px 0px 200px 0px", threshold: 0 }
        );
        intersectionObserver.observe(anchor);
      }

      // ── Scroll & resize listeners (work is skipped when offscreen) ────
      scrollHandler = scheduleReveal;
      resizeHandler = scheduleReveal;
      window.addEventListener("scroll", scrollHandler, { passive: true });
      window.addEventListener("resize", resizeHandler, { passive: true });

      // MutationObserver handles late-rendering content
      mutationObserver = new MutationObserver(scheduleReveal);
      mutationObserver.observe(document.body, { childList: true, subtree: true });

      // Initial paint
      scheduleReveal();
    }, 150);

    // ── Single unified cleanup — clears timer, listeners, observers, rAF ──
    return () => {
      if (initTimer !== null) clearTimeout(initTimer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (scrollHandler) window.removeEventListener("scroll", scrollHandler);
      if (resizeHandler) window.removeEventListener("resize", resizeHandler);
      if (intersectionObserver) intersectionObserver.disconnect();
      if (mutationObserver) mutationObserver.disconnect();
    };
  }, [isClient, revealMode, targetClass]);

  return (
    <div
      ref={overlayRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        background: "transparent",
      }}
    />
  );
}
