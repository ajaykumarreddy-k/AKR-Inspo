import React from "react";
import { Testimonial } from "./Testimonial";

export function App() {
  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-8 md:p-12 overflow-hidden bg-slate-900 font-sans"
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px",
        overflow: "hidden",
        backgroundColor: "#0f172a",
        margin: 0,
        boxSizing: "border-box",
      }}
    >
      {/* Background Image - Field of flowers under blue sky matching reference image */}
      <div
        className="absolute inset-0 z-0"
        style={{ position: "absolute", inset: 0, zIndex: 0 }}
      >
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=85"
          alt="Field background"
          className="w-full h-full object-cover brightness-[0.9] contrast-[1.05]"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(90%) contrast(105%)",
          }}
        />
        {/* Soft radial overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10"
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.2), transparent, rgba(0,0,0,0.1))",
          }}
        />
      </div>

      {/* Main Content Container */}
      <div
        className="relative z-10 w-full flex items-center justify-center"
        style={{ position: "relative", zIndex: 10, width: "100%", display: "flex", justifyContent: "center" }}
      >
        <Testimonial />
      </div>
    </div>
  );
}

export default App;
