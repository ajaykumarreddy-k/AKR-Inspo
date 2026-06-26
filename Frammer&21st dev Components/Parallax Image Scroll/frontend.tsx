import React from "react";
import { createRoot } from "react-dom/client";
import ParallaxImage from "./ParallaxImage";

const imageUrls = [
  "https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=400&q=80",
  "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=400&q=80",
  "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?w=400&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80",
];

const cards = [
  { label: "Vertical 50%", v: 50, h: 0 },
  { label: "Vertical 30%", v: 30, h: 0 },
  { label: "Vertical 80%", v: 80, h: 0 },
  { label: "Horizontal 30%", v: 0, h: 30 },
  { label: "Both 40%", v: 40, h: 40 },
  { label: "Vertical -50%", v: -50, h: 0 },
];

function App() {
  return (
    <>
      {cards.map((card, i) => (
        <div className="card" key={i}>
          <ParallaxImage
            image={imageUrls[i % imageUrls.length]!}
            verticalParallaxAmount={card.v}
            horizontalParallaxAmount={card.h}
            borderRadius={12}
          />
          <span className="card-label">{card.label}</span>
        </div>
      ))}
    </>
  );
}

const root = createRoot(document.getElementById("grid")!);
root.render(<App />);
