import {
  cloneElement,
  type ReactNode,
  useEffect,
  useRef,
} from "react";
import { createRoot } from "react-dom/client";
import { useAnimationFrame } from "../hooks/useAnimationFrame";
import { mapLinear } from "../utils/math";
import { createPRNG } from "../utils/prng";

declare global {
  interface Window {
    __EXPLODING_ROOTS__?: Array<{ unmount?: () => void }>;
  }
}

interface Direction {
  horizontal: "left" | "center" | "right";
  vertical: "top" | "center" | "bottom";
}

interface ScaleConfig {
  value: number;
  randomize: boolean;
  randomVariation: number;
}

interface RotationConfig {
  value: number;
  animate: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  scale: number;
  rotate: number;
  opacity: number;
  vx: number;
  vy: number;
  gravity: number;
  birthTime: number;
  lifeMs: number;
  contentIdx: number;
  scaleStart: number;
  scaleEnd: number;
  rotateStart: number;
  rotateEnd: number;
  element: HTMLDivElement;
  isDead: boolean;
  reactRoot?: ReturnType<typeof createRoot>;
}

export interface ExplodingInputProps {
  mode?: "components" | "images";
  content?: ReactNode[];
  images?: Array<{ src: string }>;
  itemCount?: number;
  itemWidth?: number;
  itemHeight?: number;
  count?: number;
  direction?: Direction;
  gravity?: number;
  duration?: number;
  scale?: ScaleConfig;
  rotation?: RotationConfig;
  style?: React.CSSProperties;
}

const IMAGE_PARTICLE_SIZE = 40;
const COMPONENT_PARTICLE_SIZE = 32;
const FALLBACK_SIZE = 16;

