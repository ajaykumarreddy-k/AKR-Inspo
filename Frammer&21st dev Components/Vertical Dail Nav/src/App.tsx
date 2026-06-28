import React from "react";
import VerticalDialNav from "./VerticalDialNav";

const SECTIONS = [
  { id: "ai-coder", label: "AI Coder", bgColor: "#e5e5e5" },
  { id: "3d-generalist", label: "3D Generalist", bgColor: "#eecfd0" },
  { id: "digital-artist", label: "Digital Artist", bgColor: "#e8e7b3" },
  { id: "product-designer", label: "Product Designer", bgColor: "#a4ecce" },
  { id: "detail-obsesed", label: "Detail Obsesed", bgColor: "#cdc4fd" },
  { id: "curious", label: "Curious", bgColor: "#f5f5f5" },
];

export function App() {
  return (
    <div className="relative w-full">
      {/* Vertical Dial Navigation */}
      <div className="fixed right-0 top-0 bottom-0 z-50 flex items-center justify-end pointer-events-none">
        <div className="pointer-events-auto h-full">
          <VerticalDialNav
            sections={SECTIONS}
            activeColor="#000000"
            fadeDistance={2}
            font={{
              fontSize: 14,
              fontFamily: "Inter, system-ui, sans-serif",
              letterSpacing: "-0.02em",
            }}
            dialWidth={160}
            itemSpacing={12}
            alignment="right"
          />
        </div>
      </div>

      {/* Sections */}
      <div className="w-full h-full">
        {SECTIONS.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="w-full h-screen flex items-center justify-center snap-start"
            style={{ backgroundColor: section.bgColor }}
          >
            <h1 className="text-6xl md:text-8xl font-medium tracking-tight text-black" style={{ letterSpacing: "-0.04em" }}>
              {section.label}
            </h1>
          </section>
        ))}
      </div>
    </div>
  );
}
