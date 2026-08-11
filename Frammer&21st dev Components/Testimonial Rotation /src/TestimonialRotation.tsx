import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from "lucide-react";

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

export interface TestimonialRotationProps {
  testimonials?: TestimonialItem[];
  autoplayInterval?: number; // in milliseconds
  autoPlay?: boolean;
  pauseOnHover?: boolean;
  accentColor?: string; // hex or tailwind class
  className?: string;
  onIndexChange?: (index: number) => void;
}

export const defaultTestimonials: TestimonialItem[] = [
  {
    id: "1",
    quote:
      "The collaboration felt clear, structured, and refreshingly straightforward from the very beginning. Our ideas were not only understood but translated into a design that genuinely reflects who we are. We were especially impressed by how quickly the initial concepts developed into a cohesive and polished brand experience.",
    name: "Olivia Bennett",
    role: "Founder, Northline Studio",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "2",
    quote:
      "Working together was an absolute game changer for our digital product. The attention to motion detail, user experience, and technical execution exceeded all our expectations. They brought our vision to life faster than we thought possible.",
    name: "Marcus Vance",
    role: "Creative Director, Synthesis Lab",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "3",
    quote:
      "The level of craft and responsiveness is completely unmatched. Every interaction felt deliberate, polished, and beautifully engineered. Our conversion rates increased by over 40% within weeks of the new launch.",
    name: "Elena Rostova",
    role: "Head of Design, Lumina Interactive",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "4",
    quote:
      "An extraordinary experience from kickoff to final deployment. The component architecture is exceptionally clean, robust, and accessible. I cannot recommend this team highly enough for high-stakes digital experiences.",
    name: "David Chen",
    role: "VP of Engineering, Vantage Systems",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  },
];

export function TestimonialRotation({
  testimonials = defaultTestimonials,
  autoplayInterval = 6000,
  autoPlay = true,
  pauseOnHover = true,
  accentColor = "#EA3829", // Red-orange matching reference image
  className = "",
  onIndexChange,
}: TestimonialRotationProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const pausedTimeRef = useRef<number>(0);

  const total = testimonials.length;

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      setProgress(0);
      startTimeRef.current = null;
      pausedTimeRef.current = 0;
      if (onIndexChange) onIndexChange(index);
    },
    [onIndexChange]
  );

  const handleNext = useCallback(() => {
    goToSlide((currentIndex + 1) % total);
  }, [currentIndex, total, goToSlide]);

  const handlePrev = useCallback(() => {
    goToSlide((currentIndex - 1 + total) % total);
  }, [currentIndex, total, goToSlide]);

  // Handle Autoplay RAF loop
  useEffect(() => {
    if (!isPlaying || isPaused || total <= 1) {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
      return;
    }

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp - pausedTimeRef.current;
      }

      const elapsed = timestamp - startTimeRef.current;
      const currentProgress = Math.min((elapsed / autoplayInterval) * 100, 100);

      setProgress(currentProgress);

      if (elapsed >= autoplayInterval) {
        startTimeRef.current = timestamp;
        pausedTimeRef.current = 0;
        setProgress(0);
        setCurrentIndex((prev) => {
          const next = (prev + 1) % total;
          if (onIndexChange) onIndexChange(next);
          return next;
        });
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isPlaying, isPaused, currentIndex, autoplayInterval, total, onIndexChange]);

  const current: TestimonialItem = (testimonials[currentIndex] || testimonials[0] || defaultTestimonials[0])!;

  return (
    <div
      className={`w-full max-w-4xl mx-auto ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div className="relative bg-[#0d0d0f] border border-white/10 rounded-2xl md:rounded-3xl p-6 sm:p-10 md:p-14 shadow-2xl backdrop-blur-md overflow-hidden">
        {/* Top Navigation Row: Segmented Progress Bars + Prev/Next Controls */}
        <div className="flex items-center justify-between gap-6 mb-8 md:mb-12">
          {/* Progress segments */}
          <div className="flex-1 flex items-center gap-2 sm:gap-3 md:gap-4">
            {testimonials.map((t, idx) => {
              let fillWidth = "0%";
              if (idx < currentIndex) {
                fillWidth = "100%";
              } else if (idx === currentIndex) {
                fillWidth = `${progress}%`;
              } else {
                fillWidth = "0%";
              }

              return (
                <button
                  key={t.id || idx}
                  onClick={() => goToSlide(idx)}
                  className="flex-1 h-[2.5px] sm:h-[3px] bg-white/15 hover:bg-white/30 rounded-full overflow-hidden transition-colors cursor-pointer relative focus:outline-none focus-visible:ring-1 focus-visible:ring-white/50"
                  title={`Go to testimonial ${idx + 1}`}
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <div
                    className="h-full rounded-full transition-all duration-75 ease-linear"
                    style={{
                      width: fillWidth,
                      backgroundColor: accentColor,
                      boxShadow: idx === currentIndex ? `0 0 8px ${accentColor}aa` : "none",
                    }}
                  />
                </button>
              );
            })}
          </div>

          {/* Nav arrows */}
          <div className="flex items-center gap-3 shrink-0 text-white/60">
            <button
              onClick={handlePrev}
              className="p-1 hover:text-white transition-colors cursor-pointer focus:outline-none"
              aria-label="Previous testimonial"
              title="Previous"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.75]" />
            </button>
            <button
              onClick={handleNext}
              className="p-1 hover:text-white transition-colors cursor-pointer focus:outline-none"
              aria-label="Next testimonial"
              title="Next"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.75]" />
            </button>
          </div>
        </div>

        {/* Quote Content Section */}
        <div className="min-h-[160px] sm:min-h-[180px] md:min-h-[200px] flex items-center mb-8 md:mb-10">
          <AnimatePresence mode="wait">
            <motion.p
              key={current.id || currentIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="text-lg sm:text-xl md:text-[23px] font-normal leading-[1.6] md:leading-[1.65] text-neutral-100 tracking-tight select-none font-sans"
            >
              “{current.quote}”
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Author Footer Section */}
        <div className="flex items-center gap-4 pt-2 border-t border-white/5">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id || currentIndex}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex items-center gap-4"
            >
              {/* Circular Avatar */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border border-white/10 shrink-0 shadow-lg bg-neutral-900">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Author Details */}
              <div className="flex flex-col">
                <span className="text-base sm:text-lg italic font-serif text-neutral-100 leading-snug tracking-wide">
                  {current.name}
                </span>
                <span className="text-xs sm:text-sm text-neutral-400 font-sans mt-0.5 font-normal">
                  {current.role}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default TestimonialRotation;
