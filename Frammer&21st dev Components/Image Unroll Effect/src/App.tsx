import { UnrollingImage } from "./components/UnrollingImage";

function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 sm:p-8 md:p-12">
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-gray-900 mb-2">
          Image Unroll Effect
        </h1>
        <p className="text-sm text-gray-500 mb-8 tracking-tight">
          A Three.js-powered paper unroll animation
        </p>
        <div className="w-full aspect-[3/2] relative rounded-lg overflow-hidden border border-gray-100 shadow-sm">
          <UnrollingImage
            image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80"
            angle={17}
            rolls={8}
            rollRadius={0.5}
            animation={{
              triggerMode: "appear",
              animationDuration: 1.7,
              animationDelay: 0.3,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
