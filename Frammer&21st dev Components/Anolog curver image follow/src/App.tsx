import React, { useState } from "react"
import MarqueeAlongSvgPath from "./components/MarqueeAlongSvgPath"
import { 
  Sliders, 
  RotateCcw, 
  MousePointer, 
  Eye, 
  Sparkles, 
  Layers, 
  Gauge, 
  ArrowRightLeft,
  Sun,
  Moon,
  Info,
  Check,
  Zap,
  Wand2
} from "lucide-react"

// Graphic sticker card designs matching exact reference aesthetics
const stickerItems = [
  {
    id: 1,
    bg: "bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-rose-500/25",
    content: (
      <div className="w-full h-full flex items-center justify-center font-serif text-4xl sm:text-5xl font-black italic tracking-tighter drop-shadow-md select-none">
        &amp;
      </div>
    ),
  },
  {
    id: 2,
    bg: "bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-sky-500/25",
    content: (
      <div className="w-full h-full flex flex-col items-center justify-center p-1.5 text-center leading-none select-none">
        <span className="font-mono text-[10px] font-bold tracking-widest uppercase opacity-90 mb-0.5">AaBbCc</span>
        <span className="font-mono text-[10px] font-extrabold tracking-tight">DdEeFfGg</span>
        <span className="font-mono text-[9px] opacity-80">HhIiJjKk</span>
        <span className="font-mono text-[8px] mt-0.5 bg-white/25 px-1 py-0.5 rounded font-bold">012345678</span>
      </div>
    ),
  },
  {
    id: 3,
    bg: "bg-gradient-to-br from-amber-200 to-orange-300 text-[#9a3412] shadow-amber-500/25",
    content: (
      <div className="w-full h-full flex flex-col items-center justify-center p-1.5 select-none">
        <span className="font-mono text-xs font-bold tracking-wider opacity-75">01234</span>
        <span className="font-mono text-xs font-extrabold tracking-wider mt-0.5">56789</span>
      </div>
    ),
  },
  {
    id: 4,
    bg: "bg-gradient-to-br from-zinc-800 to-zinc-950 text-white shadow-zinc-900/40",
    content: (
      <div className="w-full h-full flex items-center justify-center font-mono text-3xl sm:text-4xl font-extrabold tracking-tighter select-none">
        <span className="transform -rotate-12 scale-125">3</span>
      </div>
    ),
  },
  {
    id: 5,
    bg: "bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-purple-500/25",
    content: (
      <div className="w-full h-full flex flex-wrap items-center justify-center p-1 font-bold text-base leading-tight select-none">
        <div className="w-full text-center tracking-widest text-[10px] font-mono opacity-85">123</div>
        <div className="w-full text-center text-lg tracking-tighter font-extrabold">4567</div>
        <div className="w-full text-center text-[10px] font-mono tracking-widest opacity-85">890</div>
      </div>
    ),
  },
  {
    id: 6,
    bg: "bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-green-500/25",
    content: (
      <div className="w-full h-full flex items-center justify-center font-sans text-4xl sm:text-5xl font-black tracking-tighter select-none">
        &amp;
      </div>
    ),
  },
  {
    id: 7,
    bg: "bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-rose-600/25",
    content: (
      <div className="w-full h-full flex items-center justify-center select-none">
        <span className="font-serif text-4xl sm:text-5xl font-black tracking-tight transform rotate-6">a</span>
      </div>
    ),
  },
  {
    id: 8,
    bg: "bg-gradient-to-br from-pink-200 to-pink-300 text-[#9d174d] shadow-pink-500/25",
    content: (
      <div className="w-full h-full flex flex-col items-center justify-center p-1 font-sans text-[11px] font-bold leading-tight select-none">
        <span>abcdefg</span>
        <span>hijklmn</span>
        <span>opqrstu</span>
        <span>vwxyz</span>
      </div>
    ),
  },
  {
    id: 9,
    bg: "bg-gradient-to-br from-teal-500 to-emerald-700 text-white shadow-teal-500/25",
    content: (
      <div className="w-full h-full flex items-center justify-center font-serif text-4xl sm:text-5xl font-bold italic select-none">
        g
      </div>
    ),
  },
  {
    id: 10,
    bg: "bg-gradient-to-br from-red-500 to-rose-700 text-white shadow-red-600/25",
    content: (
      <div className="w-full h-full flex items-center justify-center font-sans text-5xl sm:text-6xl font-black tracking-tighter select-none">
        A
      </div>
    ),
  },
  {
    id: 11,
    bg: "bg-gradient-to-br from-amber-400 to-orange-500 text-black shadow-amber-500/25",
    content: (
      <div className="w-full h-full flex flex-col items-center justify-center p-1.5 font-mono font-black select-none">
        <span className="text-lg">ZZ</span>
        <span className="text-[11px] tracking-widest">XxYy</span>
        <span className="text-[9px]">012345678</span>
      </div>
    ),
  },
  {
    id: 12,
    bg: "bg-white text-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-zinc-300/30",
    content: (
      <div className="w-full h-full flex items-center justify-center font-mono text-3xl sm:text-4xl font-extrabold select-none">
        §
      </div>
    ),
  },
]

