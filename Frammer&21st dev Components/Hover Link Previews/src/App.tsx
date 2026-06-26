import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { HoverLink } from "./components/HoverLink"

const root = createRoot(document.getElementById("root")!)

const pStyle: React.CSSProperties = {
  fontFamily: '"Inter", "Google Sans", "Google Sans Text", system-ui, sans-serif',
  fontSize: 28,
  lineHeight: 1.6,
  color: "#000",
  maxWidth: 640,
  margin: "40px auto",
}

root.render(
  <StrictMode>
    <div style={pStyle}>
      Explore courses at <HoverLink /> to learn more about interaction design and
      prototyping.
    </div>
  </StrictMode>,
)
