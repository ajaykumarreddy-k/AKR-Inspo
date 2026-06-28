import React from "react";
import ScalingPageLoadAnimation from "./ScalingPageLoadAnimation";

export default function App() {
  const [key, setKey] = React.useState(0); // Used to replay animation

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <ScalingPageLoadAnimation
        key={key}
        images={[
          "https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=2575&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2575&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1707300238128-091f0951167b?q=80&w=2575&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1682695796254-bf4a5b4814d2?q=80&w=2575&auto=format&fit=crop"
        ]}
      />
      
      {/* Replay button for testing */}
      <button 
        onClick={() => setKey(prev => prev + 1)}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          padding: "10px 20px",
          background: "white",
          color: "black",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          zIndex: 99999,
          fontWeight: 600
        }}
      >
        Replay Animation
      </button>
    </div>
  );
}
