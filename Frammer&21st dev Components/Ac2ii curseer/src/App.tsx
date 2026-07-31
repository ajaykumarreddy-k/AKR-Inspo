import React, { useState, useEffect } from "react";
import AsciiFlowTrail, {
  GlyphDitherProps,
  MouseDrawProps,
  InteractivityProps,
} from "./components/AsciiFlowTrail";

const PRESETS = [
  {
    name: "Cyber Neon",
    tint: "#00f0ff",
    glyphSet: 3,
    scale: 24,
    turbulence: 80,
    tail: 90,
    momentum: 30,
    radius: 25,
    strength: 85,
    drawBlendMode: "Screen" as const,
  },
  {
    name: "Matrix Green",
    tint: "#00ff66",
    glyphSet: 2,
    scale: 28,
    turbulence: 50,
    tail: 100,
    momentum: 45,
    radius: 20,
    strength: 90,
    drawBlendMode: "Screen" as const,
  },
  {
    name: "Ghost White",
    tint: "#ffffff",
    glyphSet: 0,
    scale: 20,
    turbulence: 20,
    tail: 60,
    momentum: 50,
    radius: 18,
    strength: 75,
    drawBlendMode: "Normal" as const,
  },
  {
    name: "Quantum Gold",
    tint: "#ffd700",
    glyphSet: 4,
    scale: 26,
    turbulence: 90,
    tail: 85,
    momentum: 25,
    radius: 24,
    strength: 88,
    drawBlendMode: "Screen" as const,
  },
  {
    name: "Synthwave Pink",
    tint: "#ff007f",
    glyphSet: 5,
    scale: 22,
    turbulence: 100,
    tail: 95,
    momentum: 40,
    radius: 22,
    strength: 80,
    drawBlendMode: "Add" as const,
  },
  {
    name: "Crimson Ember",
    tint: "#ff3344",
    glyphSet: 1,
    scale: 25,
    turbulence: 70,
    tail: 75,
    momentum: 35,
    radius: 22,
    strength: 92,
    drawBlendMode: "Screen" as const,
  },
];

const GLYPH_SET_NAMES = [
  "Halftone — Dots (●•·.)",
  "Halftone — Square (■□▪▫)",
  "Halftone — Blocks (█▓▒░)",
  "Ordered Dither — Bayer (▣▤▥▦)",
  "Atkinson Dither (◆◇◈○)",
  "Classic ASCII (@%#*+=-:.)",
];

