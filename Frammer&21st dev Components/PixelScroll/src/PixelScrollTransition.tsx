import * as React from "react";
import { useMotionValueEvent, useScroll, useSpring } from "framer-motion";

const SCROLL_OFFSET = ["start end", "end start"] as const;

function clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(max, value));
}

function mulberry32(seed: number) {
    let t = seed >>> 0;
    return () => {
        t += 1831565813;
        let x = Math.imul(t ^ (t >>> 15), 1 | t);
        x ^= x + Math.imul(x ^ (x >>> 7), 61 | x);
        return (((x ^ (x >>> 14)) >>> 0) / 4294967296);
    };
}

function applyEasing(value: number, easing: string) {
    const t = clamp(value, 0, 1);
    if (easing === "ease-in") return t * t * t;
    if (easing === "ease-out") return 1 - Math.pow(1 - t, 3);
    if (easing === "ease-in-out") {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    if (easing === "expo-out") {
        if (t === 1) return 1;
        return 1 - Math.pow(2, -10 * t);
    }
    return t;
}

function baseThreshold(row: number, col: number, rows: number, columns: number, direction: string) {
    const rowNorm = rows <= 1 ? 0.5 : row / (rows - 1);
    const colNorm = columns <= 1 ? 0.5 : col / (columns - 1);
    if (direction === "top-bottom") return rowNorm;
    if (direction === "bottom-top") return 1 - rowNorm;
    if (direction === "left-right") return colNorm;
    if (direction === "right-left") return 1 - colNorm;
    const cx = 0.5;
    const cy = 0.5;
    const dx = colNorm - cx;
    const dy = rowNorm - cy;
    const distance = Math.sqrt(dx * dx + dy * dy) / Math.sqrt(0.5 * 0.5 + 0.5 * 0.5);
    const normalized = clamp(distance, 0, 1);
    if (direction === "center-out") return normalized;
    return 1 - normalized;
}

function patternShift(row: number, col: number, rows: number, columns: number, pattern: string, rand: () => number) {
    if (pattern === "random") {
        return (rand() - 0.5) * 1.6;
    }
    const rowNorm = rows <= 1 ? 0.5 : row / (rows - 1);
    const colNorm = columns <= 1 ? 0.5 : col / (columns - 1);
    if (pattern === "checker") {
        return (row + col) % 2 === 0 ? -0.2 : 0.2;
    }
    if (pattern === "diagonal") {
        return ((rowNorm + colNorm) * 0.5 - 0.5) * 0.75;
    }
    if (pattern === "wave") {
        return Math.sin(colNorm * Math.PI * 3 + rowNorm * Math.PI * 1.4) * 0.24;
    }
    const dx = colNorm - 0.5;
    const dy = rowNorm - 0.5;
    const radialDistance = Math.sqrt(dx * dx + dy * dy) / Math.sqrt(0.5 * 0.5 + 0.5 * 0.5);
    if (pattern === "radial") {
        return (radialDistance - 0.5) * 0.8;
    }
    const angle = (Math.atan2(dy, dx) + Math.PI) / (Math.PI * 2);
    const spiral = (angle + radialDistance * 1.15) % 1 - 0.5;
    return spiral * 0.6;
}

function buildPixels(width: number, height: number, pixelSize: number, gap: number, direction: string, pattern: string, seed: number, jitter: number, accentShare: number) {
    const safePixelSize = clamp(pixelSize, 2, 240);
    const safeGap = Math.max(0, gap);
    const safeColumns = Math.max(1, Math.ceil((Math.max(1, width) + safeGap) / (safePixelSize + safeGap)));
    const safeRows = Math.max(1, Math.ceil((Math.max(1, height) + safeGap) / (safePixelSize + safeGap)));
    const derivedSeed = Math.floor(seed) + Math.floor(width) * 13 + Math.floor(height) * 29 + safeRows * 43 + safeColumns * 59;
    const rand = mulberry32(derivedSeed);
    const cells = [];
    const safeJitter = clamp(jitter, 0, 1);
    const safeAccentShare = clamp(accentShare, 0, 0.6);
    for (let row = 0; row < safeRows; row++) {
        for (let col = 0; col < safeColumns; col++) {
            const base = baseThreshold(row, col, safeRows, safeColumns, direction);
            const shift = patternShift(row, col, safeRows, safeColumns, pattern, rand);
            const noise = (rand() - 0.5) * safeJitter * 0.65;
            const threshold = clamp(base + shift * 0.5 + noise, 0, 1);
            cells.push({
                id: `${row}-${col}`,
                left: col * (safePixelSize + safeGap),
                top: row * (safePixelSize + safeGap),
                width: safePixelSize,
                height: safePixelSize,
                threshold,
                accent: rand() < safeAccentShare,
                accentIndex: Math.floor(rand() * 4)
            });
        }
    }
    return cells;
}

function getPixelPhase(pixel: any, progress: number, feather: number) {
    const edge = clamp(feather, 0.001, 0.35);
    const delta = progress - pixel.threshold;
    if (delta <= -edge) return "from";
    if (delta >= edge) return "to";
    if (!pixel.accent) {
        return delta >= 0 ? "to" : "from";
    }
    return "accent";
}

export interface PixelScrollTransitionProps {
    pixelSize?: number;
    gap?: number;
    endAt?: number;
    direction?: "top-bottom" | "bottom-top" | "left-right" | "right-left" | "center-out" | "center-in";
    pattern?: "random" | "checker" | "diagonal" | "wave" | "spiral" | "radial";
    easing?: "linear" | "ease-in" | "ease-out" | "ease-in-out" | "expo-out";
    revealMode?: "colors" | "two-layer";
    layerAImage?: string;
    layerBImage?: string;
    fromColor?: string;
    toColor?: string;
    accentShare?: number;
    accentColorA?: string;
    accentColorB?: string;
    accentColorC?: string;
    accentColorD?: string;
    jitter?: number;
    feather?: number;
    smoothing?: number;
    seed?: number;
}

export default function PixelScrollTransition(props: PixelScrollTransitionProps) {
    const {
        pixelSize = 18,
        gap = 1,
        endAt = 1,
        direction = "top-bottom",
        pattern = "random",
        easing = "linear",
        revealMode = "colors",
        layerAImage = "",
        layerBImage = "",
        fromColor = "#111111",
        toColor = "#f4f4f4",
        accentShare = 0.16,
        accentColorA = "#00D1FF",
        accentColorB = "#FFE047",
        accentColorC = "#FF4D6D",
        accentColorD = "#7CFF6B",
        jitter = 0.28,
        feather = 0.07,
        smoothing = 0.4,
        seed = 13
    } = props;
    
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [size, setSize] = React.useState({ width: 1, height: 1 });
    const [progress, setProgress] = React.useState(0);
    
    React.useLayoutEffect(() => {
        if (!containerRef.current) return;
        const node = containerRef.current;
        const measure = () => {
            const rect = node.getBoundingClientRect();
            setSize({ width: Math.max(1, rect.width), height: Math.max(1, rect.height) });
        };
        measure();
        if (typeof ResizeObserver === "undefined") {
            window.addEventListener("resize", measure);
            return () => window.removeEventListener("resize", measure);
        }
        const observer = new ResizeObserver(measure);
        observer.observe(node);
        return () => observer.disconnect();
    }, []);
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: SCROLL_OFFSET as any
    });
    
    const springConfig = React.useMemo(() => {
        const smooth = clamp(smoothing, 0, 1);
        return { stiffness: 320 - smooth * 240, damping: 22 + smooth * 22, mass: 0.25 + smooth * 0.6 };
    }, [smoothing]);
    
    const smoothProgress = useSpring(scrollYProgress, springConfig);
    const safeEndAt = React.useMemo(() => clamp(endAt, 0.05, 1), [endAt]);
    
    useMotionValueEvent(smoothProgress, "change", (value) => {
        const normalized = clamp(value / safeEndAt, 0, 1);
        setProgress(applyEasing(normalized, easing));
    });
    
    const pixels = React.useMemo(() => buildPixels(size.width, size.height, pixelSize, gap, direction, pattern, seed, jitter, accentShare), [size.width, size.height, pixelSize, gap, direction, pattern, seed, jitter, accentShare]);
    const accents = React.useMemo(() => [accentColorA, accentColorB, accentColorC, accentColorD], [accentColorA, accentColorB, accentColorC, accentColorD]);
    
    const isTwoLayer = revealMode === "two-layer";
    const useLayerImages = isTwoLayer && layerAImage.trim().length > 0 && layerBImage.trim().length > 0;
    
    return (
        <div
            ref={containerRef}
            style={{
                width: "100%",
                height: "100%",
                position: "relative",
                overflow: "hidden",
                pointerEvents: "none",
                backgroundColor: fromColor,
                backgroundImage: useLayerImages ? `url(${layerAImage})` : undefined,
                backgroundSize: useLayerImages ? `${size.width}px ${size.height}px` : undefined,
                backgroundPosition: useLayerImages ? "0px 0px" : undefined,
                backgroundRepeat: useLayerImages ? "no-repeat" : undefined
            }}
        >
            {pixels.map(pixel => {
                const phase = getPixelPhase(pixel, progress, feather);
                const style: React.CSSProperties = {
                    position: "absolute",
                    left: pixel.left,
                    top: pixel.top,
                    width: pixel.width,
                    height: pixel.height,
                    transition: "background-color 120ms linear"
                };
                if (phase === "accent") {
                    style.backgroundColor = accents[pixel.accentIndex % accents.length];
                } else if (phase === "to") {
                    if (useLayerImages) {
                        style.backgroundImage = `url(${layerBImage})`;
                        style.backgroundSize = `${size.width}px ${size.height}px`;
                        style.backgroundPosition = `-${pixel.left}px -${pixel.top}px`;
                        style.backgroundRepeat = "no-repeat";
                    } else {
                        style.backgroundColor = toColor;
                    }
                } else if (isTwoLayer) {
                    style.backgroundColor = "transparent";
                } else {
                    style.backgroundColor = fromColor;
                }
                return <div key={pixel.id} style={style} />;
            })}
        </div>
    );
}
