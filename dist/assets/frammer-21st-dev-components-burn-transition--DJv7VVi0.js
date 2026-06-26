import"./modulepreload-polyfill-B5Qt9EMX.js";import{r as o,j as i,c as Rr}from"./client-DXEJ18IH.js";const xr=/var\s*\(\s*(--[\w-]+)(?:\s*,\s*((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*))?\s*\)/;function Ke(s){if(!s||!s.startsWith("var("))return s;const R=xr.exec(s);if(!R)return s;const _=(R[2]||"").trim();return _.startsWith("var(")?Ke(_):_||s}function Y(s){return typeof s!="string"||!s.startsWith("var(")?s:Ke(s)}function ce(s){if(!s||s.trim()==="")return{r:0,g:0,b:0,a:1};const R=s.trim(),_=R.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)/i);if(_){const f=Math.max(0,Math.min(255,parseFloat(_[1])))/255,w=Math.max(0,Math.min(255,parseFloat(_[2])))/255,C=Math.max(0,Math.min(255,parseFloat(_[3])))/255,M=_[4]!==void 0?Math.max(0,Math.min(1,parseFloat(_[4]))):1;return{r:f,g:w,b:C,a:M}}const d=R.replace(/^#/,"");if(d.length===8)return{r:parseInt(d.slice(0,2),16)/255,g:parseInt(d.slice(2,4),16)/255,b:parseInt(d.slice(4,6),16)/255,a:parseInt(d.slice(6,8),16)/255};if(d.length===6)return{r:parseInt(d.slice(0,2),16)/255,g:parseInt(d.slice(2,4),16)/255,b:parseInt(d.slice(4,6),16)/255,a:1};if(d.length===4){const f=d;return{r:parseInt(f[0]+f[0],16)/255,g:parseInt(f[1]+f[1],16)/255,b:parseInt(f[2]+f[2],16)/255,a:parseInt(f[3]+f[3],16)/255}}if(d.length===3){const f=d;return{r:parseInt(f[0]+f[0],16)/255,g:parseInt(f[1]+f[1],16)/255,b:parseInt(f[2]+f[2],16)/255,a:1}}return{r:0,g:0,b:0,a:1}}function P(s,R,_,d,f){const w=(s-R)/(_-R);return d+w*(f-d)}function ke(s){return P(Math.max(0,Math.min(1,s)),0,1,1,20)}function He(s){return P(Math.max(0,Math.min(1,s)),0,1,0,.5)}function We(s){return P(Math.max(0,Math.min(1,s)),0,1,0,.01)}function Ye(s){return P(Math.max(0,Math.min(1,s)),0,1,0,.1)}function Ve(s){return P(Math.max(0,Math.min(1,s)),0,1,.01,.2)}function qe(s){return P(Math.max(0,Math.min(1,s)),0,1,0,.3)}function ue({preview:s=!1,color:R="#D9D6CA",transitionColor:_,noiseScale:d=.37,noiseIntensity:f=.3,scrollSensitivity:w=.01,baseAnimationSpeed:C=.1,edgeSoftness:M=.4,bloomIntensity:le=.5,bloomRadius:fe=.5,parallaxEnabled:de=!1,style:Je,movement:l={horizontal:"center",vertical:.5}}){const Qe=ke(d),Ze=He(f),$e=We(w),er=Ye(C),rr=Ve(M),tr=0,nr=qe(fe),or=(l==null?void 0:l.horizontal)==="left"?1:(l==null?void 0:l.horizontal)==="right"?-1:0,Ae=Y(R),me=ce(Ae),ir=_?Y(_):Ae,he=ce(ir),_e=o.useRef(null),V=o.useRef(null),h=o.useRef(null),x=o.useRef(null),L=o.useRef(null),be=o.useRef([me.r,me.g,me.b]),q=o.useRef([he.r,he.g,he.b]),Fe=o.useRef(Qe),Se=o.useRef(Ze),we=o.useRef($e),Le=o.useRef(er),Be=o.useRef(rr),sr=o.useRef(tr),Ue=o.useRef(or),Ie=o.useRef((l==null?void 0:l.vertical)??.5),ye=o.useRef(0),ge=o.useRef(0),K=o.useRef(0),ar=o.useRef(0),J=o.useRef(null),je=o.useRef(0),N=o.useRef(0),Q=o.useRef(s),Re=o.useRef(de),Ne=o.useRef(0),De=o.useRef(100),xe=o.useRef(0),v=o.useRef({width:0,height:0}),pe=o.useRef(le),Pe=o.useRef(nr),O=o.useRef(null),D=o.useRef(null),z=o.useRef(null),G=o.useRef(null),F=o.useRef(null),X=o.useRef(null),B=o.useRef(null),k=o.useRef(null),U=o.useRef(null),H=o.useRef(null),I=o.useRef(null),ve=o.useRef(2),W=(t,n,e)=>{const r=t.createShader(n);return r?(t.shaderSource(r,e),t.compileShader(r),t.getShaderParameter(r,t.COMPILE_STATUS)?r:(console.error("Shader error:",t.getShaderInfoLog(r)),t.deleteShader(r),null)):null},Z=(t,n,e)=>{const r=t.createProgram();return r?(t.attachShader(r,n),t.attachShader(r,e),t.linkProgram(r),t.getProgramParameter(r,t.LINK_STATUS)?r:(console.error("Program error:",t.getProgramInfoLog(r)),t.deleteProgram(r),null)):null},$=(t,n,e)=>{const r=t.createTexture();if(!r)return{framebuffer:null,texture:null};t.bindTexture(t.TEXTURE_2D,r),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,n,e,0,t.RGBA,t.UNSIGNED_BYTE,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const a=t.createFramebuffer();return a?(t.bindFramebuffer(t.FRAMEBUFFER,a),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,r,0),t.bindFramebuffer(t.FRAMEBUFFER,null),{framebuffer:a,texture:r}):{framebuffer:null,texture:r}},Ce=()=>{const t=_e.current,n=V.current,e=h.current;if(!t||!n||!e)return;const r=n.getBoundingClientRect(),a=Math.min(window.devicePixelRatio||1,2),c=Math.floor(r.width*a),m=Math.floor(r.height*a);if(t.width===c&&t.height===m)return;t.width=c,t.height=m,v.current={width:c,height:m},e.viewport(0,0,t.width,t.height);const g=ve.current,b=Math.floor(c/g),p=Math.floor(m/g);F.current&&(e.bindTexture(e.TEXTURE_2D,F.current),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,c,m,0,e.RGBA,e.UNSIGNED_BYTE,null)),B.current&&(e.bindTexture(e.TEXTURE_2D,B.current),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,b,p,0,e.RGBA,e.UNSIGNED_BYTE,null)),U.current&&(e.bindTexture(e.TEXTURE_2D,U.current),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,b,p,0,e.RGBA,e.UNSIGNED_BYTE,null)),I.current&&(e.bindTexture(e.TEXTURE_2D,I.current),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,b,p,0,e.RGBA,e.UNSIGNED_BYTE,null)),e.bindTexture(e.TEXTURE_2D,null)},Me=t=>{const n=h.current,e=x.current,r=L.current;if(!n||!e||!r)return;n.bindFramebuffer(n.FRAMEBUFFER,t),n.viewport(0,0,v.current.width,v.current.height),n.useProgram(e),n.bindBuffer(n.ARRAY_BUFFER,r);const a=n.getAttribLocation(e,"a_position");n.enableVertexAttribArray(a),n.vertexAttribPointer(a,2,n.FLOAT,!1,0,0);const c=n.getUniformLocation(e,"u_color"),[m,g,b]=be.current;n.uniform3f(c,m,g,b);const p=n.getUniformLocation(e,"u_transition_color");{const[S,j,ae]=q.current;n.uniform3f(p,S,j,ae)}const A=n.getUniformLocation(e,"u_noise_scale");n.uniform1f(A,Fe.current);const T=n.getUniformLocation(e,"u_noise_intensity");n.uniform1f(T,Se.current);const y=performance.now();if(N.current===0&&(N.current=y),Q.current){const S=(y-N.current)/1e3;je.current=S*Le.current}const ee=n.getUniformLocation(e,"u_scroll_offset");ee&&n.uniform1f(ee,je.current+ye.current);const re=n.getUniformLocation(e,"u_edge_softness");re&&n.uniform1f(re,Be.current);const te=n.getUniformLocation(e,"u_grain_scale");te&&n.uniform1f(te,sr.current);const ne=n.getUniformLocation(e,"u_movement_horizontal");ne&&n.uniform1f(ne,Ue.current);const oe=n.getUniformLocation(e,"u_movement_vertical");oe&&n.uniform1f(oe,Ie.current);const ie=n.getUniformLocation(e,"u_parallax_offset");ie&&n.uniform1f(ie,xe.current);const se=n.getUniformLocation(e,"u_aspect_ratio");if(se){const S=v.current.width,j=v.current.height;n.uniform1f(se,j>0?S/j:1)}n.clearColor(0,0,0,0),n.clear(n.COLOR_BUFFER_BIT),n.enable(n.BLEND),n.blendFunc(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA),n.drawArrays(n.TRIANGLE_STRIP,0,4)},cr=(t,n)=>{const e=h.current,r=O.current,a=L.current;if(!e||!r||!a)return;e.bindFramebuffer(e.FRAMEBUFFER,n);const c=ve.current,m=Math.floor(v.current.width/c),g=Math.floor(v.current.height/c);e.viewport(0,0,m,g),e.useProgram(r),e.bindBuffer(e.ARRAY_BUFFER,a);const b=e.getAttribLocation(r,"a_position");e.enableVertexAttribArray(b),e.vertexAttribPointer(b,2,e.FLOAT,!1,0,0),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,t),e.uniform1i(e.getUniformLocation(r,"u_texture"),0);{const[p,A,T]=q.current;e.uniform3f(e.getUniformLocation(r,"u_transition_color"),p,A,T)}{const[p,A,T]=be.current;e.uniform3f(e.getUniformLocation(r,"u_base_color"),p,A,T)}e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.disable(e.BLEND),e.drawArrays(e.TRIANGLE_STRIP,0,4)},Oe=(t,n,e)=>{const r=h.current,a=D.current,c=L.current;if(!r||!a||!c)return;r.bindFramebuffer(r.FRAMEBUFFER,n);const m=ve.current,g=Math.floor(v.current.width/m),b=Math.floor(v.current.height/m);r.viewport(0,0,g,b),r.useProgram(a),r.bindBuffer(r.ARRAY_BUFFER,c);const p=r.getAttribLocation(a,"a_position");r.enableVertexAttribArray(p),r.vertexAttribPointer(p,2,r.FLOAT,!1,0,0),r.activeTexture(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,t),r.uniform1i(r.getUniformLocation(a,"u_texture"),0),r.uniform2f(r.getUniformLocation(a,"u_direction"),e[0],e[1]),r.uniform2f(r.getUniformLocation(a,"u_resolution"),g,b),r.uniform1f(r.getUniformLocation(a,"u_radius"),Pe.current),r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT),r.disable(r.BLEND),r.drawArrays(r.TRIANGLE_STRIP,0,4)},ur=(t,n)=>{const e=h.current,r=z.current,a=L.current;if(!e||!r||!a)return;e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,v.current.width,v.current.height),e.useProgram(r),e.bindBuffer(e.ARRAY_BUFFER,a);const c=e.getAttribLocation(r,"a_position");e.enableVertexAttribArray(c),e.vertexAttribPointer(c,2,e.FLOAT,!1,0,0),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,t),e.uniform1i(e.getUniformLocation(r,"u_scene"),0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,n),e.uniform1i(e.getUniformLocation(r,"u_bloom"),1),e.uniform1f(e.getUniformLocation(r,"u_bloom_intensity"),pe.current);{const[m,g,b]=q.current;e.uniform3f(e.getUniformLocation(r,"u_transition_color"),m,g,b)}e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.disable(e.BLEND),e.drawArrays(e.TRIANGLE_STRIP,0,4),e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA)},E=()=>{if(!h.current||!x.current)return;pe.current>0&&G.current&&F.current&&k.current&&U.current&&H.current&&I.current&&D.current&&z.current&&O.current&&X.current&&B.current?(Me(G.current),cr(F.current,X.current),Oe(B.current,k.current,[1,0]),Oe(U.current,H.current,[0,1]),ur(F.current,I.current)):Me(null)},Ee=()=>{const t=V.current;if(!t)return;if(!Re.current){xe.current=0;return}const n=t.getBoundingClientRect(),e=window.innerHeight,r=n.top,a=n.bottom;let c=0;r>=e?c=1:a<=0?c=0:(c=1-(e-r)/(e+lr(n)),c=Math.max(0,Math.min(1,c)));const m=Ne.current/100,g=De.current/100,b=m+(g-m)*(1-c);xe.current=b-.5},lr=t=>t.height;o.useEffect(()=>{Q.current=s,s&&N.current>0&&(N.current=performance.now())},[s]),o.useEffect(()=>{const t=Y(R),n=ce(t);be.current=[n.r,n.g,n.b],h.current&&x.current&&E()},[R]),o.useEffect(()=>{const t=Y(_||R),n=ce(t);q.current=[n.r,n.g,n.b],h.current&&x.current&&E()},[_,R]),o.useEffect(()=>{Fe.current=ke(d),h.current&&x.current&&E()},[d]),o.useEffect(()=>{Se.current=He(f),h.current&&x.current&&E()},[f]),o.useEffect(()=>{we.current=We(w)},[w]),o.useEffect(()=>{Le.current=Ye(C)},[C]),o.useEffect(()=>{Be.current=Ve(M),h.current&&x.current&&E()},[M]),o.useEffect(()=>{const t=(l==null?void 0:l.horizontal)==="left"?1:(l==null?void 0:l.horizontal)==="right"?-1:0;Ue.current=t,h.current&&x.current&&E()},[l==null?void 0:l.horizontal]),o.useEffect(()=>{Ie.current=(l==null?void 0:l.vertical)??.5,h.current&&x.current&&E()},[l==null?void 0:l.vertical]),o.useEffect(()=>{Re.current=de,Ne.current=0,De.current=100,Ee()},[de]),o.useEffect(()=>{pe.current=le},[le]),o.useEffect(()=>{Pe.current=qe(fe),h.current&&D.current&&E()},[fe]),o.useEffect(()=>{h.current&&x.current&&E()},[s]);const fr=`
    attribute vec2 a_position;
    varying vec2 v_uv;
    void main() {
      v_uv = 0.5 * (a_position + 1.0);
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `,dr=`
    precision mediump float;
    varying vec2 v_uv;
    uniform vec3 u_color;
    uniform vec3 u_transition_color;
    uniform float u_noise_scale;
    uniform float u_noise_intensity;
    uniform float u_scroll_offset;
    uniform float u_edge_softness;
    uniform float u_grain_scale;
    uniform float u_movement_horizontal;
    uniform float u_movement_vertical;
    uniform float u_parallax_offset;
    uniform float u_aspect_ratio;

    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    float fbm(vec2 st) {
      float value = 0.0;
      float amplitude = 0.5;
      for (int i = 0; i < 4; i++) {
        value += amplitude * noise(st);
        st *= 2.0;
        amplitude *= 0.5;
      }
      return value;
    }

    float detailedNoise(vec2 st) {
      float value = 0.0;
      float amplitude = 0.5;
      for (int i = 0; i < 6; i++) {
        value += amplitude * noise(st);
        st *= 2.2;
        amplitude *= 0.45;
      }
      return value;
    }

    void main() {
      float baseLine = 0.5 + u_parallax_offset;
      float horizontalOffset = u_scroll_offset * u_movement_horizontal;
      float verticalOffset = u_scroll_offset * u_movement_vertical;

      vec2 noiseCoord = vec2(
        v_uv.x * u_aspect_ratio * u_noise_scale + horizontalOffset,
        v_uv.y * 3.0 + verticalOffset * 0.6
      );
      float edgeNoise = fbm(noiseCoord);
      float mainEdge = baseLine + (edgeNoise - 0.5) * u_noise_intensity;

      vec2 thicknessNoiseCoord = vec2(
        v_uv.x * u_aspect_ratio * u_noise_scale * 2.3 + horizontalOffset * 0.7,
        v_uv.y * 2.0 + verticalOffset * 0.4 + 100.0
      );
      float thicknessNoise = fbm(thicknessNoiseCoord);
      float minThickness = u_edge_softness * 0.1;
      float maxThickness = u_edge_softness;
      float localThickness = mix(minThickness, maxThickness, thicknessNoise);

      float lowerBound = mainEdge - localThickness * 0.4;
      float upperBound = mainEdge + localThickness * 0.6;

      vec2 grainCoord = vec2(
        v_uv.x * u_aspect_ratio * u_grain_scale * 3.0 + horizontalOffset * 0.5,
        v_uv.y * u_grain_scale * 3.0 + verticalOffset * 0.3
      );
      float grain = detailedNoise(grainCoord);

      vec2 fiberCoord = vec2(
        v_uv.x * u_aspect_ratio * u_grain_scale * 8.0 + horizontalOffset * 0.3,
        v_uv.y * u_grain_scale * 2.0 + verticalOffset * 0.2
      );
      float fiberNoise = noise(fiberCoord);

      float combinedGrain = grain * 0.6 + fiberNoise * 0.4;

      if (v_uv.y < lowerBound) {
        gl_FragColor = vec4(u_color, 1.0);
      } else if (v_uv.y < mainEdge) {
        float t = (v_uv.y - lowerBound) / max(mainEdge - lowerBound, 0.001);
        float grainThreshold = 1.0 - pow(t, 1.5);
        grainThreshold -= thicknessNoise * 0.2;
        if (combinedGrain > grainThreshold) {
          gl_FragColor = vec4(u_transition_color, 1.0);
        } else {
          gl_FragColor = vec4(u_color, 1.0);
        }
      } else if (v_uv.y < upperBound) {
        float t = (v_uv.y - mainEdge) / max(upperBound - mainEdge, 0.001);
        float grainThreshold = pow(t, 1.2);
        grainThreshold += thicknessNoise * 0.15;
        if (combinedGrain > grainThreshold) {
          gl_FragColor = vec4(u_transition_color, 1.0);
        } else {
          discard;
        }
      } else {
        discard;
      }
    }
  `,mr=`
    precision mediump float;
    varying vec2 v_uv;
    uniform sampler2D u_texture;
    uniform vec3 u_transition_color;
    uniform vec3 u_base_color;

    void main() {
      vec4 pixel = texture2D(u_texture, v_uv);
      float distToTransition = length(pixel.rgb - u_transition_color);
      float distToBase = length(pixel.rgb - u_base_color);
      float isTransition = 1.0 - smoothstep(0.0, 0.5, distToTransition);
      float notBase = smoothstep(0.0, 0.3, distToBase);
      float mask = isTransition * notBase * pixel.a;
      mask = pow(mask, 0.8);
      gl_FragColor = vec4(1.0, 1.0, 1.0, mask);
    }
  `,hr=`
    precision mediump float;
    varying vec2 v_uv;
    uniform sampler2D u_texture;
    uniform vec2 u_direction;
    uniform vec2 u_resolution;
    uniform float u_radius;

    void main() {
      float blur_size = u_radius * 12.0;
      float alpha = 0.0;
      float totalWeight = 0.0;

      for (int i = -6; i <= 6; i++) {
        float offset = float(i);
        float weight = exp(-0.5 * (offset * offset) / 4.0);
        vec2 sampleOffset = u_direction * (offset * blur_size) / u_resolution;
        float sampleAlpha = texture2D(u_texture, v_uv + sampleOffset).a;
        alpha += sampleAlpha * weight;
        totalWeight += weight;
      }

      alpha = totalWeight > 0.0 ? alpha / totalWeight : 0.0;
      gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
    }
  `,_r=`
    precision mediump float;
    varying vec2 v_uv;
    uniform sampler2D u_scene;
    uniform sampler2D u_bloom;
    uniform float u_bloom_intensity;
    uniform vec3 u_transition_color;

    void main() {
      vec4 scene = texture2D(u_scene, v_uv);
      vec4 bloom = texture2D(u_bloom, v_uv);

      float bloomStrength = bloom.a * u_bloom_intensity;
      vec3 bloomColor = u_transition_color * bloomStrength * 2.0;

      if (scene.a < 0.001) {
        float glowAlpha = bloomStrength * 1.5;
        gl_FragColor = vec4(u_transition_color, glowAlpha);
      } else {
        vec3 result = scene.rgb + bloomColor;
        result = min(result, vec3(1.0));
        gl_FragColor = vec4(result, scene.a);
      }
    }
  `;o.useEffect(()=>{const t=_e.current,n=V.current;if(!t||!n)return;const e=t.getContext("webgl",{alpha:!0,premultipliedAlpha:!1});if(!e){console.error("WebGL not supported");return}h.current=e;const r=W(e,e.VERTEX_SHADER,fr),a=W(e,e.FRAGMENT_SHADER,dr);if(!r||!a)return;const c=Z(e,r,a);if(!c)return;x.current=c;const m=W(e,e.FRAGMENT_SHADER,mr);if(m){const u=Z(e,r,m);u&&(O.current=u)}const g=W(e,e.FRAGMENT_SHADER,hr);if(g){const u=Z(e,r,g);u&&(D.current=u)}const b=W(e,e.FRAGMENT_SHADER,_r);if(b){const u=Z(e,r,b);u&&(z.current=u)}const p=new Float32Array([-1,-1,1,-1,-1,1,1,1]),A=e.createBuffer();if(!A)return;e.bindBuffer(e.ARRAY_BUFFER,A),e.bufferData(e.ARRAY_BUFFER,p,e.STATIC_DRAW),L.current=A;const T=256,y=256,{framebuffer:ze,texture:ee}=$(e,T,y);G.current=ze,F.current=ee;const{framebuffer:re,texture:te}=$(e,T,y);X.current=re,B.current=te;const{framebuffer:ne,texture:oe}=$(e,T,y);k.current=ne,U.current=oe;const{framebuffer:ie,texture:se}=$(e,T,y);H.current=ie,I.current=se,N.current=performance.now();const S=new ResizeObserver(()=>{Ce()});S.observe(n),Ce(),Ee(),E();const j=()=>{h.current&&x.current&&E(),J.current=requestAnimationFrame(j)};J.current=requestAnimationFrame(j);const ae=()=>{const u=window.scrollY||window.pageYOffset,Ge=performance.now();if(K.current>0&&Q.current){const Te=u-ge.current,Xe=Ge-K.current;Xe>0&&Math.abs(Te)>0&&(ar.current=Te/Xe*1e3,ye.current+=Te*we.current)}ge.current=u,K.current=Ge,(Q.current||Re.current)&&Ee()};return ge.current=window.scrollY||window.pageYOffset,K.current=performance.now(),window.addEventListener("scroll",ae,{passive:!0}),()=>{if(S.disconnect(),window.removeEventListener("scroll",ae),J.current&&cancelAnimationFrame(J.current),h.current){const u=h.current;L.current&&u.deleteBuffer(L.current),x.current&&u.deleteProgram(x.current),O.current&&u.deleteProgram(O.current),D.current&&u.deleteProgram(D.current),z.current&&u.deleteProgram(z.current),G.current&&u.deleteFramebuffer(G.current),F.current&&u.deleteTexture(F.current),X.current&&u.deleteFramebuffer(X.current),B.current&&u.deleteTexture(B.current),k.current&&u.deleteFramebuffer(k.current),U.current&&u.deleteTexture(U.current),H.current&&u.deleteFramebuffer(H.current),I.current&&u.deleteTexture(I.current)}}},[]);const br={...Je,position:"relative",width:"100%",height:"100%",overflow:"hidden"},gr={position:"absolute",inset:0,width:"100%",height:"100%",display:"block"};return i.jsx("div",{ref:V,style:br,children:i.jsx("canvas",{ref:_e,style:gr})})}function pr(){return i.jsxs(i.Fragment,{children:[i.jsxs("section",{className:"hero",children:[i.jsx("div",{className:"burn-wrapper",children:i.jsx(ue,{color:"#4A6FA5",transitionColor:"#7B9FD4",noiseScale:.45,noiseIntensity:.35,edgeSoftness:.5,bloomIntensity:.6,bloomRadius:.4,baseAnimationSpeed:.15,preview:!0,parallaxEnabled:!0,movement:{horizontal:"center",vertical:.6}})}),i.jsxs("h2",{style:{color:"#fff",position:"relative",zIndex:2},children:["Burn",i.jsx("br",{}),"Transition"]}),i.jsx("p",{className:"sub",style:{position:"relative",zIndex:2},children:"WebGL Shader Effect"})]}),i.jsxs("section",{className:"hero",style:{background:"#0a0a0f"},children:[i.jsx("div",{className:"burn-wrapper",children:i.jsx(ue,{color:"#2d1b69",transitionColor:"#b388ff",noiseScale:.3,noiseIntensity:.4,edgeSoftness:.6,bloomIntensity:.8,bloomRadius:.5,baseAnimationSpeed:.12,preview:!0,parallaxEnabled:!0,movement:{horizontal:"left",vertical:.4}})}),i.jsxs("h2",{style:{color:"#fff",position:"relative",zIndex:2},children:["Purple",i.jsx("br",{}),"Haze"]}),i.jsx("p",{className:"sub",style:{position:"relative",zIndex:2},children:"Scroll to reveal"})]}),i.jsxs("section",{className:"hero",style:{background:"#0a0a0f"},children:[i.jsx("div",{className:"burn-wrapper",children:i.jsx(ue,{color:"#1a1a2e",transitionColor:"#e94560",noiseScale:.5,noiseIntensity:.3,edgeSoftness:.4,bloomIntensity:.7,bloomRadius:.3,baseAnimationSpeed:.1,preview:!0,parallaxEnabled:!0,movement:{horizontal:"right",vertical:.5}})}),i.jsxs("h2",{style:{color:"#fff",position:"relative",zIndex:2},children:["Crimson",i.jsx("br",{}),"Edge"]}),i.jsx("p",{className:"sub",style:{position:"relative",zIndex:2},children:"Procedural noise burn"})]}),i.jsxs("section",{className:"hero",style:{background:"#0a0a0f"},children:[i.jsx("div",{className:"burn-wrapper",children:i.jsx(ue,{color:"#0f3460",transitionColor:"#53d8fb",noiseScale:.35,noiseIntensity:.45,edgeSoftness:.5,bloomIntensity:.9,bloomRadius:.6,baseAnimationSpeed:.08,preview:!0,parallaxEnabled:!0,movement:{horizontal:"center",vertical:.7}})}),i.jsxs("h2",{style:{color:"#fff",position:"relative",zIndex:2},children:["Neon",i.jsx("br",{}),"Burn"]}),i.jsx("p",{className:"sub",style:{position:"relative",zIndex:2},children:"Electric transition"})]}),i.jsxs("div",{className:"demo-content",children:[i.jsx("h3",{children:"About Burn Transition"}),i.jsx("p",{children:"A real-time WebGL shader that creates organic, noise-driven burn transitions. The effect uses fractal Brownian motion to generate natural-looking torn edges with uneven transition thickness, fiber-like grain, and optional bloom glow."}),i.jsx("p",{children:"Built from the Framer component — now available as a standalone React component. Customize colors, noise intensity, edge softness, bloom, and animation direction."}),i.jsx("h3",{style:{marginTop:48},children:"Controls"}),i.jsxs("p",{children:[i.jsx("strong",{children:"color"})," — Base fill color",i.jsx("br",{}),i.jsx("strong",{children:"transitionColor"})," — Burn edge color",i.jsx("br",{}),i.jsx("strong",{children:"noiseScale"})," — Noise frequency (0–1)",i.jsx("br",{}),i.jsx("strong",{children:"noiseIntensity"})," — Edge jaggedness (0–1)",i.jsx("br",{}),i.jsx("strong",{children:"edgeSoftness"})," — Transition zone width (0–1)",i.jsx("br",{}),i.jsx("strong",{children:"bloomIntensity"})," — Glow strength (0–1)",i.jsx("br",{}),i.jsx("strong",{children:"bloomRadius"})," — Glow spread (0–1)",i.jsx("br",{}),i.jsx("strong",{children:"preview"})," — Animate continuously on/off",i.jsx("br",{}),i.jsx("strong",{children:"movement.horizontal"})," — left / center / right",i.jsx("br",{}),i.jsx("strong",{children:"movement.vertical"})," — Vertical drift (0–1)",i.jsx("br",{}),i.jsx("strong",{children:"parallaxEnabled"})," — Parallax on scroll"]})]})]})}const vr=Rr.createRoot(document.getElementById("root"));vr.render(i.jsx(pr,{}));
