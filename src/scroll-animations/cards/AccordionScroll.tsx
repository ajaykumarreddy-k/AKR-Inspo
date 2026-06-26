import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

interface Props { markers?: boolean; scrub?: number | boolean; pin?: boolean; start?: string; end?: string; duration?: number; ease?: string; disabled?: boolean; }

export default function AccordionScroll({ markers = false, scrub = 1, pin = true, start = 'top top', end = '+=300%', duration = 1, ease = 'power2.out', disabled = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el, pin, start, end, scrub, markers,
        }
      });
      tl.to('.accordion-body-1', { height: 'auto', opacity: 1, duration, ease })
        .to('.accordion-body-2', { height: 'auto', opacity: 1, duration, ease }, '-=0.5')
        .to('.accordion-body-3', { height: 'auto', opacity: 1, duration, ease }, '-=0.5')
        .to('.accordion-body-4', { height: 'auto', opacity: 1, duration, ease }, '-=0.5');
      tl.fromTo('.accordion-header-1 .icon', { rotation: 0 }, { rotation: 180, duration: 0.4, ease }, 0);
    }, el);
    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);
  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 via-stone-800 to-neutral-900 p-12">
      <div className="w-full max-w-lg flex flex-col gap-2">
        {[
          { title: 'Getting Started', content: 'Begin your journey with our platform. Sign up and explore the dashboard to get familiar with the interface.' },
          { title: 'Advanced Features', content: 'Unlock powerful tools including analytics, automation, and custom integrations tailored to your workflow.' },
          { title: 'Best Practices', content: 'Follow industry-standard practices to maximize performance, security, and maintainability of your projects.' },
          { title: 'Support & Resources', content: 'Access our comprehensive documentation, community forums, and priority support channels for assistance.' },
        ].map((item, i) => (
          <div key={i} className={`accordion-section-${i + 1} bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden`}>
            <div className={`accordion-header-${i + 1} p-4 flex items-center justify-between text-white font-semibold`}>
              <span>{item.title}</span>
              <span className="icon text-white/40 text-lg">▼</span>
            </div>
            <div className={`accordion-body-${i + 1} h-0 opacity-0 px-4 pb-4 text-white/50 text-sm leading-relaxed overflow-hidden`}>
              <div className="pt-1 border-t border-white/10">{item.content}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-8 text-white/30 text-xs tracking-wider">Accordion opens on scroll</div>
    </div>
  );
}
