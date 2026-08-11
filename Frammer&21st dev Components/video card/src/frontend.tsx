/**
 * Entry point for the React app.
 */
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./index.css";

function start() {
  const rootElement = document.getElementById("root");
  if (!rootElement) return;
  const root = createRoot(rootElement);
  root.render(<App />);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}
