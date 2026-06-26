import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  markers?: boolean;
  scrub?: number | boolean;
  pin?: boolean;
  start?: string;
  end?: string;
  duration?: number;
  ease?: string;
  disabled?: boolean;
}

const cards = [
  { step: '01', title: 'Plan', desc: 'Define your goals, audience, and key metrics for success.', color: 'from-blue-500 to-indigo-600' },
  { step: '02', title: 'Design', desc: 'Create wireframes, mockups, and prototypes to validate ideas.', color: 'from-violet-500 to-purple-600' },
  { step: '03', title: 'Build', desc: 'Develop with modern tools and best practices for quality.', color: 'from-rose-500 to-pink-600' },
  { step: '04', title: 'Launch', desc: 'Deploy, monitor, and iterate based on real user feedback.', color: 'from-emerald-500 to-teal-600' },
  { step: '05', title: 'Scale', desc: 'Optimize performance and grow your user base globally.', color: 'from-amber-500 to-orange-600' },
];

export default function SequentialCards({
  markers = false,
  scrub = false,
  pin = false,
  start = 'top 85%',
  end = 'bottom 20%',
  duration = 1,
  ease = 'power2.out',
  disabled = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: duration * 0.8,
        ease,
        scrollTrigger: {
          trigger: el,
          start,
          end,
          markers,
          scrub,
          pin,
        },
      });

      const children = trackRef.current?.children;
      if (children) {
        gsap.from(children, {
          opacity: 0,
          y: 60,
          scale: 0.9,
          duration,
          ease: 'back.out(1.4)',
          stagger: 0.2,
          scrollTrigger: {
            trigger: trackRef.current,
            start,
            end,
            markers: false,
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  return (
    <div ref={containerRef} className="flex flex-col items-center min-h-screen py-32 px-4">
      <h2
        ref={titleRef}
        className="text-4xl md:text-5xl font-bold text-white mb-4 text-center"
      >
        Sequential Cards
      </h2>
      <p className="text-gray-400 text-lg mb-16 text-center max-w-md">
        Cards in a row that reveal one after another with stagger.
      </p>

      <div
        ref={trackRef}
        className="flex flex-col md:flex-row gap-5 w-full max-w-5xl"
      >
        {cards.map((card) => (
          <div
            key={card.step}
            className={`flex-1 rounded-2xl bg-gradient-to-br ${card.color} p-6 text-white shadow-2xl min-h-[200px] flex flex-col justify-between`}
          >
            <span className="text-3xl font-black opacity-30">{card.step}</span>
            <div>
              <h3 className="text-xl font-bold mb-2">{card.title}</h3>
              <p className="text-sm opacity-80">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="h-96" />
      <div className="h-96" />
    </div>
  );
}
