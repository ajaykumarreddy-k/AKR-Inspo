/**
 * Entry point for the React app.
 * Renders the App component into the root DOM element.
 */

import { createRoot } from "react-dom/client"
import "./index.css"
import { App } from "./App"

function start() {
  const root = createRoot(document.getElementById("root")!)
  root.render(<App />)
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start)
} else {
  start()
}
