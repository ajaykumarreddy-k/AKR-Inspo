import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import emailMarketingImg from "./assets/email_marketing.png";
import lifecycleCampaignsImg from "./assets/lifecycle_campaigns.png";
import customerOutreachImg from "./assets/customer_outreach.png";

export interface ExpandListItem {
  id: string;
  sLNo: string;
  title: string;
  description: string;
  image: string;
}

const DEFAULT_ITEMS: ExpandListItem[] = [
  {
    id: "01",
    sLNo: "01",
    title: "EMAIL MARKETING",
    description: "Connect easily and effectively through email campaigns.",
    image: emailMarketingImg,
  },
  {
    id: "02",
    sLNo: "02",
    title: "LIFECYCLE CAMPAIGNS",
    description:
      "A great product starts with a great user experience. I design intuitive, visually appealing, and conversion-focused digital experiences that drive engagement and success.",
    image: lifecycleCampaignsImg,
  },
  {
    id: "03",
    sLNo: "03",
    title: "CUSTOMER OUTREACH",
    description: "Measure results and optimize strategies for maximum ROI.",
    image: customerOutreachImg,
  },
];

export interface ExpandOnHoverListProps {
  items?: ExpandListItem[];
  defaultHoveredIndex?: number | null;
}

// Framer exact Arrow SVG Component
function FramerArrowIcon({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="w-10 h-10 rounded-full bg-[#0E0E0E] text-white flex items-center justify-center shrink-0 z-30 transition-transform duration-300">
      <motion.svg
        viewBox="0 0 40 40"
        className="w-10 h-10"
        animate={{ x: isHovered ? 2.5 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <path
          d="M 16.667 0 C 16.667 0.795 17.43 1.982 18.203 2.979 C 19.197 4.264 20.384 5.386 21.746 6.242 C 22.767 6.884 24.004 7.5 25 7.5 M 25 7.5 C 24.004 7.5 22.766 8.116 21.746 8.758 C 20.384 9.615 19.197 10.737 18.203 12.02 C 17.43 13.018 16.667 14.207 16.667 15 M 25 7.5 L 0 7.5"
          fill="transparent"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          transform="translate(7 12.168)"
        />
      </motion.svg>
    </div>
  );
}

export function ExpandOnHoverList({
  items = DEFAULT_ITEMS,
  defaultHoveredIndex = null,
}: ExpandOnHoverListProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(
    defaultHoveredIndex
  );

  return (
    <div className="w-full max-w-[880px] mx-auto bg-white py-4 select-none font-sans overflow-visible">
      <div className="flex flex-col w-full">
        {items.map((item, index) => {
          const isHovered = hoveredIndex === index;

          return (
            <motion.div
              key={item.id || index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative py-7 px-1 md:px-2 cursor-pointer group flex flex-col justify-center overflow-visible"
              initial={false}
            >
              {/* Subtle top divider line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#E6E6E6]" />

              {/* Active dark line animation on top border when hovered */}
              <motion.div
                className="absolute top-0 left-0 h-[2px] bg-[#0E0E0E] z-10"
                initial={{ width: "0%" }}
                animate={{ width: isHovered ? "100%" : "0%" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Main Item Row */}
              <div className="flex items-center justify-between gap-6 md:gap-10 overflow-visible">
                {/* Left Section: Number & Title/Description Block */}
                <div className="flex items-start gap-6 sm:gap-10 flex-1 min-w-0">
                  {/* Serial Number */}
                  <span
                    className={`text-3xl sm:text-4xl font-extrabold font-['PT_Sans_Narrow',sans-serif] tracking-tight shrink-0 transition-colors duration-300 pt-0.5 ${
                      isHovered ? "text-[#0E0E0E]" : "text-[#ACACAC]"
                    }`}
                  >
                    {item.sLNo}
                  </span>

                  {/* Title & Description Column */}
                  <div className="flex flex-col flex-1 min-w-0 pt-0.5">
                    <h3
                      className={`text-2xl sm:text-3xl font-extrabold font-['PT_Sans_Narrow',sans-serif] tracking-tight uppercase transition-colors duration-300 ${
                        isHovered ? "text-[#0E0E0E]" : "text-[#ACACAC]"
                      }`}
                    >
                      {item.title}
                    </h3>

                    {/* Description Text - Expands on hover */}
                    <AnimatePresence initial={false}>
                      {isHovered && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                            marginTop: 8,
                          }}
                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 38,
                          }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs sm:text-sm leading-relaxed font-normal text-[#111111] max-w-sm sm:max-w-md font-sans">
                            {item.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Right Section: 3D Illustration Image & Right Arrow Button */}
                <div className="flex items-center gap-4 sm:gap-8 shrink-0 overflow-visible">
                  {/* 3D Glass Illustration Card - Framer exact trajectory animation */}
                  <div className="relative w-36 sm:w-56 h-20 sm:h-28 overflow-visible flex items-center justify-center">
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{
                            opacity: 0,
                            rotate: 66,
                            scale: 0.8,
                            y: 60,
                            x: -20,
                          }}
                          animate={{
                            opacity: 1,
                            rotate: -5,
                            scale: 1,
                            y: 0,
                            x: 0,
                          }}
                          exit={{
                            opacity: 0,
                            rotate: 66,
                            scale: 0.8,
                            y: 60,
                            x: -20,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 32,
                            mass: 1,
                          }}
                          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none overflow-visible"
                        >
                          <div className="relative rounded-2xl p-1 bg-white border-[3px] border-[#E6E6E6] shadow-[0_4px_16px_rgba(0,0,0,0.12)] overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-32 sm:w-52 h-18 sm:h-26 object-cover rounded-xl"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Circle Arrow Action Button */}
                  <FramerArrowIcon isHovered={isHovered} />
                </div>
              </div>

              {/* Bottom divider for last item */}
              {index === items.length - 1 && (
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#E6E6E6]" />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default ExpandOnHoverList;
