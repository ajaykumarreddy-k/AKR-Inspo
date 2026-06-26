import React, { useRef, useState, useEffect, startTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface GalleryItem {
  image?: { src: string; alt?: string };
  title?: string;
  subheadline?: string;
  backgroundColor?: string;
  link?: string;
}

export interface FocusGalleryProps {
  items?: GalleryItem[];
  activeScale?: number;
  inactiveScale?: number;
  activeOpacity?: number;
  inactiveOpacity?: number;
  imageWidth?: number;
  imageHeight?: number;
  spacing?: number;
  titleColor?: string;
  subheadlineColor?: string;
  titleFont?: React.CSSProperties;
  subheadlineFont?: React.CSSProperties;
  backgroundColor?: string;
  borderRadius?: number;
  className?: string;
}

const defaultItems: GalleryItem[] = [
  {
    image: { src: "https://framerusercontent.com/images/GfGkADagM4KEibNcIiRUWlfrR0.jpg", alt: "Image 1" },
    title: "First Image",
    subheadline: "Beginning of journey",
    backgroundColor: "#FFFFFF",
  },
  {
    image: { src: "https://framerusercontent.com/images/aNsAT3jCvt4zglbWCUoFe33Q.jpg", alt: "Image 2" },
    title: "Second Image",
    subheadline: "Continuing forward",
    backgroundColor: "#F5F5F5",
  },
  {
    image: { src: "https://framerusercontent.com/images/BYnxEV1zjYb9bhWh1IwBZ1ZoS60.jpg", alt: "Image 3" },
    title: "Third Image",
    subheadline: "Middle section",
    backgroundColor: "#EEEEEE",
  },
  {
    image: { src: "https://framerusercontent.com/images/2uTNEj5aTl2K3NJaEFWMbnrA.jpg", alt: "Image 4" },
    title: "Fourth Image",
    subheadline: "Almost there",
    backgroundColor: "#E0E0E0",
  },
  {
    image: { src: "https://framerusercontent.com/images/f9RiWoNpmlCMqVRIHz8l8wYfeI.jpg", alt: "Image 5" },
    title: "Fifth Image",
    subheadline: "Final destination",
    backgroundColor: "#D0D0D0",
  },
];

const fallbackImages = [
  { src: "https://framerusercontent.com/images/GfGkADagM4KEibNcIiRUWlfrR0.jpg", alt: "Fallback 1" },
  { src: "https://framerusercontent.com/images/aNsAT3jCvt4zglbWCUoFe33Q.jpg", alt: "Fallback 2" },
  { src: "https://framerusercontent.com/images/BYnxEV1zjYb9bhWh1IwBZ1ZoS60.jpg", alt: "Fallback 3" },
  { src: "https://framerusercontent.com/images/2uTNEj5aTl2K3NJaEFWMbnrA.jpg", alt: "Fallback 4" },
  { src: "https://framerusercontent.com/images/f9RiWoNpmlCMqVRIHz8l8wYfeI.jpg", alt: "Fallback 5" },
];

export default function FocusGallery(props: FocusGalleryProps) {
  const {
    items = defaultItems,
    activeScale = 1.2,
    inactiveScale = 0.7,
    activeOpacity = 1,
    inactiveOpacity = 0.4,
    imageWidth = 400,
    imageHeight = 250,
    spacing = 100,
    titleColor = "#000000",
    subheadlineColor = "#000000",
    titleFont = {
      fontSize: "40px",
      fontWeight: "bold",
      letterSpacing: "-0.04em",
      lineHeight: "1em",
      fontFamily: "sans-serif",
    },
    subheadlineFont = {
      fontSize: "15px",
      fontWeight: "500",
      letterSpacing: "-0.01em",
      lineHeight: "1.3em",
      fontFamily: "sans-serif",
    },
    backgroundColor = "#FFFFFF",
    borderRadius = 12,
    className = "",
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const previousDocumentBackgroundRef = useRef<{ html: string; body: string } | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const displayIndex = activeIndex;

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(800);

  // Handle window resizing and responsive breakpoints
  useEffect(() => {
    if (typeof window === "undefined") return;

    const computeFromSize = (width: number, height: number) => {
      startTransition(() => {
        setViewportHeight(height);
        setIsMobile(width < 768);
        setIsTablet(width < 1024);
      });
    };

    const updateFromWindow = () => {
      computeFromSize(window.innerWidth, window.innerHeight);
    };

    updateFromWindow();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (!entry) return;
        const rect = entry.contentRect;
        if (!rect) return;
        computeFromSize(rect.width, rect.height);
      });
      if (containerRef.current) ro.observe(containerRef.current);
    }

    window.addEventListener("resize", updateFromWindow);
    return () => {
      window.removeEventListener("resize", updateFromWindow);
      if (ro) ro.disconnect();
    };
  }, []);

  // Handle scroll to update active item
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      const container = scrollContainerRef.current;
      const viewportCenter = container.clientHeight / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        const rect = item.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const itemCenter = rect.top - containerRect.top + rect.height / 2;
        const distance = Math.abs(itemCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex !== activeIndex) {
        startTransition(() => {
          setActiveIndex(closestIndex);
        });
      }
    };

    handleScroll();

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [activeIndex]);

  // Handle document background transition (optional, based on Framer component)
  useEffect(() => {
    if (typeof document === "undefined") return;
    const html = document.documentElement;
    const body = document.body;

    if (!previousDocumentBackgroundRef.current) {
      previousDocumentBackgroundRef.current = {
        html: html.style.backgroundColor || "",
        body: body.style.backgroundColor || "",
      };
    }

    const nextColor = items[displayIndex]?.backgroundColor || backgroundColor;
    html.style.transition = "background-color 0.5s ease-in-out";
    body.style.transition = "background-color 0.5s ease-in-out";
    html.style.backgroundColor = nextColor;
    body.style.backgroundColor = nextColor;

    return () => {
      if (!previousDocumentBackgroundRef.current) return;
      html.style.backgroundColor = previousDocumentBackgroundRef.current.html;
      body.style.backgroundColor = previousDocumentBackgroundRef.current.body;
    };
  }, [displayIndex, items, backgroundColor]);

  const totalHeight = items.length * (imageHeight + spacing) + viewportHeight;

  return (
    <motion.div
      ref={containerRef}
      className={className}
      animate={{ backgroundColor: items[displayIndex]?.backgroundColor || backgroundColor }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh", // Default to 100vh to ensure it acts as a section
        overflow: "hidden",
      }}
    >
      <motion.div
        aria-hidden={true}
        animate={{ backgroundColor: items[displayIndex]?.backgroundColor || backgroundColor }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={`title-${displayIndex}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            left: "5%",
            top: "50%",
            transform: "translateY(-50%)",
            maxWidth: "25%",
            zIndex: 10,
            pointerEvents: "none",
            display: isTablet ? "none" : "block",
            ...titleFont,
            color: titleColor,
          }}
        >
          {items[displayIndex]?.title}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={`subheadline-${displayIndex}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            right: "5%",
            top: "50%",
            transform: "translateY(-50%)",
            maxWidth: "25%",
            zIndex: 10,
            pointerEvents: "none",
            display: isTablet ? "none" : "block",
            ...subheadlineFont,
            color: subheadlineColor,
            textAlign: "right",
          }}
        >
          {items[displayIndex]?.subheadline}
        </motion.div>
      </AnimatePresence>

      <div
        ref={scrollContainerRef}
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          height: "100%",
          overflowY: "auto",
          overflowX: "hidden",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div style={{ position: "relative", width: "100%", height: totalHeight }}>
          <div
            style={{
              position: "sticky",
              top: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: spacing,
                paddingTop: viewportHeight / 2 - imageHeight / 2,
                paddingBottom: viewportHeight / 2 - imageHeight / 2,
                pointerEvents: "auto",
              }}
            >
              {items.map((item, index) => {
                const isActive = index === displayIndex;
                return (
                  <div
                    key={index}
                    ref={(el) => {
                      itemRefs.current[index] = el;
                    }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: isTablet ? 56 : 20,
                    }}
                  >
                    <motion.div
                      animate={{
                        scale: isActive ? activeScale : inactiveScale,
                        opacity: isActive ? activeOpacity : inactiveOpacity,
                      }}
                      whileHover={{
                        scale: (isActive ? activeScale : inactiveScale) * 1.05,
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      style={{
                        width: imageWidth,
                        height: imageHeight,
                        borderRadius: borderRadius,
                        overflow: "hidden",
                        boxShadow: isActive
                          ? "0 20px 40px rgba(0,0,0,0.15)"
                          : "0 10px 20px rgba(0,0,0,0.08)",
                        cursor: item.link ? "pointer" : "default",
                      }}
                      onClick={() => {
                        if (item.link && typeof window !== "undefined") {
                          window.open(item.link, "_blank");
                        }
                      }}
                    >
                      <img
                        src={
                          item.image?.src ||
                          fallbackImages[index % fallbackImages.length].src
                        }
                        alt={item.image?.alt || "Gallery Image"}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </motion.div>

                    {isTablet && isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 12,
                          maxWidth: imageWidth,
                          textAlign: "center",
                        }}
                      >
                        <div style={{ ...titleFont, color: titleColor }}>
                          {item.title}
                        </div>
                        <div style={{ ...subheadlineFont, color: subheadlineColor }}>
                          {item.subheadline}
                        </div>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </motion.div>
  );
}
