import CustomScrollGrid from './components/CustomScrollGrid';
import { ReactLenis } from 'lenis/react';

function App() {
  return (
    <ReactLenis root>
      <main className="bg-black min-h-screen">
        <CustomScrollGrid />
      </main>
    </ReactLenis>
  );
}

export default App;
