import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimationControls, useMotionValue } from "framer-motion";
import { HoverCard } from "./HoverCard";
import { TickerCardItem } from "../data/tickerData";

export interface HoverTickerProps {
  items: TickerCardItem[];
  speed?: number; // duration in seconds for one full loop (e.g., 30s)
  gap?: number; // gap between cards in px (default 10)
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  cardWidth?: number; // default 286
  cardHeight?: number; // default 400
  mobile?: boolean;
  onCardClick?: (card: TickerCardItem) => void;
  className?: string;
}

export const HoverTicker: React.FC<HoverTickerProps> = ({
  items,
  speed = 35,
  gap = 10,
  direction = "left",
  pauseOnHover = true,
  cardWidth = 286,
  cardHeight = 400,
  mobile = false,
  onCardClick,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const effectiveWidth = mobile ? 194 : cardWidth;
  const effectiveHeight = mobile ? 275 : cardHeight;
  
  // Calculate total width of 1 single set of cards + gaps
  const singleSetWidth = (effectiveWidth + gap) * items.length;

  // Quadruple items to ensure seamless infinite looping on all screen sizes
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden py-16 px-0 select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ticker Flex Track with infinite motion */}
      <motion.div
        className="flex flex-nowrap items-center w-max"
        animate={{
          x: direction === "left" ? [0, -singleSetWidth] : [-singleSetWidth, 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
        // Smoothly pause on hover if enabled
        custom={isHovered && pauseOnHover}
        style={{
          gap: `${gap}px`,
          animationPlayState: isHovered && pauseOnHover ? "paused" : "running",
        }}
      >
        {repeatedItems.map((card, idx) => (
          <HoverCard
            key={`${card.id}-${idx}`}
            card={card}
            width={effectiveWidth}
            height={effectiveHeight}
            mobile={mobile}
            onClick={onCardClick}
          />
        ))}
      </motion.div>
    </div>
  );
};
