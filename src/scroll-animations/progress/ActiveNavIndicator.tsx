import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function ActiveNavIndicator({ markers = false, scrub = false, pin = true, start = 'top top', end = '+=200%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    const dot = dotRef.current;
    if (!el || !dot || disabled) return;
    const navItems = el.querySelectorAll('.nav-item');
    const ctx = gsap.context(() => {
      navItems.forEach((item) => {
        const section = document.querySelector(item.getAttribute('href') || '');
        if (!section) return;
        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => { item.classList.add('text-white'); gsap.to(dot, { y: (item as HTMLElement).offsetTop - 8, duration: 0.3, ease: 'power2.out' }); },
          onLeave: () => { item.classList.remove('text-white'); },
          onEnterBack: () => { item.classList.add('text-white'); gsap.to(dot, { y: (item as HTMLElement).offsetTop - 8, duration: 0.3, ease: 'power2.out' }); },
          onLeaveBack: () => { item.classList.remove('text-white'); }
        });
      });
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div ref={containerRef} className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-4">
      <div ref={dotRef} className="absolute right-0 w-3 h-3 bg-purple-500 rounded-full" style={{ top: 0 }} />
      <a href="#section1" className="nav-item text-gray-500 text-sm transition-colors">Section 1</a>
      <a href="#section2" className="nav-item text-gray-500 text-sm transition-colors">Section 2</a>
      <a href="#section3" className="nav-item text-gray-500 text-sm transition-colors">Section 3</a>
      <div className="h-screen" />
    </div>
  );
}
