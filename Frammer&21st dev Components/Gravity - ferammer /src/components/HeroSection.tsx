import React, { useState } from "react";
import { PhysicsStickerWall, StickerItem } from "./PhysicsStickerWall";
import { 
  Sparkles, 
  RotateCcw, 
  SlidersHorizontal, 
  Code, 
  Check, 
  Copy, 
  ChevronDown, 
  ChevronUp,
  Apple,
  Wind
} from "lucide-react";

const PRODUCE_STICKERS: StickerItem[] = [
  { src: "/stickers/watermelon.png", alt: "3D Watermelon Cube" },
  { src: "/stickers/tomato.png", alt: "3D Tomato Cube" },
  { src: "/stickers/lemon.png", alt: "3D Lemon Cube" },
  { src: "/stickers/dragonfruit.png", alt: "3D Dragonfruit Cube" },
  { src: "/stickers/eggplant.png", alt: "3D Eggplant Cube" },
  { src: "/stickers/banana.png", alt: "3D Banana Cube" },
  { src: "/stickers/blueberry.png", alt: "3D Blueberry Cube" },
  { src: "/stickers/orange.png", alt: "3D Orange Cube" },
];

export const HeroSection: React.FC = () => {
  // Live physics state controls
  const [gravity, setGravity] = useState<number>(0.9);
  const [restitution, setRestitution] = useState<number>(0.5);
  const [friction, setFriction] = useState<number>(0.25);
  const [stickerCount, setStickerCount] = useState<number>(14);
  const [stickerSize, setStickerSize] = useState<number>(115);
  const [throwPower, setThrowPower] = useState<number>(1.2);
  const [respawnTrigger, setRespawnTrigger] = useState<number>(0);
  
  // UI states
  const [showControls, setShowControls] = useState<boolean>(false);
  const [showCodeModal, setShowCodeModal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleRespawn = () => {
    setRespawnTrigger((prev) => prev + 1);
  };

  const applyPreset = (type: "default" | "zeroG" | "superBounce" | "heavyStack") => {
    if (type === "default") {
      setGravity(0.9);
      setRestitution(0.5);
      setFriction(0.25);
      setStickerSize(115);
      setStickerCount(14);
      setThrowPower(1.2);
    } else if (type === "zeroG") {
      setGravity(0.05);
      setRestitution(0.8);
      setFriction(0.1);
      setStickerSize(115);
      setStickerCount(12);
      setThrowPower(2.0);
    } else if (type === "superBounce") {
      setGravity(1.1);
      setRestitution(0.85);
      setFriction(0.15);
      setStickerSize(110);
      setStickerCount(16);
      setThrowPower(1.8);
    } else if (type === "heavyStack") {
      setGravity(1.8);
      setRestitution(0.15);
      setFriction(0.7);
      setStickerSize(130);
      setStickerCount(18);
      setThrowPower(0.8);
    }
    handleRespawn();
  };

  const codeSnippet = `import { PhysicsStickerWall } from "./PhysicsStickerWall";

export default function FreshFarmHero() {
  return (
    <div className="relative w-full h-screen bg-[#F4F4F2] overflow-hidden">
      {/* Hero Typography */}
      <div className="pt-16 text-center max-w-3xl mx-auto px-4 relative z-10">
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide bg-white border border-gray-200 px-3 py-1 rounded-full text-gray-700 shadow-xs mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Weekly harvest, straight to your door
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold text-[#111111] tracking-tight leading-[1.1]">
          Fresh from the farm.<br />
          Shaped <span className="font-serif-italic font-normal">for your</span> fridge
        </h1>
        <p className="mt-4 text-base md:text-lg text-gray-600 max-w-xl mx-auto">
          A weekly box of farm-fresh fruits and vegetables, packed neatly, delivered quickly.
        </p>
      </div>

      {/* Physics Sticker Wall */}
      <PhysicsStickerWall
        images={[
          { src: "/stickers/watermelon.png", alt: "Watermelon" },
          { src: "/stickers/tomato.png", alt: "Tomato" },
          { src: "/stickers/lemon.png", alt: "Lemon" },
          { src: "/stickers/dragonfruit.png", alt: "Dragonfruit" },
          { src: "/stickers/eggplant.png", alt: "Eggplant" },
          { src: "/stickers/banana.png", alt: "Banana" },
          { src: "/stickers/blueberry.png", alt: "Blueberry" },
          { src: "/stickers/orange.png", alt: "Orange" },
        ]}
        stickerCount={14}
        stickerSize={115}
        gravityStrength={${gravity}}
        restitution={${restitution}}
        friction={${friction}}
        throwPower={${throwPower}}
      />
    </div>
  );
}`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#F4F4F2] flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* Top Header Navigation */}
      <header className="w-full max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between z-20">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-black rounded-lg flex items-center justify-center shadow-xs cursor-pointer hover:scale-105 transition-transform">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zm-9 9h7v7H4v-7zm9 0h7v7h-7v-7z" />
            </svg>
          </div>
        </div>

        {/* Center / Right Links */}
        <nav className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-gray-200/80 shadow-xs">
          <a href="#how" className="text-xs font-semibold text-gray-700 hover:text-black px-3 py-1.5 transition-colors">
            How it works
          </a>
          <a href="#boxes" className="text-xs font-semibold text-gray-700 hover:text-black px-3 py-1.5 transition-colors">
            Boxes
          </a>
          <a href="#faq" className="text-xs font-semibold text-gray-700 hover:text-black px-3 py-1.5 transition-colors">
            FAQ
          </a>
          <a href="#recipes" className="text-xs font-semibold text-gray-700 hover:text-black px-3 py-1.5 transition-colors">
            Recipes
          </a>
          <button className="ml-2 text-xs font-bold text-white bg-black hover:bg-gray-800 px-4 py-2 rounded-full transition-all shadow-xs active:scale-95">
            Join the drop
          </button>
        </nav>
      </header>

      {/* Main Hero Header Text */}
      <main className="w-full max-w-4xl mx-auto text-center px-6 pt-6 md:pt-12 z-10">
        {/* Green Bullet Badge */}
        <div className="inline-flex items-center gap-2 text-xs font-medium text-gray-800 bg-white border border-gray-200/90 px-3.5 py-1.5 rounded-full shadow-xs mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Weekly harvest, straight to your door
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#111111] tracking-tight leading-[1.12]">
          Fresh from the farm.<br />
          Shaped <span className="font-serif-italic font-normal text-[#222222]">for your</span> fridge
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-sm md:text-base text-gray-600 max-w-lg mx-auto font-normal leading-relaxed">
          A weekly box of farm-fresh fruits and vegetables, packed<br className="hidden sm:inline" /> neatly, delivered quickly.
        </p>

        {/* Interactive Helper Badge */}
        <div className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold text-gray-500 bg-gray-200/60 px-3 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Interactive Physics Wall — Drag & Toss the stickers!</span>
        </div>
      </main>

      {/* Interactive Canvas Physics Sticker Wall Area */}
      <div className="relative w-full h-[480px] md:h-[550px] lg:h-[620px] mt-4 z-10">
        <PhysicsStickerWall
          images={PRODUCE_STICKERS}
          stickerCount={stickerCount}
          stickerSize={stickerSize}
          sizeRandomness={0.2}
          gravityStrength={gravity}
          restitution={restitution}
          friction={friction}
          throwPower={throwPower}
          borderRadius={20}
          respawnTrigger={respawnTrigger}
          className="w-full h-full"
        />

        {/* Bottom Floating Control Bar */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-white/90 backdrop-blur-md p-2 rounded-2xl border border-gray-200 shadow-xl max-w-[92vw] overflow-x-auto">
          <button
            onClick={handleRespawn}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-800 bg-gray-100 hover:bg-gray-200 px-3.5 py-2 rounded-xl transition-colors active:scale-95 whitespace-nowrap"
            title="Drop Fresh Stickers"
          >
            <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
            <span>Drop Stickers</span>
          </button>

          <div className="h-4 w-[1px] bg-gray-200" />

          {/* Quick Presets */}
          <button
            onClick={() => applyPreset("default")}
            className="text-xs font-medium text-gray-700 hover:bg-gray-100 px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap"
          >
            Default
          </button>

          <button
            onClick={() => applyPreset("zeroG")}
            className="flex items-center gap-1 text-xs font-medium text-gray-700 hover:bg-gray-100 px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap"
          >
            <Wind className="w-3 h-3 text-sky-500" />
            Zero-G Float
          </button>

          <button
            onClick={() => applyPreset("superBounce")}
            className="text-xs font-medium text-gray-700 hover:bg-gray-100 px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap"
          >
            High Bounce
          </button>

          <div className="h-4 w-[1px] bg-gray-200" />

          {/* Toggle Sliders Controls */}
          <button
            onClick={() => setShowControls(!showControls)}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl transition-all ${
              showControls ? "bg-black text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Physics</span>
            {showControls ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
          </button>

          <button
            onClick={() => setShowCodeModal(true)}
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-800 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 px-3 py-2 rounded-xl transition-colors"
          >
            <Code className="w-3.5 h-3.5 text-emerald-600" />
            <span>Get Code</span>
          </button>
        </div>

        {/* Live Parameter Customizer Overlay Panel */}
        {showControls && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-gray-200 shadow-2xl w-[340px] text-xs font-sans text-gray-800 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <span className="font-bold text-sm text-black flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
                Live Physics Tuning
              </span>
              <button
                onClick={() => setShowControls(false)}
                className="text-gray-400 hover:text-black font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {/* Gravity */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">Gravity:</span>
                <span className="font-mono text-gray-500">{gravity.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="2.5"
                step="0.05"
                value={gravity}
                onChange={(e) => setGravity(parseFloat(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Bounciness (Restitution) */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">Bounciness:</span>
                <span className="font-mono text-gray-500">{restitution.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="0.95"
                step="0.05"
                value={restitution}
                onChange={(e) => setRestitution(parseFloat(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Sticker Count */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">Sticker Count:</span>
                <span className="font-mono text-gray-500">{stickerCount}</span>
              </div>
              <input
                type="range"
                min="4"
                max="28"
                step="1"
                value={stickerCount}
                onChange={(e) => setStickerCount(parseInt(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Sticker Size */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">Sticker Size:</span>
                <span className="font-mono text-gray-500">{stickerSize}px</span>
              </div>
              <input
                type="range"
                min="60"
                max="170"
                step="5"
                value={stickerSize}
                onChange={(e) => setStickerSize(parseInt(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Throw Power */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">Throw Power:</span>
                <span className="font-mono text-gray-500">{throwPower.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="3.0"
                step="0.1"
                value={throwPower}
                onChange={(e) => setThrowPower(parseFloat(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>

      {/* Code Modal */}
      {showCodeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1E1E1E] text-gray-200 w-full max-w-2xl rounded-2xl border border-gray-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-[#181818]">
              <span className="font-bold text-sm text-white flex items-center gap-2">
                <Code className="w-4 h-4 text-emerald-400" />
                PhysicsStickerWall Component Code
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={copyCode}
                  className="flex items-center gap-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied!" : "Copy Code"}</span>
                </button>
                <button
                  onClick={() => setShowCodeModal(false)}
                  className="text-gray-400 hover:text-white font-bold text-sm"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto font-mono text-xs leading-relaxed text-emerald-300/90 bg-[#121212]">
              <pre>{codeSnippet}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