export function App() {
  // Config state
  const [glyphSet, setGlyphSet] = useState<number>(3);
  const [scale, setScale] = useState<number>(24);
  const [gamma, setGamma] = useState<number>(0);
  const [mix, setMix] = useState<number>(100);
  const [monochrome, setMonochrome] = useState<boolean>(true);
  const [invertOrder, setInvertOrder] = useState<boolean>(true);
  const [blendMode, setBlendMode] = useState<"Normal" | "Add" | "Screen" | "Multiply" | "Difference">("Normal");

  const [radius, setRadius] = useState<number>(22);
  const [strength, setStrength] = useState<number>(85);
  const [turbulence, setTurbulence] = useState<number>(80);
  const [tint, setTint] = useState<string>("#ffffff");
  const [colorMix, setColorMix] = useState<number>(100);
  const [tail, setTail] = useState<number>(90);
  const [drawBlendMode, setDrawBlendMode] = useState<"Normal" | "Add" | "Screen" | "Multiply" | "Difference">("Screen");

  const [trackMouse, setTrackMouse] = useState<number>(100);
  const [momentum, setMomentum] = useState<number>(40);

  // Layout state
  const [isFullScreen, setIsFullScreen] = useState<boolean>(true);
  const [showCodeModal, setShowCodeModal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<"glyphs" | "drawing" | "interactivity">("glyphs");

  // Track mouse coordinates for UI HUD
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const applyPreset = (preset: (typeof PRESETS)[0]) => {
    setTint(preset.tint);
    setGlyphSet(preset.glyphSet);
    setScale(preset.scale);
    setTurbulence(preset.turbulence);
    setTail(preset.tail);
    setMomentum(preset.momentum);
    setRadius(preset.radius);
    setStrength(preset.strength);
    setDrawBlendMode(preset.drawBlendMode);
  };

  const glyphDither: GlyphDitherProps = {
    glyphSet,
    scale,
    gamma,
    mix,
    monochrome,
    invertOrder,
    blendMode,
  };

  const mouseDraw: MouseDrawProps = {
    radius,
    strength,
    turbulence,
    tint,
    colorMix,
    tail,
    drawBlendMode,
  };

  const interactivity: InteractivityProps = {
    trackMouse,
    momentum,
  };

  const generateCodeSnippet = () => {
    return `<AsciiFlowTrail
  isFullScreen={${isFullScreen}}
  glyphDither={{
    glyphSet: ${glyphSet},
    scale: ${scale},
    gamma: ${gamma},
    mix: ${mix},
    monochrome: ${monochrome},
    invertOrder: ${invertOrder},
    blendMode: "${blendMode}",
  }}
  mouseDraw={{
    radius: ${radius},
    strength: ${strength},
    turbulence: ${turbulence},
    tint: "${tint}",
    colorMix: ${colorMix},
    tail: ${tail},
    drawBlendMode: "${drawBlendMode}",
  }}
  interactivity={{
    trackMouse: ${trackMouse},
    momentum: ${momentum},
  }}
/>`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateCodeSnippet());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white relative bg-grid-pattern selection:bg-white selection:text-black">
      {/* ASCII Flow Trail Canvas */}
      <AsciiFlowTrail
        isFullScreen={isFullScreen}
        glyphDither={glyphDither}
        mouseDraw={mouseDraw}
        interactivity={interactivity}
      />

      {/* Header Bar */}
      <header className="relative z-20 border-b border-neutral-800/80 bg-black/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center text-xs font-mono font-bold text-white shadow-inner">
            &gt;_
          </div>
          <div>
            <h1 className="font-bold text-base tracking-tight flex items-center gap-2">
              <span>ASCII Flow Trail</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 font-mono border border-neutral-700">
                Framer Component
              </span>
            </h1>
            <p className="text-xs text-neutral-400 font-mono">
              framer.com/m/Ascii-FlowTrail-1wMf.js
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium font-mono transition-all border ${
              isFullScreen
                ? "bg-white text-black border-white hover:bg-neutral-200"
                : "bg-neutral-900 text-neutral-300 border-neutral-700 hover:border-neutral-500"
            }`}
          >
            {isFullScreen ? "Mode: Full Screen Overlay" : "Mode: Bounded Canvas"}
          </button>

          <button
            onClick={() => setShowCodeModal(true)}
            className="px-3 py-1.5 rounded-md text-xs font-mono font-semibold bg-neutral-900 border border-neutral-700 hover:border-white text-white transition-all flex items-center gap-2"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
            Export Code
          </button>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="relative z-20 max-w-7xl mx-auto px-6 pt-10 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left / Center Section: Hero & Interactive Showcase */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          {/* Hero Banner */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950/60 p-8 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-neutral-800/20 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Interactive ASCII Cursor Trail
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-none bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-neutral-500">
              Flow Trail ASCII Engine
            </h2>

            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-xl mb-6">
              A high-performance HTML5 Canvas ASCII particle trail component ported from Framer. Move your cursor across the page to experience real-time dithering, turbulence, and fluid motion decay.
            </p>

            {/* Live Cursor Stats HUD */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-900 font-mono text-xs text-neutral-400">
              <div>
                <span className="block text-neutral-600 uppercase text-[10px]">Position</span>
                <span className="text-white font-semibold">{mousePos.x}px, {mousePos.y}px</span>
              </div>
              <div>
                <span className="block text-neutral-600 uppercase text-[10px]">Dither Preset</span>
                <span className="text-white font-semibold">Style #{glyphSet}</span>
              </div>
              <div>
                <span className="block text-neutral-600 uppercase text-[10px]">Background</span>
                <span className="text-emerald-400 font-semibold">#000000 Pitch Black</span>
              </div>
            </div>
          </div>

          {/* Preset Selector Section */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950/60 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 font-mono flex items-center gap-2">
                <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Quick Color & Style Presets
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {PRESETS.map((p) => {
                const isActive = tint.toLowerCase() === p.tint.toLowerCase() && glyphSet === p.glyphSet;
                return (
                  <button
                    key={p.name}
                    onClick={() => applyPreset(p)}
                    className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden group ${
                      isActive
                        ? "border-white bg-neutral-900 shadow-lg shadow-white/5"
                        : "border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 hover:bg-neutral-900"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span
                        className="w-3 h-3 rounded-full border border-white/20 shadow-sm"
                        style={{ backgroundColor: p.tint }}
                      />
                      <span className="text-xs font-semibold text-white group-hover:text-white">
                        {p.name}
                      </span>
                    </div>
                    <span className="text-[10px] text-neutral-500 font-mono block">
                      Style #{p.glyphSet} • Tail {p.tail}%
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Bounded Test Box (If bounded mode or preview) */}
          {!isFullScreen && (
            <div className="rounded-2xl border border-dashed border-neutral-700 bg-neutral-950/80 p-4 h-72 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-3 left-3 text-xs font-mono text-neutral-400 bg-black/60 px-2 py-1 rounded border border-neutral-800 z-20 pointer-events-none">
                Interactive Bounded Canvas (Move mouse inside)
              </div>
              <AsciiFlowTrail
                isFullScreen={false}
                glyphDither={glyphDither}
                mouseDraw={mouseDraw}
                interactivity={interactivity}
              />
            </div>
          )}

          {/* Test UI Elements Card to showcase mouse interactions */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950/60 p-6 backdrop-blur-xl flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 font-mono">
              Hover & Interactive UI Elements Test
            </h3>
            <p className="text-xs text-neutral-400">
              Move your mouse over these interactive buttons, form inputs, and cards. The ASCII trail flows smoothly across all UI elements.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <button className="px-4 py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all shadow-md active:scale-95">
                Primary Action Button
              </button>
              <button className="px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-neutral-200 font-semibold text-sm hover:border-neutral-500 transition-all active:scale-95">
                Secondary Outline Button
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Type here to test input focus..."
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-all font-mono"
              />
              <div className="px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>ASCII Art Trail</span>
                <span className="text-white bg-neutral-800 px-2 py-0.5 rounded">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Control Panel Drawer */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950/80 p-6 backdrop-blur-xl sticky top-6 shadow-2xl flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Effect Parameters
              </h3>
              <span className="text-xs text-neutral-500 font-mono">Live Engine Controls</span>
            </div>

            {/* Navigation Tabs */}
            <div className="flex p-1 bg-neutral-900 rounded-xl border border-neutral-800 text-xs font-mono">
              <button
                onClick={() => setActiveTab("glyphs")}
                className={`flex-1 py-1.5 rounded-lg font-medium transition-all ${
                  activeTab === "glyphs" ? "bg-white text-black font-semibold" : "text-neutral-400 hover:text-white"
                }`}
              >
                Glyphs
              </button>
              <button
                onClick={() => setActiveTab("drawing")}
                className={`flex-1 py-1.5 rounded-lg font-medium transition-all ${
                  activeTab === "drawing" ? "bg-white text-black font-semibold" : "text-neutral-400 hover:text-white"
                }`}
              >
                Drawing
              </button>
              <button
                onClick={() => setActiveTab("interactivity")}
                className={`flex-1 py-1.5 rounded-lg font-medium transition-all ${
                  activeTab === "interactivity" ? "bg-white text-black font-semibold" : "text-neutral-400 hover:text-white"
                }`}
              >
                Motion
              </button>
            </div>

            {/* TAB 1: GLYPHS & DITHERING */}
            {activeTab === "glyphs" && (
              <div className="flex flex-col gap-5 text-xs font-mono">
                {/* Glyph Set Selector */}
                <div>
                  <label className="block text-neutral-300 font-semibold mb-2">
                    Glyph Character Set
                  </label>
                  <div className="flex flex-col gap-1.5">
                    {GLYPH_SET_NAMES.map((name, idx) => (
                      <button
                        key={idx}
                        onClick={() => setGlyphSet(idx)}
                        className={`w-full px-3 py-2 rounded-lg text-left border transition-all flex items-center justify-between ${
                          glyphSet === idx
                            ? "bg-neutral-900 border-white text-white font-semibold"
                            : "bg-neutral-950/40 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200"
                        }`}
                      >
                        <span>{name}</span>
                        <span className="text-[10px] text-neutral-500">#{idx}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scale Slider */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-neutral-300">Glyph Size (Scale)</span>
                    <span className="text-neutral-400">{scale}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    value={scale}
                    onChange={(e) => setScale(Number(e.target.value))}
                    className="w-full accent-white bg-neutral-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Mix / Opacity */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-neutral-300">Glyph Opacity (Mix)</span>
                    <span className="text-neutral-400">{mix}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={mix}
                    onChange={(e) => setMix(Number(e.target.value))}
                    className="w-full accent-white bg-neutral-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Gamma */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-neutral-300">Gamma Curve</span>
                    <span className="text-neutral-400">{gamma.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="-1"
                    max="1"
                    step="0.05"
                    value={gamma}
                    onChange={(e) => setGamma(Number(e.target.value))}
                    className="w-full accent-white bg-neutral-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Toggles */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => setInvertOrder(!invertOrder)}
                    className={`p-2.5 rounded-lg border transition-all text-center ${
                      invertOrder
                        ? "bg-neutral-900 border-white text-white"
                        : "bg-neutral-950 border-neutral-800 text-neutral-500"
                    }`}
                  >
                    Invert Order: {invertOrder ? "ON" : "OFF"}
                  </button>
                  <button
                    onClick={() => setMonochrome(!monochrome)}
                    className={`p-2.5 rounded-lg border transition-all text-center ${
                      monochrome
                        ? "bg-neutral-900 border-white text-white"
                        : "bg-neutral-950 border-neutral-800 text-neutral-500"
                    }`}
                  >
                    Monochrome: {monochrome ? "ON" : "OFF"}
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: DRAWING & TINT */}
            {activeTab === "drawing" && (
              <div className="flex flex-col gap-5 text-xs font-mono">
                {/* Tint Color Picker & Color Swatches */}
                <div>
                  <label className="block text-neutral-300 font-semibold mb-2">
                    Trail Tint Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={tint}
                      onChange={(e) => setTint(e.target.value)}
                      className="w-10 h-10 rounded-lg border border-neutral-700 bg-black cursor-pointer p-0.5"
                    />
                    <input
                      type="text"
                      value={tint}
                      onChange={(e) => setTint(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white font-mono uppercase text-xs"
                    />
                  </div>
                  <div className="flex gap-2 mt-2">
                    {["#FFFFFF", "#00F0FF", "#00FF66", "#FFD700", "#FF007F", "#FF3344", "#A855F7"].map((c) => (
                      <button
                        key={c}
                        onClick={() => setTint(c)}
                        className="w-6 h-6 rounded-full border border-white/20 hover:scale-110 transition-all"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>

                {/* Radius */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-neutral-300">Brush Radius</span>
                    <span className="text-neutral-400">{radius}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="60"
                    value={radius}
                    onChange={(e) => setRadius(Number(e.target.value))}
                    className="w-full accent-white bg-neutral-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Strength */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-neutral-300">Strength (Intensity)</span>
                    <span className="text-neutral-400">{strength}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={strength}
                    onChange={(e) => setStrength(Number(e.target.value))}
                    className="w-full accent-white bg-neutral-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Turbulence */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-neutral-300">Turbulence / Noise</span>
                    <span className="text-neutral-400">{turbulence}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={turbulence}
                    onChange={(e) => setTurbulence(Number(e.target.value))}
                    className="w-full accent-white bg-neutral-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Tail Length */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-neutral-300">Tail Length & Decay</span>
                    <span className="text-neutral-400">{tail}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={tail}
                    onChange={(e) => setTail(Number(e.target.value))}
                    className="w-full accent-white bg-neutral-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Blend Modes */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-neutral-400 mb-1">Trail Blend</label>
                    <select
                      value={drawBlendMode}
                      onChange={(e) => setDrawBlendMode(e.target.value as any)}
                      className="w-full px-2.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white font-mono"
                    >
                      <option value="Normal">Normal</option>
                      <option value="Add">Add (Lighter)</option>
                      <option value="Screen">Screen</option>
                      <option value="Multiply">Multiply</option>
                      <option value="Difference">Difference</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-neutral-400 mb-1">Canvas Blend</label>
                    <select
                      value={blendMode}
                      onChange={(e) => setBlendMode(e.target.value as any)}
                      className="w-full px-2.5 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white font-mono"
                    >
                      <option value="Normal">Normal</option>
                      <option value="Add">Add</option>
                      <option value="Screen">Screen</option>
                      <option value="Multiply">Multiply</option>
                      <option value="Difference">Difference</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: MOTION & INTERACTIVITY */}
            {activeTab === "interactivity" && (
              <div className="flex flex-col gap-5 text-xs font-mono">
                {/* Track Mouse */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-neutral-300">Track Mouse %</span>
                    <span className="text-neutral-400">{trackMouse}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={trackMouse}
                    onChange={(e) => setTrackMouse(Number(e.target.value))}
                    className="w-full accent-white bg-neutral-800 rounded-lg cursor-pointer"
                  />
                  <span className="text-[10px] text-neutral-500 block mt-1">
                    Lower values enable autonomous organic orbital movement.
                  </span>
                </div>

                {/* Momentum */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-neutral-300">Momentum / Lag</span>
                    <span className="text-neutral-400">{momentum}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="90"
                    value={momentum}
                    onChange={(e) => setMomentum(Number(e.target.value))}
                    className="w-full accent-white bg-neutral-800 rounded-lg cursor-pointer"
                  />
                  <span className="text-[10px] text-neutral-500 block mt-1">
                    Higher momentum creates smoother fluid spring trailing.
                  </span>
                </div>

                {/* Color Mix */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-neutral-300">Color Mix (Tint vs Grayscale)</span>
                    <span className="text-neutral-400">{colorMix}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={colorMix}
                    onChange={(e) => setColorMix(Number(e.target.value))}
                    className="w-full accent-white bg-neutral-800 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Export Code Modal */}
      {showCodeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 max-w-xl w-full flex flex-col gap-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="font-bold text-white text-base font-mono">
                React ASCII Flow Trail Component Code
              </h3>
              <button
                onClick={() => setShowCodeModal(false)}
                className="text-neutral-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <pre className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-xs font-mono text-emerald-400 overflow-x-auto max-h-80">
              {generateCodeSnippet()}
            </pre>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-neutral-500 font-mono">
                Copy and paste directly into your React app
              </span>
              <button
                onClick={handleCopyCode}
                className="px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs font-mono hover:bg-neutral-200 transition-all flex items-center gap-2"
              >
                {copied ? "Copied to Clipboard!" : "Copy React Component Code"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
