import React, { useState, useEffect } from "react";
import { ComponentPreview } from "./components/ComponentPreview";
import "./index.css";

// --- React Component Imports ---
// Only components that contain valid React code are imported. 
// HTML/CSS/JS monolithic files will be rendered via the iframe fallback in ComponentPreview.
import Bidirectional from "./components/animations/Bidirectional";
import Gradients from "./components/animations/Gradients";
import Stickyelemet from "./components/animations/Stickyelemet";
import CardStack from "./components/animations/cardstack";
import ImageFollowCursor from "./components/animations/imagefollowcurser";
import ImageRevealOnHover from "./components/animations/imagerevealonhover";
import ImageStackUp from "./components/animations/imagestackup";
import LiquidGlass from "./components/animations/liquidGlass";
import Noise from "./components/animations/noise";
import SmoothScroll from "./components/animations/smoothscroll";
import SwapAndDrag from "./components/animations/swapanddrag";
import TextAnimation from "./components/animations/textanimation";
import UniDirection from "./components/animations/unidirection";
import TextScrollReveal from "./components/animations/TextScrollReveal";

const COMPONENTS = [
  { id: "Bidirectional", name: "Bidirectional Scroll", component: Bidirectional },
  { id: "Drawapath", name: "Draw a Path" }, // Monolithic HTML
  { id: "Gradients", name: "Shader Gradients", component: Gradients },
  { id: "Horizontaltext", name: "Horizontal Text" }, // Monolithic HTML
  { id: "Stickyelemet", name: "Sticky Element", component: Stickyelemet },
  { id: "animatealongpath", name: "Animate Along Path" }, // Monolithic HTML
  { id: "cardstack", name: "Card Stack", component: CardStack },
  { id: "footerbounce", name: "Footer Bounce" }, // Monolithic HTML
  { id: "imagefollowcurser", name: "Image Follow Cursor", component: ImageFollowCursor },
  { id: "imagerevealonhover", name: "Image Reveal on Hover", component: ImageRevealOnHover },
  { id: "imagestackup", name: "Image Stack Up", component: ImageStackUp },
  { id: "liquidGlass", name: "Liquid Glass", component: LiquidGlass },
  { id: "noise", name: "Noise Effect", component: Noise },
  { id: "scrollwaypointsmd", name: "Scroll Waypoints" }, // Monolithic HTML
  { id: "smoothscroll", name: "Smooth Scroll (Lenis)", component: SmoothScroll },
  { id: "smoothscrolling", name: "Smooth Scrolling V2" }, // Monolithic HTML
  { id: "swapanddrag", name: "Swap and Drag", component: SwapAndDrag },
  { id: "textanimation", name: "Text Animation", component: TextAnimation },
  { id: "unidirection", name: "Uni-Directional", component: UniDirection },
  { id: "TextScrollReveal", name: "Sticky Scroll Reveal Text", component: TextScrollReveal },
];

function parseMonolithicHTML(rawMd: string): string {
  let html = "", css = "", js = "";
  const lines = rawMd.split("\n");
  let mode = "";

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "html" || trimmed === "\`\`\`html") { mode = "html"; continue; }
    if (trimmed === "css" || trimmed === "\`\`\`css") { mode = "css"; continue; }
    if (trimmed === "js" || trimmed === "javascript" || trimmed === "\`\`\`js" || trimmed === "\`\`\`javascript") { mode = "js"; continue; }
    if (trimmed === "\`\`\`") { mode = ""; continue; }

    if (mode === "html") html += line + "\n";
    else if (mode === "css") css += line + "\n";
    else if (mode === "js") js += line + "\n";
  }

  // If there's no HTML/CSS/JS blocks found, just wrap the whole thing in a pre tag
  if (!html && !css && !js) {
      return `<!DOCTYPE html><html><body style="background:#111;color:#fff;padding:2rem;"><pre>${rawMd}</pre></body></html>`;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body { margin: 0; padding: 0; overflow-x: hidden; }
${css}
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/Flip.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/MotionPathPlugin.min.js"></script>
<script src="https://assets.codepen.io/16327/MorphSVGPlugin3.min.js"></script>
<script src="https://assets.codepen.io/16327/SplitText3.min.js"></script>
<script src="https://assets.codepen.io/16327/ScrollSmoother.min.js"></script>
<script src="https://assets.codepen.io/16327/DrawSVGPlugin3.min.js"></script>
</head>
<body>
${html}
<script>
${js}
</script>
</body>
</html>`;
}

function ShowcaseItem({ item }: { item: any }) {
  const [code, setCode] = useState<string>("Loading code...");
  const [iframeCode, setIframeCode] = useState<string>("");

  useEffect(() => {
    fetch(`/code/${item.id}.txt`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        const rawText = await res.text();
        setCode(rawText);
        setIframeCode(parseMonolithicHTML(rawText));
      })
      .catch((err) => {
        setCode(`// Error loading code: ${err.message}`);
        setIframeCode(`<!DOCTYPE html><html><body style="color:red;">Failed to load snippet for ${item.id}</body></html>`);
      });
  }, [item.id]);

  const Component = item.component;

  return (
    <div className="mb-16">
      <ComponentPreview code={code} title={item.name} description="Scroll animation preview">
        {Component ? (
          <div className="w-full h-full relative isolate">
            <Component />
          </div>
        ) : (
          <iframe
            srcDoc={iframeCode}
            title={item.name}
            sandbox="allow-scripts allow-modals allow-same-origin"
            className="w-full h-full border-none bg-[#0e100f]"
            style={{ display: 'block', width: '100%', height: '100%' }}
          />
        )}
      </ComponentPreview>
    </div>
  );
}

export function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 border-b border-zinc-800 pb-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Scroll Animations Showcase
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            A comprehensive library of 19 scroll-triggered animations and effects. Toggle between preview and code views to seamlessly integrate them into your projects.
          </p>
        </header>

        <main>
          {COMPONENTS.map((item) => (
            <ShowcaseItem key={item.id} item={item} />
          ))}
        </main>
      </div>
    </div>
  );
}

export default App;
