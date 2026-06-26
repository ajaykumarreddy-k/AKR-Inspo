import { useEffect, useRef, useMemo } from "react";
import {
  Scene,
  OrthographicCamera,
  WebGLRenderer,
  ShaderMaterial,
  TextureLoader,
  Vector3,
  PlaneGeometry,
  Mesh,
  MeshBasicMaterial,
  DoubleSide,
  Raycaster,
  Vector2,
  type Texture,
} from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { resolveTokenColor } from "../lib/colorUtils";

function createPlaceholderTexture(
  width: number,
  height: number,
  type: "main" | "shadow"
): string {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "#000000";
  ctx.font = `bold ${Math.floor(height * 0.1)}px "Google Sans", Inter, system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("3D Rug Effect", width / 2, height / 2 - height * 0.06);

  ctx.font = `${Math.floor(height * 0.04)}px "Google Sans", Inter, system-ui, sans-serif`;
  ctx.fillStyle = "#000000";
  ctx.fillText("Move mouse to interact", width / 2, height / 2 + height * 0.08);

  if (type === "shadow") {
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(0, 0, width, height);
  }

  return canvas.toDataURL("image/png");
}

interface TextureInput {
  src?: string;
}

interface ThreeDRugEffectProps {
  mainTexture?: TextureInput;
  shadowTexture?: TextureInput;
  orbitEnabled?: boolean;
  zoom?: number;
  rotXDeg?: number;
  rotYDeg?: number;
  rotZDeg?: number;
  displacementRadius?: number;
  displacementHeight?: number;
  backgroundColor?: string;
}

const PLACEHOLDER_W = 1024;
const PLACEHOLDER_H = 1024;
const BASE_FRUSTUM = 20;

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

export default function ThreeDRugEffect(props: ThreeDRugEffectProps) {
  const {
    mainTexture,
    shadowTexture,
    orbitEnabled = false,
    zoom = 1.5,
    rotXDeg = -90,
    rotYDeg = 0,
    rotZDeg = 90,
    displacementRadius = 3,
    displacementHeight = 1,
    backgroundColor = "transparent",
  } = props;

  const resolvedBackgroundColor = resolveTokenColor(backgroundColor);

  const placeholderMain = useMemo(
    () => createPlaceholderTexture(PLACEHOLDER_W, PLACEHOLDER_H, "main"),
    []
  );
  const placeholderShadow = useMemo(
    () => createPlaceholderTexture(PLACEHOLDER_W, PLACEHOLDER_H, "shadow"),
    []
  );

  const mainTextureUrl = mainTexture?.src || placeholderMain;
  const shadowTextureUrl = shadowTexture?.src || placeholderShadow;

  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef(0);
  const cameraRef = useRef<OrthographicCamera | null>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const mainPlaneRef = useRef<Mesh | null>(null);
  const shadowPlaneRef = useRef<Mesh | null>(null);
  const sceneRef = useRef<Scene | null>(null);
  const shaderRef = useRef<ShaderMaterial | null>(null);
  const shadowShaderRef = useRef<ShaderMaterial | null>(null);
  const sizeRef = useRef({ width: 0, height: 0, aspect: 1 });
  const zoomRef = useRef(zoom);
  zoomRef.current = zoom;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const w = container.clientWidth || container.offsetWidth || 1;
    const h = container.clientHeight || container.offsetHeight || 1;
    const initialAspect = w / h;
    sizeRef.current = { width: w, height: h, aspect: initialAspect };

    const scene = new Scene();
    sceneRef.current = scene;

    const frustumSize = BASE_FRUSTUM / zoomRef.current;
    const camera = new OrthographicCamera(
      (frustumSize * initialAspect) / -2,
      (frustumSize * initialAspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      0.1,
      1000
    );
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new WebGLRenderer({
      antialias: true,
      alpha: true,
      premultipliedAlpha: false,
    });
    renderer.setSize(w, h, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const canvas = renderer.domElement;
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);
    rendererRef.current = renderer;

    const textureLoader = new TextureLoader();

    const applyAspect = (texture: Texture) => {
      try {
        const img = texture?.image as HTMLImageElement | undefined;
        if (!img || !img.width || !img.height) return;
        const texAspect = img.width / img.height;
        const sx = texAspect >= 1 ? texAspect : 1;
        const sy = texAspect >= 1 ? 1 : 1 / texAspect;
        mainPlaneRef.current?.scale.set(sx, sy, 1);
        shadowPlaneRef.current?.scale.set(sx, sy, 1);
        const hit = sceneRef.current?.children.find(
          (c) => c.name === "hit"
        ) as Mesh | undefined;
        hit?.scale.set(sx, sy, 1);
      } catch {
        /* ignore */
      }
    };

    const mainTex = textureLoader.load(mainTextureUrl, (t: Texture) => {
      t.needsUpdate = true;
      applyAspect(t);
    });

    const shadowTex = textureLoader.load(shadowTextureUrl, (t: Texture) => {
      t.needsUpdate = true;
    });

    const mainShader = new ShaderMaterial({
      uniforms: {
        uTexture: { value: mainTex },
        uDisplacement: { value: new Vector3(0, 0, 0) },
        uRadius: { value: displacementRadius },
        uHeight: { value: displacementHeight },
      },
      vertexShader: `
        varying vec2 vUv;
        uniform vec3 uDisplacement;
        uniform float uRadius;
        uniform float uHeight;
        float easeInOutCubic(float x) {
            return x < 0.5 ? 4.0 * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 3.0) / 2.0;
        }
        float map(float value, float min1, float max1, float min2, float max2) {
            return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
        }
        void main() {
            vUv = uv;
            vec3 newPosition = position;
            vec4 localPosition = vec4(position, 1.0);
            vec4 worldPosition = modelMatrix * localPosition;
            float dist = length(uDisplacement - worldPosition.xyz);
            if (dist < uRadius) {
                float distanceMapped = map(dist, 0.0, uRadius, 1.0, 0.0);
                float val = easeInOutCubic(distanceMapped) * uHeight;
                newPosition.z += val;
            }
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D uTexture;
        void main() {
            vec4 color = texture2D(uTexture, vUv);
            gl_FragColor = vec4(color);
        }
      `,
      transparent: true,
      depthWrite: false,
      side: DoubleSide,
    });

    const shadowShader = new ShaderMaterial({
      uniforms: {
        uTexture: { value: shadowTex },
        uDisplacement: { value: new Vector3(0, 0, 0) },
        uRadius: { value: displacementRadius },
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vDist;
        uniform vec3 uDisplacement;
        void main() {
            vUv = uv;
            vec4 localPosition = vec4(position, 1.0);
            vec4 worldPosition = modelMatrix * localPosition;
            vDist = length(uDisplacement - worldPosition.xyz);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying float vDist;
        uniform sampler2D uTexture;
        uniform float uRadius;
        float map(float value, float min1, float max1, float min2, float max2) {
            return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
        }
        void main() {
            vec4 color = texture2D(uTexture, vUv);
            if (vDist < uRadius) {
                float alpha = map(vDist, uRadius, 0.0, color.a, 0.0);
                color.a = alpha;
            }
            gl_FragColor = vec4(color);
        }
      `,
      transparent: true,
      depthWrite: false,
      side: DoubleSide,
    });

    shaderRef.current = mainShader;
    shadowShaderRef.current = shadowShader;

    const geometry = new PlaneGeometry(15, 15, 100, 100);
    const mainPlane = new Mesh(geometry, mainShader);
    const shadowPlane = new Mesh(geometry, shadowShader);
    mainPlane.position.set(0, 0, 0);
    shadowPlane.position.set(0, 0, -0.01);
    scene.add(mainPlane);
    scene.add(shadowPlane);
    mainPlaneRef.current = mainPlane;
    shadowPlaneRef.current = shadowPlane;

    if (mainTex?.image && (mainTex.image as HTMLImageElement).width) {
      applyAspect(mainTex);
    }

    const rx = toRad(rotXDeg);
    const ry = toRad(rotYDeg);
    const rz = toRad(rotZDeg);
    mainPlane.rotation.set(rx, ry, rz);
    shadowPlane.rotation.set(rx, ry, rz);

    const hitGeom = new PlaneGeometry(15, 15);
    const hitMat = new MeshBasicMaterial({ visible: false });
    const hitPlane = new Mesh(hitGeom, hitMat);
    hitPlane.name = "hit";
    hitPlane.position.set(0, 0, 0);
    hitPlane.rotation.set(rx, ry, rz);
    scene.add(hitPlane);

    const raycaster = new Raycaster();
    const pointer = new Vector2();

    const onPointerMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObject(hitPlane);
      if (hits.length > 0 && hits[0]) {
        const p = hits[0].point;
        const mainUniforms = mainShader.uniforms;
        const shadowUniforms = shadowShader.uniforms;
        if (mainUniforms.uDisplacement && shadowUniforms.uDisplacement) {
          mainUniforms.uDisplacement.value.copy(p);
          shadowUniforms.uDisplacement.value.copy(p);
        }
      }
    };

    container.addEventListener("mousemove", onPointerMove);

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      controlsRef.current?.update();
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const cw = container.clientWidth;
      const ch = container.clientHeight;
      const ca = cw / ch;
      const fs = BASE_FRUSTUM / zoomRef.current;
      camera.left = (fs * ca) / -2;
      camera.right = (fs * ca) / 2;
      camera.top = fs / 2;
      camera.bottom = fs / -2;
      camera.updateProjectionMatrix();
      renderer.setSize(cw, ch, false);
      renderer.setViewport(0, 0, cw, ch);
    };

    window.addEventListener("resize", onResize);

    return () => {
      container.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animFrameRef.current);
      controlsRef.current?.dispose();
      controlsRef.current = null;
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      rendererRef.current = null;
      cameraRef.current = null;
      mainPlaneRef.current = null;
      shadowPlaneRef.current = null;
      sceneRef.current = null;
      shaderRef.current = null;
      shadowShaderRef.current = null;
    };
  }, [mainTextureUrl, shadowTextureUrl]);

  useEffect(() => {
    const camera = cameraRef.current;
    const mp = mainPlaneRef.current;
    const sp = shadowPlaneRef.current;
    const renderer = rendererRef.current;

    if (camera) {
      const fs = BASE_FRUSTUM / zoom;
      const container = containerRef.current;
      if (container) {
        const a = container.clientWidth / container.clientHeight;
        camera.left = (fs * a) / -2;
        camera.right = (fs * a) / 2;
        camera.top = fs / 2;
        camera.bottom = fs / -2;
        camera.updateProjectionMatrix();
      }
    }

    if (mp && sp) {
      const rx = toRad(rotXDeg);
      const ry = toRad(rotYDeg);
      const rz = toRad(rotZDeg);
      mp.rotation.set(rx, ry, rz);
      sp.rotation.set(rx, ry, rz);
      const hit = sceneRef.current?.children.find(
        (c) => c.name === "hit"
      ) as Mesh | undefined;
      hit?.rotation.set(rx, ry, rz);
    }

    if (renderer && camera) {
      if (orbitEnabled && !controlsRef.current) {
        controlsRef.current = new OrbitControls(camera, renderer.domElement);
        controlsRef.current.enableDamping = true;
      } else if (!orbitEnabled && controlsRef.current) {
        controlsRef.current.dispose();
        controlsRef.current = null;
      }
    }
  }, [zoom, rotXDeg, rotYDeg, rotZDeg, orbitEnabled]);

  useEffect(() => {
    const s = shaderRef.current;
    const ss = shadowShaderRef.current;
    if (s?.uniforms) {
      (s.uniforms.uRadius as { value: number }).value = displacementRadius;
      (s.uniforms.uHeight as { value: number }).value = displacementHeight;
    }
    if (ss?.uniforms) {
      (ss.uniforms.uRadius as { value: number }).value = displacementRadius;
    }
  }, [displacementRadius, displacementHeight]);

  useEffect(() => {
    const onResize = () => {
      const r = rendererRef.current;
      const c = containerRef.current;
      if (!r || !c) return;
      const w = c.clientWidth || c.offsetWidth || 1;
      const h = c.clientHeight || c.offsetHeight || 1;
      const ar = w / h;
      if (Math.abs(sizeRef.current.aspect - ar) > 0.001) {
        sizeRef.current = { width: w, height: h, aspect: ar };
        r.setSize(w, h);
        const cam = cameraRef.current;
        if (cam) {
          const fs = BASE_FRUSTUM / zoom;
          cam.left = (fs * ar) / -2;
          cam.right = (fs * ar) / 2;
          cam.top = fs / 2;
          cam.bottom = fs / -2;
          cam.updateProjectionMatrix();
        }
      }
    };

    onResize();
    const ro = new ResizeObserver(onResize);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [zoom]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        background: resolvedBackgroundColor,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          display: "block",
          margin: 0,
          padding: 0,
          background: resolvedBackgroundColor,
        }}
      />
    </div>
  );
}
