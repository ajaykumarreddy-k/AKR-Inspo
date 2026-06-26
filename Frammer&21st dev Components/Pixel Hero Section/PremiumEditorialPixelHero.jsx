import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  startTransition,
} from "react";
import { motion, useInView } from "motion/react";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function mulberry32(seed) {
  return function () {
    let t = (seed += 1831565813);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function positionToObjectPosition(pos) {
  switch (pos) {
    case "center":
      return "50% 50%";
    case "top":
      return "50% 0%";
    case "bottom":
      return "50% 100%";
    case "left":
      return "0% 50%";
    case "right":
      return "100% 50%";
    case "top left":
      return "0% 0%";
    case "top right":
      return "100% 0%";
    case "bottom left":
      return "0% 100%";
    case "bottom right":
      return "100% 100%";
    default:
      return "50% 50%";
  }
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

function useResizeObserverSize(ref) {
  const [size, setSize] = useState({ w: 1200, h: 800 });
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const cr = entry.contentRect;
      startTransition(() => setSize({ w: cr.width, h: cr.height }));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return size;
}

function buildBrokenPixelMask(
  w,
  h,
  pixelSize,
  density,
  color,
  seed,
  mobile,
  mainOpening,
  protectedRects,
  extraOpenings
) {
  const off = typeof document !== "undefined" ? document.createElement("canvas") : null;
  if (!off) return null;
  const dpr = clamp(
    typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1,
    1,
    2
  );
  off.width = Math.max(1, Math.floor(w * dpr));
  off.height = Math.max(1, Math.floor(h * dpr));
  const ctx = off.getContext("2d");
  if (!ctx) return null;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  const rand = mulberry32(seed);
  const px = clamp(pixelSize * (mobile ? 1.6 : 1), 8, 64);
  const cols = Math.max(1, Math.ceil(w / px));
  const rows = Math.max(1, Math.ceil(h / px));
  const isProtected = (gx, gy, cx, cy) => {
    if (!protectedRects || protectedRects.length === 0) return false;
    for (const pr of protectedRects) {
      const pxJ = clamp(px, 8, 64);
      const jRight =
        (mulberry32(seed ^ 2654435769 ^ (gy * 2654435761) | 0)() - 0.5) *
        (mobile ? 4.5 : 7.5);
      const jBottom =
        (mulberry32(seed ^ 2246822507 ^ (gx * 1597334677) | 0)() - 0.5) *
        (mobile ? 4.5 : 7.5);
      const right = pr.x + pr.w + Math.round(jRight) * pxJ * 0.25;
      const bottom = pr.y + pr.h + Math.round(jBottom) * pxJ * 0.25;
      if (cx >= pr.x && cx <= right && cy >= pr.y && cy <= bottom) return true;
    }
    return false;
  };
  const solid = clamp(density, 0.2, 1);
  const ocx = clamp(mainOpening?.cx ?? w * 0.7, 0, w);
  const ocy = clamp(mainOpening?.cy ?? h * 0.58, 0, h);
  const or0 = clamp(
    mainOpening?.r ?? Math.min(w, h) * (mobile ? 0.34 : 0.46),
    40,
    Math.max(w, h)
  );
  const leftSolidCols = Math.floor(cols * (mobile ? 0.52 : 0.44));
  const windowLeftCols = Math.floor(cols * (mobile ? 0.52 : 0.44));
  const windowRightCols = Math.floor(cols * (mobile ? 0.98 : 0.99));
  const ocyG = ocy / px;
  const ocxG = ocx / px;
  const orGx = (or0 / px) * (mobile ? 0.95 : 1.05);
  const orGy = (or0 / px) * (mobile ? 0.7 : 0.75);
  const stair = (v, step) => Math.round(v / step) * step;
  const windowTopAt = (gx) => {
    const t = (gx - windowLeftCols) / Math.max(1, windowRightCols - windowLeftCols);
    const base = ocyG - orGy * (0.85 - 0.1 * t);
    const bite = Math.max(0, Math.sin(t * Math.PI) * 6);
    const noise =
      (mulberry32(seed + gx * 131 | 0)() - 0.5) * (mobile ? 2.2 : 3.6);
    return stair(base + bite + noise, mobile ? 1.6 : 1.3);
  };
  const windowBottomAt = (gx) => {
    const t = (gx - windowLeftCols) / Math.max(1, windowRightCols - windowLeftCols);
    const base = ocyG + orGy * (0.85 + 0.18 * (1 - t));
    const creep = Math.max(0, Math.cos(t * Math.PI * 1.2) * 5);
    const noise =
      (mulberry32(seed + gx * 977 | 0)() - 0.5) * (mobile ? 2.4 : 4.2);
    return stair(base - creep + noise, mobile ? 1.8 : 1.4);
  };
  const windowStrengthAt = (gx, gy) => {
    if (gx < windowLeftCols || gx > windowRightCols) return 0;
    if (gx < leftSolidCols) return 0;
    const top = windowTopAt(gx);
    const bottom = windowBottomAt(gx);
    if (gy < top || gy > bottom) return 0;
    const dx = (gx - ocxG) / Math.max(1e-6, orGx);
    const dy = (gy - ocyG) / Math.max(1e-6, orGy);
    const d = Math.sqrt(dx * dx + dy * dy);
    const core = clamp(1 - d, 0, 1);
    const t = (gx - windowLeftCols) / Math.max(1, windowRightCols - windowLeftCols);
    const rightFade = clamp(1 - Math.max(0, t - 0.72) / 0.28, 0, 1);
    return core * (0.65 + 0.35 * rightFade);
  };
  ctx.fillStyle = color;
  for (let gy = 0; gy < rows; gy++) {
    for (let gx = 0; gx < cols; gx++) {
      const x = gx * px;
      const y = gy * px;
      const rw = Math.min(px, w - x);
      const rh = Math.min(px, h - y);
      const cx = x + rw * 0.5;
      const cy = y + rh * 0.5;
      if (isProtected(gx, gy, cx, cy)) {
        ctx.fillRect(x, y, rw, rh);
        continue;
      }
      const isLeftSolid = gx < leftSolidCols;
      const isBottom = gy > rows * 0.78;
      const isTop = gy < rows * 0.18;
      const isRightEdge = gx > cols * 0.82;
      const inBottomLeftCluster = isBottom && gx < cols * 0.26;
      const inBottomRightCluster = isBottom && gx > cols * 0.78;
      const rightPillar =
        isRightEdge && mulberry32(seed + gx * 31 | 0)() < (mobile ? 0.62 : 0.72);
      const win = windowStrengthAt(gx, gy);
      const dxMain = cx - ocx;
      const dyMain = cy - ocy;
      const distMain = Math.sqrt(dxMain * dxMain + dyMain * dyMain);
      const guaranteedClear =
        !isLeftSolid && win > 0.15 && distMain < or0 * (mobile ? 0.78 : 0.82);
      let fill = true;
      if (guaranteedClear) fill = false;
      if (!isLeftSolid && win > 0.2) {
        const edgeJag = mulberry32(seed ^ (gx * 73856093) ^ (gy * 19349663) | 0)();
        const edgeKeep = win < 0.55 ? clamp(0.35 + (0.5 - win) * 0.9, 0.18, 0.7) : 0;
        fill = edgeJag < edgeKeep;
      }
      if (inBottomLeftCluster || inBottomRightCluster) fill = true;
      if (rightPillar && win < 0.75) fill = true;
      if (isLeftSolid) {
        fill = true;
        if (isBottom && gy > rows * 0.84 && gx > leftSolidCols * 0.55) {
          const cut = mulberry32(seed + gx * 991 + gy * 17 | 0)();
          if (cut < (mobile ? 0.03 : 0.045)) fill = false;
        }
      }
      if (fill) {
        const keepP = clamp(solid * (mobile ? 0.95 : 0.98), 0.35, 1);
        if (rand() > keepP) fill = false;
      }
      if (fill && !isLeftSolid) {
        const holeP = mobile ? 0.006 : 0.012;
        const h0 = mulberry32(seed + gx * 421 + gy * 811 | 0)();
        const bias = win > 0.5 ? 0.25 : win > 0.2 ? 0.6 : 1;
        if (h0 < holeP * bias) fill = false;
      }
      if (!fill && isTop && gx > cols * 0.42 && gx < cols * 0.7) {
        const fl = mulberry32(seed + gx * 19 + gy * 613 | 0)();
        if (fl < (mobile ? 0.02 : 0.035)) fill = true;
      }
      if (fill && extraOpenings && extraOpenings.length && !isLeftSolid) {
        for (const o of extraOpenings.slice(0, mobile ? 1 : 2)) {
          const dx = cx - o.cx;
          const dy = cy - o.cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < o.r * 0.85) {
            fill = false;
            break;
          }
        }
      }
      if (fill) {
        ctx.fillRect(x, y, rw, rh);
      }
    }
  }
  ctx.globalAlpha = 1;
  return { canvas: off, px, cols, rows, dpr };
}

export default function PremiumEditorialPixelHero({
  headline = "Creative\nSpace",
  subheadline = "LEARN MORE",
  subheadlineLink = "https://example.com",
  backgroundImage = {
    src: "https://framerusercontent.com/images/f9RiWoNpmlCMqVRIHz8l8wYfeI.jpg",
    alt: "Background",
  },
  imagePosition = "center",
  pixelColor = "#FFFFFF",
  pixelSize = 53,
  pixelDensity = 0.78,
  revealRadius = 67,
  animationSpeed = 0.16,
  enableInteraction = true,
  headlineFont = {
    fontSize: "84px",
    fontWeight: "normal",
    letterSpacing: "-0.05em",
    lineHeight: "0.95em",
  },
  subheadlineFont = {
    fontSize: "16px",
    fontWeight: "600",
    letterSpacing: "-0.01em",
    lineHeight: "1.2em",
  },
  textColor = "#000000",
  padding = 64,
  style,
}) {
  const isStatic = false; // Mocked
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const containerSize = useResizeObserverSize(wrapRef);
  const inView = useInView(wrapRef, { amount: 0.2 });
  const [maskVersion, setMaskVersion] = useState(0);

  const isMobile = useMemo(() => {
    const w = containerSize.w;
    return w <= 420;
  }, [containerSize.w]);

  const objectPosition = useMemo(
    () => positionToObjectPosition(imagePosition),
    [imagePosition]
  );

  const paddingPx = useMemo(() => {
    const base = clamp(padding, 24, 96);
    if (isMobile) return clamp(base * 0.65, 18, 44);
    return base;
  }, [padding, isMobile]);

  const opening = useRef({ cx: 0, cy: 0, r: 0 });
  const patternOpenings = useRef([]);

  const maskSeed = useMemo(() => {
    const s =
      Math.floor(pixelSize * 17) +
      Math.floor(pixelDensity * 999) * 13 +
      Math.floor(revealRadius * 3) * 7;
    const v = Math.floor(maskVersion * 997);
    return s + v || 1337;
  }, [pixelSize, pixelDensity, revealRadius, maskVersion]);

  const baseMask = useMemo(() => {
    if (typeof document === "undefined") return null;
    const w = Math.max(1, containerSize.w);
    const h = Math.max(1, containerSize.h);
    const protectedRects = [
      {
        x: 0,
        y: 0,
        w: (isMobile ? w : Math.min(680, w - paddingPx * 2)) + paddingPx + 160,
        h: (isMobile ? 150 : 220) + paddingPx,
      },
    ];
    return buildBrokenPixelMask(
      w,
      h,
      pixelSize,
      pixelDensity,
      pixelColor,
      maskSeed,
      isMobile,
      opening.current,
      protectedRects,
      patternOpenings.current
    );
  }, [
    containerSize.w,
    containerSize.h,
    pixelSize,
    pixelDensity,
    pixelColor,
    maskSeed,
    isMobile,
    paddingPx,
  ]);

  useEffect(() => {
    const w = Math.max(1, containerSize.w);
    const h = Math.max(1, containerSize.h);
    if (!opening.current.r) {
      opening.current = {
        cx: w * 0.7,
        cy: h * 0.62,
        r: Math.min(w, h) * (isMobile ? 0.34 : 0.42),
      };
    } else {
      opening.current = {
        cx: clamp(opening.current.cx, 0, w),
        cy: clamp(opening.current.cy, 0, h),
        r: clamp(opening.current.r, 40, Math.max(w, h)),
      };
    }
    if (!patternOpenings.current.length) {
      patternOpenings.current = [
        { cx: w * 0.82, cy: h * 0.56, r: Math.min(w, h) * 0.18 },
        { cx: w * 0.62, cy: h * 0.76, r: Math.min(w, h) * 0.14 },
      ];
    } else {
      patternOpenings.current = patternOpenings.current.map((o) => ({
        cx: clamp(o.cx, 0, w),
        cy: clamp(o.cy, 0, h),
        r: clamp(o.r, 40, Math.max(w, h)),
      }));
    }
  }, [containerSize.w, containerSize.h, isMobile]);

  const pointer = useRef({
    x: 0,
    y: 0,
    tx: 0,
    ty: 0,
    active: false,
    strength: 0,
    tStrength: 0,
  });
  const rafRef = useRef(null);
  const reduced = useMemo(() => prefersReducedMotion(), []);
  const [currentRadius, setCurrentRadius] = useState(revealRadius);
  const [isDraggingHandle, setIsDraggingHandle] = useState(false);
  const [isDraggingOpening, setIsDraggingOpening] = useState(false);
  const [isDraggingOpeningRadius, setIsDraggingOpeningRadius] = useState(false);

  useEffect(() => {
    if (isDraggingHandle) return;
    startTransition(() => setCurrentRadius(revealRadius));
  }, [revealRadius, isDraggingHandle]);

  const trailRef = useRef([]);

  const addTrailPoint = useCallback((x, y) => {
    const now = typeof performance !== "undefined" ? performance.now() : Date.now();
    const arr = trailRef.current;
    const last = arr[arr.length - 1];
    if (last) {
      const dx = x - last.x;
      const dy = y - last.y;
      if (dx * dx + dy * dy < 36) return;
    }
    arr.push({ x, y, t: now });
    if (arr.length > 24) arr.splice(0, arr.length - 24);
  }, []);

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !baseMask?.canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = Math.max(1, containerSize.w);
    const h = Math.max(1, containerSize.h);
    const dpr = clamp(
      typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1,
      1,
      2
    );
    const targetW = Math.floor(w * dpr);
    const targetH = Math.floor(h * dpr);
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const spd = clamp(animationSpeed, 0.02, 0.6);
    const lerp = (a, b, t) => a + (b - a) * t;
    const p = pointer.current;
    p.x = lerp(p.x, p.tx, spd);
    p.y = lerp(p.y, p.ty, spd);
    p.strength = lerp(p.strength, p.tStrength, spd);

    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    ctx.drawImage(baseMask.canvas, 0, 0, w, h);

    if (p.strength > 0.001) {
      const r0 = clamp(currentRadius * (isMobile ? 0.9 : 1), 40, Math.max(w, h));
      const now = typeof performance !== "undefined" ? performance.now() : Date.now();
      const tailMs = isMobile ? 380 : 520;
      const pts = trailRef.current;
      while (pts.length && now - pts[0].t > tailMs) pts.shift();
      const trail = [
        { x: p.x, y: p.y, age: 0 },
        ...pts.map((pt) => ({ x: pt.x, y: pt.y, age: now - pt.t })),
      ];
      const px = clamp(baseMask.px, 6, 120);
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "#000";
      for (const tp of trail) {
        const ageT = clamp(tp.age / tailMs, 0, 1);
        const r = r0 * (1 - ageT * 0.42);
        const cx0 = tp.x;
        const cy0 = tp.y;
        const minGX = Math.floor((cx0 - r) / px);
        const maxGX = Math.floor((cx0 + r) / px);
        const minGY = Math.floor((cy0 - r) / px);
        const maxGY = Math.floor((cy0 + r) / px);
        for (let gy = minGY; gy <= maxGY; gy++) {
          const y = gy * px;
          if (y > h || y + px < 0) continue;
          for (let gx = minGX; gx <= maxGX; gx++) {
            const x = gx * px;
            if (x > w || x + px < 0) continue;
            const rw = Math.min(px, w - x);
            const rh = Math.min(px, h - y);
            const cx = x + rw * 0.5;
            const cy = y + rh * 0.5;
            const dxp = cx - cx0;
            const dyp = cy - cy0;
            const dist = Math.sqrt(dxp * dxp + dyp * dyp);
            if (dist > r) continue;
            ctx.globalAlpha = 1;
            ctx.fillRect(x, y, rw, rh);
          }
        }
      }
      ctx.globalAlpha = 1;
    }
    ctx.globalCompositeOperation = "source-over";
    if (p.active || p.strength > 0.002) {
      rafRef.current = requestAnimationFrame(drawFrame);
    } else {
      rafRef.current = null;
    }
  }, [
    animationSpeed,
    baseMask,
    containerSize.w,
    containerSize.h,
    isMobile,
    currentRadius,
  ]);

  const startRaf = useCallback(() => {
    if (typeof window === "undefined") return;
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(drawFrame);
  }, [drawFrame]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const canvas = canvasRef.current;
    if (!canvas || !baseMask?.canvas) return;
    pointer.current.active = false;
    pointer.current.tStrength = 0;
    pointer.current.strength = 0;
    pointer.current.tx = containerSize.w * 0.5;
    pointer.current.ty = containerSize.h * 0.5;
    pointer.current.x = pointer.current.tx;
    pointer.current.y = pointer.current.ty;
    drawFrame();
  }, [baseMask?.canvas, containerSize.w, containerSize.h, drawFrame]);

  useEffect(() => {
    return () => {
      if (typeof window === "undefined") return;
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const setPointerTarget = useCallback(
    (clientX, clientY) => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = clamp(clientX - rect.left, 0, rect.width);
      const y = clamp(clientY - rect.top, 0, rect.height);
      pointer.current.tx = x;
      pointer.current.ty = y;
      if (enableInteraction && !isDraggingHandle) addTrailPoint(x, y);
    },
    [wrapRef, enableInteraction, isDraggingHandle, addTrailPoint]
  );

  const handlePointerMove = useCallback(
    (e) => {
      if (isDraggingHandle || isDraggingOpening || isDraggingOpeningRadius) return;
      if (isStatic || reduced || !enableInteraction || !inView) return;
      pointer.current.active = true;
      pointer.current.tStrength = 1;
      setPointerTarget(e.clientX, e.clientY);
      startRaf();
    },
    [
      isDraggingHandle,
      isDraggingOpening,
      isDraggingOpeningRadius,
      enableInteraction,
      inView,
      isStatic,
      reduced,
      setPointerTarget,
      startRaf,
    ]
  );

  const handlePointerDown = useCallback(
    (e) => {
      if (isDraggingHandle || isDraggingOpening || isDraggingOpeningRadius) return;
      if (isStatic || reduced || !enableInteraction || !inView) return;
      pointer.current.active = true;
      pointer.current.tStrength = 1;
      setPointerTarget(e.clientX, e.clientY);
      startRaf();
    },
    [
      isDraggingHandle,
      isDraggingOpening,
      isDraggingOpeningRadius,
      enableInteraction,
      inView,
      isStatic,
      reduced,
      setPointerTarget,
      startRaf,
    ]
  );

  const handlePointerLeave = useCallback(() => {
    if (isStatic || reduced || !enableInteraction) return;
    pointer.current.active = false;
    pointer.current.tStrength = 0;
    startRaf();
  }, [enableInteraction, isStatic, reduced, startRaf]);

  const container = useMemo(
    () => ({
      ...style,
      position: "relative",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      backgroundColor: "#FFFFFF",
      touchAction: enableInteraction ? "none" : "auto",
      userSelect: "none",
    }),
    [enableInteraction, style]
  );

  return (
    <section
      ref={wrapRef}
      style={container}
      aria-label="Hero"
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerLeave={handlePointerLeave}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${backgroundImage?.src || ""})`,
          backgroundSize: "cover",
          backgroundPosition: objectPosition,
          filter: "saturate(1.02) contrast(1.02)",
        }}
        role="img"
        aria-label={backgroundImage?.alt || "Background"}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />
      {!isStatic && enableInteraction && !reduced && inView && (
        <div
          style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none" }}
          aria-hidden="true"
        >
          <div
            style={{
              position: "absolute",
              left: pointer.current.x - currentRadius,
              top: pointer.current.y - currentRadius,
              width: currentRadius * 2,
              height: currentRadius * 2,
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.55)",
              opacity: pointer.current.strength > 0.02 ? 1 : 0,
              transition: "opacity 200ms ease",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: pointer.current.x + currentRadius - 7,
              top: pointer.current.y - 7,
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "rgba(255,255,255,1)",
              opacity: pointer.current.strength > 0.02 ? 1 : 0,
              transition: "opacity 200ms ease",
              pointerEvents: "auto",
              cursor: "ew-resize",
            }}
            onPointerDown={(e) => {
              if (isStatic || reduced || !enableInteraction) return;
              e.preventDefault();
              e.stopPropagation();
              startTransition(() => setIsDraggingHandle(true));
              e.currentTarget.setPointerCapture?.(e.pointerId);
            }}
            onPointerMove={(e) => {
              if (!isDraggingHandle) return;
              const el = wrapRef.current;
              if (!el) return;
              const rect = el.getBoundingClientRect();
              const x = clamp(e.clientX - rect.left, 0, rect.width);
              const y = clamp(e.clientY - rect.top, 0, rect.height);
              const dx = x - pointer.current.x;
              const dy = y - pointer.current.y;
              const nr = clamp(Math.sqrt(dx * dx + dy * dy), 40, 520);
              startTransition(() => setCurrentRadius(nr));
              pointer.current.active = true;
              pointer.current.tStrength = 1;
              startRaf();
            }}
            onPointerUp={(e) => {
              if (!isDraggingHandle) return;
              e.preventDefault();
              e.stopPropagation();
              startTransition(() => setIsDraggingHandle(false));
              e.currentTarget.releasePointerCapture?.(e.pointerId);
            }}
          />
        </div>
      )}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          padding: paddingPx,
          boxSizing: "border-box",
        }}
      >
        <div style={{ maxWidth: isMobile ? "100%" : 680, color: textColor }}>
          <motion.h1
            style={{
              margin: 0,
              letterSpacing: "-0.04em",
              lineHeight: "1em",
              ...headlineFont,
            }}
            initial={isStatic ? false : { opacity: 0, y: 10 }}
            animate={isStatic ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {headline}
          </motion.h1>
          <motion.div
            style={{
              marginTop: isMobile ? 18 : 22,
              display: "flex",
              alignItems: "center",
              gap: 12,
              color: textColor,
              opacity: 0.95,
            }}
            initial={isStatic ? false : { opacity: 0, y: 8 }}
            animate={isStatic ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <a
              href={subheadlineLink || undefined}
              target={subheadlineLink ? "_self" : undefined}
              rel={subheadlineLink ? "noopener noreferrer" : undefined}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                whiteSpace: "nowrap",
                color: "inherit",
                textDecoration: "none",
                pointerEvents: subheadlineLink ? "auto" : "none",
                ...subheadlineFont,
              }}
              aria-label={subheadlineLink ? subheadline : undefined}
            >
              <span aria-hidden="true" style={{ display: "inline-flex", alignItems: "center" }}>
                <svg
                  width={14}
                  height={14}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ display: "block" }}
                >
                  <path
                    d="M3 8H12"
                    stroke={textColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M9 5L12 8L9 11"
                    stroke={textColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span style={{ minWidth: "max-content" }}>{subheadline}</span>
            </a>
            <span
              aria-hidden="true"
              style={{
                height: 1,
                backgroundColor: textColor,
                opacity: 0.45,
                flex: 1,
                transform: "translateY(1px)",
                minWidth: 30,
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
