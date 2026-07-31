import React, { useState } from "react";
import { motion } from "framer-motion";
import { TickerCardItem } from "../data/tickerData";

export interface HoverCardProps {
  card: TickerCardItem;
  width?: number; // default 286
  height?: number; // default 400
  mobile?: boolean;
  onClick?: (card: TickerCardItem) => void;
}

// Exact Framer Spring Config
const framerSpringTransition = {
  type: "spring" as const,
  stiffness: 260,
  damping: 25,
  mass: 1.4,
};

export const HoverCard: React.FC<HoverCardProps> = ({
  card,
  width = 286,
  height = 400,
  mobile = false,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Responsive scale down for mobile variant
  const cardWidth = mobile ? 194 : width;
  const cardHeight = mobile ? 275 : height;
  const borderRadius = mobile ? 18 : 25;
  const titleSize = mobile ? "text-[20px]" : "text-[26px]";
  const shiftY = mobile ? -35 : -45;

  return (
    <motion.div
      className="relative cursor-pointer select-none group flex-shrink-0"
      style={{
        width: cardWidth,
        height: cardHeight,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick && onClick(card)}
      whileTap={{ scale: 0.98 }}
    >
      {/* Outer Card Container */}
      <div
        className="w-full h-full relative overflow-visible"
        style={{ borderRadius }}
      >
        {/* Animated Image Wrapper - shifts upward on hover */}
        <motion.div
          className="absolute inset-0 w-full h-full overflow-hidden shadow-xl"
          style={{ borderRadius }}
          animate={{
            y: isHovered ? shiftY : 0,
            height: cardHeight,
          }}
          transition={framerSpringTransition}
        >
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />

          {/* Smooth Dark Gradient for Text Contrast */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none transition-opacity duration-300"
            style={{ opacity: isHovered ? 1 : 0 }}
          />

          {/* Text Content Overlay - Inside Image Container for Perfect Alignment */}
          <motion.div
            className="absolute left-0 right-0 bottom-0 z-20 pointer-events-none flex flex-col justify-end p-4 sm:p-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 10,
            }}
            transition={framerSpringTransition}
          >
            <h3
              className={`font-clash font-medium text-white tracking-tight leading-tight ${titleSize}`}
              style={{
                textShadow: "0 2px 10px rgba(0,0,0,0.9)",
              }}
            >
              {card.title}
            </h3>
            <p
              className="font-clash font-normal text-white/90 text-[14px] leading-snug mt-1"
              style={{
                textShadow: "0 2px 6px rgba(0,0,0,0.9)",
              }}
            >
              {card.description}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
