import * as React from "react";
import { motion } from "framer-motion";

export interface CubeIntroProps {
  images?: string[];
  logoText?: string;
  logoImage?: string;
  showLogoImage?: boolean;
  backgroundColor?: string;
  logoTileColor?: string;
  logoTextColor?: string;
  logoImageBgColor?: string;
  logoImageBgWidth?: number;
  logoImageBgHeight?: number;
  logoImageBgRadius?: number;
  startDelay?: number;
  introDuration?: number;
  introHold?: number;
  stepDuration?: number;
  overlap?: number;
  endHold?: number;
  outroDuration?: number;
  imageTileWidth?: number;
  logoTileWidth?: number;
  logoTileHeight?: number;
  logoImageWidth?: number;
  logoImageHeight?: number;
  borderRadius?: number;
  imageTileRadius?: number;
  logoTileRadius?: number;
  imageFit?: "cover" | "contain";
  logoFont?: any;
  easePreset?: "linear" | "easeIn" | "easeOut" | "easeInOut" | "custom";
  bezier1?: number;
  bezier2?: number;
  bezier3?: number;
  bezier4?: number;
  logoEasePreset?: "linear" | "easeIn" | "easeOut" | "easeInOut" | "custom";
  logoBezier1?: number;
  logoBezier2?: number;
  logoBezier3?: number;
  logoBezier4?: number;
  revealWord?: string;
  showRevealWord?: boolean;
  revealStartDelay?: number;
  revealLetterDuration?: number;
  revealLetterStagger?: number;
  revealLetterOffset?: number;
  revealBottomOffset?: number;
  revealTextColor?: string;
  revealFont?: any;
  revealPaddingLeft?: number;
  revealPaddingRight?: number;
  revealPaddingTop?: number;
}

const defaultProps: CubeIntroProps = {
  images: [],
  logoText: "studio.normal.",
  logoImage: "",
  showLogoImage: false,
  backgroundColor: "#022B34",
  logoTileColor: "#2C9AD0",
  logoTextColor: "#041A21",
  logoImageBgColor: "#2C9AD0",
  logoImageBgWidth: 144,
  logoImageBgHeight: 172,
  logoImageBgRadius: 0,
  startDelay: 0.2,
  introDuration: 0.6,
  introHold: 0.2,
  stepDuration: 1.2,
  overlap: 0.25,
  endHold: 0.5,
  outroDuration: 0.5,
  imageTileWidth: 220,
  logoTileWidth: 144,
  logoTileHeight: 172,
  logoImageWidth: 100,
  logoImageHeight: 100,
  borderRadius: 18,
  imageTileRadius: 0,
  logoTileRadius: 0,
  imageFit: "cover",
  easePreset: "easeOut",
  bezier1: 0.22,
  bezier2: 1,
  bezier3: 0.36,
  bezier4: 1,
  logoEasePreset: "easeOut",
  logoBezier1: 0.22,
  logoBezier2: 1,
  logoBezier3: 0.36,
  logoBezier4: 1,
  showRevealWord: true,
  revealWord: "studio.normal.",
  revealStartDelay: 0.1,
  revealLetterDuration: 0.7,
  revealLetterStagger: 0.06,
  revealLetterOffset: 260,
  revealBottomOffset: -8,
  revealTextColor: "#032834",
  revealPaddingLeft: 0,
  revealPaddingRight: 0,
  revealPaddingTop: 0,
  revealFont: {
    fontFamily: "Inter, sans-serif",
    fontSize: 240, // Reduced from 320 to fit better on standard screens
    fontWeight: 700,
    letterSpacing: -0.08,
    lineHeight: 1,
    textAlign: "left"
  },
  logoFont: {
    fontFamily: "Inter, sans-serif",
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: -0.03,
    lineHeight: 1
  }
};

function getFontStyle(font: any) {
  if (!font) return {};
  return {
    fontFamily: font.fontFamily,
    fontSize: font.fontSize,
    fontWeight: font.fontWeight,
    fontStyle: font.fontStyle,
    letterSpacing: font.letterSpacing,
    lineHeight: font.lineHeight,
    textAlign: font.textAlign,
    textTransform: font.textTransform
  };
}

