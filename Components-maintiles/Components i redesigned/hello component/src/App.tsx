import React, { useState } from 'react';
import "./index.css";

// Singleton AudioContext to prevent hitting browser limits on rapid clicks
let audioCtx = null;
const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  return audioCtx;
};

const playClickSound = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(120, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.05);
    oscGain.gain.setValueAtTime(1, ctx.currentTime);
    oscGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);

    const bufferSize = ctx.sampleRate * 0.05; 
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = 1000;
    
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.5, ctx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
    
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start();
  } catch (e) {
    console.warn("Audio error:", e);
  }
};

const SvgDefs = () => (
  <defs>
    <linearGradient id="top-highlight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="white" stopOpacity="0.4" />
      <stop offset="100%" stopColor="white" stopOpacity="0" />
    </linearGradient>
  </defs>
);

const StandardKey = ({ char, color, sideColor, x, y }) => {
  const [isPressed, setIsPressed] = useState(false);
  const handleDown = (e) => {
    if (e.button !== 0 && e.type !== 'touchstart') return;
    setIsPressed(true);
    playClickSound();
  };
  const handleUp = () => setIsPressed(false);

  return (
    <div className="absolute pointer-events-none" style={{ left: x, top: y, width: 100, height: 134 }}>
      <svg viewBox="0 0 100 134" className="w-full h-full overflow-visible">
        <SvgDefs />
        {/* Shadow */}
        <g transform="translate(0, 24)">
          <rect x="0" y="0" width="100" height="110" rx="20" fill="black" stroke="black" strokeWidth="6" strokeLinejoin="round" />
        </g>
        {/* Side */}
        <g transform="translate(0, 12)">
          <rect x="0" y="0" width="100" height="110" rx="20" fill={sideColor} stroke="black" strokeWidth="6" strokeLinejoin="round" />
        </g>
        {/* Top */}
        <g 
          transform={`translate(0, ${isPressed ? 12 : 0})`} 
          className="transition-transform duration-75 cursor-pointer pointer-events-auto"
          onPointerDown={handleDown} onPointerUp={handleUp} onPointerLeave={handleUp}
        >
          <rect x="0" y="0" width="100" height="110" rx="20" fill={color} stroke="black" strokeWidth="6" strokeLinejoin="round" />
          <rect x="0" y="0" width="100" height="110" rx="20" fill="url(#top-highlight)" pointerEvents="none" />
          <text x="50" y="55" textAnchor="middle" dominantBaseline="central" fill="black" fontSize="56" fontWeight="900" fontFamily="sans-serif">{char}</text>
        </g>
      </svg>
    </div>
  );
};

const EnterKey = ({ x, y }) => {
  const [isPressed, setIsPressed] = useState(false);
  const handleDown = (e) => {
    if (e.button !== 0 && e.type !== 'touchstart') return;
    setIsPressed(true);
    playClickSound();
  };
  const handleUp = () => setIsPressed(false);

  const pathD = "M0,20 A20,20 0 0,1 20,0 L132,0 A20,20 0 0,1 152,20 L152,204 A20,20 0 0,1 132,224 L72,224 A20,20 0 0,1 52,204 L52,130 A20,20 0 0,0 32,110 L20,110 A20,20 0 0,1 0,90 Z";

  return (
    <div className="absolute pointer-events-none" style={{ left: x, top: y, width: 152, height: 248 }}>
      <svg viewBox="0 0 152 248" className="w-full h-full overflow-visible">
        <SvgDefs />
        {/* Shadow */}
        <g transform="translate(0, 24)">
          <path d={pathD} fill="black" stroke="black" strokeWidth="6" strokeLinejoin="round" />
        </g>
        {/* Side */}
        <g transform="translate(0, 12)">
          <path d={pathD} fill="#E5850E" stroke="black" strokeWidth="6" strokeLinejoin="round" />
        </g>
        {/* Top */}
        <g 
          transform={`translate(0, ${isPressed ? 12 : 0})`} 
          className="transition-transform duration-75 cursor-pointer pointer-events-auto"
          onPointerDown={handleDown} onPointerUp={handleUp} onPointerLeave={handleUp}
        >
          <path d={pathD} fill="#FDD340" stroke="black" strokeWidth="6" strokeLinejoin="round" />
          <path d={pathD} fill="url(#top-highlight)" pointerEvents="none" />
          
          {/* Arrow */}
          <path d="M111 50 L111 80 L81 80 M94 67 L81 80 L94 93" fill="none" stroke="black" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
};

export function App() {
  return (
    <div className="min-h-screen bg-[#A1F1CE] flex items-center justify-center p-8 overflow-hidden font-sans select-none">
      
      {/* Keyboard Grid Container */}
      {/* Total Width = 260 (Enter X) + 152 (Enter Width) = 412 */}
      {/* Total Height = 114 (Row 2 Y) + 110 (Key Height) + 24 (Shadow) = 248 */}
      <div className="relative transform scale-75 sm:scale-100 md:scale-125 lg:scale-150" style={{ width: 412, height: 248 }}>
        
        {/* Top Row - Shifted right by exactly 52px (half a key + half gap) */}
        <StandardKey char="H" color="#FF7354" sideColor="#D93011" x={52} y={0} />
        <StandardKey char="E" color="#7AA9FF" sideColor="#174BE3" x={156} y={0} />
        
        {/* Enter Key (Staggers perfectly to wrap around the 'O' key) */}
        <EnterKey x={260} y={0} />

        {/* Bottom Row (Rendered last so it sits on the top layer, covering shadows from the top row) */}
        <StandardKey char="L" color="#7AA9FF" sideColor="#174BE3" x={0} y={114} />
        <StandardKey char="L" color="#73DE71" sideColor="#16A014" x={104} y={114} />
        <StandardKey char="O" color="#7AA9FF" sideColor="#174BE3" x={208} y={114} />
        
      </div>

    </div>
  );
}
