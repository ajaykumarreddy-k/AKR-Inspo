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

const rightContent = [
  { title: 'Introduction', text: 'Welcome to the split-screen experience. The left panel stays pinned while content scrolls on the right.' },
  { title: 'Features', text: 'Each section on the right reveals new information about the product while the visual stays constant.' },
  { title: 'Benefits', text: 'Users can digest content at their own pace with a persistent visual reference point.' },
  { title: 'Details', text: 'Technical specifications and implementation details for developers.' },
  { title: 'Get Started', text: 'Ready to begin? Follow the steps to integrate this pattern into your project.' },
];

export default function SplitScreenPin({
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
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: leftRef.current,
        start: 'top top',
        end: `+=${rightContent.length * 100}%`,
        pin: true,
        markers,
      });

      gsap.fromTo(
        indicatorRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: rightRef.current,
            start: 'top top',
            end: `bottom bottom`,
            scrub: 1,
            markers: false,
          },
        }
      );

      sectionsRef.current.forEach((section, i) => {
        if (!section) return;
        gsap.from(section, {
          opacity: 0,
          x: 60,
          duration: 0.8,
          ease,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 30%',
            scrub,
            markers: false,
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  return (
    <div ref={containerRef} className="bg-gray-950">
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-2">Split Screen Pin</h2>
          <p className="text-gray-400">Left pins, right scrolls</p>
        </div>
      </div>

      <div className="flex min-h-screen">
        <div
          ref={leftRef}
          className="w-1/2 h-screen flex items-center justify-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-indigo-900" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
          <div className="relative z-10 text-center px-12">
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-white/10 flex items-center justify-center">
              <span className="text-6xl">⚡</span>
            </div>
            <h3 className="text-4xl font-bold text-white mb-4">Pinned Side</h3>
            <p className="text-white/60 text-lg">
              This side stays fixed while you scroll through the content on the right.
            </p>
          </div>
          <div
            ref={indicatorRef}
            className="absolute right-0 top-0 w-1 bg-white/40 origin-top"
            style={{ height: '100%' }}
          />
        </div>

        <div ref={rightRef} className="w-1/2">
          {rightContent.map((item, i) => (
            <div
              key={i}
              ref={(el) => { sectionsRef.current[i] = el!; }}
              className="min-h-screen flex items-center justify-center px-12"
            >
              <div className="max-w-md">
                <span className="text-6xl font-black text-white/10 mb-4 block">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-3xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-screen flex items-center justify-center bg-gray-950">
        <p className="text-gray-400 text-xl">End of split screen</p>
      </div>
    </div>
  );
}
