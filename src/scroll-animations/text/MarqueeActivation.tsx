import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function MarqueeActivation({ markers = false, scrub = false, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    const marquee = marqueeRef.current;
    if (!el || !marquee || disabled) return;
    const ctx = gsap.context(() => {
      gsap.to(marquee, {
        xPercent: -50,
        duration: 8,
        ease: 'none',
        repeat: -1,
        scrollTrigger: { trigger: el, markers, scrub, pin, start, end, toggleActions: 'play none none reverse' }
      });
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  const items = ['✦ Scroll Triggered Marquee ✦', '✦ GSAP Animation ✦', '✦ Infinite Scroll ✦'];
  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8 overflow-hidden">
      <div ref={marqueeRef} className="flex whitespace-nowrap text-3xl md:text-5xl font-bold gap-16">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="mx-4">{item}</span>
        ))}
      </div>
      <div className="h-screen" />
    </div>
  );
}
