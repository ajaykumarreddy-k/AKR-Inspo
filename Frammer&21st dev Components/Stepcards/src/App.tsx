import React from "react";
import { CollapsingCards } from "./components/CollapsingCards";
import "./index.css";

export function App() {
  return (
    <main className="min-h-screen w-full bg-[#121212] text-white flex flex-col items-center justify-center p-4 md:p-12 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[1200px] relative z-10 flex flex-col items-center gap-8">
        {/* Component Showcase */}
        <CollapsingCards />
      </div>
    </main>
  );
}

export default App;
