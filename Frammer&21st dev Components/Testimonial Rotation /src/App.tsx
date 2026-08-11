import React, { useState } from "react";
import { TestimonialRotation, defaultTestimonials } from "./TestimonialRotation";
import { Play, Pause, RefreshCw, Sparkles, Sliders, Code2, Check, Copy } from "lucide-react";
import "./index.css";

export function App() {
  const [accentColor, setAccentColor] = useState("#EA3829");
  const [autoplayInterval, setAutoplayInterval] = useState(6000);
  const [autoPlay, setAutoPlay] = useState(true);
  const [pauseOnHover, setPauseOnHover] = useState(true);
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  const colors = [
    { label: "Crimson Red", hex: "#EA3829" },
    { label: "Electric Violet", hex: "#8B5CF6" },
    { label: "Emerald Green", hex: "#10B981" },
    { label: "Sky Blue", hex: "#0EA5E9" },
    { label: "Amber Orange", hex: "#F59E0B" },
  ];

  const codeSnippet = `import { TestimonialRotation } from "./TestimonialRotation";

export default function Example() {
  return (
    <TestimonialRotation
      autoplayInterval={${autoplayInterval}}
      autoPlay={${autoPlay}}
      pauseOnHover={${pauseOnHover}}
      accentColor="${accentColor}"
    />
  );
}`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 selection:bg-red-500/30 selection:text-red-200 w-full">
      {/* Background glow effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[140px] opacity-15 transition-all duration-700"
          style={{ backgroundColor: accentColor }}
        />
      </div>

      {/* Main Container */}
      <div className="w-full max-w-5xl relative z-10 flex flex-col gap-8">
        {/* Header Title */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-neutral-900">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-neutral-400 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              <span>Framer Interactive Component</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Testimonial Rotation
            </h1>
            <p className="text-neutral-400 text-sm sm:text-base mt-1">
              Seamless auto-advancing testimonial carousel with segmented progress indicators.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-2 p-1 bg-neutral-900/80 border border-neutral-800 rounded-xl">
            <button
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === "preview"
                  ? "bg-neutral-800 text-white shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              Preview
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === "code"
                  ? "bg-neutral-800 text-white shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              Code
            </button>
          </div>
        </header>

        {activeTab === "preview" ? (
          <>
            {/* Component Live Demo */}
            <main className="py-6 flex items-center justify-center">
              <TestimonialRotation
                testimonials={defaultTestimonials}
                autoplayInterval={autoplayInterval}
                autoPlay={autoPlay}
                pauseOnHover={pauseOnHover}
                accentColor={accentColor}
              />
            </main>

            {/* Interactive Control Panel */}
            <section className="bg-[#0e0e11] border border-neutral-850 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-6 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-neutral-500" />
                Customize Parameters
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Accent Color Selection */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-xs font-medium text-neutral-300">Accent Color</label>
                  <div className="flex items-center gap-2.5">
                    {colors.map((c) => (
                      <button
                        key={c.hex}
                        onClick={() => setAccentColor(c.hex)}
                        className={`w-7 h-7 rounded-full transition-transform cursor-pointer border ${
                          accentColor === c.hex
                            ? "scale-125 border-white ring-2 ring-white/20"
                            : "border-transparent opacity-80 hover:opacity-100"
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.label}
                      />
                    ))}
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-7 h-7 rounded-full cursor-pointer bg-transparent border-0 p-0"
                      title="Custom color"
                    />
                  </div>
                </div>

                {/* Autoplay Toggle & Pause on Hover */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-xs font-medium text-neutral-300">Playback Controls</label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setAutoPlay(!autoPlay)}
                      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                        autoPlay
                          ? "bg-white/10 border-white/20 text-white"
                          : "bg-neutral-900 border-neutral-800 text-neutral-400"
                      }`}
                    >
                      {autoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      {autoPlay ? "Autoplay On" : "Autoplay Off"}
                    </button>

                    <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-400 hover:text-neutral-200">
                      <input
                        type="checkbox"
                        checked={pauseOnHover}
                        onChange={(e) => setPauseOnHover(e.target.checked)}
                        className="rounded border-neutral-700 bg-neutral-900 text-red-500 focus:ring-0 cursor-pointer"
                      />
                      Pause on hover
                    </label>
                  </div>
                </div>

                {/* Duration Slider */}
                <div className="flex flex-col gap-2.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-medium text-neutral-300">Duration per Slide</span>
                    <span className="text-neutral-400 font-mono">{(autoplayInterval / 1000).toFixed(1)}s</span>
                  </div>
                  <input
                    type="range"
                    min={2000}
                    max={12000}
                    step={500}
                    value={autoplayInterval}
                    onChange={(e) => setAutoplayInterval(Number(e.target.value))}
                    className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-red-500"
                  />
                </div>
              </div>
            </section>
          </>
        ) : (
          /* Code View */
          <section className="bg-[#0e0e11] border border-neutral-850 rounded-2xl p-6 relative overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-mono text-neutral-400">ExampleUsage.tsx</span>
              <button
                onClick={copyCode}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-neutral-200 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy Code"}
              </button>
            </div>
            <pre className="p-4 bg-[#050505] rounded-xl overflow-x-auto text-xs sm:text-sm font-mono text-neutral-300 leading-relaxed border border-neutral-900">
              <code>{codeSnippet}</code>
            </pre>
          </section>
        )}
      </div>
    </div>
  );
}

export default App;
