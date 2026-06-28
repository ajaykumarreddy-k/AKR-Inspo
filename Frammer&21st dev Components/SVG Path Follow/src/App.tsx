import "./index.css";
import SVGPathAnimation from "./components/SVGPathAnimation";

export function App() {
  return (
    <div 
      className="min-h-screen w-full bg-white flex flex-col items-center justify-center relative overflow-hidden"
      style={{ fontFamily: "'Product Sans', 'Google Sans', sans-serif" }}
    >
      <div className="absolute inset-0 z-0">
        <SVGPathAnimation 
          svgPath="M 0 50 C 25 10, 75 10, 100 50 C 125 90, 175 90, 200 50 C 225 10, 275 10, 300 50"
          bgColor="transparent"
          animColor="#1bc4a4"
          strokeWidth={4}
          trigger="appear"
          playback="loop"
          animationType="auto"
          autoDuration={5}
          lineCap="round"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      
      <div className="z-10 text-center pointer-events-none p-8 absolute top-12 left-0 w-full">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight text-neutral-900 drop-shadow-sm">SVG Path Follow</h1>
        <p className="text-xl md:text-2xl text-neutral-500 max-w-2xl mx-auto drop-shadow-sm">
          A precise React + Framer Motion reproduction.
        </p>
      </div>
    </div>
  );
}

export default App;
