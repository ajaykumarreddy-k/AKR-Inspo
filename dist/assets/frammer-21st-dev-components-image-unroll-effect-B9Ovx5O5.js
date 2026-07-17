import"./modulepreload-polyfill-B5Qt9EMX.js";import{j as s,r as t,R as de,a as ge}from"./client-7KslO7uF.js";import{c as pe,j as he,W as ve,f as xe,e as we,k as Re,D as Ae,g as ye,l as Ce,L as be}from"./three.module-CDbiUPI8.js";import{g as B}from"./index-CzGW6FVa.js";const Ee=`
uniform float time;
uniform float angle;
uniform float progress;
uniform float rolls;
uniform float rollRadius;
uniform vec4 resolution;
varying vec2 vUv;
varying float vFrontShadow;

const float pi = 3.14159265359;

mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    
    return mat4(
        oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
        oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
        oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
        0.0,                                0.0,                                0.0,                                1.0
    );
}

vec3 rotate(vec3 v, vec3 axis, float angle) {
    mat4 m = rotationMatrix(axis, angle);
    return (m * vec4(v, 1.0)).xyz;
}

void main() {
    vUv = uv;
    
    float finalAngle = angle;
    vec3 newposition = position;
    
    float rad = rollRadius;
    float rollCount = rolls;
    
    newposition = rotate(newposition - vec3(-0.5, 0.5, 0.0), vec3(0.0, 0.0, 1.0), -finalAngle) + vec3(-0.5, 0.5, 0.0);
    
    float offs = (newposition.x + 0.5) / (sin(finalAngle) + cos(finalAngle));
    float tProgress = clamp((progress - offs * 0.99) / 0.01, 0.0, 1.0);
    
    vFrontShadow = clamp((progress - offs * 0.95) / 0.05, 0.7, 1.0);
    
    newposition.z = rad + rad * (1.0 - offs / 2.0) * sin(-offs * rollCount * pi - 0.5 * pi);
    newposition.x = -0.5 + rad * (1.0 - offs / 2.0) * cos(-offs * rollCount * pi + 0.5 * pi);
    
    newposition = rotate(newposition - vec3(-0.5, 0.5, 0.0), vec3(0.0, 0.0, 1.0), finalAngle) + vec3(-0.5, 0.5, 0.0);
    
    newposition = rotate(newposition - vec3(-0.5, 0.5, rad), vec3(sin(finalAngle), cos(finalAngle), 0.0), -pi * progress * rollCount);
    newposition += vec3(
        -0.5 + progress * cos(finalAngle) * (sin(finalAngle) + cos(finalAngle)), 
        0.5 - progress * sin(finalAngle) * (sin(finalAngle) + cos(finalAngle)),
        rad * (1.0 - progress / 2.0)
    );
    
    vec3 finalposition = mix(newposition, position, tProgress);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(finalposition, 1.0);
}
`,Se=`
uniform float time;
uniform float progress;
uniform sampler2D texture1;
uniform vec4 resolution;

varying vec2 vUv;
varying float vFrontShadow;

vec2 get_img_uv() {
    vec2 uv = vUv - 0.5;
    uv *= resolution.zw;
    return uv + 0.5;
}

void main() {
    vec2 img_uv = get_img_uv();
    
    vec4 color = texture2D(texture1, img_uv);
    
    color.rgb *= vFrontShadow;
    
    color.a = clamp(progress * 5.0, 0.0, 1.0);
    
    gl_FragColor = color;
}
`;function Me(u){if(u)return typeof u=="string"?u.trim()||void 0:u.src||void 0}function re(u){return u<=.1?.01:u>=1?.13:.01+(u-.1)/(1-.1)*(.13-.01)}function ne(u,S,R){const M=u/S;return 2*Math.atan(u/M/(2*R))*(180/Math.PI)}function ze({title:u="Unrolling Image",subtitle:S="Add an image to see the unroll effect",style:R}){return s.jsxs("div",{style:{position:"relative",width:"100%",height:"100%",minWidth:0,minHeight:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,padding:"0 20px",backgroundColor:"rgba(136, 85, 255, 0.1)",...R},children:[s.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 28 28",width:28,height:28,children:[s.jsx("path",{d:"M 0 0 L 28 0 L 28 28 L 0 28 Z",fill:"transparent"}),s.jsx("path",{d:"M 21 7.113 C 21 7.041 21.029 6.971 21.079 6.921 L 27.534 0.465 C 27.613 0.388 27.73 0.365 27.831 0.407 C 27.933 0.449 28 0.548 28 0.658 L 28 13.888 C 28 13.96 27.971 14.028 27.921 14.079 L 21 21 Z M 7 21 L 7 7.658 C 7 7.548 6.933 7.449 6.831 7.407 C 6.73 7.365 6.613 7.388 6.534 7.465 L 0.079 13.921 C 0.028 13.972 0 14.041 0 14.113 L 0 27.728 C 0 27.877 0.122 28 0.273 28 L 13.888 28 C 13.96 28 14.028 27.971 14.079 27.921 L 21 21 Z",fill:"rgb(153, 102, 255)"})]}),s.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12,maxWidth:200,width:"100%",textAlign:"center"},children:[s.jsx("p",{style:{fontWeight:700,fontSize:11,letterSpacing:"-0.02em",lineHeight:1,color:"rgb(153, 102, 255)",margin:0},children:u}),s.jsx("p",{style:{fontSize:11,letterSpacing:"-0.03em",lineHeight:1.4,color:"rgba(153, 102, 255, 0.7)",margin:0},children:S})]})]})}const G=400,je=100,Le=1e3,ie=80,_=1.6,F=1,Ie={triggerMode:"appear",startAlign:"top",animationDuration:1.7,animationDelay:0,replay:!0};function Pe({preview:u=!1,image:S,angle:R=17,rolls:M=8,rollRadius:N=.5,animation:se={},style:ae}){const z=t.useRef(null),A=t.useRef(null),h=t.useRef(null),m=t.useRef(null),x=t.useRef(null),a=t.useRef(null),le=t.useRef(null),ce=t.useRef({width:0,height:0,zoom:0,aspect:0,ts:0}),j=t.useRef(null),$=t.useRef(!1),y=t.useRef(null),ue={...Ie,...se},{triggerMode:C,startAlign:q,animationDuration:P,animationDelay:Z,replay:J}=ue,[K,fe]=t.useState(!1),[Q,me]=t.useState(!1),[O,V]=t.useState(!1),[k,L]=t.useState(!1),H=Me(S),I=!!H;t.useEffect(()=>{V(!1),L(!1)},[]),t.useEffect(()=>{var e;if(!I){V(!1),L(!1);return}V(!1),L(!1),(e=a.current)!=null&&e.material&&(a.current.material.uniforms.progress.value=0)},[I,H]);const l=t.useCallback(()=>{!m.current||!h.current||!x.current||m.current.render(h.current,x.current)},[]),T=t.useCallback(()=>{if($.current=!0,!j.current){const e=()=>{l(),$.current?j.current=requestAnimationFrame(e):j.current=null};j.current=requestAnimationFrame(e)}},[l]),g=t.useCallback(()=>{$.current=!1,j.current&&(cancelAnimationFrame(j.current),j.current=null)},[]),X=t.useCallback(()=>{if(!A.current||!z.current)return null;const e=z.current,n=e.clientWidth||e.offsetWidth||1,i=e.clientHeight||e.offsetHeight||1,r=Math.min(window.devicePixelRatio||1,2),c=n*_,o=i*_,d=new pe;h.current=d;const f=new he(ne(c,o,G),c/o,je,Le);f.position.set(0,0,G),f.lookAt(0,0,0),x.current=f;const v=new ve({canvas:A.current,alpha:!0,antialias:!0});v.setSize(Math.round(c*r),Math.round(o*r),!1),v.setPixelRatio(1),v.sortObjects=!1,m.current=v,A.current.style.width=`${c}px`,A.current.style.height=`${o}px`;const b=new xe(1,1,ie,ie),p=n*F,w=i*F,E=R*Math.PI/180,W=re(N),D=new we({side:Ae,uniforms:{time:{value:0},progress:{value:0},angle:{value:E},rolls:{value:M},rollRadius:{value:W},texture1:{value:null},resolution:{value:new Re(p,w,1,1)}},transparent:!0,vertexShader:Ee,fragmentShader:Se}),U=new ye(b,D);return U.scale.set(p,w,p/2),U.position.set(0,0,0),a.current=U,d.add(U),{scene:d,camera:f,renderer:v,mesh:U}},[R,M,N]),Y=t.useCallback(()=>{if(!H||!a.current){L(!1);return}L(!1);const e=new Image;e.crossOrigin="anonymous",e.onload=()=>{var E;if(!((E=a.current)!=null&&E.material))return;const n=new Ce(e);n.needsUpdate=!0,n.minFilter=be;const i=a.current.material,r=z.current;if(!r)return;const c=r.clientWidth||1,o=r.clientHeight||1,d=c*F,f=o*F,v=d/f,b=e.width/e.height;let p,w;v>b?(p=1,w=b/v):(p=v/b,w=1),i.uniforms.resolution.value.set(d,f,p,w),i.uniforms.texture1.value=n,L(!0),m.current&&h.current&&x.current&&m.current.render(h.current,x.current)},e.onerror=()=>{console.error("Texture loading error"),L(!1)},e.src=H},[H]),ee=t.useCallback((e,n)=>{var v,b;if(!x.current||!m.current||!a.current||!A.current)return;const i=Math.min(window.devicePixelRatio||1,2),r=e*_,c=n*_,o=e*F,d=n*F;x.current.aspect=r/c,x.current.fov=ne(r,c,G),x.current.updateProjectionMatrix(),m.current.setSize(Math.round(r*i),Math.round(c*i),!1),A.current.style.width=`${r}px`,A.current.style.height=`${c}px`,a.current.scale.set(o,d,o/2);const f=a.current.material;if((v=f==null?void 0:f.uniforms)!=null&&v.resolution){const p=(b=f.uniforms.texture1)==null?void 0:b.value;if(p!=null&&p.image){const w=o/d,E=p.image.width/p.image.height;let W,D;w>E?(W=1,D=E/w):(W=w/E,D=1),f.uniforms.resolution.value.set(o,d,W,D)}else f.uniforms.resolution.value.set(o,d,1,1)}},[]);if(t.useEffect(()=>{if(!I){g(),m.current&&(m.current.dispose(),m.current=null),h.current&&(h.current.clear(),h.current=null),a.current=null;return}X(),m.current&&h.current&&x.current&&l();const e=setTimeout(()=>{Y()},0);return()=>{clearTimeout(e),g(),m.current&&(m.current.dispose(),m.current=null),h.current&&(h.current.clear(),h.current=null)}},[I,X,Y,g,l]),t.useEffect(()=>{const e=z.current;if(!e)return;const n=()=>{const r=e.clientWidth||e.offsetWidth||1,c=e.clientHeight||e.offsetHeight||1,o=ce.current;(Math.abs(r-o.width)>1||Math.abs(c-o.height)>1)&&(o.width=r,o.height=c,ee(r,c),l())};n();const i=new ResizeObserver(n);return i.observe(e),window.addEventListener("resize",n),()=>{i.disconnect(),window.removeEventListener("resize",n)}},[ee,l]),t.useEffect(()=>{var r;if(!((r=a.current)!=null&&r.material))return;const e=R*Math.PI/180,n=re(N),i=a.current.material;i.uniforms.angle.value=e,i.uniforms.rolls.value=M,i.uniforms.rollRadius.value=n,l()},[R,M,N,l]),t.useEffect(()=>{if(C!=="scroll")return;let e=null;const n=()=>{if(!z.current)return;const r=z.current.getBoundingClientRect(),c=window.innerHeight||0;let o;q==="top"?o=r.top:q==="center"?o=r.top+r.height/2:o=r.bottom;const d=o<=c&&r.bottom>=0;fe(d);const f=r.top>c;me(f)},i=()=>{e&&cancelAnimationFrame(e),e=requestAnimationFrame(n)};return n(),window.addEventListener("scroll",i,{passive:!0}),window.addEventListener("resize",n),()=>{e&&cancelAnimationFrame(e),window.removeEventListener("scroll",i),window.removeEventListener("resize",n)}},[C,q]),t.useEffect(()=>{if(!(!I||!k)&&C==="appear"&&!O){const e=setTimeout(()=>{V(!0)},10);return()=>clearTimeout(e)}},[C,O,I,k]),t.useEffect(()=>{var r;if(C!=="appear"||!O||!k||!((r=a.current)!=null&&r.material))return;const e=a.current.material;if(!e.uniforms.texture1.value||e.uniforms.progress.value>=1)return;T();const i=B.to(e.uniforms.progress,{value:1,duration:P,ease:"power2.out",delay:Z,onUpdate:l,onComplete:()=>{l(),g()}});return()=>{i.kill(),g()}},[O,k,P,Z,C,l,T,g]),t.useEffect(()=>{var i;if(C!=="scroll"||!k||!((i=a.current)!=null&&i.material))return;const e=a.current.material;if(!e.uniforms.texture1.value)return;const n=e.uniforms.progress.value;if(y.current&&(y.current.kill(),y.current=null,g()),Q){J&&n>.01&&(e.uniforms.progress.value=0,l());return}return K&&n<.99&&(T(),y.current=B.to(e.uniforms.progress,{value:1,duration:P,ease:"power2.out",onUpdate:l,onComplete:()=>{l(),g(),y.current=null}})),()=>{y.current&&(y.current.kill(),y.current=null),g()}},[K,Q,J,k,P,C,l,T,g]),t.useEffect(()=>{var i;if(!((i=a.current)!=null&&i.material))return;const n=a.current.material.uniforms;if(u){n.progress.value=0,T();const r=B.to(n.progress,{value:1,duration:P,ease:"power2.out",onUpdate:l,onComplete:()=>{l(),g()}});return()=>{r.kill(),g()}}},[u,P,l,T,g,R,M,S]),!I)return s.jsx(ze,{style:{position:"relative",width:"100%",height:"100%",minWidth:0,minHeight:0},title:"Unrolling Image",subtitle:"Add an image to see the unroll effect"});const te=(_-1)/2*100;return s.jsxs("div",{ref:z,style:{...ae,position:"relative",width:"100%",height:"100%",overflow:"visible",display:"block",margin:0,padding:0},children:[s.jsx("div",{ref:le,style:{position:"absolute",width:20,height:20,opacity:0,pointerEvents:"none"}}),s.jsx("canvas",{ref:A,style:{position:"absolute",top:`-${te}%`,left:`-${te}%`,display:"block"}})]})}function ke(){return s.jsx("div",{className:"min-h-screen bg-white flex flex-col items-center justify-center p-4 sm:p-8 md:p-12",children:s.jsxs("div",{className:"w-full max-w-4xl",children:[s.jsx("h1",{className:"text-2xl sm:text-3xl font-medium tracking-tight text-gray-900 mb-2",children:"Image Unroll Effect"}),s.jsx("p",{className:"text-sm text-gray-500 mb-8 tracking-tight",children:"A Three.js-powered paper unroll animation"}),s.jsx("div",{className:"w-full aspect-[3/2] relative rounded-lg overflow-hidden border border-gray-100 shadow-sm",children:s.jsx(Pe,{image:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",angle:17,rolls:8,rollRadius:.5,animation:{triggerMode:"appear",animationDuration:1.7,animationDelay:.3}})})]})})}const oe=document.getElementById("root");if(!oe)throw new Error("Root element not found");de.createRoot(oe).render(s.jsx(ge.StrictMode,{children:s.jsx(ke,{})}));
