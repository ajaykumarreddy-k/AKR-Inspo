import { DocumentFolder } from './components/DocumentFolder';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 overflow-hidden relative">
      {/* Background gradients for a premium feel */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Main Component */}
      <DocumentFolder />
    </div>
  );
}

export default App;
