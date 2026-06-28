import React, { useEffect, useRef, useState, useCallback, startTransition } from "react";

export interface Section {
  id: string;
  label: string;
}

export interface VerticalDialNavProps {
  sections: Section[];
  activeColor?: string;
  fadeDistance?: number;
  font?: {
    fontSize?: number;
    fontFamily?: string;
    letterSpacing?: string;
    lineHeight?: string;
  };
  dialWidth?: number | string;
  dialRadius?: number | string;
  itemSpacing?: number;
  alignment?: "left" | "center" | "right";
  style?: React.CSSProperties;
}

export default function VerticalDialNav({
  sections = [],
  activeColor = "#000000",
  fadeDistance = 2,
  font = { fontSize: 14, fontFamily: "sans-serif" },
  dialWidth = 120,
  dialRadius = 0,
  itemSpacing = 8,
  alignment = "right",
  style,
}: VerticalDialNavProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const ticking = useRef(false);

  // Listen for scroll and update activeIndex
  useEffect(() => {
    function onScroll() {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        let found = 0;
        for (let i = 0; i < sections.length; i++) {
          const el = document.getElementById(sections[i].id);
          if (el) {
            const rect = el.getBoundingClientRect();
            // Using 50% of window height as the trigger point for a more natural feel
            if (rect.top <= window.innerHeight * 0.5) {
              found = i;
            }
          }
        }
        startTransition(() => setActiveIndex(found));
        ticking.current = false;
      });
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [sections]);

  // Scroll to section
  const handleClick = useCallback(
    (id: string, idx: number) => (e: React.MouseEvent) => {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        if (idx !== activeIndex) {
          startTransition(() => setActiveIndex(idx));
        }
      }
    },
    [activeIndex]
  );

  // Magnetic scroll: center the active item in the dial
  const dialRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (!dialRef.current || !itemRefs.current[activeIndex]) return;
    
    // We only scroll into view if there's a scrollbar (overflow)
    // For small dials, this keeps the active item in view.
    itemRefs.current[activeIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [activeIndex, sections.length]);

  // Fade function
  function getOpacity(idx: number) {
    const dist = Math.abs(idx - activeIndex);
    if (dist === 0) return 1;
    if (dist > fadeDistance) return 0.2;
    return 1 - (dist / (fadeDistance + 1)) * 0.8;
  }

  return (
    <nav
      style={{
        ...style,
        width: dialWidth,
        height: "100%",
        minWidth: dialWidth,
        background: "none",
        borderRadius: dialRadius,
        display: "flex",
        flexDirection: "column",
        alignItems:
          alignment === "left"
            ? "flex-start"
            : alignment === "right"
            ? "flex-end"
            : "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
        boxShadow: "none",
        zIndex: 50,
      }}
      aria-label="Section navigation"
    >
      <div
        ref={dialRef}
        style={{
          width: "100%",
          maxHeight: "100%",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems:
            alignment === "left"
              ? "flex-start"
              : alignment === "right"
              ? "flex-end"
              : "center",
          justifyContent: "center",
          gap: Math.max(0, itemSpacing),
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingRight: alignment === "right" ? 24 : 0,
          paddingLeft: alignment === "left" ? 24 : 0,
        }}
        tabIndex={0}
      >
        <style>{`div::-webkit-scrollbar { display: none; }`}</style>
        {sections.map((section, idx) => (
          <a
            key={section.id}
            ref={(el) => (itemRefs.current[idx] = el)}
            href={`#${section.id}`}
            onClick={handleClick(section.id, idx)}
            style={{
              color: idx === activeIndex ? activeColor : "#000000",
              ...font,
              opacity: getOpacity(idx),
              transition:
                "opacity 0.4s cubic-bezier(.4,0,.2,1), color 0.4s cubic-bezier(.4,0,.2,1), transform 0.4s cubic-bezier(.4,0,.2,1)",
              padding: 0,
              width: "auto",
              textAlign: alignment,
              cursor: "pointer",
              userSelect: "none",
              textDecoration: "none",
              fontWeight: idx === activeIndex ? 600 : 400,
              fontSize: font?.fontSize || 14,
              borderRadius: 6,
              background: "transparent",
              outline: "none",
              transform: idx === activeIndex ? "scale(1.05)" : "scale(1)",
              transformOrigin: alignment === "right" ? "right center" : alignment === "left" ? "left center" : "center center",
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
              willChange: "opacity, color, transform",
              minHeight: 0,
              lineHeight: 1.2,
              boxSizing: "border-box",
              paddingRight: 0,
              paddingLeft: 0,
              margin: 0,
              whiteSpace: "nowrap"
            }}
            aria-current={idx === activeIndex ? "true" : undefined}
            tabIndex={0}
            role="link"
          >
            {section.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
