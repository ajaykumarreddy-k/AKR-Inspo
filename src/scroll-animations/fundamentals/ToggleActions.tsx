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

const actions: { label: string; toggle: string; color: string }[] = [
  { label: 'play', toggle: 'play none none none', color: 'from-emerald-400 to-teal-500' },
  { label: 'pause', toggle: 'none play none none', color: 'from-blue-400 to-indigo-500' },
  { label: 'resume', toggle: 'none none play none', color: 'from-violet-400 to-purple-500' },
  { label: 'reverse', toggle: 'none none none play', color: 'from-amber-400 to-orange-500' },
  { label: 'complete', toggle: 'none none none complete', color: 'from-rose-400 to-pink-500' },
  { label: 'reset', toggle: 'none none none reset', color: 'from-cyan-400 to-sky-500' },
  { label: 'restart', toggle: 'none none none restart', color: 'from-fuchsia-400 to-pink-500' },
];

export default function ToggleActions({
  markers = false,
  scrub = false,
  pin = false,
  start = 'top 80%',
  end = 'bottom 20%',
  duration = 1,
  ease = 'power2.out',
  disabled = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      boxRefs.current.forEach((box, i) => {
        if (!box) return;
        const action = actions[i];
        const parts = action.toggle.split(' ');
        gsap.fromTo(
          box,
          { opacity: 0.3, x: -60, scale: 0.8 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration,
            ease,
            scrollTrigger: {
              trigger: box,
              start,
              end: '+=200',
              markers,
              scrub: false,
              pin: false,
              toggleActions: action.toggle,
              id: `toggle-${action.label}`,
            },
          }
        );
      });

      labelRefs.current.forEach((label, i) => {
        if (!label) return;
        const action = actions[i];
        gsap.fromTo(
          label,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease,
            scrollTrigger: {
              trigger: label.parentElement,
              start,
              end: '+=200',
              markers: false,
              toggleActions: action.toggle,
            },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen py-32">
      <div className="text-center mb-16 max-w-xl">
        <h2 className="text-3xl font-bold text-white mb-2">Toggle Actions</h2>
        <p className="text-gray-400">
          Each box uses a different toggle action — play, pause, reverse, reset, restart, complete
        </p>
      </div>

      <div className="w-full max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        {actions.map((action, i) => (
          <div key={action.label} className="flex flex-col items-center">
            <div
              ref={(el) => { boxRefs.current[i] = el; }}
              className={`w-full h-28 rounded-xl bg-gradient-to-r ${action.color} shadow-lg flex flex-col items-center justify-center`}
            >
              <span
                ref={(el) => { labelRefs.current[i] = el; }}
                className="text-white font-bold text-lg"
              >
                {action.label}
              </span>
            </div>
            <code className="text-xs text-gray-500 mt-2 font-mono">{action.toggle}</code>
          </div>
        ))}
      </div>

      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mt-12 max-w-md w-full">
        <h4 className="text-white font-semibold mb-2">Toggle Actions Format</h4>
        <p className="text-gray-400 text-sm">
          <code className="text-cyan-400">onEnter onLeave onEnterBack onLeaveBack</code>
        </p>
        <p className="text-gray-500 text-xs mt-2">
          Controls what happens at each phase of the scroll direction.
        </p>
      </div>
    </div>
  );
}
