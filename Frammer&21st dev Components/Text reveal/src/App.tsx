import { useState } from "react";
import "./index.css";
import TextRevealScroll from "./TextRevealScroll";

export function App() {
  const [revealMode, setRevealMode] = useState<"chars" | "words">("chars");

  return (
    <div className="min-h-[250vh] bg-[#111111] text-[#EBEBEB] selection:bg-white/20">
      {/* Top Toggle Switch */}
      <div className="fixed top-8 left-0 right-0 flex justify-center z-50">
        <div className="bg-white rounded-full p-1 flex items-center shadow-xl">
          <button
            onClick={() => setRevealMode("chars")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
              revealMode === "chars"
                ? "bg-[#111111] text-white"
                : "bg-transparent text-[#111111] hover:bg-black/5"
            }`}
          >
            Characters
          </button>
          <button
            onClick={() => setRevealMode("words")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
              revealMode === "words"
                ? "bg-[#111111] text-white"
                : "bg-transparent text-[#111111] hover:bg-black/5"
            }`}
          >
            Words
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="h-screen flex flex-col items-center justify-center text-center p-8">
        <h1 className="text-[40px] font-medium tracking-tight">
          ↓ Scroll Down ↓
        </h1>
      </div>

      {/* Text Reveal Section */}
      <div key={revealMode} className="max-w-[900px] mx-auto px-8 py-20 relative">
        <TextRevealScroll 
          revealMode={revealMode} 
          startOffset={80} 
          endOffset={40} 
          dimOpacity={0.15}
          targetClass="reveal-text" 
        />
        
        <p className="reveal-text text-[40px] md:text-[56px] font-medium leading-[1.1] mb-16 text-white tracking-tight">
          <span className="font-bold">Framer</span> Components are reusable, interactive building blocks that you can drop right onto your canvas. Use them to create anything from simple buttons to complex interfaces seamlessly.
        </p>
      </div>
      
      {/* Spacer to allow scrolling past the text */}
      <div className="h-[80vh]"></div>
    </div>
  );
}

export default App;
