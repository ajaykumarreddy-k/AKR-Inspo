import React, { useState } from "react";
import { DEMO_CARDS, TickerCardItem } from "./data/tickerData";
import { HoverTicker } from "./components/HoverTicker";
import { HoverCard } from "./components/HoverCard";
import { ControlsPanel, TickerControls } from "./components/ControlsPanel";
import { CardModal } from "./components/CardModal";
import { CodeModal } from "./components/CodeModal";

export function App() {
  const [selectedCard, setSelectedCard] = useState<TickerCardItem | null>(null);
  const [isCodeOpen, setIsCodeOpen] = useState(false);

  const [controls, setControls] = useState<TickerControls>({
    speed: 35,
    gap: 10,
    pauseOnHover: true,
    direction: "left",
    isMobileSize: false,
  });

  const handleControlChange = (updated: Partial<TickerControls>) => {
    setControls((prev) => ({ ...prev, ...updated }));
  };

  return (
    <div className="min-h-screen bg-[#0a0b10] text-slate-100 flex flex-col justify-center items-center font-sans selection:bg-emerald-500/30 selection:text-emerald-200 py-10">
      {/* Background Decorative Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-500/10 blur-[160px] rounded-full" />
      </div>

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-7xl px-4 sm:px-6 flex flex-col gap-6 items-center">
        {/* Controls Toolbar */}
        <ControlsPanel
          controls={controls}
          onChange={handleControlChange}
          onOpenCode={() => setIsCodeOpen(true)}
        />

        {/* Live Hover Ticker Canvas */}
        <section className="w-full bg-[#0d0f17]/90 border border-white/10 rounded-3xl p-2 sm:p-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
          <HoverTicker
            items={DEMO_CARDS}
            speed={controls.speed}
            gap={controls.gap}
            direction={controls.direction}
            pauseOnHover={controls.pauseOnHover}
            mobile={controls.isMobileSize}
            onCardClick={(card) => setSelectedCard(card)}
          />
        </section>
      </main>

      {/* Modals */}
      <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />
      <CodeModal isOpen={isCodeOpen} onClose={() => setIsCodeOpen(false)} />
    </div>
  );
}

export default App;
