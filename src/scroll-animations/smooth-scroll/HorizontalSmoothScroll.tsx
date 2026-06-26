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

const panels = [
  { color: 'from-violet-500 to-purple-700', label: 'Panel 1', icon: '🌅' },
  { color: 'from-emerald-500 to-teal-600', label: 'Panel 2', icon: '🏔️' },
  { color: 'from-rose-500 to-pink-600', label: 'Panel 3', icon: '🌊' },
  { color: 'from-amber-500 to-orange-600', label: 'Panel 4', icon: '🔥' },
  { color: 'from-cyan-500 to-blue-600', label: 'Panel 5', icon: '💎' },
];

export default function HorizontalSmoothScroll({
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!el || !section || !track || disabled) return;

    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth;
      const viewWidth = window.innerWidth;
      const distance = totalWidth - viewWidth;

      gsap.to(track, {
        x: () => -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance}`,
          pin: true,
          scrub: true,
          markers,
          invalidateOnRefresh: true,
        },
      });

      panelRefs.current.forEach((panel) => {
        if (!panel) return;
        gsap.from(panel, {
          opacity: 0,
          scale: 0.85,
          duration: 0.6,
          ease,
          scrollTrigger: {
            trigger: panel,
            containerAnimation: gsap.getById('horizontal-scroll') || undefined,
            start: 'left 80%',
            end: 'left 20%',
            markers: false,
            toggleActions: 'play none none none',
          },
        });
      });

      labelRefs.current.forEach((label) => {
        if (!label) return;
        gsap.from(label, {
          opacity: 0,
          y: 30,
          duration: 0.5,
          ease,
          scrollTrigger: {
            trigger: label.parentElement,
            start: 'left 75%',
            end: 'left 25%',
            markers: false,
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  return (
    <div ref={containerRef} className="min-h-screen py-32">
      <div className="text-center mb-16 max-w-xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2">Horizontal Smooth Scroll</h2>
        <p className="text-gray-400">Panels slide horizontally as you scroll down</p>
      </div>

      <div ref={sectionRef} className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-6 px-6"
          style={{ width: `${panels.length * 100}vw`, minWidth: 'fit-content' }}
        >
          {panels.map((panel, i) => (
            <div
              key={panel.label}
              ref={(el) => { panelRefs.current[i] = el; }}
              className={`h-[70vh] w-[85vw] max-w-3xl shrink-0 rounded-3xl bg-gradient-to-br ${panel.color} shadow-2xl flex items-center justify-center`}
            >
              <div className="text-center">
                <span className="text-7xl block mb-6">{panel.icon}</span>
                <h3
                  ref={(el) => { labelRefs.current[i] = el; }}
                  className="text-white text-4xl font-bold"
                >
                  {panel.label}
                </h3>
                <p className="text-white/60 mt-2 text-lg">Scroll to slide horizontally</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
