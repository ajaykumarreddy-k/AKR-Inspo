import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TabItem, TabsCardProps } from "../types";
import { PRESETS } from "../data/presets";

export const TabsCard: React.FC<TabsCardProps> = ({
  items = PRESETS[0].items,
  defaultActiveId,
  triggerMode = "hover",
  autoPlay = false,
  autoPlayInterval = 4000,
  className = "",
  isDarkMode = false,
  onChange,
}) => {
  const [activeId, setActiveId] = useState<string>(
    defaultActiveId || (items.length > 0 ? items[0].id : "")
  );
  const [isHoveredContainer, setIsHoveredContainer] = useState(false);

  // Preload all tab images into memory for instantaneous 0-delay switching
  useEffect(() => {
    items.forEach((item) => {
      if (item.image) {
        const img = new Image();
        img.src = item.image;
      }
    });
  }, [items]);

  // Sync active tab if items list updates
  useEffect(() => {
    if (items.length > 0 && !items.some((it) => it.id === activeId)) {
      setActiveId(items[0].id);
    }
  }, [items]);

  const activeItem = items.find((it) => it.id === activeId) || items[0];

  // Auto-play timer logic
  useEffect(() => {
    if (!autoPlay || isHoveredContainer || items.length <= 1) return;

    const timer = setInterval(() => {
      setActiveId((currentId) => {
        const currentIndex = items.findIndex((it) => it.id === currentId);
        const nextIndex = (currentIndex + 1) % items.length;
        const nextItem = items[nextIndex];
        if (onChange) onChange(nextItem.id, nextItem);
        return nextItem.id;
      });
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, isHoveredContainer, items, onChange]);

  const handleTabSelect = (id: string, item: TabItem) => {
    setActiveId(id);
    if (onChange) onChange(id, item);
  };

  const handleMouseEnterTab = (id: string, item: TabItem) => {
    if (triggerMode === "hover" || triggerMode === "both") {
      handleTabSelect(id, item);
    }
  };

  const handleClickTab = (id: string, item: TabItem) => {
    if (triggerMode === "click" || triggerMode === "both") {
      handleTabSelect(id, item);
    }
  };

  // Color tokens matching the reference design:
  const activeBgClass = isDarkMode ? "bg-[#1e293b]" : "bg-[#e5e7eb]";
  const activeSvgColor = isDarkMode ? "text-[#1e293b]" : "text-[#e5e7eb]";
  const cardBorderClass = isDarkMode ? "border-slate-800" : "border-slate-300/80";

  return (
    <div
      onMouseEnter={() => setIsHoveredContainer(true)}
      onMouseLeave={() => setIsHoveredContainer(false)}
      className={`w-full max-w-[1104px] transition-colors duration-300 ${className}`}
    >
      <div className="flex flex-col md:flex-row w-full items-stretch h-[460px] relative">
        {/* Left Navigation Tab Stack */}
        <div className="w-full md:w-[280px] lg:w-[310px] flex flex-col justify-center py-4 md:py-6 relative z-10 shrink-0 select-none">
          {items.map((item) => {
            const isActive = item.id === activeId;

            return (
              <div
                key={item.id}
                onMouseEnter={() => handleMouseEnterTab(item.id, item)}
                onClick={() => handleClickTab(item.id, item)}
                className="relative cursor-pointer px-6 py-4 md:px-7 md:py-4 transition-colors duration-200 group"
              >
                {/* Active Tab Background Pill with Framer Motion Layout & Inverted Concave Corner SVGs */}
                {isActive && (
                  <motion.div
                    layoutId="tabs-card-active-bg"
                    className={`absolute inset-0 z-0 ${activeBgClass} rounded-xl md:rounded-l-2xl md:rounded-r-none will-change-transform transform-gpu`}
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 36,
                      mass: 0.6,
                    }}
                  >
                    {/* Top Right Inverted Concave Cutout Curve (Desktop Only) */}
                    <div className="hidden md:block absolute -top-5 right-0 w-5 h-5 pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        className={`w-5 h-5 ${activeSvgColor} fill-current`}
                      >
                        <path d="M 6.018 19.789 C 4.705 20 3.137 20 0 20 L 20 20 L 20 0 C 20 3.137 20 4.705 19.789 6.018 C 18.65 13.098 13.098 18.65 6.018 19.789 Z" />
                      </svg>
                    </div>

                    {/* Bottom Right Inverted Concave Cutout Curve (Desktop Only) */}
                    <div className="hidden md:block absolute -bottom-5 right-0 w-5 h-5 pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        className={`w-5 h-5 ${activeSvgColor} fill-current`}
                      >
                        <path d="M 6.018 0.211 C 4.705 0 3.137 0 0 0 L 20 0 L 20 20 C 20 16.863 20 15.295 19.789 13.982 C 18.65 6.902 13.098 1.35 6.018 0.211 Z" />
                      </svg>
                    </div>
                  </motion.div>
                )}

                {/* Tab Header & Collapsible Description */}
                <div className="relative z-10 flex flex-col justify-center">
                  <h3
                    className={`text-xl md:text-[22px] font-bold tracking-tight transition-colors duration-200 ${
                      isActive
                        ? isDarkMode
                          ? "text-white"
                          : "text-slate-950"
                        : isDarkMode
                        ? "text-slate-400 group-hover:text-slate-200"
                        : "text-slate-950 group-hover:text-slate-700"
                    }`}
                  >
                    {item.title}
                  </h3>

                  <AnimatePresence initial={false}>
                    {isActive && item.description && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                          transition: {
                            height: {
                              type: "spring",
                              stiffness: 420,
                              damping: 32,
                            },
                            opacity: { duration: 0.2, delay: 0.03 },
                          },
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: {
                            height: { duration: 0.16 },
                            opacity: { duration: 0.1 },
                          },
                        }}
                        className="overflow-hidden"
                      >
                        <p
                          className={`pt-1.5 text-[13px] md:text-[14px] leading-relaxed tracking-tight ${
                            isDarkMode ? "text-slate-400" : "text-slate-500"
                          }`}
                        >
                          {item.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Image Container Frame - Fixed Size for 100% Stability */}
        <div
          className={`flex-1 h-[460px] rounded-[24px] md:rounded-[28px] p-2.5 md:p-3 border ${cardBorderClass} relative overflow-hidden transition-colors duration-300 flex items-center justify-center ${activeBgClass}`}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{
                duration: 0.35,
                ease: [0.25, 1, 0.5, 1],
              }}
              className="w-full h-full relative rounded-[18px] md:rounded-[22px] overflow-hidden shadow-sm transform-gpu will-change-transform"
            >
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-cover rounded-[18px] md:rounded-[22px]"
                loading="eager"
                decoding="sync"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
