import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Heart, Share2, Sparkles, Tag } from "lucide-react";
import { TickerCardItem } from "../data/tickerData";

interface CardModalProps {
  card: TickerCardItem | null;
  onClose: () => void;
}

export const CardModal: React.FC<CardModalProps> = ({ card, onClose }) => {
  return (
    <AnimatePresence>
      {card && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            className="relative w-full max-w-4xl bg-[#13151c] border border-white/15 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row max-h-[90vh]"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/90 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image Section */}
            <div className="w-full md:w-1/2 relative bg-black flex items-center justify-center min-h-[300px] md:min-h-[500px]">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto bg-[#13151c]">
              <div>
                {/* Category Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium tracking-wide mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  {card.category || "Featured Vibe"}
                </div>

                <h2 className="font-clash font-semibold text-3xl md:text-4xl text-white tracking-tight leading-tight">
                  {card.title}
                </h2>

                <p className="font-clash text-lg text-white/80 mt-2 font-normal">
                  {card.description}
                </p>

                <div className="h-px bg-white/10 my-6" />

                <div className="space-y-4 text-sm text-slate-300">
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <span className="text-white/50">Author</span>
                    <span className="font-mono text-emerald-400">{card.author || "@framer_creator"}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <span className="text-white/50">Resolution</span>
                    <span className="font-mono text-white/80">High Definition Asset</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <span className="text-white/50">Animation Type</span>
                    <span className="font-mono text-white/80">Framer Spring Motion</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-4 flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-xl bg-white text-black font-semibold text-sm hover:bg-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-white/10"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Original Asset
                </button>
                <button className="py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-white/10 transition-all flex items-center justify-center cursor-pointer">
                  <Heart className="w-4 h-4 text-rose-400" />
                </button>
                <button className="py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-white/10 transition-all flex items-center justify-center cursor-pointer">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
