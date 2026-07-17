import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, useAnimationFrame } from 'framer-motion';
import './index.css';

export function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Track scroll with Framer Motion
  const { scrollYProgress } = useScroll();
  
  // Smooth the scroll slightly for the canvas interaction so it feels perfectly fluid
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 30,
    restDelta: 0.001
  });

  // --- HTML Scene Animations ---
  // Scene 1: Fades out between 0 and 0.15
  const opacity1 = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const y1 = useTransform(smoothProgress, [0, 0.15], [0, -30]);

  // Scene 2: Fades in 0.15-0.25, Fades out 0.45-0.60
  const opacity2 = useTransform(smoothProgress, [0.15, 0.25, 0.45, 0.60], [0, 1, 1, 0]);
  const y2 = useTransform(smoothProgress, [0.15, 0.25, 0.45, 0.60], [30, 0, 0, -30]);

  // Scene 3: Fades in 0.45-0.55, Fades out 0.72-0.85
  const opacity3 = useTransform(smoothProgress, [0.45, 0.55, 0.72, 0.85], [0, 1, 1, 0]);
  const y3 = useTransform(smoothProgress, [0.45, 0.55, 0.72, 0.85], [30, 0, 0, -30]);

  // Background Image Layer: Visible 0.72-0.95
  const opacityBg = useTransform(smoothProgress, [0.71, 0.72, 0.90, 0.95], [0, 1, 1, 0]);

  // Scene 4: Fades in 0.72-0.78, Fades out 0.85-0.95
  const opacity4 = useTransform(smoothProgress, [0.72, 0.78, 0.85, 0.95], [0, 1, 1, 0]);
  const y4 = useTransform(smoothProgress, [0.72, 0.78, 0.85, 0.95], [30, 0, 0, -30]);

  // Scene 5: Fades in 0.95-1.00
  const opacity5 = useTransform(smoothProgress, [0.90, 0.95], [0, 1]);
  const y5 = useTransform(smoothProgress, [0.90, 0.95], [30, 0]);

  // Determine pointer-events dynamically (active if opacity > 0.5)
  // This ensures invisible scenes don't block clicks. We can just let React handle it via pointerEvents style
  const ptr1 = useTransform(opacity1, v => v > 0.5 ? "auto" : "none");
  const ptr2 = useTransform(opacity2, v => v > 0.5 ? "auto" : "none");
  const ptr3 = useTransform(opacity3, v => v > 0.5 ? "auto" : "none");
  const ptr4 = useTransform(opacity4, v => v > 0.5 ? "auto" : "none");
  const ptr5 = useTransform(opacity5, v => v > 0.5 ? "auto" : "none");

  // --- Canvas Rendering Logic ---
  
  // Mutable state for canvas to avoid re-renders
  const stateRef = useRef({
    progress: 0,
    lastProgress: 0,
    time: 0,
    width: typeof window !== 'undefined' ? window.innerWidth : 1000,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    stateRef.current.lastProgress = stateRef.current.progress;
    stateRef.current.progress = latest;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    
    function resize() {
        stateRef.current.width = window.innerWidth;
        stateRef.current.height = window.innerHeight;
        // Optimize: Cap DPR to 1.5. Massive performance boost on Retina displays.
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        if (canvas) {
            canvas.width = stateRef.current.width * dpr;
            canvas.height = stateRef.current.height * dpr;
            ctx?.scale(dpr, dpr);
        }
    }
    window.addEventListener('resize', resize);
    resize();

    // Mask Generation for custom UI elements
    function generateWavyMask(width: number, height: number, edges: string[], waveSize = 4) {
        let path = `M 0,0 `;
        if (edges.includes('top')) {
            for (let x = 0; x <= width; x += 5) path += `L ${x},${Math.max(Math.sin(x * 0.1) * waveSize, 0)} `;
        } else path += `L ${width},0 `;
        
        if (edges.includes('right')) {
            for (let y = 0; y <= height; y += 5) path += `L ${width - waveSize + Math.sin(y * 0.15) * waveSize},${y} `;
        } else path += `L ${width},${height} `;
        
        if (edges.includes('bottom')) {
            for (let x = width; x >= 0; x -= 5) path += `L ${x},${height - waveSize + Math.sin(x * 0.12) * waveSize} `;
        } else path += `L 0,${height} `;
        
        if (edges.includes('left')) {
            for (let y = height; y >= 0; y -= 5) path += `L ${Math.max(Math.sin(y * 0.18) * waveSize, 0)},${y} `;
        } else path += `L 0,0 `;
        
        path += `Z`;
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><path d="${path}" /></svg>`;
        return `url("data:image/svg+xml;base64,${btoa(svg)}")`;
    }

    const maskTimeout = setTimeout(() => {
        const panel = document.getElementById('wavy-panel');
        if (panel) {
            panel.style.maskImage = generateWavyMask(320, 480, ['left', 'right'], 3);
            panel.style.webkitMaskImage = panel.style.maskImage;
        }
        const bL = document.getElementById('btn-left');
        if (bL) { bL.style.maskImage = generateWavyMask(60, 50, ['left'], 3); bL.style.webkitMaskImage = bL.style.maskImage; }
        const bR = document.getElementById('btn-right');
        if (bR) { bR.style.maskImage = generateWavyMask(60, 50, ['right'], 3); bR.style.webkitMaskImage = bR.style.maskImage; }
        const bU = document.getElementById('btn-up');
        if (bU) { bU.style.maskImage = generateWavyMask(60, 50, ['top'], 3); bU.style.webkitMaskImage = bU.style.maskImage; }
        const bD = document.getElementById('btn-down');
        if (bD) { bD.style.maskImage = generateWavyMask(60, 50, ['bottom'], 3); bD.style.webkitMaskImage = bD.style.maskImage; }
    }, 100);

    return () => {
        window.removeEventListener('resize', resize);
        clearTimeout(maskTimeout);
    };
  }, []);

  // Framer Motion automatically manages requestAnimationFrame gracefully
  useAnimationFrame((time, delta) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const COLORS = { gray: '#e4e7eb', blue: '#032aab', transparent: 'transparent' };
    
    // Scale delta for consistent time regardless of frame rate
    stateRef.current.time += (delta * 0.001) * 1.5; 
    
    const p = stateRef.current.progress;
    const w = stateRef.current.width;
    const h = stateRef.current.height;
    const t = stateRef.current.time;
    
    ctx.clearRect(0, 0, w, h);

    let bgCol = COLORS.gray;
    let waveCol = COLORS.blue;
    let wipeH = h * 1.1;

    if (p < 0.15) {
        bgCol = COLORS.gray; waveCol = COLORS.blue; wipeH = h * 0.95;
    } else if (p < 0.30) {
        bgCol = COLORS.gray; waveCol = COLORS.blue; wipeH = h * (1 - ((p - 0.15) / 0.15));
    } else if (p < 0.45) {
        bgCol = COLORS.blue; waveCol = COLORS.gray; wipeH = h * 0.95;
    } else if (p < 0.60) {
        bgCol = COLORS.blue; waveCol = COLORS.gray; wipeH = h * (1 - ((p - 0.45) / 0.15));
    } else if (p < 0.72) {
        bgCol = COLORS.gray; waveCol = COLORS.transparent; wipeH = h * 0.95;
    } else if (p < 0.85) {
        bgCol = COLORS.gray; waveCol = COLORS.transparent; wipeH = h * (1 - ((p - 0.72) / 0.13));
    } else if (p < 0.95) {
        bgCol = COLORS.transparent; waveCol = COLORS.gray; wipeH = h * (1 - ((p - 0.85) / 0.10));
    } else {
        bgCol = COLORS.gray; waveCol = COLORS.blue; wipeH = h * 0.95;
    }

    if (bgCol !== COLORS.transparent) {
        ctx.fillStyle = bgCol;
        ctx.fillRect(0, 0, w, h);
    }

    if (waveCol === 'transparent') {
        ctx.globalCompositeOperation = 'destination-out';
        waveCol = 'rgba(0,0,0,1)'; 
    } else {
        ctx.globalCompositeOperation = 'source-over';
    }

    // Render waves optimized - reduced segments to 60 for speed, still perfectly smooth visually
    const segments = 60; 
    const step = w / segments;
    
    const drawWave = (baseY: number, color: string, opacity: number, timeOffset: number, amps: {main: number, secondary: number}) => {
        ctx.beginPath();
        ctx.moveTo(0, h);
        ctx.lineTo(0, baseY);
        
        let scrollVelocity = Math.abs(stateRef.current.lastProgress - stateRef.current.progress) * 5000;
        let boost = Math.min(scrollVelocity, 50);

        for (let i = 0; i <= segments; i++) {
            let x = i * step;
            let freq1 = x * 0.002;
            let freq2 = x * 0.005;
            let yOffset = Math.sin(freq1 + timeOffset) * amps.main + Math.sin(freq2 - timeOffset * 1.5) * amps.secondary;
            yOffset += Math.sin(freq1 * 2 + timeOffset * 3) * boost;
            ctx.lineTo(x, baseY + yOffset);
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.globalAlpha = opacity;
        ctx.fill();
    };

    drawWave(wipeH - 30, waveCol, 0.3, t * 1.2, {main: 60, secondary: 20});
    drawWave(wipeH - 15, waveCol, 0.6, t * 0.8 + 2, {main: 50, secondary: 25});
    drawWave(wipeH, waveCol, 1.0, t, {main: 40, secondary: 15});
    
    ctx.fillRect(0, wipeH + 40, w, h - (wipeH + 40));
    ctx.globalAlpha = 1.0;
    ctx.globalCompositeOperation = 'source-over';
  });

  return (
    <>
      <div id="scroll-proxy"></div>

      <div id="fixed-viewport">
          <motion.div id="bg-image-layer" style={{ opacity: opacityBg }}></motion.div>
          
          <canvas id="liquid-canvas" ref={canvasRef}></canvas>

          {/* Scene 1 */}
          <motion.div className="scene-container" id="scene-1" style={{ opacity: opacity1, y: y1, pointerEvents: ptr1 }}>
              <h1 className="font-serif-custom text-liquid-blue text-center leading-[0.8] tracking-tighter" style={{ fontSize: 'clamp(6rem, 15vw, 12rem)' }}>
                  LIQUID<br/>DIVIDER
              </h1>
              <div className="scroll-indicator text-liquid-blue">
                  <div className="mouse-icon"></div>
                  <span>scroll to stir the liquid</span>
              </div>
          </motion.div>

          {/* Scene 2 */}
          <motion.div className="scene-container" id="scene-2" style={{ opacity: opacity2, y: y2, pointerEvents: ptr2 }}>
              <h2 className="font-serif-custom text-white text-center text-4xl md:text-6xl font-light tracking-tight">
                  <span className="opacity-80 font-sans text-3xl md:text-5xl">Animated waves that</span><br/>
                  <em className="italic ml-2 text-5xl md:text-7xl">react to scroll</em>
              </h2>
          </motion.div>

          {/* Scene 3 */}
          <motion.div className="scene-container" id="scene-3" style={{ opacity: opacity3, y: y3, pointerEvents: ptr3 }}>
              <div className="custom-panel" id="wavy-panel">
                  <div className="panel-header">
                      <span className="font-bold">LiquidDivider</span>
                      <span className="text-xs text-gray-500">Component</span>
                  </div>
                  <div className="panel-row">
                      <span className="panel-label">Color 1</span>
                      <div className="panel-control color-swatch-container">
                          <div className="color-swatch" style={{ background: '#3a4146' }}></div>
                          <span>032AAB</span>
                      </div>
                  </div>
                  <div className="panel-row">
                      <span className="panel-label">Color 2</span>
                      <div className="panel-control color-swatch-container">
                          <div className="color-swatch bg-liquid-blue"></div>
                          <span>032AAC</span>
                      </div>
                  </div>
                  <div className="panel-row">
                      <span className="panel-label">Direction</span>
                      <div className="panel-control" style={{ padding: '2px' }}>
                          <button className="stepper-btn">⌄</button>
                          <button className="stepper-btn" style={{ background: '#333', borderRadius: '4px' }}>⌃</button>
                          <button className="stepper-btn">›</button>
                          <button className="stepper-btn">‹</button>
                      </div>
                  </div>
                  <div className="panel-row">
                      <span className="panel-label">Layers</span>
                      <div className="panel-control stepper-control">
                          <button className="stepper-btn">−</button>
                          <input type="text" className="stepper-val" defaultValue="1" readOnly />
                          <button className="stepper-btn">+</button>
                      </div>
                  </div>
                  <div className="panel-row">
                      <span className="panel-label">Frequency</span>
                      <div className="panel-control stepper-control">
                          <button className="stepper-btn">−</button>
                          <input type="text" className="stepper-val" defaultValue="2.5" readOnly />
                          <button className="stepper-btn">+</button>
                      </div>
                  </div>
                  <div className="panel-row">
                      <span className="panel-label">Amplitude ...</span>
                      <div className="panel-control stepper-control">
                          <button className="stepper-btn">−</button>
                          <input type="text" className="stepper-val" defaultValue="100" readOnly />
                          <button className="stepper-btn">+</button>
                      </div>
                  </div>
                   <div className="panel-row">
                      <span className="panel-label">Speed</span>
                      <div className="panel-control stepper-control">
                          <button className="stepper-btn">−</button>
                          <input type="text" className="stepper-val" defaultValue="1" readOnly />
                          <button className="stepper-btn">+</button>
                      </div>
                  </div>
                  <div className="panel-row">
                      <span className="panel-label">Scroll Boost</span>
                      <div className="panel-control stepper-control">
                          <button className="stepper-btn">−</button>
                          <input type="text" className="stepper-val" defaultValue="3" readOnly />
                          <button className="stepper-btn">+</button>
                      </div>
                  </div>
                   <div className="panel-row">
                      <span className="panel-label">Smoothness</span>
                      <div className="panel-control stepper-control">
                          <button className="stepper-btn">−</button>
                          <input type="text" className="stepper-val" defaultValue="0.3" readOnly />
                          <button className="stepper-btn">+</button>
                      </div>
                  </div>
                  <div className="panel-row">
                      <span className="panel-label">Animate</span>
                      <div className="panel-control" style={{ padding: '2px' }}>
                          <button className="toggle-btn active">Yes</button>
                          <button className="toggle-btn" style={{ background: 'transparent', color: '#888' }}>No</button>
                      </div>
                  </div>
              </div>
              
              <h2 className="font-serif-custom text-liquid-blue text-4xl md:text-6xl font-light">
                  <span className="font-sans text-3xl md:text-5xl opacity-70">fully</span> <em className="italic ml-1">customizable</em>
              </h2>
          </motion.div>

          {/* Scene 4 */}
          <motion.div className="scene-container" id="scene-4" style={{ opacity: opacity4, y: y4, pointerEvents: ptr4 }}>
              <h2 className="font-serif-custom text-white text-4xl md:text-6xl font-light">
                  <span className="font-sans text-3xl md:text-5xl opacity-80">works with</span> <em className="italic ml-1">transparency</em>
              </h2>
          </motion.div>

          {/* Scene 5 */}
          <motion.div className="scene-container" id="scene-5" style={{ opacity: opacity5, y: y5, pointerEvents: ptr5 }}>
              <div className="direction-buttons-container">
                  <div className="dir-btn" id="btn-left">
                      <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
                  </div>
                  <div className="dir-btn" id="btn-right">
                      <svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
                  </div>
                  <div className="dir-btn" id="btn-up">
                      <svg viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6"/></svg>
                  </div>
                  <div className="dir-btn" id="btn-down">
                      <svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
                  </div>
              </div>
              <h2 className="font-serif-custom text-liquid-blue text-4xl md:text-6xl font-light">
                  <span className="font-sans text-3xl md:text-5xl opacity-70">four</span> <em className="italic ml-1">directions</em>
              </h2>
          </motion.div>
      </div>
    </>
  );
}

export default App;
