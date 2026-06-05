// src/components/ComponentModal.tsx
import { X, Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: { title: string; image: string } | null;
}

export function ComponentModal({ isOpen, onClose, card }: ModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen || !card) return null;

  const mockCode = `// ${card.title} Component
export default function ${card.title.replace(/\s+/g, '')}() {
  return (
    <div className="p-6 bg-white/30 dark:bg-neutral-900/30 backdrop-blur-xl border border-white/20 dark:border-neutral-800 rounded-3xl shadow-2xl">
      <h3 className="text-xl font-semibold mb-2">${card.title}</h3>
      <p className="opacity-80">Glass element block for AKR-Inspo.</p>
    </div>
  );
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(mockCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-4xl bg-white/70 dark:bg-[#111]/80 backdrop-blur-2xl border border-white/50 dark:border-white/5 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row shadow-black/10 dark:shadow-black/40">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 rounded-full transition-colors backdrop-blur-md"
        >
          <X className="w-5 h-5 text-gray-800 dark:text-gray-200" />
        </button>

        <div className="w-full md:w-1/2 bg-white/40 dark:bg-black/40 p-8 flex flex-col items-center justify-center relative">
          <img 
            src={card.image} 
            alt={card.title}
            className="w-full h-auto object-cover rounded-xl shadow-lg border border-black/5 dark:border-white/5" 
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">{card.title}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 font-medium">Interactive glassmorphism component.</p>
          
          <div className="flex-grow flex flex-col relative group rounded-2xl overflow-hidden shadow-inner border border-neutral-200/50 dark:border-neutral-800/50 bg-white/30 dark:bg-black/50">
            <div className="flex items-center justify-between bg-neutral-100/50 dark:bg-neutral-900/50 backdrop-blur-md text-neutral-700 dark:text-neutral-300 px-4 py-3 border-b border-neutral-200/50 dark:border-neutral-800/50">
              <span className="text-[13px] font-mono font-semibold tracking-tight">React / Tailwind</span>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs font-semibold bg-white/60 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 text-neutral-800 dark:text-white px-3 py-1.5 rounded-lg transition-all shadow-sm"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy Code"}
              </button>
            </div>
            <pre className="flex-grow p-5 overflow-auto text-sm font-mono text-neutral-800 dark:text-neutral-200 leading-relaxed">
              <code>{mockCode}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
