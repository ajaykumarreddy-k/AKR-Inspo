import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Copy, Code2 } from "lucide-react";

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SNIPPET_CODE = `import React, { useState } from "react";
import { motion } from "framer-motion";

// Framer Spring Config
const springConfig = {
  type: "spring",
  stiffness: 260,
  damping: 25,
  mass: 1.4,
};

export function HoverCard({ card }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative w-[286px] h-[400px] cursor-pointer rounded-[25px] flex-shrink-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: 0.98 }}
    >
      <div className="w-full h-full relative overflow-visible rounded-[25px]">
        {/* Animated Image Wrapper */}
        <motion.div
          className="absolute inset-0 w-full h-[400px] overflow-hidden rounded-[25px] shadow-lg"
          animate={{ y: isHovered ? -45 : 0 }}
          transition={springConfig}
        >
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </motion.div>

        {/* Clean Text Content Overlay */}
        <motion.div
          className="absolute left-0 right-0 bottom-0 p-5 z-20 flex flex-col justify-end"
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10,
          }}
          transition={springConfig}
        >
          <h3 className="font-['Clash_Display'] font-medium text-2xl text-white drop-shadow-md">
            {card.title}
          </h3>
          <p className="text-white/90 text-sm mt-1 drop-shadow-md">
            {card.description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}`;

export const CodeModal: React.FC<CodeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(SNIPPET_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="relative w-full max-w-3xl bg-[#12141d] border border-white/15 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[85vh]"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#161924]">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Code2 className="w-5 h-5 text-emerald-400" />
                <span>React + Framer Motion Code</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium hover:bg-emerald-500/20 transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Code Body */}
            <div className="p-6 overflow-y-auto bg-[#0c0d13] font-mono text-xs text-slate-200 leading-relaxed">
              <pre>
                <code>{SNIPPET_CODE}</code>
              </pre>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