export default function ExplodingInput({
  mode = "components",
  content = [],
  images = [],
  itemCount = 4,
  itemWidth = IMAGE_PARTICLE_SIZE,
  itemHeight = IMAGE_PARTICLE_SIZE,
  count = 1,
  direction = { horizontal: "center", vertical: "top" },
  gravity = 900,
  duration = 1.2,
  scale = { value: 1, randomize: false, randomVariation: 0 },
  rotation = { value: 0, animate: false },
  style,
}: ExplodingInputProps) {
  const particleIdCounter = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const particleContainerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const randRef = useRef<() => number>(() => Math.random());
  const inputRef = useRef<HTMLInputElement | null>(null);

  const actualImages = images.slice(0, itemCount);
  const actualContent = mode === "images" ? actualImages : content;
  const actualCount = mode === "images" ? actualImages.length : content.length;

  useEffect(() => {
    const timeBits = (Date.now() & 4294967295) >>> 0;
    const extra = Math.floor(Math.random() * 4294967295) >>> 0;
    const seed = (timeBits ^ extra) >>> 0;
    randRef.current = createPRNG(seed);

    const w = window;
    if (!w.__EXPLODING_ROOTS__) w.__EXPLODING_ROOTS__ = [];

    try {
      for (const root of w.__EXPLODING_ROOTS__) {
        try { root.unmount?.(); } catch { }
      }
    } finally {
      w.__EXPLODING_ROOTS__ = [];
    }

    document.querySelectorAll('[data-exploding-particle="true"]').forEach((el) => {
      el.parentNode?.removeChild(el);
    });

    return () => {
      particlesRef.current.forEach((p) => {
        try { p.reactRoot?.unmount(); } catch { }
        if (p.element && p.element.parentNode) {
          p.element.parentNode.removeChild(p.element);
        }
      });
      particlesRef.current = [];
    };
  }, []);

  const getInputSpawnPosition = (input: HTMLInputElement) => {
    const container = containerRef.current;
    if (!container || !input) return null;

    const inputRect = input.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const inputValue = input.value;

    const getTextWidth = (text: string, el: HTMLInputElement) => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (!context) return 0;
      const computedStyle = window.getComputedStyle(el);
      context.font = `${computedStyle.fontSize} ${computedStyle.fontFamily}`;
      return context.measureText(text).width;
    };

    let x = 0;
    if (inputValue.length > 0) {
      const textWidth = getTextWidth(inputValue, input);
      const inputStartX = inputRect.left - containerRect.left;
      const computedStyle = window.getComputedStyle(input);
      const paddingRight = parseInt(computedStyle.paddingRight, 10);
      const maxX = inputStartX + inputRect.width - paddingRight;
      x = Math.min(textWidth + inputStartX, maxX);
    } else {
      x = inputRect.left - containerRect.left;
    }

    const y = inputRect.top - containerRect.top + inputRect.height / 2;
    return { x, y };
  };

  const createParticlesAtPosition = (x: number, y: number) => {
    const spawnOne = () => {
      const horizontalValue =
        direction.horizontal === "left"
          ? -0.4
          : direction.horizontal === "right"
            ? 0.4
            : 0;
      const baseVx = mapLinear(horizontalValue, -1, 1, -800, 800);
      const spreadVx = mapLinear(1, 0, 1, 0, 300);
      const vx = baseVx + (randRef.current() * 2 - 1) * spreadVx;

      const verticalValue =
        direction.vertical === "top"
          ? -0.7
          : direction.vertical === "bottom"
            ? 0.7
            : 0;
      const baseVy = mapLinear(verticalValue, -1, 1, -800, 800);
      const spreadVy = mapLinear(1, 0, 1, 0, 300);
      const vy = baseVy + (randRef.current() * 2 - 1) * spreadVy;

      particleIdCounter.current += 1;
      const randBetween = (min: number, max: number) =>
        min + randRef.current() * (max - min);

      const baseScale = scale.value ?? 1;
      let particleScale = baseScale;
      if (scale.randomize && scale.randomVariation !== undefined && scale.randomVariation > 0) {
        const variation = (scale.randomVariation / 100) * baseScale;
        particleScale = randBetween(baseScale - variation, baseScale + variation);
      }
      const safeScale = Math.max(0.1, Math.min(4, particleScale));

      const baseRotation = rotation.value ?? 0;
      let initRot = baseRotation;
      let endRot = baseRotation;
      if (rotation.animate) {
        initRot = randBetween(-180, 180);
        const rotationDelta = randBetween(-360, 360);
        endRot = initRot + rotationDelta;
      }

      const el = document.createElement("div");
      el.setAttribute("data-exploding-particle", "true");
      el.style.position = "absolute";
      el.style.left = "0";
      el.style.top = "0";
      el.style.width =
        mode === "images" ? `${itemWidth}px` : `${COMPONENT_PARTICLE_SIZE}px`;
      el.style.height =
        mode === "images" ? `${itemHeight}px` : `${COMPONENT_PARTICLE_SIZE}px`;
      el.style.display = "flex";
      el.style.alignItems = "center";
      el.style.justifyContent = "center";
      el.style.pointerEvents = "none";
      el.style.willChange = "transform, opacity";
      el.style.transformOrigin = "50% 50%";
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${safeScale}) rotate(${initRot}deg)`;
      el.style.opacity = "1";

      let reactRoot: ReturnType<typeof createRoot> | undefined;

      if (actualContent && actualContent.length > 0) {
        const contentIdx =
          (particleIdCounter.current - 1) % actualContent.length;
        const contentElement = actualContent[contentIdx];

        if (contentElement) {
          if (mode === "images" && (contentElement as { src: string }).src) {
            const img = document.createElement("img");
            img.src = (contentElement as { src: string }).src;
            img.style.width = "100%";
            img.style.height = "100%";
            img.style.objectFit = "cover";
            el.appendChild(img);
          } else {
            const tempDiv = document.createElement("div");
            tempDiv.style.width = "100%";
            tempDiv.style.height = "100%";
            el.appendChild(tempDiv);

            const root = createRoot(tempDiv);
            window.__EXPLODING_ROOTS__?.push(root);
            root.render(
              cloneElement(contentElement as React.ReactElement<{ style?: React.CSSProperties }>, {
                style: {
                  ...((contentElement as React.ReactElement<{ style?: React.CSSProperties }>)?.props?.style ?? {}),
                  transform: "none",
                  scale: "none",
                  rotate: "none",
                  translate: "none",
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "100%",
                  height: "100%",
                },
              })
            );
            reactRoot = root;
          }
        }
      } else {
        const fallback = document.createElement("div");
        fallback.style.width = `${FALLBACK_SIZE}px`;
        fallback.style.height = `${FALLBACK_SIZE}px`;
        fallback.style.borderRadius = "6px";
        fallback.style.backgroundColor = "#6366f1";
        el.appendChild(fallback);
      }

      if (particleContainerRef.current) {
        particleContainerRef.current.appendChild(el);
      }

      const newParticle: Particle = {
        id: particleIdCounter.current,
        x,
        y,
        scale: safeScale,
        rotate: initRot,
        opacity: 1,
        vx,
        vy,
        gravity: mapLinear(
          Math.max(-1, Math.min(1, gravity ?? 0.45)),
          -1,
          1,
          -2000,
          2000
        ),
        birthTime: performance.now(),
        lifeMs: duration * 1000,
        contentIdx:
          actualContent.length > 0
            ? (particleIdCounter.current - 1) % actualContent.length
            : -1,
        scaleStart: safeScale,
        scaleEnd: safeScale,
        rotateStart: initRot,
        rotateEnd: endRot,
        element: el,
        isDead: false,
        reactRoot,
      };

      particlesRef.current.push(newParticle);

      setTimeout(() => {
        newParticle.isDead = true;
        try { newParticle.reactRoot?.unmount(); } catch { }
        const w = window;
        if (w.__EXPLODING_ROOTS__) {
          w.__EXPLODING_ROOTS__ = w.__EXPLODING_ROOTS__.filter(
            (r) => r !== newParticle.reactRoot
          );
        }
        if (newParticle.element && newParticle.element.parentNode) {
          newParticle.element.parentNode.removeChild(newParticle.element);
        }
        particlesRef.current = particlesRef.current.filter(
          (p) => p.id !== newParticle.id
        );
      }, duration * 1000);
    };

    const particlesToSpawn = Math.max(1, Math.min(5, Math.round(count)));
    for (let i = 0; i < particlesToSpawn; i++) spawnOne();
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const label = container.closest("label");
    if (!label) return;

    const input = label.querySelector<HTMLInputElement>("input");
    if (!input) return;

    inputRef.current = input;

    const handleInput = () => {
      const pos = getInputSpawnPosition(input);
      if (pos) {
        createParticlesAtPosition(pos.x, pos.y);
      }
    };

    input.addEventListener("input", handleInput);
    return () => {
      input.removeEventListener("input", handleInput);
      inputRef.current = null;
    };
  }, [
    direction,
    gravity,
    duration,
    content,
    count,
    scale,
    rotation,
    mode,
    itemWidth,
    itemHeight,
    images,
  ]);

  const updateParticles = (_time: number, delta: number) => {
    const dtMs = delta ? Math.min(32, delta) : 16;
    const dt = dtMs / 1000;
    const now = performance.now();

    particlesRef.current.forEach((p) => {
      if (p.isDead) return;
      const age = now - p.birthTime;
      if (!p.element) return;
      if (age >= p.lifeMs) return;
      const progress = age / p.lifeMs;

      p.vy = p.vy + p.gravity * dt;
      p.x = p.x + p.vx * dt;
      p.y = p.y + p.vy * dt;

      p.scale = mapLinear(progress, 0, 1, p.scaleStart, p.scaleEnd);
      p.rotate = mapLinear(progress, 0, 1, p.rotateStart, p.rotateEnd);

      const fadeStart = 0.7;
      p.opacity =
        progress > fadeStart
          ? mapLinear(progress, fadeStart, 1, 1, 0)
          : 1;

      if (isNaN(p.x) || isNaN(p.y) || isNaN(p.scale)) return;

      const clampedScale = Math.max(0.1, Math.min(3, p.scale));
      const transformValue = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%) scale(${clampedScale}) rotate(${p.rotate}deg)`;
      p.element.style.transform = transformValue;
      p.element.style.opacity = String(p.opacity);
    });
  };

  useAnimationFrame(updateParticles, true);

  return (
    <div
      ref={containerRef}
      style={{
        ...style,
        position: "relative",
        width: "0px",
        height: "0px",
        overflow: "visible",
        backgroundColor: "transparent",
        transform: "translateZ(0)",
        transformStyle: "flat",
      }}
    >
      <div
        ref={particleContainerRef}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
