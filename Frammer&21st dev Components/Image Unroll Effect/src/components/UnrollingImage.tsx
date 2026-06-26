import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type CSSProperties,
} from "react";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  PlaneGeometry,
  Mesh,
  ShaderMaterial,
  Texture,
  Vector4,
  DoubleSide,
  LinearFilter,
} from "three";
import gsap from "gsap";
import { vertexShader, fragmentShader } from "../lib/shaders";
import {
  resolveImageSource,
  mapRollRadiusUiToInternal,
  calculateCameraFov,
  type ImageSource,
} from "../lib/utils";
import { ComponentMessage } from "./ComponentMessage";

const CAMERA_DISTANCE = 400;
const CAMERA_FOV = 70;
const CAMERA_NEAR = 100;
const CAMERA_FAR = 1000;
const PLANE_SEGMENTS = 80;
const CANVAS_SCALE = 1.6;
const INNER_SCALE = 1;

interface AnimationConfig {
  triggerMode: "appear" | "scroll";
  startAlign: "top" | "center" | "bottom";
  animationDuration: number;
  animationDelay: number;
  replay: boolean;
}

interface UnrollingImageProps {
  preview?: boolean;
  image?: ImageSource;
  angle?: number;
  rolls?: number;
  rollRadius?: number;
  animation?: Partial<AnimationConfig>;
  style?: CSSProperties;
}

const defaultAnimation: AnimationConfig = {
  triggerMode: "appear",
  startAlign: "top",
  animationDuration: 1.7,
  animationDelay: 0,
  replay: true,
};

