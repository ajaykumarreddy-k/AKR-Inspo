import React from "react";
import {
  Play,
  Pause,
  ArrowLeftRight,
  Maximize2,
  Minimize2,
  Gauge,
  Sliders,
  Code2,
  Sparkles,
} from "lucide-react";

export interface TickerControls {
  speed: number;
  gap: number;
  pauseOnHover: boolean;
  direction: "left" | "right";
  isMobileSize: boolean;
}

interface ControlsPanelProps {
  controls: TickerControls;
  onChange: (updated: Partial<TickerControls>) => void;
  onOpenCode: () => void;
}

export const ControlsPanel: React.FC<ControlsPanelProps> = ({
  controls,
  onChange,
  onOpenCode,
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-3 bg-[#12141c]/90 border border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-wrap items-center justify-between gap-4">
      {/* Left: Section Label */}
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
        <Sliders className="w-4 h-4 text-emerald-400" />
        <span>Ticker Controls</span>
      </div>

      {/* Center: Control Inputs */}
      <div className="flex flex-wrap items-center gap-3 md:gap-6 text-sm">
        {/* Speed Slider */}
        <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-xl border border-white/5">
          <Gauge className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-400">Speed:</span>
          <input
            type="range"
            min="10"
            max="80"
            step="5"
            value={controls.speed}
            onChange={(e) => onChange({ speed: Number(e.target.value) })}
            className="w-24 accent-emerald-500 cursor-pointer"
          />
          <span className="text-xs font-mono text-emerald-400 min-w-[32px]">
            {controls.speed}s
          </span>
        </div>

        {/* Direction Toggle */}
        <button
          onClick={() =>
            onChange({
              direction: controls.direction === "left" ? "right" : "left",
            })
          }
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 border border-white/5 hover:border-white/20 text-xs font-medium text-slate-200 transition-all cursor-pointer"
        >
          <ArrowLeftRight className="w-3.5 h-3.5 text-slate-400" />
          <span>Direction:</span>
          <span className="font-mono text-emerald-400 capitalize">
            {controls.direction}
          </span>
        </button>

        {/* Pause on Hover Switch */}
        <button
          onClick={() => onChange({ pauseOnHover: !controls.pauseOnHover })}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all text-xs font-medium cursor-pointer ${
            controls.pauseOnHover
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
              : "bg-black/40 border-white/5 text-slate-400"
          }`}
        >
          {controls.pauseOnHover ? (
            <Pause className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Play className="w-3.5 h-3.5 text-slate-400" />
          )}
          <span>Pause on Hover:</span>
          <span className="font-semibold">
            {controls.pauseOnHover ? "ON" : "OFF"}
          </span>
        </button>

        {/* Responsive Preset */}
        <button
          onClick={() => onChange({ isMobileSize: !controls.isMobileSize })}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 border border-white/5 hover:border-white/20 text-xs font-medium text-slate-200 transition-all cursor-pointer"
        >
          {controls.isMobileSize ? (
            <Minimize2 className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
          )}
          <span>Size:</span>
          <span className="font-mono text-emerald-400">
            {controls.isMobileSize ? "Mobile (194x275)" : "Desktop (286x400)"}
          </span>
        </button>
      </div>

      {/* Right: Code Modal Trigger */}
      <button
        onClick={onOpenCode}
        className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
      >
        <Code2 className="w-4 h-4" />
        <span>Get Code</span>
      </button>
    </div>
  );
};
