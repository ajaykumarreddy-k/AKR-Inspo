import React, { useRef, useEffect } from "react";

export interface GlyphDitherProps {
  glyphSet?: number; // 0: Dots, 1: Squares, 2: Halftone Blocks, 3: Bayer Matrix, 4: Atkinson/Floyd, 5: Classic ASCII
  scale?: number; // 0-100 (default: 24)
  gamma?: number; // -1 to 1 (default: 0)
  mix?: number; // 0-100 (default: 100)
  monochrome?: boolean; // default: true
  invertOrder?: boolean; // default: true
  blendMode?: "Normal" | "Add" | "Screen" | "Multiply" | "Difference";
}

export interface MouseDrawProps {
  radius?: number; // 0-100 (default: 20)
  strength?: number; // 0-100 (default: 82)
  turbulence?: number; // 0-100 (default: 100)
  tint?: string; // default: "#FFFFFF"
  colorMix?: number; // 0-100 (default: 100)
  tail?: number; // 0-100 (default: 100)
  drawBlendMode?: "Normal" | "Add" | "Screen" | "Multiply" | "Difference";
}

export interface InteractivityProps {
  trackMouse?: number; // 0-100 (default: 100)
  momentum?: number; // 0-100 (default: 42)
}

export interface AsciiFlowTrailProps {
  glyphDither?: GlyphDitherProps;
  mouseDraw?: MouseDrawProps;
  interactivity?: InteractivityProps;
  style?: React.CSSProperties;
  className?: string;
  isFullScreen?: boolean;
}

