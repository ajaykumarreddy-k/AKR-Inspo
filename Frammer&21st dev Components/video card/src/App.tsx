import React, { useState } from "react";
import { VideoCard } from "./VideoCard";

const SAMPLE_VIDEOS = [
  {
    name: "Night Sky & Mountains (Default)",
    url: "https://assets.mixkit.co/videos/preview/mixkit-starry-night-sky-over-mountains-41551-large.mp4",
    poster: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Cyberpunk City Lights",
    url: "https://assets.mixkit.co/videos/preview/mixkit-vertical-video-of-a-futuristic-city-at-night-41443-large.mp4",
    poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Cosmic Nebula Loop",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
  },
];

const ACCENT_COLORS = [
  { name: "HUD Blue (Default)", hex: "#7EACB5" },
  { name: "Cyan Cyber", hex: "#00F0FF" },
  { name: "Neon Emerald", hex: "#3BE374" },
  { name: "Crimson Red", hex: "#FF3366" },
  { name: "Amber Glow", hex: "#FFAA00" },
];

export function App() {
  const [selectedVideo, setSelectedVideo] = useState(SAMPLE_VIDEOS[0]);
  const [accentColor, setAccentColor] = useState("#7EACB5");
  const [enableTilt, setEnableTilt] = useState(true);
  const [segments, setSegments] = useState(40);
  const [showControls, setShowControls] = useState(true);
  const [cardWidth, setCardWidth] = useState(540);

  return (
    <div className="min-h-screen bg-[#08080c] text-slate-100 flex flex-col items-center justify-center p-4 md:p-12 relative overflow-hidden font-sans selection:bg-[#7EACB5]/30">
      {/* Background Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#7EACB5]/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Main Component Display Stage */}
      <div className="relative z-10 my-4 flex items-center justify-center w-full max-w-4xl">
        <VideoCard
          src={selectedVideo.url}
          poster={selectedVideo.poster}
          accentColor={accentColor}
          enableTilt={enableTilt}
          segments={segments}
          showControls={showControls}
          style={{ width: cardWidth }}
        />
      </div>

      {/* Interactive Controls & Customization Panel */}
      <div className="mt-8 w-full max-w-3xl bg-slate-900/70 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-2xl relative z-10">
        <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-6 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7EACB5]" />
          Live Customization Controls
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          {/* Video Selector */}
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-2">Video Source Preset</label>

            <div className="space-y-2">
              {SAMPLE_VIDEOS.map((vid, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedVideo(vid)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${
                    selectedVideo.url === vid.url
                      ? "border-[#7EACB5] bg-[#7EACB5]/10 text-white shadow-[0_0_15px_rgba(126,172,181,0.2)]"
                      : "border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  <span>{vid.name}</span>
                  {selectedVideo.url === vid.url && (
                    <span className="text-[#3BE374] font-mono text-[10px] uppercase">Selected</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Accent Color Palette */}
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-2">Accent Color Theme</label>
            <div className="flex flex-wrap gap-2.5 mb-5">
              {ACCENT_COLORS.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setAccentColor(c.hex)}
                  title={c.name}
                  className={`w-9 h-9 rounded-xl border-2 transition-all flex items-center justify-center relative ${
                    accentColor === c.hex
                      ? "border-white scale-110 shadow-lg"
                      : "border-transparent opacity-75 hover:opacity-100 hover:scale-105"
                  }`}
                  style={{ backgroundColor: c.hex }}
                >
                  {accentColor === c.hex && (
                    <span className="w-2 h-2 rounded-full bg-black/60" />
                  )}
                </button>
              ))}
            </div>

            {/* Custom Settings Sliders */}
            <div className="space-y-4 pt-2 border-t border-slate-800">
              <div>
                <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                  <span>Card Width: {cardWidth}px</span>
                </div>
                <input
                  type="range"
                  min={360}
                  max={680}
                  step={10}
                  value={cardWidth}
                  onChange={(e) => setCardWidth(Number(e.target.value))}
                  className="w-full accent-[#7EACB5] cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-mono text-slate-300">3D Interactive Tilt</span>
                <button
                  onClick={() => setEnableTilt(!enableTilt)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono border transition-all ${
                    enableTilt
                      ? "bg-[#7EACB5]/20 border-[#7EACB5] text-[#7EACB5]"
                      : "bg-slate-800 border-slate-700 text-slate-400"
                  }`}
                >
                  {enableTilt ? "ENABLED" : "DISABLED"}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-300">Show Controls</span>
                <button
                  onClick={() => setShowControls(!showControls)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono border transition-all ${
                    showControls
                      ? "bg-[#7EACB5]/20 border-[#7EACB5] text-[#7EACB5]"
                      : "bg-slate-800 border-slate-700 text-slate-400"
                  }`}
                >
                  {showControls ? "VISIBLE" : "HIDDEN"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
