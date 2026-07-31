import React from "react";
import { ExpandOnHoverList } from "./ExpandOnHoverList";
import "./index.css";

export function App() {
  return (
    <main className="w-full min-h-screen bg-white flex items-center justify-center p-4 md:p-12">
      <ExpandOnHoverList />
    </main>
  );
}

export default App;
