import React from "react";
import { createRoot } from "react-dom/client";
import BurnTransition from "./BurnTransition";

function Demo() {
  return (
    <>
      <section className="hero">
        <div className="burn-wrapper">
          <BurnTransition
            color="#4A6FA5"
            transitionColor="#7B9FD4"
            noiseScale={0.45}
            noiseIntensity={0.35}
            edgeSoftness={0.5}
            bloomIntensity={0.6}
            bloomRadius={0.4}
            baseAnimationSpeed={0.15}
            preview
            parallaxEnabled
            movement={{ horizontal: "center", vertical: 0.6 }}
          />
        </div>
        <h2 style={{ color: "#fff", position: "relative", zIndex: 2 }}>
          Burn
          <br />
          Transition
        </h2>
        <p className="sub" style={{ position: "relative", zIndex: 2 }}>
          WebGL Shader Effect
        </p>
      </section>

      <section className="hero" style={{ background: "#0a0a0f" }}>
        <div className="burn-wrapper">
          <BurnTransition
            color="#2d1b69"
            transitionColor="#b388ff"
            noiseScale={0.3}
            noiseIntensity={0.4}
            edgeSoftness={0.6}
            bloomIntensity={0.8}
            bloomRadius={0.5}
            baseAnimationSpeed={0.12}
            preview
            parallaxEnabled
            movement={{ horizontal: "left", vertical: 0.4 }}
          />
        </div>
        <h2 style={{ color: "#fff", position: "relative", zIndex: 2 }}>
          Purple
          <br />
          Haze
        </h2>
        <p className="sub" style={{ position: "relative", zIndex: 2 }}>
          Scroll to reveal
        </p>
      </section>

      <section className="hero" style={{ background: "#0a0a0f" }}>
        <div className="burn-wrapper">
          <BurnTransition
            color="#1a1a2e"
            transitionColor="#e94560"
            noiseScale={0.5}
            noiseIntensity={0.3}
            edgeSoftness={0.4}
            bloomIntensity={0.7}
            bloomRadius={0.3}
            baseAnimationSpeed={0.1}
            preview
            parallaxEnabled
            movement={{ horizontal: "right", vertical: 0.5 }}
          />
        </div>
        <h2 style={{ color: "#fff", position: "relative", zIndex: 2 }}>
          Crimson
          <br />
          Edge
        </h2>
        <p className="sub" style={{ position: "relative", zIndex: 2 }}>
          Procedural noise burn
        </p>
      </section>

      <section className="hero" style={{ background: "#0a0a0f" }}>
        <div className="burn-wrapper">
          <BurnTransition
            color="#0f3460"
            transitionColor="#53d8fb"
            noiseScale={0.35}
            noiseIntensity={0.45}
            edgeSoftness={0.5}
            bloomIntensity={0.9}
            bloomRadius={0.6}
            baseAnimationSpeed={0.08}
            preview
            parallaxEnabled
            movement={{ horizontal: "center", vertical: 0.7 }}
          />
        </div>
        <h2 style={{ color: "#fff", position: "relative", zIndex: 2 }}>
          Neon
          <br />
          Burn
        </h2>
        <p className="sub" style={{ position: "relative", zIndex: 2 }}>
          Electric transition
        </p>
      </section>

      <div className="demo-content">
        <h3>About Burn Transition</h3>
        <p>
          A real-time WebGL shader that creates organic, noise-driven burn
          transitions. The effect uses fractal Brownian motion to generate
          natural-looking torn edges with uneven transition thickness, fiber-like
          grain, and optional bloom glow.
        </p>
        <p>
          Built from the Framer component — now available as a standalone React
          component. Customize colors, noise intensity, edge softness, bloom, and
          animation direction.
        </p>
        <h3 style={{ marginTop: 48 }}>Controls</h3>
        <p>
          <strong>color</strong> &mdash; Base fill color
          <br />
          <strong>transitionColor</strong> &mdash; Burn edge color
          <br />
          <strong>noiseScale</strong> &mdash; Noise frequency (0&ndash;1)
          <br />
          <strong>noiseIntensity</strong> &mdash; Edge jaggedness (0&ndash;1)
          <br />
          <strong>edgeSoftness</strong> &mdash; Transition zone width (0&ndash;1)
          <br />
          <strong>bloomIntensity</strong> &mdash; Glow strength (0&ndash;1)
          <br />
          <strong>bloomRadius</strong> &mdash; Glow spread (0&ndash;1)
          <br />
          <strong>preview</strong> &mdash; Animate continuously on/off
          <br />
          <strong>movement.horizontal</strong> &mdash; left / center / right
          <br />
          <strong>movement.vertical</strong> &mdash; Vertical drift (0&ndash;1)
          <br />
          <strong>parallaxEnabled</strong> &mdash; Parallax on scroll
        </p>
      </div>
    </>
  );
}

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<Demo />);