export function AsciiFlowTrail({
  glyphDither = {},
  mouseDraw = {},
  interactivity = {},
  style,
  className = "",
  isFullScreen = true,
}: AsciiFlowTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const mousePos = useRef<{ x: number; y: number }>({ x: 100, y: 100 });
  const smoothPos = useRef<{ x: number; y: number }>({ x: 100, y: 100 });
  const trail = useRef<Array<{ x: number; y: number; life: number }>>([]);
  const time = useRef<number>(0);

  // Extract props with defaults
  const glyphSet = glyphDither.glyphSet ?? 3;
  const scale = glyphDither.scale ?? 24;
  const gamma = glyphDither.gamma ?? 0;
  const mix = glyphDither.mix ?? 100;
  const invertOrder = glyphDither.invertOrder ?? true;
  const monochrome = glyphDither.monochrome ?? true;
  const blendMode = glyphDither.blendMode || "Normal";

  const radius = mouseDraw.radius ?? 20;
  const strength = mouseDraw.strength ?? 82;
  const turbulence = mouseDraw.turbulence ?? 100;
  const tint = mouseDraw.tint || "#FFFFFF";
  const colorMix = mouseDraw.colorMix ?? 100;
  const tailLength = mouseDraw.tail ?? 100;
  const drawBlendMode = mouseDraw.drawBlendMode || "Screen";

  const trackMouse = interactivity.trackMouse ?? 100;
  const momentum = interactivity.momentum ?? 42;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Canvas size updating
    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    updateSize();
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(canvas);

    // Mouse tracking - support window or element bounds
    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    if (isFullScreen) {
      window.addEventListener("mousemove", handleMouse, { passive: true });
    } else {
      canvas.addEventListener("mousemove", handleMouse, { passive: true });
    }

    // Select character set based on glyph set index
    let baseChars = "@%#*+=-:. ";
    switch (glyphSet) {
      case 0:
        baseChars = "●•·. ";
        break;
      case 1:
        baseChars = "■□▪▫ ";
        break;
      case 2:
        baseChars = "█▓▒░ ";
        break;
      case 3:
        baseChars = "▣▤▥▦▧▨▩ ";
        break;
      case 4:
        baseChars = "◆◇◈○◉◊◌ ";
        break;
      case 5:
      default:
        baseChars = "@%#*+=-:. ";
        break;
    }

    const chars = invertOrder ? baseChars.split("").reverse().join("") : baseChars;

    // Parse tint color
    let tintR = 255,
      tintG = 255,
      tintB = 255;
    if (typeof tint === "string") {
      if (tint.startsWith("#")) {
        const cleanHex = tint.replace("#", "");
        const hex =
          cleanHex.length === 3
            ? cleanHex
                .split("")
                .map((c) => c + c)
                .join("")
            : cleanHex;
        tintR = parseInt(hex.slice(0, 2), 16) || 255;
        tintG = parseInt(hex.slice(2, 4), 16) || 255;
        tintB = parseInt(hex.slice(4, 6), 16) || 255;
      } else if (tint.startsWith("rgb")) {
        const matches = tint.match(/\d+/g);
        if (matches) {
          tintR = parseInt(matches[0]) || 255;
          tintG = parseInt(matches[1]) || 255;
          tintB = parseInt(matches[2]) || 255;
        }
      }
    }

    // Animation loop
    const animate = () => {
      time.current += 0.016;

      const rect = canvas.getBoundingClientRect();
      const displayWidth = rect.width;
      const displayHeight = rect.height;

      // Clear canvas
      ctx.clearRect(0, 0, displayWidth, displayHeight);

      // Target position
      let targetX = mousePos.current.x;
      let targetY = mousePos.current.y;

      if (trackMouse < 100) {
        const autoX = displayWidth / 2 + Math.sin(time.current) * 150;
        const autoY = displayHeight / 2 + Math.cos(time.current * 0.7) * 150;
        const trackFactor = trackMouse / 100;
        targetX = mousePos.current.x * trackFactor + autoX * (1 - trackFactor);
        targetY = mousePos.current.y * trackFactor + autoY * (1 - trackFactor);
      }

      // Momentum calculation
      const momentumFactor = 1 - (momentum / 100) * 0.95;
      smoothPos.current.x += (targetX - smoothPos.current.x) * momentumFactor;
      smoothPos.current.y += (targetY - smoothPos.current.y) * momentumFactor;

      // Add to trail
      trail.current.push({
        x: smoothPos.current.x,
        y: smoothPos.current.y,
        life: 1,
      });

      // Manage trail length and decay
      const maxLength = Math.floor((tailLength / 100) * 50) + 5;
      while (trail.current.length > maxLength) {
        trail.current.shift();
      }

      const decay = 0.02 * (1 - tailLength / 100) + 0.01;
      trail.current.forEach((p) => (p.life -= decay));
      trail.current = trail.current.filter((p) => p.life > 0);

      // Character font size
      const charSize = Math.max(6, Math.floor((16 * scale) / 100));
      ctx.font = `${charSize}px monospace, SFMono-Regular, Consolas, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Global composite operation
      if (blendMode === "Add") {
        ctx.globalCompositeOperation = "lighter";
      } else if (blendMode === "Screen") {
        ctx.globalCompositeOperation = "screen";
      } else if (blendMode === "Multiply") {
        ctx.globalCompositeOperation = "multiply";
      } else if (blendMode === "Difference") {
        ctx.globalCompositeOperation = "difference";
      } else {
        ctx.globalCompositeOperation = "source-over";
      }

      // Grid rendering
      const cols = Math.ceil(displayWidth / charSize);
      const rows = Math.ceil(displayHeight / charSize);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * charSize + charSize / 2;
          const y = row * charSize + charSize / 2;

          let intensity = 0;
          trail.current.forEach((point) => {
            const dist = Math.sqrt(Math.pow(x - point.x, 2) + Math.pow(y - point.y, 2));
            const maxDist = (radius / 100) * 150;
            if (dist < maxDist) {
              const value = (1 - dist / maxDist) * point.life * (strength / 100);

              if (drawBlendMode === "Add") {
                intensity += value;
              } else if (drawBlendMode === "Multiply") {
                intensity = intensity * value;
              } else if (drawBlendMode === "Difference") {
                intensity = Math.abs(intensity - value);
              } else if (drawBlendMode === "Screen") {
                intensity = 1 - (1 - intensity) * (1 - value);
              } else {
                intensity = Math.max(intensity, value);
              }
            }
          });

          // Turbulence
          if (turbulence > 0 && intensity > 0) {
            const turb =
              Math.sin(x * 0.01 + time.current) *
              Math.cos(y * 0.01 + time.current * 0.7) *
              (turbulence / 1000);
            intensity += turb;
          }

          // Gamma adjustment
          if (gamma !== 0 && intensity > 0) {
            intensity = Math.pow(intensity, 1 - gamma);
          }

          // Glyph set dithering
          if (glyphSet > 0 && intensity > 0) {
            const ditherAmount = 0.2;
            if (glyphSet === 1) {
              const phase = (Math.sin(col * 0.5) + Math.cos(row * 0.5)) * ditherAmount;
              intensity += phase;
            } else if (glyphSet === 2) {
              const phase = ((col % 2) + (row % 2)) * ditherAmount - ditherAmount;
              intensity += phase;
            } else if (glyphSet === 3) {
              const bayer = [
                [0, 8, 2, 10],
                [12, 4, 14, 6],
                [3, 11, 1, 9],
                [15, 7, 13, 5],
              ];
              const threshold = bayer[row % 4][col % 4] / 16;
              intensity = intensity > threshold ? 1 : intensity * 0.5;
            } else if (glyphSet === 4 || glyphSet === 5) {
              const noise = Math.random() * ditherAmount - ditherAmount / 2;
              intensity += noise;
            }
          }

          intensity = Math.max(0, Math.min(1, intensity));

          if (intensity > 0.01) {
            const charIndex = Math.min(
              chars.length - 1,
              Math.floor(intensity * chars.length)
            );
            const char = chars[charIndex];
            const alpha = intensity * (mix / 100);

            if (monochrome) {
              ctx.fillStyle = `rgba(${tintR}, ${tintG}, ${tintB}, ${alpha})`;
            } else {
              const mixFactor = colorMix / 100;
              const brightness = intensity;
              const r = Math.round(
                255 * brightness * (1 - mixFactor) + tintR * mixFactor * brightness
              );
              const g = Math.round(
                255 * brightness * (1 - mixFactor) + tintG * mixFactor * brightness
              );
              const b = Math.round(
                255 * brightness * (1 - mixFactor) + tintB * mixFactor * brightness
              );
              ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            }

            ctx.fillText(char, x, y);
          }
        }
      }

      ctx.globalCompositeOperation = "source-over";
      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      resizeObserver.disconnect();
      if (isFullScreen) {
        window.removeEventListener("mousemove", handleMouse);
      } else {
        canvas.removeEventListener("mousemove", handleMouse);
      }
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [
    glyphSet,
    scale,
    gamma,
    mix,
    invertOrder,
    monochrome,
    blendMode,
    radius,
    strength,
    turbulence,
    tint,
    colorMix,
    tailLength,
    drawBlendMode,
    trackMouse,
    momentum,
    isFullScreen,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={`${
        isFullScreen ? "fixed inset-0 pointer-events-none z-10" : "w-full h-full block"
      } ${className}`}
      style={{
        width: isFullScreen ? "100vw" : style?.width || "100%",
        height: isFullScreen ? "100vh" : style?.height || "100%",
        ...style,
      }}
    />
  );
}

export default AsciiFlowTrail;
