import { createRoot } from "react-dom/client"
import { SignComponent } from "./components/SignComponent"

const root = createRoot(document.getElementById("root")!)

root.render(<SignComponent />)
