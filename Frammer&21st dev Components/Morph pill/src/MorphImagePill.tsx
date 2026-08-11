import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone } from "lucide-react";

export interface MorphImagePillProps {
  /** Avatar / Card image source URL */
  image?: string;
  /** Primary title / name */
  title?: string;
  /** Primary subtitle / job title */
  subtext1?: string;
  /** Secondary subtitle / company & location */
  subtext2?: string;
  /** Email address */
  iconText1?: string;
  /** Phone number */
  iconText2?: string;
  /** Detailed description / bio text */
  descriptionText?: string;
  /** Action button text label */
  buttonLabel?: string;
  /** Link for action button */
  link?: string;
  /** Callback when button is clicked */
  onButtonClick?: () => void;
  /** Custom class names */
  className?: string;
  /** Force default open state */
  defaultOpen?: boolean;
}

const transitionSpring = {
  type: "spring",
  duration: 0.4,
  bounce: 0.2,
};

export const MorphImagePill: React.FC<MorphImagePillProps> = ({
  image = "https://framerusercontent.com/images/g0nFuMFtxtjvLrcYFrB9GZaA.png?width=482&height=640",
  title = "John Doe",
  subtext1 = "Senior Product Designer",
  subtext2 = "Ramp · San Francisco",
  iconText1 = "john.doe@example.com",
  iconText2 = "+1 (123) 456 7890",
  descriptionText = "Leads product design across onboarding, workflow automation, and internal tools while maintaining the company’s shared design system.",
  buttonLabel = "Send Message",
  link,
  onButtonClick,
  className = "",
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <motion.div
      layout
      transition={transitionSpring}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      style={{
        borderRadius: isOpen ? 32 : 50,
      }}
      className={`relative bg-white border border-[rgba(34,34,34,0.09)] shadow-[0px_1px_8px_0px_rgba(0,0,0,0.06),0px_2px_4px_-2px_rgba(0,0,0,0.1)] overflow-hidden cursor-pointer select-none transition-shadow hover:shadow-[0px_4px_16px_0px_rgba(0,0,0,0.08)] ${
        isOpen ? "p-2" : "py-2 px-4"
      } ${className}`}
    >
      <motion.div
        layout
        transition={transitionSpring}
        className={`flex ${isOpen ? "flex-row items-stretch gap-3" : "flex-row items-center gap-2.5"}`}
      >
        {/* Avatar / Card Image */}
        <motion.div
          layout
          transition={transitionSpring}
          className="relative overflow-hidden flex-shrink-0 bg-amber-500"
          style={{
            width: isOpen ? 165 : 40,
            height: isOpen ? "auto" : 40,
            minHeight: isOpen ? 220 : 40,
            borderRadius: isOpen ? 24 : 20,
          }}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-center absolute inset-0"
          />
        </motion.div>

        {/* Content Container */}
        <motion.div
          layout
          transition={transitionSpring}
          className={`flex flex-col justify-start ${
            isOpen ? "w-[226px] py-1 pr-1 flex-shrink-0" : "w-auto"
          }`}
        >
          {/* Title */}
          <motion.h3
            layout="position"
            transition={transitionSpring}
            className={`font-semibold text-gray-900 leading-snug tracking-tight ${
              isOpen ? "text-[16px] mb-1" : "text-[15px] whitespace-nowrap"
            }`}
          >
            {title}
          </motion.h3>

          {/* Expanded Content Details */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 2 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-2.5 text-gray-500"
            >
              {/* Subtext Section (Role & Company/Location) */}
              <div className="flex flex-col gap-0.5">
                {subtext1 && (
                  <p className="text-[12px] font-medium text-[rgb(105,105,105)] leading-tight">
                    {subtext1}
                  </p>
                )}
                {subtext2 && (
                  <p className="text-[12px] text-[rgb(105,105,105)] leading-tight">
                    {subtext2}
                  </p>
                )}
              </div>

              {/* Icon Text Section (Email & Phone) */}
              <div className="flex flex-col gap-1">
                {iconText1 && (
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-800">
                    <Mail size={12} className="text-gray-500 flex-shrink-0" />
                    <a
                      href={`mailto:${iconText1}`}
                      onClick={(e) => e.stopPropagation()}
                      className="hover:underline hover:text-gray-900 truncate"
                    >
                      {iconText1}
                    </a>
                  </div>
                )}
                {iconText2 && (
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-800">
                    <Phone size={12} className="text-gray-500 flex-shrink-0" />
                    <a
                      href={`tel:${iconText2}`}
                      onClick={(e) => e.stopPropagation()}
                      className="hover:underline hover:text-gray-900 truncate"
                    >
                      {iconText2}
                    </a>
                  </div>
                )}
              </div>

              {/* Description Text */}
              {descriptionText && (
                <p className="text-[11px] text-[rgb(105,105,105)] leading-relaxed">
                  {descriptionText}
                </p>
              )}

              {/* Action Button */}
              {buttonLabel && (
                <div className="pt-0.5 flex items-center justify-start">
                  <motion.a
                    href={link || "#"}
                    whileHover={{ scale: 1.02, backgroundColor: "rgb(235, 235, 235)" }}
                    whileTap={{ scale: 0.97 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onButtonClick) onButtonClick();
                    }}
                    className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-[rgb(245,245,245)] text-gray-800 text-[12px] font-medium transition-colors border border-transparent shadow-none"
                  >
                    {buttonLabel}
                  </motion.a>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MorphImagePill;