export default function CubeIntro(userProps: CubeIntroProps) {
  const props = { ...defaultProps, ...userProps };
  const {
    images, logoText, logoImage, showLogoImage, backgroundColor, logoTileColor, logoTextColor,
    logoImageBgColor, logoImageBgWidth, logoImageBgHeight, logoImageBgRadius, startDelay,
    introDuration, introHold, stepDuration, overlap, endHold, outroDuration, imageTileWidth,
    logoTileWidth, logoTileHeight, logoImageWidth, logoImageHeight, borderRadius, imageTileRadius,
    logoTileRadius, imageFit, logoFont, easePreset, bezier1, bezier2, bezier3, bezier4,
    logoEasePreset, logoBezier1, logoBezier2, logoBezier3, logoBezier4, revealWord, showRevealWord,
    revealStartDelay, revealLetterDuration, revealLetterStagger, revealLetterOffset, revealBottomOffset,
    revealTextColor, revealFont, revealPaddingLeft, revealPaddingRight, revealPaddingTop
  } = props as Required<CubeIntroProps>;

  const safeImages = React.useMemo(() => (images || []).filter(Boolean), [images]);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const timers = React.useRef<number[]>([]);
  const [containerSize, setContainerSize] = React.useState({ width: 0, height: 0 });
  const [startedCount, setStartedCount] = React.useState(0);
  const [boxPhase, setBoxPhase] = React.useState<"opening" | "open" | "closing" | "closed">("opening");
  const [showBottomWord, setShowBottomWord] = React.useState(false);

  const imageTileHeight = React.useMemo(() => imageTileWidth * (9 / 16), [imageTileWidth]);

  const clearTimers = React.useCallback(() => {
    timers.current.forEach(id => window.clearTimeout(id));
    timers.current = [];
  }, []);

  React.useLayoutEffect(() => {
    const updateSize = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setContainerSize({ width: rect.width, height: rect.height });
    };
    updateSize();
    const observer = new ResizeObserver(updateSize);
    if (containerRef.current) observer.observe(containerRef.current);
    window.addEventListener("resize", updateSize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  const imageEaseValue = React.useMemo(() => {
    switch (easePreset) {
      case "linear": return "linear";
      case "easeIn": return [0.42, 0, 1, 1];
      case "easeOut": return [0, 0, 0.58, 1];
      case "easeInOut": return [0.42, 0, 0.58, 1];
      case "custom": return [bezier1, bezier2, bezier3, bezier4];
      default: return [0.22, 1, 0.36, 1];
    }
  }, [easePreset, bezier1, bezier2, bezier3, bezier4]);

  const logoEaseValue = React.useMemo(() => {
    switch (logoEasePreset) {
      case "linear": return "linear";
      case "easeIn": return [0.42, 0, 1, 1];
      case "easeOut": return [0, 0, 0.58, 1];
      case "easeInOut": return [0.42, 0, 0.58, 1];
      case "custom": return [logoBezier1, logoBezier2, logoBezier3, logoBezier4];
      default: return [0.22, 1, 0.36, 1];
    }
  }, [logoEasePreset, logoBezier1, logoBezier2, logoBezier3, logoBezier4]);

  React.useEffect(() => {
    clearTimers();

    setStartedCount(0);
    setBoxPhase("opening");
    setShowBottomWord(false);
    
    const clampedOverlap = Math.min(Math.max(overlap, 0), Math.max(stepDuration - 0.01, 0));
    const interval = Math.max(stepDuration - clampedOverlap, 0.01);
    const openDoneAt = startDelay + introDuration;
    const imagesStartAt = openDoneAt + introHold;
    
    const openTimer = window.setTimeout(() => {
      setBoxPhase("open");
    }, openDoneAt * 1000);
    timers.current.push(openTimer);
    
    safeImages.forEach((_, index) => {
      const delay = (imagesStartAt + index * interval) * 1000;
      const timer = window.setTimeout(() => {
        setStartedCount(prev => Math.max(prev, index + 1));
      }, delay);
      timers.current.push(timer);
    });
    
    const allImagesStartedAt = safeImages.length > 0 ? imagesStartAt + (safeImages.length - 1) * interval : imagesStartAt;
    const lastImageFullyOpenAt = safeImages.length > 0 ? allImagesStartedAt + stepDuration : imagesStartAt;
    const closingStartsAt = lastImageFullyOpenAt + endHold;
    const closedAt = closingStartsAt + outroDuration;
    const revealStartsAt = closedAt + revealStartDelay;
    
    const closeTimer = window.setTimeout(() => {
      setBoxPhase("closing");
    }, closingStartsAt * 1000);
    
    const closedTimer = window.setTimeout(() => {
      setBoxPhase("closed");
    }, closedAt * 1000);
    
    const revealTimer = window.setTimeout(() => {
      if (showRevealWord) setShowBottomWord(true);
    }, revealStartsAt * 1000);
    
    timers.current.push(closeTimer, closedTimer, revealTimer);
    
    return () => clearTimers();
  }, [safeImages, startDelay, introDuration, introHold, stepDuration, overlap, endHold, outroDuration, revealStartDelay, showRevealWord, clearTimers]);

  const hasLogoImage = showLogoImage && !!logoImage;
  const visibleImages = safeImages.slice(0, startedCount);
  
  const targetSize = React.useMemo(() => {
    return {
      width: Math.max(containerSize.width, imageTileWidth),
      height: Math.max(containerSize.height, imageTileHeight)
    };
  }, [containerSize.width, containerSize.height, imageTileWidth, imageTileHeight]);
  
  const showLogoBox = boxPhase !== "closed";
  const logoWrapperWidth = hasLogoImage ? logoImageBgWidth : logoTileWidth;
  const logoWrapperHeight = hasLogoImage ? logoImageBgHeight : logoTileHeight;
  
  const revealCharacters = React.useMemo(() => Array.from(revealWord || ""), [revealWord]);
  const revealTextStyle = {
    color: revealTextColor,
    whiteSpace: "pre" as const,
    lineHeight: 1,
    ...getFontStyle(revealFont)
  };

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", background: backgroundColor, borderRadius }}>
      {visibleImages.map((src, index) => (
        <motion.div
          key={`${index}-${src}`}
          initial={{ width: imageTileWidth, height: imageTileHeight }}
          animate={{ width: targetSize.width, height: targetSize.height }}
          transition={{ duration: stepDuration, ease: imageEaseValue }}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            x: "-50%",
            y: "-50%",
            transformOrigin: "center center",
            overflow: "hidden",
            borderRadius: imageTileRadius,
            zIndex: index + 1,
            pointerEvents: "none",
            willChange: "width, height",
            backfaceVisibility: "hidden" as any
          }}
        >
          <img
            src={src}
            alt=""
            draggable={false}
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              objectFit: imageFit,
              objectPosition: "center center",
              userSelect: "none",
              pointerEvents: "none",
              backfaceVisibility: "hidden" as any
            }}
          />
        </motion.div>
      ))}
      {showBottomWord && revealCharacters.length > 0 && (
        <div style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: revealBottomOffset,
          zIndex: 10000,
          pointerEvents: "none",
          overflow: "visible",
          whiteSpace: "nowrap",
          paddingLeft: revealPaddingLeft,
          paddingRight: revealPaddingRight,
          paddingTop: revealPaddingTop,
          boxSizing: "border-box"
        }}>
          <div style={{ display: "flex", alignItems: "flex-end", whiteSpace: "nowrap", overflow: "visible" }}>
            {revealCharacters.map((char, index) => {
              const content = char === " " ? "\u00A0" : char;
              return (
                <span key={`${char}-${index}`} style={{ position: "relative", display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
                  <span aria-hidden="true" style={{ ...revealTextStyle, visibility: "hidden", display: "block" }}>
                    {content}
                  </span>
                  <motion.span
                    initial={{ y: revealLetterOffset, opacity: 1 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: revealLetterDuration,
                      delay: index * revealLetterStagger,
                      ease: logoEaseValue
                    }}
                    style={{ ...revealTextStyle, position: "absolute", left: 0, top: 0, display: "block" }}
                  >
                    {content}
                  </motion.span>
                </span>
              );
            })}
          </div>
        </div>
      )}
      {showLogoBox && (
        <div style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: logoWrapperWidth,
          height: logoWrapperHeight,
          transform: "translate(-50%, -50%)",
          overflow: "hidden",
          zIndex: 9999,
          pointerEvents: "none"
        }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: boxPhase === "opening" ? logoWrapperWidth : boxPhase === "closing" ? 0 : logoWrapperWidth }}
            transition={{
              duration: boxPhase === "closing" ? outroDuration : introDuration,
              ease: logoEaseValue
            }}
            style={{ width: logoWrapperWidth, height: logoWrapperHeight, overflow: "hidden", transformOrigin: "left center" }}
          >
            {hasLogoImage ? (
              <div style={{
                width: logoImageBgWidth,
                height: logoImageBgHeight,
                background: logoImageBgColor,
                borderRadius: logoImageBgRadius,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxSizing: "border-box",
                overflow: "hidden"
              }}>
                <img
                  src={logoImage}
                  alt={logoText || "Logo"}
                  draggable={false}
                  style={{
                    width: logoImageWidth,
                    height: logoImageHeight,
                    objectFit: "contain",
                    objectPosition: "center center",
                    display: "block",
                    userSelect: "none",
                    pointerEvents: "none"
                  }}
                />
              </div>
            ) : (
              <div style={{
                width: logoTileWidth,
                height: logoTileHeight,
                background: logoTileColor,
                borderRadius: logoTileRadius,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-start",
                boxSizing: "border-box",
                padding: 12,
                overflow: "hidden"
              }}>
                <div style={{ width: "100%", color: logoTextColor, whiteSpace: "nowrap", ...getFontStyle(logoFont) }}>
                  {logoText}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
