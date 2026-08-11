import React, { useState } from "react";
import { motion } from "framer-motion";

// Import artwork images
import cardArt1 from "../card-art-1.webp";
import cardArt2 from "../card-art-2.png";
import cardArt3 from "../card-art-3.png";
import cardBg1 from "../card-bg-1.png";

export interface CardData {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  bgImage?: string;
}

export interface CollapsingCardsProps {
  cards?: CardData[];
  defaultActiveIndex?: number;
  className?: string;
  numberColor?: string;
  titleColor?: string;
  descColor?: string;
}

const defaultCards: CardData[] = [
  {
    id: "card-1",
    number: "01",
    title: "Connnect Your Tools",
    description:
      "Link the apps your team already uses, Slack, Notion, and more. No technical setup required.",
    image: cardArt1,
    bgImage: cardBg1,
  },
  {
    id: "card-2",
    number: "02",
    title: "Build Your Workflow",
    description:
      "Set your triggers, define your actions, and customize every step to match how your team actually works.",
    image: cardArt2,
    bgImage: cardBg1,
  },
  {
    id: "card-3",
    number: "03",
    title: "Go Live",
    description:
      "Deploy your workflow in one click. Track every task, catch every bottleneck, and get real time updates.",
    image: cardArt3,
    bgImage: cardBg1,
  },
];

export function CollapsingCards({
  cards = defaultCards,
  defaultActiveIndex = 0,
  className = "",
  numberColor = "#22c55e", // Bright green accent
  titleColor = "#ffffff",
  descColor = "#c4c0c0",
}: CollapsingCardsProps) {
  const [activeIndex, setActiveIndex] = useState<number>(defaultActiveIndex);

  return (
    <div
      className={`w-full max-w-[1140px] mx-auto p-3.5 bg-[#232323] rounded-[24px] shadow-2xl border border-white/5 ${className}`}
    >
      <div className="flex flex-col md:flex-row gap-3.5 h-auto md:h-[400px] w-full items-stretch">
        {cards.map((card, index) => {
          const isActive = activeIndex === index;

          return (
            <motion.div
              key={card.id}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
              animate={{
                flex: isActive ? 2.25 : 1,
              }}
              transition={{
                duration: 0.4,
                ease: [0.25, 1, 0.5, 1],
              }}
              className="relative overflow-hidden rounded-[20px] bg-[#1a1a1a] p-5 cursor-pointer flex flex-col justify-between transition-colors duration-300 hover:bg-[#1e1e1e]"
            >
              <div className="flex flex-row w-full h-full gap-4 items-stretch justify-between overflow-hidden">
                {/* Locked Text Column - Fixed 230px width in both collapsed & expanded states */}
                <div className="w-[230px] shrink-0 flex flex-col justify-between h-full pointer-events-none select-none">
                  {/* Step Number */}
                  <div className="mb-4">
                    <span
                      className="font-inter font-medium text-[15px] tracking-wide"
                      style={{ color: numberColor }}
                    >
                      {card.number}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="flex flex-col gap-2.5 mt-auto">
                    <h3
                      className="font-garamond text-[24px] font-bold tracking-tight leading-snug break-words"
                      style={{ color: titleColor }}
                    >
                      {card.title}
                    </h3>
                    <p
                      className="font-inter text-[13.5px] font-light leading-relaxed break-words"
                      style={{ color: descColor }}
                    >
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Right Image Poster Column - Mounted cleanly when active */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.05, ease: "easeOut" }}
                    className="hidden md:flex flex-1 h-full rounded-[20px] overflow-hidden bg-[#1e3d1e] border border-[#2d5530]/50 relative items-center justify-center p-3 shrink-0"
                  >
                    {card.bgImage && (
                      <img
                        src={card.bgImage}
                        alt="bg-texture"
                        className="absolute inset-0 w-full h-full object-cover opacity-45 mix-blend-overlay pointer-events-none"
                      />
                    )}
                    <img
                      src={card.image}
                      alt={card.title}
                      className="relative z-10 max-h-[92%] max-w-[92%] object-contain rounded-[14px] shadow-md border border-white/10"
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default CollapsingCards;
