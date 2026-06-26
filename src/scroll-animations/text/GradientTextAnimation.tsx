import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function GradientTextAnimation({ markers = false, scrub = false, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    const grad = gradientRef.current;
    if (!el || !grad || disabled) return;
    const ctx = gsap.context(() => {
      gsap.to(grad, {
        backgroundPosition: '200% 0%',
        duration: 2,
        ease: 'none',
        scrollTrigger: { trigger: el, markers, scrub, pin, start, end }
      });
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen bg-gray-950 p-8">
      <div
        ref={gradientRef}
        className="text-5xl md:text-8xl font-black bg-clip-text text-transparent bg-[length:200%_100%]"
        style={{ backgroundImage: 'linear-gradient(90deg, #f59e0b, #ec4899, #8b5cf6, #f59e0b)' }}
      >
        Scroll Gradient
      </div>
      <div className="h-screen" />
    </div>
  );
}
