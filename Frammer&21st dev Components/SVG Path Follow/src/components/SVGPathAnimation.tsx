import React, { useState, useEffect, useMemo, useRef, startTransition } from "react";
import { motion, useInView } from "framer-motion";

export interface SVGPathAnimationProps {
  svgPath?: string;
  useFile?: boolean;
  svgFile?: string;
  bgColor?: string;
  animColor?: string;
  strokeWidth?: number;
  trigger?: "appear" | "inView";
  playback?: "once" | "loop";
  animationType?: "auto" | "manual";
  length?: number;
  autoDuration?: number;
  autoTransition?: any;
  transition?: any;
  lineCap?: "butt" | "round" | "square";
  style?: React.CSSProperties;
}

export default function SVGPathAnimation(props: SVGPathAnimationProps) {
  const {
    svgPath = "M10 80 Q 95 10 180 80",
    useFile = false,
    svgFile = "",
    bgColor = "#EEEEEE",
    animColor = "#0099FF",
    strokeWidth = 4,
    trigger = "appear",
    playback = "loop",
    animationType = "auto",
    length = 100,
    autoDuration = 2,
    autoTransition,
    transition,
    lineCap = "butt",
    style,
  } = props;
  
  const [pathLength, setPathLength] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [extractedPath, setExtractedPath] = useState("");
  const [viewBox, setViewBox] = useState("0 0 200 200");
  const [svgDimensions, setSvgDimensions] = useState({ width: 1, height: 1 });
  
  const pathRef = useRef<SVGPathElement>(null);
  const bgPathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  
  const isInView = useInView(containerRef, { once: trigger === "appear" || playback === "once" });
  
  useEffect(() => {
    if (useFile && svgFile) {
      fetch(svgFile)
        .then((response) => response.text())
        .then((svgText) => {
          const parser = new DOMParser();
          const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
          const pathElement = svgDoc.querySelector("path");
          if (pathElement) {
            const d = pathElement.getAttribute("d");
            if (d) {
              startTransition(() => setExtractedPath(d));
            }
          }
        })
        .catch((error) => {
          console.error("Error loading SVG file:", error);
        });
    }
  }, [useFile, svgFile]);
  
  const activePath = useFile && extractedPath ? extractedPath : svgPath;
  
  useEffect(() => {
    startTransition(() => {
      setIsReady(false);
      setPathLength(0);
    });
  }, [activePath]);
  
  useEffect(() => {
    const el = bgPathRef.current || pathRef.current;
    if (!el) return;
    
    requestAnimationFrame(() => {
      const target = bgPathRef.current || pathRef.current;
      if (!target) return;
      const length = target.getTotalLength();
      startTransition(() => {
        setPathLength(length);
        setIsReady(length > 0);
      });
    });
    
    try {
      const bbox = el.getBBox();
      const padding = 5;
      const newViewBox = `${bbox.x - padding} ${bbox.y - padding} ${bbox.width + padding * 2} ${bbox.height + padding * 2}`;
      startTransition(() => setViewBox(newViewBox));
    } catch (error) {
      console.error("Error calculating viewBox:", error);
    }
  }, [activePath, strokeWidth]);
  
  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        startTransition(() => setSvgDimensions({ width: rect.width, height: rect.height }));
      }
    };
    updateDimensions();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
    }
  }, []);
  
  const scaledStrokeWidth = useMemo(() => {
    const [, , vbWidth, vbHeight] = viewBox.split(" ").map(Number);
    const scaleX = vbWidth / svgDimensions.width;
    const scaleY = vbHeight / svgDimensions.height;
    const scale = Math.max(scaleX, scaleY);
    if (!isFinite(scale) || isNaN(scale)) return strokeWidth;
    return strokeWidth * scale;
  }, [viewBox, svgDimensions, strokeWidth]);
  
  const shouldAnimate = trigger === "appear" ? true : isInView;
  
  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%", ...style }}>
      <svg
        ref={svgRef}
        viewBox={viewBox}
        style={{ width: "100%", height: "100%", overflow: "visible" }}
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          ref={bgPathRef}
          d={activePath}
          stroke={bgColor}
          strokeWidth={scaledStrokeWidth}
          fill="none"
          strokeLinecap={lineCap}
          strokeLinejoin="round"
        />
        {(animationType === "manual" || isReady) && (
          <motion.path
            ref={pathRef}
            d={activePath}
            stroke={animColor}
            strokeWidth={scaledStrokeWidth}
            fill="none"
            strokeLinecap={lineCap}
            strokeLinejoin="round"
            strokeDasharray={pathLength || 1}
            initial={animationType === "auto" ? { strokeDashoffset: pathLength || 1 } : false}
            animate={
              animationType === "manual"
                ? { strokeDashoffset: pathLength * (1 - length / 100) }
                : shouldAnimate
                ? { strokeDashoffset: 0 }
                : { strokeDashoffset: pathLength || 1 }
            }
            transition={
              animationType === "manual"
                ? transition
                : {
                    ...(autoTransition || {}),
                    duration: autoDuration,
                    repeat: playback === "loop" ? Infinity : 0,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }
            }
            key={animationType === "auto" ? `${activePath}-ready` : `${activePath}-manual`}
          />
        )}
      </svg>
    </div>
  );
}
