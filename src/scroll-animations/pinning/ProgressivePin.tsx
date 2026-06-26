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

const steps = [
  { title: 'Discover', desc: 'Explore the possibilities', color: 'from-violet-500 to-purple-700' },
  { title: 'Learn', desc: 'Understand the process', color: 'from-blue-500 to-indigo-700' },
  { title: 'Build', desc: 'Create your solution', color: 'from-emerald-500 to-teal-700' },
  { title: 'Launch', desc: 'Share with the world', color: 'from-amber-500 to-orange-700' },
];

export default function ProgressivePin({
  markers = false,
  scrub = false,
  pin = true,
  start = 'top top',
  end = '+=200%',
  duration = 1,
  ease = 'power2.out',
  disabled = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      const sectionHeight = 100 / steps.length;

      sectionsRef.current.forEach((section, i) => {
        if (!section) return;

        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: `+=${sectionHeight}%`,
          pin: true,
          pinSpacing: false,
          markers,
        });

        gsap.from(section.querySelector('.step-content'), {
          opacity: 0,
          y: 50,
          scale: 0.9,
          duration: 0.6,
          ease,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 30%',
            scrub,
            markers: false,
          },
        });
      });

      gsap.to(progressRef.current, {
        scaleY: 1,
        duration: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${steps.length * 100}%`,
          scrub: 1,
          markers: false,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  return (
    <div ref={containerRef} className="relative bg-gray-950">
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-2">Progressive Pin</h2>
          <p className="text-gray-400">Sections pin and release progressively</p>
        </div>
      </div>

      <div className="relative">
        <div
          ref={progressRef}
          className="fixed left-8 top-0 w-1 h-screen bg-gradient-to-b from-violet-500 via-blue-500 via-emerald-500 to-amber-500 origin-top scale-y-0 z-50 rounded-full"
        />

        {steps.map((step, i) => (
          <div
            key={i}
            ref={(el) => { sectionsRef.current[i] = el!; }}
            className={`h-screen bg-gradient-to-br ${step.color} flex items-center justify-center px-6`}
          >
            <div className="step-content text-center max-w-lg">
              <span className="text-7xl font-black text-white/10 block mb-4">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-5xl font-bold text-white mb-4">{step.title}</h3>
              <p className="text-white/70 text-xl">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="h-screen flex items-center justify-center bg-gray-950">
        <p className="text-gray-400 text-xl">Journey complete</p>
      </div>
    </div>
  );
}
