import React, { useEffect, useRef, useCallback, useMemo } from "react";
import Matter from "matter-js";

export interface StickerItem {
  src: string;
  alt?: string;
}

export interface PhysicsStickerWallProps {
  images?: StickerItem[];
  background?: string;
  stickerCount?: number;
  stickerSize?: number;
  sizeRandomness?: number;
  gravityStrength?: number;
  restitution?: number;
  friction?: number;
  throwPower?: number;
  borderRadius?: number;
  style?: React.CSSProperties;
  className?: string;
  respawnTrigger?: number;
}

const DEFAULT_IMAGES: StickerItem[] = [
  { src: "/stickers/watermelon.png", alt: "Watermelon Cube" },
  { src: "/stickers/tomato.png", alt: "Tomato Cube" },
  { src: "/stickers/lemon.png", alt: "Lemon Cube" },
  { src: "/stickers/dragonfruit.png", alt: "Dragonfruit Cube" },
  { src: "/stickers/eggplant.png", alt: "Eggplant Cube" },
  { src: "/stickers/banana.png", alt: "Banana Cube" },
  { src: "/stickers/blueberry.png", alt: "Blueberry Cube" },
  { src: "/stickers/orange.png", alt: "Orange Cube" },
];

export const PhysicsStickerWall: React.FC<PhysicsStickerWallProps> = ({
  images = DEFAULT_IMAGES,
  background = "transparent",
  stickerCount = 14,
  stickerSize = 110,
  sizeRandomness = 0.25,
  gravityStrength = 0.9,
  restitution = 0.45,
  friction = 0.25,
  throwPower = 1.2,
  borderRadius = 18,
  style,
  className = "",
  respawnTrigger = 0,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const rafRef = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const boundariesRef = useRef<Matter.Body[]>([]);
  const stickersRef = useRef<Array<{
    body: Matter.Body;
    imageIndex: number;
    width: number;
    height: number;
  }>>([]);

  const loadedImagesRef = useRef<HTMLImageElement[]>([]);
  const dragRef = useRef<{
    body: Matter.Body | null;
    points: Array<{ x: number; y: number; t: number }>;
    isDragging: boolean;
  }>({
    body: null,
    points: [],
    isDragging: false,
  });

  const sizeRef = useRef<{ width: number; height: number; dpr: number }>({
    width: 300,
    height: 300,
    dpr: 1,
  });

  const activeImageSources = useMemo(() => {
    const valid = (images || []).filter((img) => img?.src);
    return valid.length > 0 ? valid : DEFAULT_IMAGES;
  }, [images]);

  const randomInRange = useCallback((min: number, max: number) => {
    return min + Math.random() * (max - min);
  }, []);

  const drawRoundedImage = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      image: HTMLImageElement,
      x: number,
      y: number,
      w: number,
      h: number,
      angle: number,
      radius: number
    ) => {
      const r = Math.max(0, Math.min(radius, Math.min(w, h) / 2));
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(-w / 2 + r, -h / 2);
      ctx.lineTo(w / 2 - r, -h / 2);
      ctx.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
      ctx.lineTo(w / 2, h / 2 - r);
      ctx.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
      ctx.lineTo(-w / 2 + r, h / 2);
      ctx.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
      ctx.lineTo(-w / 2, -h / 2 + r);
      ctx.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(image, -w / 2, -h / 2, w, h);
      ctx.restore();
    },
    []
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!rootRef.current || !canvasRef.current) return;

    const { Engine, Runner, Bodies, Composite, Body, Query, Sleeping, Events } = Matter;
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isDisposed = false;

    // Matter Engine Initialization
    const engine = Engine.create({
      enableSleeping: true,
      positionIterations: 12,
      velocityIterations: 10,
      constraintIterations: 4,
    });

    engine.gravity.x = 0;
    engine.gravity.y = gravityStrength;
    engineRef.current = engine;

    const runner = Runner.create();
    runnerRef.current = runner;

    const setCanvasSize = () => {
      const rect = root.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      const dpr = Math.max(1, window.devicePixelRatio || 1);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      sizeRef.current = { width, height, dpr };
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const rebuildBoundaries = () => {
      const { width, height } = sizeRef.current;
      if (boundariesRef.current.length > 0) {
        Composite.remove(engine.world, boundariesRef.current);
        boundariesRef.current = [];
      }

      const wallThickness = 200;
      // Floor positioned at bottom boundary
      const floor = Bodies.rectangle(
        width / 2,
        height + wallThickness / 2,
        width + wallThickness * 4,
        wallThickness,
        {
          isStatic: true,
          restitution: 0.1,
          friction: 0.85,
        }
      );

      // Left Wall
      const leftWall = Bodies.rectangle(
        -wallThickness / 2,
        height / 2,
        wallThickness,
        height * 4,
        {
          isStatic: true,
          restitution: 0.1,
          friction: 0.85,
        }
      );

      // Right Wall
      const rightWall = Bodies.rectangle(
        width + wallThickness / 2,
        height / 2,
        wallThickness,
        height * 4,
        {
          isStatic: true,
          restitution: 0.1,
          friction: 0.85,
        }
      );

      boundariesRef.current = [floor, leftWall, rightWall];
      Composite.add(engine.world, boundariesRef.current);
    };

    const loadImages = async () => {
      const requests = activeImageSources.map((img) => {
        return new Promise<HTMLImageElement | null>((resolve) => {
          if (!img?.src) {
            resolve(null);
            return;
          }
          const el = new Image();
          el.crossOrigin = "anonymous";
          el.decoding = "async";
          el.onload = () => resolve(el);
          el.onerror = () => resolve(null);
          el.src = img.src;
        });
      });

      const results = await Promise.all(requests);
      loadedImagesRef.current = results.filter((x): x is HTMLImageElement => x !== null);
    };

    const spawnStickers = () => {
      const { width, height } = sizeRef.current;
      const safeCount = Math.max(1, Math.floor(stickerCount));
      const bodies: Array<{
        body: Matter.Body;
        imageIndex: number;
        width: number;
        height: number;
      }> = [];

      const imageCount = Math.max(1, loadedImagesRef.current.length);

      for (let i = 0; i < safeCount; i++) {
        const randomScale = 1 + randomInRange(-sizeRandomness, sizeRandomness);
        const s = Math.max(30, stickerSize * randomScale);
        const aspect = randomInRange(0.9, 1.1);
        const w = s;
        const h = s / aspect;

        // Distribute horizontally across screen width
        const baseX = ((i + 0.5) / safeCount) * width;
        const x = baseX + randomInRange(-width * 0.08, width * 0.08);

        // Spawn staggered above view or dropping near top
        const y = -i * (h * 0.75) - randomInRange(30, 220);
        const angle = randomInRange(-0.4, 0.4);

        const body = Bodies.rectangle(x, y, w, h, {
          restitution,
          friction,
          frictionStatic: Math.min(1, friction + 0.3),
          frictionAir: 0.01 + friction * 0.03,
          slop: 0.05,
          sleepThreshold: 35,
        });

        Body.setAngle(body, angle);
        Sleeping.set(body, false);

        bodies.push({
          body,
          imageIndex: i % imageCount,
          width: w,
          height: h,
        });
      }

      stickersRef.current = bodies;
      Composite.add(
        engine.world,
        bodies.map((s) => s.body)
      );
    };

    const getPointerWorld = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const onPointerDown = (event: PointerEvent) => {
      const pos = getPointerWorld(event);
      const hit = Query.point(
        stickersRef.current.map((s) => s.body),
        pos
      );

      if (hit.length > 0) {
        // Pick the top-most body
        const body = hit[hit.length - 1];
        dragRef.current.body = body;
        dragRef.current.points = [{ ...pos, t: performance.now() }];
        dragRef.current.isDragging = true;
        Sleeping.set(body, false);
        canvas.setPointerCapture(event.pointerId);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const dragBody = dragRef.current.body;
      if (!dragBody) return;

      const pos = getPointerWorld(event);
      const now = performance.now();

      dragRef.current.points.push({ ...pos, t: now });
      if (dragRef.current.points.length > 8) {
        dragRef.current.points.shift();
      }

      const stiffness = 0.25;
      const dx = pos.x - dragBody.position.x;
      const dy = pos.y - dragBody.position.y;

      Body.setVelocity(dragBody, {
        x: dx * stiffness,
        y: dy * stiffness,
      });
      Body.setAngularVelocity(dragBody, 0);
    };

    const onPointerUp = (event: PointerEvent) => {
      const dragBody = dragRef.current.body;
      if (!dragBody) return;

      const points = dragRef.current.points;
      const first = points[0];
      const last = points[points.length - 1];

      if (first && last && last.t > first.t) {
        const dt = last.t - first.t;
        const vx = ((last.x - first.x) / dt) * 16.67 * throwPower;
        const vy = ((last.y - first.y) / dt) * 16.67 * throwPower;

        Body.setVelocity(dragBody, { x: vx, y: vy });
      }

      dragRef.current.body = null;
      dragRef.current.points = [];
      dragRef.current.isDragging = false;

      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }
    };

    const render = () => {
      if (isDisposed) return;
      const { width, height } = sizeRef.current;

      ctx.clearRect(0, 0, width, height);

      if (background && background !== "transparent") {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, width, height);
      }

      const imgs = loadedImagesRef.current;

      stickersRef.current.forEach((sticker, index) => {
        const { body } = sticker;
        const image = imgs[sticker.imageIndex % Math.max(1, imgs.length)] || null;

        if (image) {
          drawRoundedImage(
            ctx,
            image,
            body.position.x,
            body.position.y,
            sticker.width,
            sticker.height,
            body.angle,
            borderRadius
          );
        } else {
          // Fallback stylized block
          ctx.save();
          ctx.translate(body.position.x, body.position.y);
          ctx.rotate(body.angle);
          ctx.fillStyle = index % 2 === 0 ? "#4ADE80" : "#FACC15";
          ctx.beginPath();
          ctx.roundRect(
            -sticker.width / 2,
            -sticker.height / 2,
            sticker.width,
            sticker.height,
            borderRadius
          );
          ctx.fill();
          ctx.restore();
        }
      });

      rafRef.current = window.requestAnimationFrame(render);
    };

    const onBeforeUpdate = () => {
      if (dragRef.current.body) {
        Sleeping.set(dragRef.current.body, false);
      }
    };

    const setup = async () => {
      setCanvasSize();
      rebuildBoundaries();
      await loadImages();

      if (isDisposed) return;

      spawnStickers();
      Events.on(engine, "beforeUpdate", onBeforeUpdate);
      Runner.run(runner, engine);
      rafRef.current = window.requestAnimationFrame(render);
    };

    setup();

    resizeObserverRef.current = new ResizeObserver(() => {
      setCanvasSize();
      rebuildBoundaries();
    });

    resizeObserverRef.current.observe(root);

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerUp);

    return () => {
      isDisposed = true;

      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerUp);

      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null;
      }

      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      Events.off(engine, "beforeUpdate", onBeforeUpdate);
      Runner.stop(runner);
      Composite.clear(engine.world, false);
      Engine.clear(engine);

      boundariesRef.current = [];
      stickersRef.current = [];
      loadedImagesRef.current = [];
      dragRef.current = { body: null, points: [], isDragging: false };
      engineRef.current = null;
      runnerRef.current = null;
    };
  }, [
    activeImageSources,
    background,
    borderRadius,
    friction,
    gravityStrength,
    randomInRange,
    restitution,
    sizeRandomness,
    stickerCount,
    stickerSize,
    throwPower,
    drawRoundedImage,
    respawnTrigger,
  ]);

  return (
    <div
      ref={rootRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        ...style,
      }}
      className={className}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
          touchAction: "none",
          cursor: "grab",
        }}
        role="application"
        aria-label="Physics Sticker Wall Canvas"
      />
    </div>
  );
};
