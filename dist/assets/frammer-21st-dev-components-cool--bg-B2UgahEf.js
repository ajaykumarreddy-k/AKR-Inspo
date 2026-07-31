import"./modulepreload-polyfill-B5Qt9EMX.js";import{r as C,j as o,c as q}from"./client-BGYRvlF3.js";function Y(){const l=C.useRef(null),_=async r=>{r.preventDefault();try{const f=r.currentTarget,e=new FormData(f),g=e.get("endpoint"),s=new URL(g,location.href),x=e.get("method"),b=await(await fetch(s,{method:x})).json();l.current.value=JSON.stringify(b,null,2)}catch(f){l.current.value=String(f)}};return o.jsxs("div",{className:"mt-8 mx-auto w-full max-w-2xl text-left flex flex-col gap-4",children:[o.jsxs("form",{onSubmit:_,className:"flex items-center gap-2 bg-[#1a1a1a] p-3 rounded-xl font-mono border-2 border-[#fbf0df] transition-colors duration-300 focus-within:border-[#f3d5a3] w-full",children:[o.jsxs("select",{name:"method",className:"bg-[#fbf0df] text-[#1a1a1a] py-1.5 px-3 rounded-lg font-bold text-sm min-w-[0px] appearance-none cursor-pointer hover:bg-[#f3d5a3] transition-colors duration-100",children:[o.jsx("option",{value:"GET",className:"py-1",children:"GET"}),o.jsx("option",{value:"PUT",className:"py-1",children:"PUT"})]}),o.jsx("input",{type:"text",name:"endpoint",defaultValue:"/api/hello",className:"w-full flex-1 bg-transparent border-0 text-[#fbf0df] font-mono text-base py-1.5 px-2 outline-none focus:text-white placeholder-[#fbf0df]/40",placeholder:"/api/hello"}),o.jsx("button",{type:"submit",className:"bg-[#fbf0df] text-[#1a1a1a] border-0 px-5 py-1.5 rounded-lg font-bold transition-all duration-100 hover:bg-[#f3d5a3] hover:-translate-y-px cursor-pointer whitespace-nowrap",children:"Send"})]}),o.jsx("textarea",{ref:l,readOnly:!0,placeholder:"Response will appear here...",className:"w-full min-h-[140px] bg-[#1a1a1a] border-2 border-[#fbf0df] rounded-xl p-3 text-[#fbf0df] font-mono resize-y focus:border-[#f3d5a3] placeholder-[#fbf0df]/40"})]})}const V=`attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`,W=`#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec3 u_colors[8];
// Seven packed vectors + eight colour vectors = 15 fragment uniform vectors,
// one below WebGL1's guaranteed minimum. Macros preserve the public u_* API.
uniform vec4 u_scene;      // resolution.xy, time, colour count
uniform vec4 u_shape;      // scale, intensity, paramA, warp
uniform vec4 u_surface;    // detail, contrast, brightness, saturation
uniform vec4 u_finish;     // hue, vignette, blur, grain
uniform vec4 u_transform;  // seed, rotation, drift, OKLab toggle
uniform vec4 u_space;      // offset.xy, pointer.xy
uniform vec4 u_cursor;

#define u_resolution u_scene.xy
#define u_time u_scene.z
#define u_colorCount u_scene.w
#define u_scale u_shape.x
#define u_intensity u_shape.y
#define u_paramA u_shape.z
#define u_warp u_shape.w
#define u_detail u_surface.x
#define u_contrast u_surface.y
#define u_brightness u_surface.z
#define u_saturation u_surface.w
#define u_hue u_finish.x
#define u_vignette u_finish.y
#define u_blur u_finish.z
#define u_grain u_finish.w
#ifdef GL_FRAGMENT_PRECISION_HIGH
#define u_seed u_transform.x
#else
// Keep hash inputs inside mediump's guaranteed ±2^14 range.
#define u_seed mod(u_transform.x, 31.0)
#endif
#define u_rotate u_transform.y
#define u_drift u_transform.z
#define u_oklab u_transform.w
#define u_offset u_space.xy
#define u_mouse u_space.zw
#define u_cursorPresence u_cursor.x
#define u_cursorEffect u_cursor.y
#define u_cursorStrength u_cursor.z
#define u_cursorRadius u_cursor.w

float hash21(vec2 p) {
#ifndef GL_FRAGMENT_PRECISION_HIGH
  p = mod(p, 31.0);
#endif
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

// Even, un-structured white noise for film grain (Dave Hoskins hash12). The
// multiply hash above is fine for value noise but shows a faint axis-aligned
// mesh at integer fragment coords, which reads as a net over flat areas.
float grainHash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

vec2 hash22(vec2 p) {
#ifndef GL_FRAGMENT_PRECISION_HIGH
  p = mod(p, 31.0);
#endif
  float n = sin(dot(p, vec2(41.0, 289.0)));
  return fract(vec2(15731.743, 7892.321) * n);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x),
    mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x),
    u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(17.0, 9.2);
    a *= 0.5;
  }
  return v;
}

// --- OKLab colour mixing (perceptual), gated by u_oklab -----------------------
vec3 srgbToLinear(vec3 c) {
  return mix(c / 12.92, pow((c + 0.055) / 1.055, vec3(2.4)),
    step(0.04045, c));
}
vec3 linearToSrgb(vec3 c) {
  // max() guards the sRGB branch: out-of-gamut OKLab interpolations can send a
  // channel negative, and pow(negative, …) is NaN which mix()/step() would
  // then propagate. The linear branch clips such channels to 0 downstream.
  return mix(c * 12.92, 1.055 * pow(max(c, vec3(0.0)), vec3(1.0 / 2.4)) - 0.055,
    step(0.0031308, c));
}
vec3 linToOklab(vec3 c) {
  float l = 0.4122214708 * c.r + 0.5363325363 * c.g + 0.0514459929 * c.b;
  float m = 0.2119034982 * c.r + 0.6806995451 * c.g + 0.1073969566 * c.b;
  float s = 0.0883024619 * c.r + 0.2817188376 * c.g + 0.6299787005 * c.b;
  l = pow(max(l, 0.0), 1.0 / 3.0);
  m = pow(max(m, 0.0), 1.0 / 3.0);
  s = pow(max(s, 0.0), 1.0 / 3.0);
  return vec3(
    0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s);
}
vec3 oklabToLin(vec3 c) {
  float l = c.x + 0.3963377774 * c.y + 0.2158037573 * c.z;
  float m = c.x - 0.1055613458 * c.y - 0.0638541728 * c.z;
  float s = c.x - 0.0894841775 * c.y - 1.2914855480 * c.z;
  l = l * l * l; m = m * m * m; s = s * s * s;
  return vec3(
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s);
}
vec3 mixColour(vec3 a, vec3 b, float t) {
  if (u_oklab > 0.5) {
    vec3 la = linToOklab(srgbToLinear(a));
    vec3 lb = linToOklab(srgbToLinear(b));
    return clamp(linearToSrgb(oklabToLin(mix(la, lb, t))), 0.0, 1.0);
  }
  return mix(a, b, t);
}

// Mix through the recipe colours; x is clamped to 0..1. WebGL1 forbids
// dynamic uniform indexing in fragment shaders, hence the constant loop.
vec3 palette(float x) {
  float n = max(u_colorCount - 1.0, 1.0);
  float f = clamp(x, 0.0, 1.0) * n;
  vec3 col = u_colors[0];
  for (int i = 0; i < 7; i++) {
    if (float(i) < n)
      col = mixColour(col, u_colors[i + 1],
        smoothstep(0.0, 1.0, clamp(f - float(i), 0.0, 1.0)));
  }
  return col;
}

vec3 hueRotate(vec3 col, float a) {
  const mat3 toYIQ = mat3(0.299, 0.596, 0.211,
                          0.587, -0.274, -0.523,
                          0.114, -0.322, 0.312);
  const mat3 toRGB = mat3(1.0, 1.0, 1.0,
                          0.956, -0.272, -1.106,
                          0.621, -0.647, 1.703);
  vec3 yiq = toYIQ * col;
  float ca = cos(a), sa = sin(a);
  yiq = vec3(yiq.x, yiq.y * ca - yiq.z * sa, yiq.y * sa + yiq.z * ca);
  return toRGB * yiq;
}

vec3 shade(vec2 uv, vec2 p, float t) {
  float y = uv.y
    + sin(uv.x * (3.0 + u_intensity * 9.0) + t * 0.8) * 0.08
    + (fbm(p * 2.0 + t * 0.1) - 0.5) * u_intensity * 0.6;
  return palette(y);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 screenUv = uv;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy)
    / min(u_resolution.x, u_resolution.y);
  float cursorMask = 0.0;

  // Cursor modes 1–3 are local distortions. Push shifts the same screen-space
  // coordinates before field transforms, so Zoom/Rotate don't change its feel.
  if (u_cursorPresence > 0.001) {
    // u_mouse is normalized to -1..1 in canvas space. Convert it to the same
    // aspect-corrected screen space as p so effects stay under the cursor.
    vec2 cursor = (0.5 * u_mouse * u_resolution.xy)
      / min(u_resolution.x, u_resolution.y);
    vec2 cursorDelta = p - cursor;
    if (u_cursorEffect < 0.5) {
      p += cursor * u_cursorPresence * u_cursorStrength * 0.55;
    } else {
      float cursorDistance = length(cursorDelta);
      vec2 cursorDirection = cursorDelta / max(cursorDistance, 0.0001);
      cursorMask = u_cursorPresence
        * (1.0 - smoothstep(0.0, u_cursorRadius, cursorDistance));
      if (u_cursorEffect < 1.5) {
        p -= cursorDirection * cursorMask * u_cursorStrength * 0.24;
      } else if (u_cursorEffect < 2.5) {
        float cursorAngle = cursorMask * u_cursorStrength * 2.2;
        float cc = cos(cursorAngle), cs = sin(cursorAngle);
        p = cursor + mat2(cc, -cs, cs, cc) * cursorDelta;
      } else if (u_cursorEffect < 3.5) {
        float ripple = sin(
          cursorDistance / max(u_cursorRadius, 0.001) * 18.0 - u_time * 5.0);
        p -= cursorDirection * ripple * cursorMask * u_cursorStrength * 0.07;
      }
    }
  }

  // Keep presets that read uv (rather than p) in the same warped space.
  uv = p * min(u_resolution.x, u_resolution.y) / u_resolution.xy + 0.5;
  p *= u_scale;
  // Field transform: rotate, pan, pointer push, slow drift.
  if (abs(u_rotate) > 0.0001) {
    float cr = cos(u_rotate), sr = sin(u_rotate);
    p = mat2(cr, -sr, sr, cr) * p;
  }
  p += u_offset;
  if (u_drift > 0.0001)
    p += u_drift * vec2(sin(u_time * 0.31), cos(u_time * 0.23));
  // Organic domain warp.
  if (u_warp > 0.0) {
    p += u_warp * (vec2(
      fbm(p * u_detail + u_seed),
      fbm(p * u_detail + vec2(5.2, 1.3))) - 0.5);
  }
  // Shade, with an optional soft 5-tap blur.
  vec3 col;
  if (u_blur > 0.0) {
    float e = u_blur;
    float pe = e * u_scale;
    vec2 uvE = vec2(e) * min(u_resolution.x, u_resolution.y) / u_resolution.xy;
    col  = shade(uv, p, u_time) * 0.36;
    col += shade(uv + vec2(uvE.x, 0.0), p + vec2(pe, 0.0), u_time) * 0.16;
    col += shade(uv - vec2(uvE.x, 0.0), p - vec2(pe, 0.0), u_time) * 0.16;
    col += shade(uv + vec2(0.0, uvE.y), p + vec2(0.0, pe), u_time) * 0.16;
    col += shade(uv - vec2(0.0, uvE.y), p - vec2(0.0, pe), u_time) * 0.16;
  } else {
    col = shade(uv, p, u_time);
  }
  // Post: contrast, saturation, hue, brightness, vignette, grain.
  if (abs(u_contrast - 1.0) > 0.0001)
    col = (col - 0.5) * u_contrast + 0.5;
  if (abs(u_saturation - 1.0) > 0.0001) {
    float luma = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(vec3(luma), col, u_saturation);
  }
  if (abs(u_hue) > 0.0001)
    col = hueRotate(col, u_hue);
  if (abs(u_brightness) > 0.0001)
    col += u_brightness;
  if (u_vignette > 0.0001) {
    float vd = length(screenUv - 0.5) * 1.41421356;
    col *= 1.0 - u_vignette * smoothstep(0.35, 1.0, vd);
  }
  if (u_cursorPresence > 0.001 && u_cursorEffect > 3.5)
    col += (vec3(0.18) + col * 0.12) * cursorMask * u_cursorStrength;
  if (u_grain > 0.0001)
    col += (grainHash(
      gl_FragCoord.xy + vec2(u_seed * 17.0, u_seed * 31.0)) - 0.5) * u_grain;
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`,t={colors:[[.10196078431372549,.0784313725490196,.13725490196078433],[.7176470588235294,.36470588235294116,.4117647058823529],[.9176470588235294,.803921568627451,.7607843137254902],[1,.9607843137254902,.9215686274509803],[1,.9607843137254902,.9215686274509803],[1,.9607843137254902,.9215686274509803],[1,.9607843137254902,.9215686274509803],[1,.9607843137254902,.9215686274509803]],colorCount:4,scale:1.32,intensity:.49,paramA:.84,warp:.006,detail:1.728,contrast:1.077,brightness:.07,saturation:2,hue:2.2689,vignette:0,blur:.04,grain:.35,seed:4984,rotate:3.3685,offsetX:-.13,offsetY:.05,drift:.4,cursorEffect:3,cursorStrength:.54,cursorRadius:.555,oklab:1,timeScale:-.67},v=new WeakMap;function K({className:l}){const _=C.useRef(null);return C.useEffect(()=>{const r=_.current;if(!r)return;const f=v.get(r);f!==void 0&&window.clearTimeout(f),v.delete(r);const e=r.getContext("webgl",{antialias:!1});if(!e)return;const g=(a,u)=>{const i=e.createShader(a);return e.shaderSource(i,u),e.compileShader(i),i},s=e.createProgram(),x=g(e.VERTEX_SHADER,V),A=g(e.FRAGMENT_SHADER,W);e.attachShader(s,x),e.attachShader(s,A),e.linkProgram(s),e.deleteShader(x),e.deleteShader(A),e.useProgram(s);const b=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,b),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),e.STATIC_DRAW);const j=e.getAttribLocation(s,"a_position");e.enableVertexAttribArray(j),e.vertexAttribPointer(j,2,e.FLOAT,!1,0,0);const c={colors:e.getUniformLocation(s,"u_colors"),scene:e.getUniformLocation(s,"u_scene"),shape:e.getUniformLocation(s,"u_shape"),surface:e.getUniformLocation(s,"u_surface"),finish:e.getUniformLocation(s,"u_finish"),transform:e.getUniformLocation(s,"u_transform"),space:e.getUniformLocation(s,"u_space"),cursor:e.getUniformLocation(s,"u_cursor")};e.uniform3fv(c.colors,new Float32Array(t.colors.flat())),e.uniform4f(c.shape,t.scale,t.intensity,t.paramA,t.warp),e.uniform4f(c.surface,t.detail,t.contrast,t.brightness,t.saturation),e.uniform4f(c.finish,t.hue,t.vignette,t.blur,t.grain),e.uniform4f(c.transform,t.seed,t.rotate,t.drift,t.oklab),e.uniform4f(c.cursor,0,t.cursorEffect,t.cursorStrength,t.cursorRadius);let k=0,F=0,P=0,w=0,y=0,L=0,M=r.getBoundingClientRect(),n=0,d=null,R=document.visibilityState==="visible",E=!0,T=!1;const U=performance.now(),B=Math.abs(t.timeScale)>1e-4,z=()=>{const a=Math.min(window.devicePixelRatio||1,2),u=Math.max(1,Math.round(M.width*a)),i=Math.max(1,Math.round(M.height*a)),S=Math.min(1,Math.sqrt(2e6/Math.max(1,u*i))),p=Math.max(1,Math.round(u*S)),h=Math.max(1,Math.round(i*S));(r.width!==p||r.height!==h)&&(r.width=p,r.height=h,e.viewport(0,0,p,h))};function m(){!T&&R&&E&&n===0&&(n=requestAnimationFrame(H))}const N=()=>{M=r.getBoundingClientRect(),z(),m()};window.addEventListener("resize",N);const G=new ResizeObserver(N);G.observe(r);const I=new IntersectionObserver(([a])=>{E=(a==null?void 0:a.isIntersecting)??!0,E?m():n!==0&&(cancelAnimationFrame(n),n=0,d=null)});I.observe(r);const D=()=>{R=document.visibilityState==="visible",R?m():n!==0&&(cancelAnimationFrame(n),n=0,d=null)};document.addEventListener("visibilitychange",D);function H(a){if(n=0,T||!R||!E)return;const u=d===null?0:Math.min((a-d)/1e3,.1);d=a;const i=1-Math.exp(-12*u);w+=(k-w)*i,y+=(F-y)*i,L+=(P-L)*i,z();const S=r.width,p=r.height;e.uniform4f(c.scene,S,p,(a-U)/1e3*t.timeScale,t.colorCount),e.uniform4f(c.space,t.offsetX,t.offsetY,w,y),e.uniform4f(c.cursor,0,t.cursorEffect,t.cursorStrength,t.cursorRadius),e.drawArrays(e.TRIANGLES,0,3);const h=Math.abs(k-w)>.001||Math.abs(F-y)>.001||Math.abs(P-L)>.001;B||h?m():d=null}return m(),()=>{T=!0,cancelAnimationFrame(n),G.disconnect(),I.disconnect(),document.removeEventListener("visibilitychange",D),window.removeEventListener("resize",N),e.deleteBuffer(b),e.deleteProgram(s);const a=window.setTimeout(()=>{var u;v.get(r)===a&&(v.delete(r),(u=e.getExtension("WEBGL_lose_context"))==null||u.loseContext(),r.width=1,r.height=1)},0);v.set(r,a)}},[]),o.jsx("canvas",{ref:_,className:l,style:{display:"block",width:"100%",height:"100%"}})}const X="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='-11.5%20-10.23174%2023%2020.46348'%3e%3ccircle%20cx='0'%20cy='0'%20r='2.05'%20fill='%2361dafb'/%3e%3cg%20stroke='%2361dafb'%20stroke-width='1'%20fill='none'%3e%3cellipse%20rx='11'%20ry='4.2'/%3e%3cellipse%20rx='11'%20ry='4.2'%20transform='rotate(60)'/%3e%3cellipse%20rx='11'%20ry='4.2'%20transform='rotate(120)'/%3e%3c/g%3e%3c/svg%3e";function Q(){return o.jsxs("div",{className:"relative min-h-screen w-full overflow-hidden text-white flex items-center justify-center",children:[o.jsx(K,{className:"fixed inset-0 -z-10 w-full h-full"}),o.jsxs("div",{className:"max-w-7xl mx-auto p-8 text-center relative z-10",children:[o.jsx("div",{className:"flex justify-center items-center gap-8 mb-8",children:o.jsx("img",{src:X,alt:"React Logo",className:"h-24 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa] animate-[spin_20s_linear_infinite]"})}),o.jsx("h1",{className:"text-5xl font-bold my-4 leading-tight",children:"Bun + React"}),o.jsxs("p",{children:["Edit ",o.jsx("code",{className:"bg-[#1a1a1a] px-2 py-1 rounded font-mono",children:"src/App.tsx"})," and save to test HMR"]}),o.jsx(Y,{})]})]})}function O(){q.createRoot(document.getElementById("root")).render(o.jsx(Q,{}))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",O):O();
