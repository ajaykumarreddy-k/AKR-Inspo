import { createRoot } from "react-dom/client"
import ShinyCursor from "./components/ShinyCursor"

function App() {
  return (
    <div className="min-h-screen overflow-hidden bg-black text-white">
      <ShinyCursor color="#ffffff" size={100} brightness={75} edgeBlur={10} radius={90}>
        <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <h1 className="text-7xl font-bold tracking-tight md:text-9xl">
            Shiny Cursor
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-neutral-400">
            Move your cursor around to see the specular lighting effect
            follow your mouse.
          </p>
          <div className="mt-16 grid gap-6 md:grid-cols-3 text-center">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8"
              >
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-neutral-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </ShinyCursor>
    </div>
  )
}

const features = [
  {
    title: "Real-time Tracking",
    description: "The specular highlight follows your cursor with pixel-perfect precision.",
  },
  {
    title: "Customizable",
    description: "Adjust color, size, brightness, and edge blur to match your design.",
  },
  {
    title: "Smooth Performance",
    description: "Optimized for 60 FPS using native SVG filter compositing.",
  },
]

const root = createRoot(document.getElementById("root")!)
root.render(<App />)
