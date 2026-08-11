import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface TestimonialData {
  id: string;
  image: string;
  quote: string;
  name: string;
  role: string;
}

const defaultTestimonials: TestimonialData[] = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85",
    quote:
      "This platform has completely transformed how our team manages projects. The intuitive interface, automation features, and real-time collaboration have saved us countless hours every week. It's become an essential part of our workflow.",
    name: "Sarah Johnson",
    role: "Director of eCommerce",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=85",
    quote:
      "Bolt came along, and really took the risk out of the equation. We're not rejecting good orders any more, just the bad ones, and it's saving us a ton of time.",
    name: "Sara Kim",
    role: "Director of eCommerce",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=85",
    quote:
      "The seamless integration and automation features gave our engineering and product teams total clarity. We launched 3x faster with zero compromise on quality.",
    name: "Alex Rivera",
    role: "Head of Product Strategy",
  },
];

export function Testimonial({
  testimonials = defaultTestimonials,
}: {
  testimonials?: TestimonialData[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const current = testimonials[currentIndex];

  return (
    <div
      className="w-full max-w-[1080px] h-[540px] bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col md:flex-row relative my-auto border border-white/20"
      style={{
        width: "100%",
        maxWidth: "1080px",
        height: "540px",
        borderRadius: "32px",
        backgroundColor: "#ffffff",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        flexShrink: 0,
      }}
    >
      {/* Left side image */}
      <div
        className="w-full md:w-[42%] h-full relative bg-neutral-900 overflow-hidden"
        style={{ width: "42%", height: "100%", position: "relative", flexShrink: 0 }}
      >
        <img
          src={current.image}
          alt={current.name}
          className="absolute inset-0 w-full h-full object-cover grayscale contrast-[1.08] brightness-[0.95]"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "grayscale(100%) contrast(108%) brightness(95%)",
          }}
        />
      </div>

      {/* Right side content */}
      <div
        className="w-full md:w-[58%] h-full p-8 sm:p-10 md:p-12 lg:p-14 flex flex-col justify-between bg-white relative overflow-hidden"
        style={{
          width: "58%",
          height: "100%",
          padding: "44px 52px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          {/* Logoipsum Header */}
          <div
            className="flex items-center gap-2.5 mb-6"
            style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px", flexShrink: 0 }}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "32px", height: "32px" }}
            >
              <path
                d="M10 24C15.5228 24 20 19.5228 20 14C20 8.47715 15.5228 4 10 4C4.47715 4 0 8.47715 0 14C0 19.5228 4.47715 24 10 24Z"
                fill="#22C55E"
              />
              <path
                d="M26 32C31.5228 32 36 27.5228 36 22C36 16.4772 31.5228 12 26 12C20.4772 12 16 16.4772 16 22C16 27.5228 20.4772 32 26 32Z"
                fill="#16A34A"
              />
            </svg>
            <span
              className="text-xl font-bold tracking-tight text-[#003822] font-sans"
              style={{ fontSize: "22px", fontWeight: "700", color: "#003822", fontFamily: "Geist, sans-serif" }}
            >
              Logoipsum
            </span>
          </div>

          {/* Locked Height Testimonial Quote */}
          <div
            className="h-[210px] flex items-center overflow-hidden relative"
            style={{ height: "210px", display: "flex", alignItems: "center", overflow: "hidden", position: "relative", flexShrink: 0 }}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={current.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="text-[20px] sm:text-[23px] md:text-[25px] font-semibold text-[#222222] leading-[1.38] tracking-tight font-sans"
                style={{
                  fontSize: "24px",
                  fontWeight: "600",
                  color: "#222222",
                  lineHeight: "1.38",
                  fontFamily: "Geist, sans-serif",
                  margin: 0,
                }}
              >
                {current.quote}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Locked Height Author Name and Role */}
          <div className="h-[52px] mt-4 overflow-hidden" style={{ height: "52px", marginTop: "16px", flexShrink: 0 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <h4
                  className="text-[16px] font-bold text-[#2d2d2d] leading-snug"
                  style={{ fontSize: "16px", fontWeight: "700", color: "#2d2d2d", margin: 0 }}
                >
                  {current.name}
                </h4>
                <p
                  className="text-[14px] font-normal text-[#737373] mt-0.5"
                  style={{ fontSize: "14px", fontWeight: "400", color: "#737373", marginTop: "2px", margin: "2px 0 0 0" }}
                >
                  {current.role}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer controls: Slide Dots + Prev/Next Buttons */}
        <div
          className="flex items-center justify-between mt-auto pt-2"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", flexShrink: 0 }}
        >
          {/* Pagination Indicators */}
          <div className="flex items-center gap-2" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {testimonials.map((t, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={t.id}
                  onClick={() => goToSlide(idx)}
                  className="relative focus:outline-none p-1 -m-1 cursor-pointer"
                  style={{ background: "none", border: "none", padding: "4px", cursor: "pointer" }}
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  {isActive ? (
                    <motion.div
                      layoutId="activeDot"
                      className="w-7 h-2.5 bg-[#404040] rounded-full"
                      style={{ width: "28px", height: "10px", backgroundColor: "#404040", borderRadius: "9999px" }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  ) : (
                    <div
                      className="w-2.5 h-2.5 bg-[#d4d4d8] hover:bg-[#a1a1aa] rounded-full transition-colors"
                      style={{ width: "10px", height: "10px", backgroundColor: "#d4d4d8", borderRadius: "9999px" }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Circular Navigation Buttons */}
          <div className="flex items-center gap-3" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-[#4a4a4a] hover:bg-[#1a1a1a] active:scale-95 text-white flex items-center justify-center transition-all duration-200 shadow-sm focus:outline-none cursor-pointer"
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                backgroundColor: "#4a4a4a",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.2]" style={{ width: "20px", height: "20px" }} />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-[#4a4a4a] hover:bg-[#1a1a1a] active:scale-95 text-white flex items-center justify-center transition-all duration-200 shadow-sm focus:outline-none cursor-pointer"
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                backgroundColor: "#4a4a4a",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
              aria-label="Next testimonial"
            >
              <ArrowRight className="w-5 h-5 stroke-[2.2]" style={{ width: "20px", height: "20px" }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
