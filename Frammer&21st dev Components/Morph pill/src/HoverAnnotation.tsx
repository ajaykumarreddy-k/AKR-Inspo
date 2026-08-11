import React from "react";

export const HoverAnnotation: React.FC<{ text?: string }> = ({ text = "Hover me" }) => {
  return (
    <div className="flex flex-col items-center select-none pointer-events-none mb-2">
      <span className="text-[13px] font-sans text-gray-400 tracking-wide">
        {text}
      </span>
      <svg
        width="50"
        height="65"
        viewBox="0 0 50 65"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-gray-300 overflow-visible"
      >
        {/* Curving loop stroke matching reference image arrow */}
        <path
          d="M 25 2 C 25 18, 26 26, 23 35 C 20 41, 15 40, 16 33 C 17 26, 26 29, 25 42 C 24 50, 24 56, 24 62"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Arrow head pointing down */}
        <path
          d="M 19 56 L 24 63 L 29 57"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default HoverAnnotation;
