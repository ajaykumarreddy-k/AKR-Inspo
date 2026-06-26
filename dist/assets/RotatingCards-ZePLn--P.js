const e=`import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface CardItem {
  gradient: string;
  title: string;
  desc: string;
}

interface RotatingCardsProps {
  cards?: CardItem[];
  title?: string;
  className?: string;
}

const DEFAULT_CARDS: CardItem[] = [
  { gradient: 'from-[var(--color-primary)] to-blue-900', title: 'Vision', desc: 'Seeing what could be' },
  { gradient: 'from-[var(--color-accent)] to-purple-900', title: 'Focus', desc: 'Concentration of effort' },
  { gradient: 'from-emerald-500 to-teal-900', title: 'Growth', desc: 'Continuous improvement' },
  { gradient: 'from-amber-500 to-orange-900', title: 'Resilience', desc: 'Overcoming obstacles' },
  { gradient: 'from-rose-500 to-pink-900', title: 'Excellence', desc: 'Highest standards' },
];

export default function RotatingCards({
  cards = DEFAULT_CARDS,
  title = 'Rotating Cards',
  className = '',
}: RotatingCardsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Mobile setup: Faster scrub, less perspective
      mm.add("(max-width: 767px)", () => {
        cardsRef.current.forEach((card) => {
          gsap.fromTo(card,
            { rotationY: 45, opacity: 0, transformPerspective: 800 },
            {
              rotationY: 0,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 50%',
                scrub: 1,
              },
            }
          );
        });
      });

      // Desktop setup: Original rich animation
      mm.add("(min-width: 768px)", () => {
        cardsRef.current.forEach((card) => {
          gsap.fromTo(card,
            { rotationY: 90, opacity: 0, transformPerspective: 1200 },
            {
              rotationY: 0,
              opacity: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                end: 'top 40%',
                scrub: 1.5,
              },
            }
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className={\`min-h-[100vh] py-16 md:py-24 px-4 md:px-8 flex flex-col items-center bg-[var(--color-bg)] \${className}\`}>
      {title && <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-10 md:mb-16 text-center">{title}</h2>}
      <div className="flex flex-wrap justify-center gap-6 md:gap-10 w-full max-w-6xl perspective-[1000px] md:perspective-[2000px]">
        {cards.map((card, i) => (
          <div
            key={i}
            ref={el => { if (el) cardsRef.current[i] = el; }}
            className={\`w-[260px] md:w-[280px] h-[360px] md:h-[400px] rounded-[1.5rem] md:rounded-[2rem] bg-gradient-to-br p-6 md:p-8 flex flex-col justify-between shadow-xl md:shadow-2xl border border-white/20 backdrop-blur-md relative overflow-hidden group will-change-transform will-change-opacity \${card.gradient}\`}
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/20 flex items-center justify-center text-white text-xl md:text-2xl font-bold border border-white/30 relative z-10">
              0{i + 1}
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">{card.title}</h3>
              <p className="text-white/90 text-sm md:text-base font-medium">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="h-24 md:h-48" />
    </div>
  );
}
`;export{e as default};
