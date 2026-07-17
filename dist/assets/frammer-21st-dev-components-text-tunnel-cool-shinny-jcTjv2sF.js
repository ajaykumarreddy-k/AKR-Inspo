import"./modulepreload-polyfill-B5Qt9EMX.js";import{r as c,j as x,c as te}from"./client-7KslO7uF.js";import{W as re,c as ne,O as oe,e as ae,g as le,f as ie,m as se,n as ue}from"./three.module-CDbiUPI8.js";function ce(L){const b={...{text:`WebGL
Text Tunnel
//// // //`,font:{fontFamily:'"Times New Roman", Times, serif',variant:"400",fontSize:80,letterSpacing:0,textAlign:"center",lineHeight:"1.2em"},textColor:"#FFFFFF",backgroundColor:"#000000",gap:300,scrollSpeed:20,stretchY:50,stretchX:30,falloff:50,bloom:30,chromaticStrength:25,style:{}},...L},{text:F,font:n,textColor:E,backgroundColor:Y,scrollSpeed:he,stretchY:P,stretchX:j,gap:M,falloff:G,bloom:O,chromaticStrength:D,style:K}=b,T=c.useRef(null),R=c.useRef(null),h=c.useRef(null),p=c.useRef(b),[W,N]=c.useState({width:0,height:0}),[A,J]=c.useState(!1),B=c.useRef(W),d=!1;c.useEffect(()=>{p.current=b},[b]);const $=e=>{if(e==null)return 60;if(typeof e=="number")return e;const t=parseFloat(e);if(isNaN(t))return 60;const r=String(e).toLowerCase();return r.includes("px")?t:r.includes("em")||r.includes("rem")?t*16:t},Q=(e,t)=>{if(e==null)return t*1.2;if(typeof e=="number")return e>5?e:e*t;const r=parseFloat(e);if(isNaN(r))return t*1.2;const o=String(e).toLowerCase();return o.includes("px")?r:o.includes("%")?r/100*t:(o.includes("em"),r*t)},I=$(n==null?void 0:n.fontSize),X=Q(n==null?void 0:n.lineHeight,I),U=(n==null?void 0:n.fontFamily)||"Inter",z=(n==null?void 0:n.fontWeight)||(n==null?void 0:n.variant)||"400",_=$((n==null?void 0:n.letterSpacing)||0),y=(n==null?void 0:n.textAlign)||"center";return c.useEffect(()=>{let e,t,r,o,a;return(async()=>{var i,s;if(!R.current||d)return;e=new re({antialias:!0,alpha:!0});const C=((i=T.current)==null?void 0:i.offsetWidth)||400,w=((s=T.current)==null?void 0:s.offsetHeight)||600;e.setSize(C,w),N({width:C,height:w}),e.setPixelRatio(Math.min(window.devicePixelRatio,2)),R.current.innerHTML="",R.current.appendChild(e.domElement),t=new ne,r=new oe(-1,1,1,-1,0,1),o=new ae({uniforms:{uTexture:{value:null},uGlowTexture:{value:null},uTime:{value:0},uStretchY:{value:0},uStretchX:{value:0},uChroma:{value:0},uCurvature:{value:0},uFalloff:{value:0},uBloom:{value:0},uRepeatY:{value:1},uAspect:{value:1}},vertexShader:`
                    varying vec2 vUv;
                    void main() { vUv = uv; gl_Position = vec4(position, 1.0); }
                `,fragmentShader:`
                    precision highp float;
                    uniform sampler2D uTexture;
                    uniform sampler2D uGlowTexture;
                    uniform float uTime, uStretchY, uStretchX, uChroma, uFalloff, uBloom, uRepeatY, uAspect;
                    varying vec2 vUv;

                    void main() {
                        vec2 uv = vUv;
                        float relY = uv.y - 0.5;

                        // 1. FALLOFF MASK
                        float centerPower = mix(1.2, 12.0, uFalloff / 100.0);
                        float mask = clamp(pow(abs(relY) * 2.0, centerPower), 0.0, 1.0);

                        // 2. STRETCH X
                        float xExpansion = 1.0 + mask * (uStretchX / 100.0) * 10.0;
                        float warpedX = ((uv.x - 0.5) / xExpansion) + 0.5;

                        // 4. STRETCH Y
                        float depth = mask * (uStretchY / 100.0) * 15.0;
                        float warpedY = relY / (1.0 + depth);
                        float texY = mod(warpedY * uRepeatY + uTime + 0.5, 1.0);

                        // 5. CHROMATIC ABERRATION
                        float chroma = (uChroma / 100.0) * 0.05 * mask;
                        vec3 chromaCol = vec3(0.0);
                        float chromaWeightSum = 0.0;
                        const float CSTEPS = 8.0;
                        for (float ci = 0.0; ci < CSTEPS; ci++) {
                            float t = ci / (CSTEPS - 1.0);
                            float offset = (t - 0.5) * chroma * 2.0;
                            float sY = mod((warpedY + offset) * uRepeatY + uTime + 0.5, 1.0);
                            vec3 sCol = texture2D(uTexture, vec2(warpedX, sY)).rgb;
                            float rW = smoothstep(0.5, 0.0, t);
                            float gW = 1.0 - abs(t - 0.5) * 2.0;
                            float bW = smoothstep(0.5, 1.0, t);
                            chromaCol += sCol * vec3(rW, gW, bW);
                            chromaWeightSum += (rW + gW + bW);
                        }
                        vec3 finalCol = chromaCol / max(chromaWeightSum / 3.0, 0.001);

                        // 6. BLOOM
                        float rawBloom = uBloom / 100.0;
                        float bloomIntensity = rawBloom * rawBloom * 0.25;
                        vec3 result = finalCol;

                        if (bloomIntensity > 0.0) {
                            vec2 baseTC = vec2(warpedX, texY);
                            float noise = fract(sin(dot(baseTC, vec2(12.9898, 78.233))) * 43758.5453);
                            vec2 jitter = (vec2(noise) - 0.5) * 0.002 * bloomIntensity;
                            vec3 blurredCol = texture2D(uGlowTexture, baseTC + jitter).rgb;
                            float lum = dot(finalCol, vec3(0.299, 0.587, 0.114));
                            float centerBias = mix(0.4, 1.0, 1.0 - mask);
                            vec3 highlights = finalCol * pow(max(lum, 0.0), 1.1) * bloomIntensity * 22.0 * centerBias;
                            vec3 aura = blurredCol * bloomIntensity * 12.0 * centerBias;
                            result = finalCol + highlights + aura;
                        }

                        gl_FragColor = vec4(result, 1.0);
                    }
                `});const v=new le(new ie(2,2),o);t.add(v),h.current={renderer:e,scene:t,camera:r,material:o,clock:new ue,THREE:se},J(!0);const f=()=>{if(h.current){const{renderer:m,scene:H,camera:S,material:u,clock:g}=h.current,l=u.uniforms;l.uStretchY&&(l.uStretchY.value=p.current.stretchY),l.uStretchX&&(l.uStretchX.value=p.current.stretchX),l.uChroma&&(l.uChroma.value=p.current.chromaticStrength),l.uFalloff&&(l.uFalloff.value=p.current.falloff),l.uBloom&&(l.uBloom.value=p.current.bloom),l.uAspect&&(l.uAspect.value=B.current.width/Math.max(1,B.current.height)),l.uTime&&(l.uTime.value+=g.getDelta()*(p.current.scrollSpeed/100)),m.render(H,S),a=requestAnimationFrame(f)}};f()})(),()=>{a&&cancelAnimationFrame(a),e&&e.dispose()}},[d]),c.useEffect(()=>{if(!T.current||d)return;const e=new ResizeObserver(t=>{for(let r of t){const{width:o,height:a}=r.contentRect;if(N({width:o,height:a}),B.current={width:o,height:a},h.current){const{renderer:k}=h.current;k.setSize(o,a)}}});return e.observe(T.current),()=>e.disconnect()},[d]),c.useEffect(()=>{if(!h.current||d)return;const{width:e,height:t}=W;if(e===0||t===0)return;const{material:r,THREE:o}=h.current,a=r.uniforms;a.uStretchY&&(a.uStretchY.value=P),a.uStretchX&&(a.uStretchX.value=j),a.uChroma&&(a.uChroma.value=D),a.uFalloff&&(a.uFalloff.value=G),a.uBloom&&(a.uBloom.value=O),a.uAspect&&(a.uAspect.value=e/t);const C=(F||"").split(`
`),w=X*C.length,v=Math.max(t,w*2.5,w+M);r.uniforms.uRepeatY.value=t/v;const f=document.createElement("canvas"),i=f.getContext("2d");if(!i)return;const s=1,m=Math.max(e*s,1);f.width=m,f.height=v,i.fillStyle=Y,i.fillRect(-2,-2,m+4,v+4),i.font=`${z} ${I*s}px ${U}, sans-serif`,i.letterSpacing!==void 0&&(i.letterSpacing=`${_*s}px`),i.textAlign=y,i.textBaseline="middle",i.fillStyle=E;const H=m/2+(y==="left"?-m/2+40*s:y==="right"?m/2-40*s:0);C.forEach((V,Z)=>{const ee=(v-w*s)/2+X*s*(Z+.5);i.fillText(V,H,ee)});const S=document.createElement("canvas"),u=S.getContext("2d");u&&(S.width=m,S.height=v,u.filter=`blur(${3*s}px)`,u.globalAlpha=1,u.drawImage(f,0,0),u.filter=`blur(${8*s}px)`,u.globalAlpha=.7,u.drawImage(f,0,0),u.filter=`blur(${20*s}px)`,u.globalAlpha=.4,u.drawImage(f,0,0));const g=new o.CanvasTexture(f);g.minFilter=g.magFilter=o.LinearFilter,g.wrapS=o.ClampToEdgeWrapping,g.wrapT=o.RepeatWrapping,r.uniforms.uTexture.value&&r.uniforms.uTexture.value.dispose(),r.uniforms.uTexture.value=g;const l=new o.CanvasTexture(S);l.minFilter=l.magFilter=o.LinearFilter,l.wrapS=o.ClampToEdgeWrapping,l.wrapT=o.RepeatWrapping,r.uniforms.uGlowTexture.value&&r.uniforms.uGlowTexture.value.dispose(),r.uniforms.uGlowTexture.value=l},[A,F,I,X,U,z,_,y,E,Y,P,D,M,G,O,j,W]),x.jsxs("div",{ref:T,style:{width:"100%",height:"100%",...K,backgroundColor:Y,overflow:"hidden",position:"relative"},children:[x.jsx("div",{ref:R,style:{position:"absolute",inset:0,visibility:A&&!d?"visible":"hidden"}}),(!A||d)&&x.jsx("div",{style:{position:"absolute",inset:0,display:"flex",justifyContent:"center",alignItems:"center",padding:40,zIndex:1},children:x.jsx("span",{style:{...n,color:E,whiteSpace:"pre-wrap",minWidth:"max-content"},children:F})})]})}function fe(){return x.jsx("div",{className:"w-full h-screen bg-black",children:x.jsx(ce,{})})}function q(){te.createRoot(document.getElementById("root")).render(x.jsx(fe,{}))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",q):q();
