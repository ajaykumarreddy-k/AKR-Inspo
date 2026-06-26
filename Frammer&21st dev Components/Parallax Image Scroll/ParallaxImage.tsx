import { useRef, useLayoutEffect } from "react";

export interface ParallaxImageProps {
  verticalParallaxAmount?: number;
  horizontalParallaxAmount?: number;
  image?: { src?: string; positionX?: string; positionY?: string } | string;
  style?: React.CSSProperties;
  borderRadius?: number;
  border?: React.CSSProperties;
  boxShadow?: string;
}

export default function ParallaxImage({
  verticalParallaxAmount = 50,
  horizontalParallaxAmount = 0,
  image,
  style,
  borderRadius = 0,
  border,
  boxShadow,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const imageSrc = typeof image === "string" ? image : image?.src || null;
  const hasImage = !!imageSrc;

  useLayoutEffect(() => {
    if (!containerRef.current || !imageRef.current) return;

    const container = containerRef.current;
    const imageEl = imageRef.current;

    imageEl.style.transform = "translate3d(0, 0, 0)";
    imageEl.style.willChange = "transform";

    let rafId: number | null = null;
    let ticking = false;
    let animationFrameId: number | null = null;

    const updateParallax = () => {
      if (!container || !imageEl) return;

      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const containerWidth = container.offsetWidth;

      if (containerHeight === 0 || containerWidth === 0) return;

      const viewportHeight = window.innerHeight;
      const scrollProgress = Math.max(
        0,
        Math.min(
          1,
          (viewportHeight - rect.top) / (viewportHeight + containerHeight)
        )
      );

      const yOffset =
        (scrollProgress - 0.5) *
        (verticalParallaxAmount / 100) *
        containerHeight;

      let xOffset = 0;
      if (horizontalParallaxAmount !== 0) {
        const viewportWidth = window.innerWidth;
        const viewportCenter = viewportWidth / 2;
        const elementCenter = rect.left + rect.width / 2;
        const horizontalProgress =
          (elementCenter - viewportCenter) / viewportWidth;
        xOffset =
          horizontalProgress *
          (horizontalParallaxAmount / 100) *
          containerWidth;
      }

      imageEl.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0)`;
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    const startAnimationLoop = () => {
      if (horizontalParallaxAmount !== 0) {
        const animate = () => {
          updateParallax();
          animationFrameId = requestAnimationFrame(animate);
        };
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const stopAnimationLoop = () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    const handleScroll = () => requestTick();

    const handleResize = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(updateParallax);
    };

    updateParallax();
    startAnimationLoop();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      stopAnimationLoop();
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [verticalParallaxAmount, horizontalParallaxAmount]);

  return (
    <div
      ref={containerRef}
      style={{
        ...style,
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: "100%",
        borderRadius,
        boxShadow: boxShadow || undefined,
      }}
    >
      {hasImage && (
        <div
          style={{
            width: "100%",
            zIndex: 1000,
            height: "100%",
            borderRadius,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            ...(border || {}),
          }}
        />
      )}
      {!hasImage ? (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            minWidth: 0,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#f0f0f0",
            color: "#999",
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            letterSpacing: "-0.02em",
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
          <div style={{ marginTop: 8, fontWeight: 500 }}>Image Parallax</div>
          <div style={{ marginTop: 2, fontSize: 12, color: "#bbb" }}>
            Add an image to create a parallax effect
          </div>
        </div>
      ) : (
        <div
          ref={imageRef}
          style={{
            position: "absolute",
            top: `-${Math.abs(verticalParallaxAmount) / 2}%`,
            left: `-${Math.abs(horizontalParallaxAmount) / 2}%`,
            right: `-${Math.abs(horizontalParallaxAmount) / 2}%`,
            bottom: `-${Math.abs(verticalParallaxAmount) / 2}%`,
            width: `calc(100% + ${Math.abs(horizontalParallaxAmount)}%)`,
            height: `calc(100% + ${Math.abs(verticalParallaxAmount)}%)`,
            backgroundImage: imageSrc ? `url(${imageSrc})` : undefined,
            backgroundSize: "cover",
            backgroundPosition:
              typeof image === "object" && image?.positionX && image?.positionY
                ? `${image.positionX} ${image.positionY}`
                : "center",
            borderRadius,
            willChange: "transform",
            backfaceVisibility: "hidden",
            userSelect: "none",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}
