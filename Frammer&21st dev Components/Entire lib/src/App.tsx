import React, { useEffect, useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, X, Code2, Play } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ComponentRegistry } from "./componentRegistry";
import "./index.css";

interface ComponentData {
  name: string;
  fileName: string;
  code: string;
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode, tile?: boolean }, { hasError: boolean; error: any }> {
  constructor(props: { children: React.ReactNode, tile?: boolean }) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  componentDidCatch(error: any, errorInfo: any) {
    console.error("Component Error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      if (this.props.tile) {
        return (
          <div className="w-full h-full flex items-center justify-center bg-red-500/10 text-red-400 text-xs text-center p-4">
            Render Error
          </div>
        );
      }
      return (
        <div className="p-4 bg-red-500/20 text-red-200 rounded-lg border border-red-500/30">
          <h3 className="font-bold mb-2">Failed to render component</h3>
          <p className="text-sm font-mono opacity-80">{this.state.error?.toString()}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const LivePreviewTile = ({ name }: { name: string }) => {
  const Comp = ComponentRegistry[name];
  if (!Comp) return null;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-t-2xl flex items-center justify-center bg-zinc-900/50">
      <ErrorBoundary tile>
        <Suspense fallback={<div className="animate-pulse w-8 h-8 rounded-full bg-zinc-800" />}>
          <div 
            className="origin-center" 
            style={{ 
              transform: 'scale(0.6)', 
              width: '166%', 
              height: '166%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}
          >
            <Comp {...(Comp.defaultProps || {})} />
          </div>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export function App() {
  const [components, setComponents] = useState<ComponentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"code" | "preview">("preview");

  useEffect(() => {
    fetch("/api/components")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setComponents(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch components:", err);
        setLoading(false);
      });
  }, []);

  const handleCopy = (e: React.MouseEvent, id: string, code: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const selectedComponent = components.find((c) => c.name === selectedId);
  const PreviewComponent = selectedId ? ComponentRegistry[selectedId] : null;

  return (
    <div className="min-h-screen p-8 md:p-12 max-w-[1600px] mx-auto text-zinc-100">
      <header className="mb-12 text-center md:text-left flex justify-between items-end">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
            Components
          </h1>
          <p className="text-zinc-400 text-lg">
            A curated library of interactive Framer components.
          </p>
        </div>
      </header>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 relative">
          {components.map((comp) => (
            <motion.div
              key={comp.name}
              layoutId={`card-${comp.name}`}
              onClick={() => {
                setSelectedId(comp.name);
                setViewMode("preview");
              }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl cursor-pointer group hover:border-zinc-600 transition-colors duration-300 flex flex-col overflow-hidden min-h-[340px]"
            >
              <div className="relative flex-1 bg-zinc-950 flex items-center justify-center border-b border-zinc-800 overflow-hidden">
                <LivePreviewTile name={comp.name} />
                <div className="absolute top-4 right-4 bg-zinc-900/80 backdrop-blur px-3 py-1.5 rounded-full border border-zinc-700/50 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-3 h-3 text-zinc-300" />
                  <span className="text-xs font-medium text-zinc-300">Animation</span>
                </div>
              </div>
              <div className="p-5 flex items-center justify-between">
                <div>
                  <motion.h3 layoutId={`title-${comp.name}`} className="text-lg font-medium text-zinc-100 mb-1">
                    {comp.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </motion.h3>
                  <p className="text-sm text-zinc-500">Interactive Component</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {selectedId && selectedComponent && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-40"
            />
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4 md:p-8">
              <motion.div
                layoutId={`card-${selectedId}`}
                className="bg-zinc-900 w-full max-w-6xl max-h-[90vh] min-h-[600px] rounded-2xl overflow-hidden flex flex-col pointer-events-auto shadow-2xl border border-zinc-800"
              >
                <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-950 flex-wrap gap-4">
                  <div className="flex items-center gap-4 pl-2">
                    <div>
                      <motion.h3 layoutId={`title-${selectedId}`} className="text-xl font-medium text-zinc-100">
                        {selectedComponent.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </motion.h3>
                      <p className="text-xs text-zinc-500 mt-1">{selectedComponent.fileName}</p>
                    </div>
                  </div>
                  <div className="flex flex-1 justify-center min-w-[200px]">
                    <div className="bg-zinc-900 p-1 rounded-lg flex gap-1 border border-zinc-800">
                      <button
                        onClick={() => setViewMode("preview")}
                        className={`px-6 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'preview' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'}`}
                      >
                        Preview
                      </button>
                      <button
                        onClick={() => setViewMode("code")}
                        className={`px-6 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'code' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'}`}
                      >
                        Code
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pr-2">
                    <button
                      onClick={(e) => handleCopy(e, selectedId, selectedComponent.code)}
                      className="flex items-center gap-2 px-4 py-2 bg-zinc-100 hover:bg-white text-zinc-900 rounded-lg transition-colors font-medium text-sm"
                    >
                      {copiedId === selectedId ? (
                        <>
                          <Check className="w-4 h-4" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" /> Copy Code
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setSelectedId(null)}
                      className="p-2 ml-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-zinc-100"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="flex-1 overflow-auto relative bg-zinc-950">
                  {viewMode === "code" ? (
                    <div className="absolute inset-0">
                      <SyntaxHighlighter
                        language="typescript"
                        style={vscDarkPlus}
                        customStyle={{
                          margin: 0,
                          padding: '32px',
                          background: 'transparent',
                          fontSize: '14px',
                          lineHeight: '1.6',
                        }}
                        showLineNumbers={true}
                      >
                        {selectedComponent.code}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    <div className="absolute inset-0 p-8 flex items-center justify-center bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px]">
                      <ErrorBoundary>
                        <Suspense fallback={<div className="animate-pulse text-zinc-500">Rendering preview...</div>}>
                          {PreviewComponent && <PreviewComponent {...((PreviewComponent as any).defaultProps || {})} />}
                        </Suspense>
                      </ErrorBoundary>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