// Preset SVG paths with spacious center loop opening and offscreen entry/exit
const PRESET_PATHS = [
  {
    id: "analog-loop",
    name: "Analog Ribbon Loop",
    viewBox: "0 0 1200 600",
    path: "M -200 440 C 100 460, 250 480, 380 440 C 540 380, 620 80, 450 60 C 280 40, 240 360, 480 440 C 720 500, 950 360, 1400 280",
    description: "Wide ribbon loop with a clear open center gap (matching reference design)",
  },
  {
    id: "infinity",
    name: "Infinity Figure 8",
    viewBox: "0 0 1000 500",
    path: "M 500 250 C 620 400, 920 400, 920 250 C 920 100, 620 100, 500 250 C 380 400, 80 400, 80 250 C 80 100, 380 100, 500 250 Z",
    description: "Continuous figure-eight loop with twin open centers",
  },
  {
    id: "wave",
    name: "Sine Wave Flow",
    viewBox: "0 0 1200 600",
    path: "M -200 300 C 150 100, 350 500, 600 300 C 850 100, 1050 500, 1400 300",
    description: "Smooth undulating wave path extending across the viewport",
  },
  {
    id: "circle",
    name: "Orbital Circle",
    viewBox: "0 0 600 600",
    path: "M 300 100 A 200 200 0 1 1 299.9 100 Z",
    description: "Perfect circular orbital path with spacious open center",
  },
]