export function UnrollingImage({
  preview = false,
  image,
  angle = 17,
  rolls = 8,
  rollRadius = 0.5,
  animation = {},
  style,
}: UnrollingImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<Scene | null>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const cameraRef = useRef<PerspectiveCamera | null>(null);
  const meshRef = useRef<Mesh | null>(null);
  const zoomProbeRef = useRef<HTMLDivElement>(null);
  const lastSizeRef = useRef({
    width: 0,
    height: 0,
    zoom: 0,
    aspect: 0,
    ts: 0,
  });
  const animationFrameRef = useRef<number | null>(null);
  const isAnimatingRef = useRef(false);
  const scrollTweenRef = useRef<gsap.core.Tween | null>(null);

  const anim: AnimationConfig = { ...defaultAnimation, ...animation };
  const { triggerMode, startAlign, animationDuration, animationDelay, replay } =
    anim;

  const [isInView, setIsInView] = useState(false);
  const [isOutOfView, setIsOutOfView] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [textureLoaded, setTextureLoaded] = useState(false);

  const resolvedImageUrl = resolveImageSource(image);
  const hasContent = !!resolvedImageUrl;

  useEffect(() => {
    setHasTriggered(false);
    setTextureLoaded(false);
  }, []);

  useEffect(() => {
    if (!hasContent) {
      setHasTriggered(false);
      setTextureLoaded(false);
      return;
    }
    setHasTriggered(false);
    setTextureLoaded(false);
    if (meshRef.current?.material) {
      (meshRef.current.material as ShaderMaterial).uniforms.progress.value = 0;
    }
  }, [hasContent, resolvedImageUrl]);

  const renderFrame = useCallback(() => {
    if (
      !rendererRef.current ||
      !sceneRef.current ||
      !cameraRef.current
    )
      return;
    rendererRef.current.render(sceneRef.current, cameraRef.current);
  }, []);

  const startRenderLoop = useCallback(() => {
    isAnimatingRef.current = true;
    if (!animationFrameRef.current) {
      const loop = () => {
        renderFrame();
        if (isAnimatingRef.current) {
          animationFrameRef.current = requestAnimationFrame(loop);
        } else {
          animationFrameRef.current = null;
        }
      };
      animationFrameRef.current = requestAnimationFrame(loop);
    }
  }, [renderFrame]);

  const stopRenderLoop = useCallback(() => {
    isAnimatingRef.current = false;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  const setupScene = useCallback(() => {
    if (!canvasRef.current || !containerRef.current) return null;

    const container = containerRef.current;
    const width = container.clientWidth || container.offsetWidth || 1;
    const height = container.clientHeight || container.offsetHeight || 1;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const canvasWidth = width * CANVAS_SCALE;
    const canvasHeight = height * CANVAS_SCALE;

    const scene = new Scene();
    sceneRef.current = scene;

    const camera = new PerspectiveCamera(
      calculateCameraFov(canvasWidth, canvasHeight, CAMERA_DISTANCE),
      canvasWidth / canvasHeight,
      CAMERA_NEAR,
      CAMERA_FAR
    );
    camera.position.set(0, 0, CAMERA_DISTANCE);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(
      Math.round(canvasWidth * dpr),
      Math.round(canvasHeight * dpr),
      false
    );
    renderer.setPixelRatio(1);
    renderer.sortObjects = false;
    rendererRef.current = renderer;

    canvasRef.current.style.width = `${canvasWidth}px`;
    canvasRef.current.style.height = `${canvasHeight}px`;

    const geometry = new PlaneGeometry(1, 1, PLANE_SEGMENTS, PLANE_SEGMENTS);

    const innerWidth = width * INNER_SCALE;
    const innerHeight = height * INNER_SCALE;

    const angleRadians = (angle * Math.PI) / 180;
    const internalRollRadius = mapRollRadiusUiToInternal(rollRadius);

    const material = new ShaderMaterial({
      side: DoubleSide,
      uniforms: {
        time: { value: 0 },
        progress: { value: 0 },
        angle: { value: angleRadians },
        rolls: { value: rolls },
        rollRadius: { value: internalRollRadius },
        texture1: { value: null },
        resolution: {
          value: new Vector4(innerWidth, innerHeight, 1, 1),
        },
      },
      transparent: true,
      vertexShader,
      fragmentShader,
    });

    const mesh = new Mesh(geometry, material);
    mesh.scale.set(innerWidth, innerHeight, innerWidth / 2);
    mesh.position.set(0, 0, 0);
    meshRef.current = mesh;
    scene.add(mesh);

    return { scene, camera, renderer, mesh };
  }, [angle, rolls, rollRadius]);

  const loadTexture = useCallback(() => {
    if (!resolvedImageUrl || !meshRef.current) {
      setTextureLoaded(false);
      return;
    }

    setTextureLoaded(false);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (!meshRef.current?.material) return;

      const texture = new Texture(img);
      texture.needsUpdate = true;
      texture.minFilter = LinearFilter;

      const material = meshRef.current.material as ShaderMaterial;
      const container = containerRef.current;
      if (!container) return;

      const width = container.clientWidth || 1;
      const height = container.clientHeight || 1;

      const innerWidth = width * INNER_SCALE;
      const innerHeight = height * INNER_SCALE;
      const innerAspect = innerWidth / innerHeight;
      const imageAspect = img.width / img.height;

      let a1: number, a2: number;
      if (innerAspect > imageAspect) {
        a1 = 1;
        a2 = imageAspect / innerAspect;
      } else {
        a1 = innerAspect / imageAspect;
        a2 = 1;
      }

      material.uniforms.resolution.value.set(
        innerWidth,
        innerHeight,
        a1,
        a2
      );
      material.uniforms.texture1.value = texture;
      setTextureLoaded(true);

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    img.onerror = () => {
      console.error("Texture loading error");
      setTextureLoaded(false);
    };

    img.src = resolvedImageUrl;
  }, [resolvedImageUrl]);

  const updateSize = useCallback(
    (width: number, height: number) => {
      if (
        !cameraRef.current ||
        !rendererRef.current ||
        !meshRef.current ||
        !canvasRef.current
      )
        return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const canvasWidth = width * CANVAS_SCALE;
      const canvasHeight = height * CANVAS_SCALE;
      const innerWidth = width * INNER_SCALE;
      const innerHeight = height * INNER_SCALE;

      cameraRef.current.aspect = canvasWidth / canvasHeight;
      cameraRef.current.fov = calculateCameraFov(
        canvasWidth,
        canvasHeight,
        CAMERA_DISTANCE
      );
      cameraRef.current.updateProjectionMatrix();

      rendererRef.current.setSize(
        Math.round(canvasWidth * dpr),
        Math.round(canvasHeight * dpr),
        false
      );

      canvasRef.current.style.width = `${canvasWidth}px`;
      canvasRef.current.style.height = `${canvasHeight}px`;

      meshRef.current.scale.set(innerWidth, innerHeight, innerWidth / 2);

      const material = meshRef.current.material as ShaderMaterial;
      if (material?.uniforms?.resolution) {
        const texture = material.uniforms.texture1?.value as Texture | null;
        if (texture?.image) {
          const innerAspect = innerWidth / innerHeight;
          const imageAspect =
            (texture.image as HTMLImageElement).width /
            (texture.image as HTMLImageElement).height;
          let a1: number, a2: number;
          if (innerAspect > imageAspect) {
            a1 = 1;
            a2 = imageAspect / innerAspect;
          } else {
            a1 = innerAspect / imageAspect;
            a2 = 1;
          }
          material.uniforms.resolution.value.set(
            innerWidth,
            innerHeight,
            a1,
            a2
          );
        } else {
          material.uniforms.resolution.value.set(
            innerWidth,
            innerHeight,
            1,
            1
          );
        }
      }
    },
    []
  );

  useEffect(() => {
    if (!hasContent) {
      stopRenderLoop();
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      if (sceneRef.current) {
        sceneRef.current.clear();
        sceneRef.current = null;
      }
      meshRef.current = null;
      return;
    }

    setupScene();

    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      renderFrame();
    }

    const textureTimeout = setTimeout(() => {
      loadTexture();
    }, 0);

    return () => {
      clearTimeout(textureTimeout);
      stopRenderLoop();
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      if (sceneRef.current) {
        sceneRef.current.clear();
        sceneRef.current = null;
      }
    };
  }, [hasContent, setupScene, loadTexture, stopRenderLoop, renderFrame]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleResize = () => {
      const width = container.clientWidth || container.offsetWidth || 1;
      const height = container.clientHeight || container.offsetHeight || 1;
      const last = lastSizeRef.current;
      const sizeChanged =
        Math.abs(width - last.width) > 1 ||
        Math.abs(height - last.height) > 1;
      if (sizeChanged) {
        last.width = width;
        last.height = height;
        updateSize(width, height);
        renderFrame();
      }
    };

    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    window.addEventListener("resize", handleResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [updateSize, renderFrame]);

  useEffect(() => {
    if (!meshRef.current?.material) return;

    const angleRadians = (angle * Math.PI) / 180;
    const internalRollRadius = mapRollRadiusUiToInternal(rollRadius);
    const material = meshRef.current.material as ShaderMaterial;
    material.uniforms.angle.value = angleRadians;
    material.uniforms.rolls.value = rolls;
    material.uniforms.rollRadius.value = internalRollRadius;
    renderFrame();
  }, [angle, rolls, rollRadius, renderFrame]);

  useEffect(() => {
    if (triggerMode !== "scroll") return;

    let rafId: number | null = null;

    const checkAlignment = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 0;

      let elementPoint: number;
      if (startAlign === "top") {
        elementPoint = rect.top;
      } else if (startAlign === "center") {
        elementPoint = rect.top + rect.height / 2;
      } else {
        elementPoint = rect.bottom;
      }

      const isAligned = elementPoint <= viewportHeight && rect.bottom >= 0;
      setIsInView(isAligned);

      const completelyOutOfView = rect.top > viewportHeight;
      setIsOutOfView(completelyOutOfView);
    };

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(checkAlignment);
    };

    checkAlignment();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", checkAlignment);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkAlignment);
    };
  }, [triggerMode, startAlign]);

  useEffect(() => {
    if (!hasContent || !textureLoaded) return;
    if (triggerMode === "appear" && !hasTriggered) {
      const triggerTimeout = setTimeout(() => {
        setHasTriggered(true);
      }, 10);
      return () => clearTimeout(triggerTimeout);
    }
  }, [triggerMode, hasTriggered, hasContent, textureLoaded]);

  useEffect(() => {
    if (
      triggerMode !== "appear" ||
      !hasTriggered ||
      !textureLoaded ||
      !meshRef.current?.material
    )
      return;

    const material = meshRef.current.material as ShaderMaterial;
    if (!material.uniforms.texture1.value) return;

    const currentProgress = material.uniforms.progress.value as number;
    if (currentProgress >= 1) return;

    startRenderLoop();

    const tween = gsap.to(material.uniforms.progress, {
      value: 1,
      duration: animationDuration,
      ease: "power2.out",
      delay: animationDelay,
      onUpdate: renderFrame,
      onComplete: () => {
        renderFrame();
        stopRenderLoop();
      },
    });

    return () => {
      tween.kill();
      stopRenderLoop();
    };
  }, [
    hasTriggered,
    textureLoaded,
    animationDuration,
    animationDelay,
    triggerMode,
    renderFrame,
    startRenderLoop,
    stopRenderLoop,
  ]);

  useEffect(() => {
    if (
      triggerMode !== "scroll" ||
      !textureLoaded ||
      !meshRef.current?.material
    )
      return;

    const material = meshRef.current.material as ShaderMaterial;
    if (!material.uniforms.texture1.value) return;

    const currentProgress = material.uniforms.progress.value as number;

    if (scrollTweenRef.current) {
      scrollTweenRef.current.kill();
      scrollTweenRef.current = null;
      stopRenderLoop();
    }

    if (isOutOfView) {
      if (replay && currentProgress > 0.01) {
        material.uniforms.progress.value = 0;
        renderFrame();
      }
      return;
    }

    if (isInView && currentProgress < 0.99) {
      startRenderLoop();
      scrollTweenRef.current = gsap.to(material.uniforms.progress, {
        value: 1,
        duration: animationDuration,
        ease: "power2.out",
        onUpdate: renderFrame,
        onComplete: () => {
          renderFrame();
          stopRenderLoop();
          scrollTweenRef.current = null;
        },
      });
    }

    return () => {
      if (scrollTweenRef.current) {
        scrollTweenRef.current.kill();
        scrollTweenRef.current = null;
      }
      stopRenderLoop();
    };
  }, [
    isInView,
    isOutOfView,
    replay,
    textureLoaded,
    animationDuration,
    triggerMode,
    renderFrame,
    startRenderLoop,
    stopRenderLoop,
  ]);

  useEffect(() => {
    if (!meshRef.current?.material) return;

    const material = meshRef.current.material as ShaderMaterial;
    const uniforms = material.uniforms;

    if (preview) {
      uniforms.progress.value = 0;
      startRenderLoop();

      const previewTween = gsap.to(uniforms.progress, {
        value: 1,
        duration: animationDuration,
        ease: "power2.out",
        onUpdate: renderFrame,
        onComplete: () => {
          renderFrame();
          stopRenderLoop();
        },
      });

      return () => {
        previewTween.kill();
        stopRenderLoop();
      };
    }
  }, [
    preview,
    animationDuration,
    renderFrame,
    startRenderLoop,
    stopRenderLoop,
    angle,
    rolls,
    image,
  ]);

  if (!hasContent) {
    return (
      <ComponentMessage
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          minWidth: 0,
          minHeight: 0,
        }}
        title="Unrolling Image"
        subtitle="Add an image to see the unroll effect"
      />
    );
  }

  const offsetPercent = ((CANVAS_SCALE - 1) / 2) * 100;

  return (
    <div
      ref={containerRef}
      style={{
        ...style,
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "visible",
        display: "block",
        margin: 0,
        padding: 0,
      }}
    >
      <div
        ref={zoomProbeRef}
        style={{
          position: "absolute",
          width: 20,
          height: 20,
          opacity: 0,
          pointerEvents: "none",
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: `-${offsetPercent}%`,
          left: `-${offsetPercent}%`,
          display: "block",
        }}
      />
    </div>
  );
}