export function App() {
  const [selectedPathIndex, setSelectedPathIndex] = useState(0)
  const [baseVelocity, setBaseVelocity] = useState(6)
  const [direction, setDirection] = useState<"normal" | "reverse">("normal")
  const [repeatCount, setRepeatCount] = useState(2)
  const [cardScale, setCardScale] = useState<"sm" | "md" | "lg">("sm")
  const [showPath, setShowPath] = useState(false)
  const [slowdownOnHover, setSlowdownOnHover] = useState(true)
  const [draggable, setDraggable] = useState(true)
  const [grabCursor, setGrabCursor] = useState(true)
  const [enableRollingZIndex, setEnableRollingZIndex] = useState(true)
  const [responsive, setResponsive] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(true)

  const activePath = PRESET_PATHS[selectedPathIndex]!

  // Dynamic card size mapping tailored for crisp open loop gap
  const cardSizeClasses = {
    sm: "w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-xl",
    md: "w-18 h-18 sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-2xl",
    lg: "w-20 h-20 sm:w-24 sm:h-24 md:w-26 md:h-26 rounded-2xl",
  }[cardScale]

  return (
    <div className={`min-h-screen w-full transition-colors duration-300 font-sans ${isDarkMode ? "bg-[#09090b] text-zinc-100" : "bg-[#f8f9fa] text-zinc-900"}`}>
      {/* Top Header Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b px-6 py-4 flex items-center justify-between border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 via-purple-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-rose-500/20 text-white font-black text-xl tracking-tighter">
            S
          </div>
          <div>
            <h1 className="font-extrabold text-lg tracking-tight flex items-center gap-2 font-['Plus_Jakarta_Sans']">
              Marquee Along SVG Path
              <span className="text-[11px] px-2.5 py-0.5 rounded-full font-mono bg-gradient-to-r from-rose-500/10 to-indigo-500/10 text-rose-500 dark:text-rose-400 font-semibold border border-rose-500/20">
                Google Sans
              </span>
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              Vector motion paths with open center loop physics
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors shadow-sm"
            title="Toggle Light/Dark Mode"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-700" />}
          </button>
          
          <a
            href="#controls"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-indigo-600 text-white hover:opacity-95 transition-opacity shadow-lg shadow-rose-500/20"
          >
            <Wand2 className="w-3.5 h-3.5" /> Controls
          </a>
        </div>
      </header>

      {/* Main Showcase Stage */}
      <main className="relative flex flex-col items-center justify-center overflow-hidden min-h-[68vh] px-4 py-8">
        {/* Subtle Ambient Mesh Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-rose-500/15 via-purple-500/15 to-indigo-500/15 blur-[120px] rounded-full pointer-events-none" />

        {/* Marquee Stage Container */}
        <div className="w-full max-w-6xl h-[540px] relative rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/60 shadow-2xl overflow-hidden flex items-center justify-center backdrop-blur-md">
          
          {/* Decorative Badge */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 dark:bg-zinc-950/80 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
            <span>Path: <strong className="text-zinc-900 dark:text-white font-bold">{activePath.name}</strong></span>
          </div>

          {/* Helper Drag Prompt */}
          {draggable && (
            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 text-[11px] font-medium text-zinc-500 dark:text-zinc-400 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm">
              <MousePointer className="w-3.5 h-3.5 text-indigo-400" />
              <span>Drag stickers along path</span>
            </div>
          )}

          {/* MarqueeAlongSvgPath Component Execution */}
          <MarqueeAlongSvgPath
            path={activePath.path}
            viewBox={activePath.viewBox}
            width="100%"
            height="100%"
            baseVelocity={baseVelocity}
            direction={direction}
            showPath={showPath}
            slowdownOnHover={slowdownOnHover}
            slowDownFactor={0.2}
            repeat={repeatCount}
            draggable={draggable}
            grabCursor={grabCursor}
            dragSensitivity={0.3}
            enableRollingZIndex={enableRollingZIndex}
            responsive={responsive}
            className="w-full h-full"
          >
            {stickerItems.map((item) => (
              <div
                key={item.id}
                className={`${cardSizeClasses} ${item.bg} shadow-xl hover:shadow-2xl transition-transform duration-200 transform hover:scale-110 flex items-center justify-center border-2 border-white/40 dark:border-white/20 cursor-pointer overflow-hidden backdrop-blur-sm group`}
              >
                {item.content}
              </div>
            ))}
          </MarqueeAlongSvgPath>
        </div>
      </main>

      {/* Control Panel Section */}
      <section id="controls" className="max-w-6xl mx-auto px-4 pb-16">
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800/80 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between pb-6 border-b border-zinc-100 dark:border-zinc-800">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2 font-['Plus_Jakarta_Sans']">
                <Sliders className="w-5 h-5 text-rose-500" />
                Component Controls &amp; Options
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                Customize velocity, path presets, card sizing, physics, and layering options
              </p>
            </div>
            
            <button
              onClick={() => {
                setBaseVelocity(6)
                setDirection("normal")
                setRepeatCount(2)
                setCardScale("sm")
                setShowPath(false)
                setSlowdownOnHover(true)
                setDraggable(true)
                setGrabCursor(true)
                setEnableRollingZIndex(true)
                setResponsive(true)
                setSelectedPathIndex(0)
              }}
              className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
            
            {/* SVG Path Preset Select */}
            <div className="space-y-2.5 lg:col-span-3">
              <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" /> Select Motion Path Preset
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {PRESET_PATHS.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPathIndex(idx)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      selectedPathIndex === idx
                        ? "border-rose-500 bg-rose-50/70 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200 ring-2 ring-rose-500/20 shadow-md"
                        : "border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-800/30"
                    }`}
                  >
                    <div className="font-bold text-sm flex items-center justify-between">
                      {p.name}
                      {selectedPathIndex === idx && <Check className="w-4 h-4 text-rose-500" />}
                    </div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-1 font-medium">{p.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Velocity Slider */}
            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800/60 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-emerald-500" /> Base Velocity
                </label>
                <span className="font-mono text-xs font-bold bg-white dark:bg-zinc-800 px-2.5 py-0.5 rounded-lg border border-zinc-200 dark:border-zinc-700">
                  {baseVelocity}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                step="0.5"
                value={baseVelocity}
                onChange={(e) => setBaseVelocity(parseFloat(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
              <p className="text-[11px] text-zinc-400 font-medium">Controls base movement speed along the path.</p>
            </div>

            {/* Direction, Repetition & Card Scale */}
            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800/60 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <ArrowRightLeft className="w-4 h-4 text-amber-500" /> Direction &amp; Sizing
                </label>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setDirection(direction === "normal" ? "reverse" : "normal")}
                  className="flex-1 py-1.5 px-3 rounded-xl text-xs font-bold border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  Direction: <span className="text-rose-500 capitalize font-extrabold">{direction}</span>
                </button>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Tile Sizing</span>
                <div className="flex items-center gap-1">
                  {(["sm", "md", "lg"] as const).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setCardScale(sz)}
                      className={`px-2.5 py-1 text-xs font-bold uppercase rounded-lg border transition-all ${
                        cardScale === sz
                          ? "bg-rose-500 text-white border-rose-500 shadow-sm"
                          : "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Repetitions</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      onClick={() => setRepeatCount(num)}
                      className={`w-7 h-7 text-xs font-bold rounded-lg border transition-all ${
                        repeatCount === num
                          ? "bg-rose-500 text-white border-rose-500 shadow-sm"
                          : "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300"
                      }`}
                    >
                      {num}x
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Physics & Layering Toggles */}
            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800/60 space-y-3">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 mb-1">
                <MousePointer className="w-4 h-4 text-sky-400" /> Layering &amp; Physics
              </label>

              <label className="flex items-center justify-between text-xs cursor-pointer select-none">
                <span className="text-zinc-600 dark:text-zinc-300 font-semibold">Deterministic Z-Index</span>
                <input
                  type="checkbox"
                  checked={enableRollingZIndex}
                  onChange={(e) => setEnableRollingZIndex(e.target.checked)}
                  className="rounded text-rose-500 focus:ring-rose-500 accent-rose-500 cursor-pointer w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between text-xs cursor-pointer select-none">
                <span className="text-zinc-600 dark:text-zinc-300 font-semibold">Draggable Path</span>
                <input
                  type="checkbox"
                  checked={draggable}
                  onChange={(e) => setDraggable(e.target.checked)}
                  className="rounded text-rose-500 focus:ring-rose-500 accent-rose-500 cursor-pointer w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between text-xs cursor-pointer select-none">
                <span className="text-zinc-600 dark:text-zinc-300 font-semibold">Slowdown On Hover</span>
                <input
                  type="checkbox"
                  checked={slowdownOnHover}
                  onChange={(e) => setSlowdownOnHover(e.target.checked)}
                  className="rounded text-rose-500 focus:ring-rose-500 accent-rose-500 cursor-pointer w-4 h-4"
                />
              </label>
            </div>

            {/* Display & Visual Toggles */}
            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800/60 space-y-3">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 mb-1">
                <Eye className="w-4 h-4 text-purple-400" /> Display Settings
              </label>

              <label className="flex items-center justify-between text-xs cursor-pointer select-none">
                <span className="text-zinc-600 dark:text-zinc-300 font-semibold">Show SVG Path Line</span>
                <input
                  type="checkbox"
                  checked={showPath}
                  onChange={(e) => setShowPath(e.target.checked)}
                  className="rounded text-rose-500 focus:ring-rose-500 accent-rose-500 cursor-pointer w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between text-xs cursor-pointer select-none">
                <span className="text-zinc-600 dark:text-zinc-300 font-semibold">Grab Cursor</span>
                <input
                  type="checkbox"
                  checked={grabCursor}
                  onChange={(e) => setGrabCursor(e.target.checked)}
                  className="rounded text-rose-500 focus:ring-rose-500 accent-rose-500 cursor-pointer w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between text-xs cursor-pointer select-none">
                <span className="text-zinc-600 dark:text-zinc-300 font-semibold">Responsive Scaling</span>
                <input
                  type="checkbox"
                  checked={responsive}
                  onChange={(e) => setResponsive(e.target.checked)}
                  className="rounded text-rose-500 focus:ring-rose-500 accent-rose-500 cursor-pointer w-4 h-4"
                />
              </label>
            </div>

            {/* Quick Code Reference / Usage */}
            <div className="md:col-span-2 lg:col-span-2 p-5 rounded-2xl bg-zinc-950 text-zinc-200 font-mono text-xs overflow-x-auto space-y-2 border border-zinc-800/80 shadow-inner">
              <div className="text-zinc-400 font-sans font-bold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> Usage Example
              </div>
              <pre className="text-emerald-400">
{`<MarqueeAlongSvgPath
  path="${activePath.path.substring(0, 45)}..."
  viewBox="${activePath.viewBox}"
  baseVelocity={${baseVelocity}}
  direction="${direction}"
  enableRollingZIndex={${enableRollingZIndex}}
  draggable={${draggable}}
>
  {stickers.map((item) => (
    <StickerCard key={item.id} />
  ))}
</MarqueeAlongSvgPath>`}
              </pre>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
