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

interface TimelineEvent {
  year: string;
  title: string;
  desc: string;
  icon: string;
  color: string;
}

const timeline: TimelineEvent[] = [
  { year: '2018', title: 'Foundation', desc: 'The project was born from a simple idea.', icon: '🌱', color: 'from-emerald-400 to-teal-500' },
  { year: '2019', title: 'First Milestone', desc: 'Core architecture was designed and built.', icon: '🏗️', color: 'from-blue-400 to-indigo-500' },
  { year: '2020', title: 'Scaling Up', desc: 'Team grew from 3 to 30 engineers.', icon: '📈', color: 'from-violet-400 to-purple-500' },
  { year: '2021', title: 'Global Launch', desc: 'Product launched in 12 countries.', icon: '🚀', color: 'from-amber-400 to-orange-500' },
  { year: '2022', title: 'Market Leader', desc: 'Became the #1 platform in the space.', icon: '🏆', color: 'from-rose-400 to-pink-500' },
];

export default function NestedScrollTriggers({
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
  const parentPinRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const eventRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const yearRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          end: 'top 40%',
          markers: false,
        },
      });

      ScrollTrigger.create({
        trigger: parentPinRef.current,
        start: 'top 10%',
        end: '+=3000',
        pin: true,
        markers,
        id: 'nested-parent-pin',
      });

      gsap.to(lineRef.current, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true,
          markers: false,
        },
      });

      eventRefs.current.forEach((event, i) => {
        if (!event) return;

        gsap.fromTo(
          event,
          {
            opacity: 0,
            x: i % 2 === 0 ? -80 : 80,
            scale: 0.7,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.6,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: event,
              start: 'top 75%',
              end: 'top 25%',
              markers: false,
              toggleActions: 'play none none none',
              id: `nested-event-${i}`,
            },
          }
        );
      });

      dotRefs.current.forEach((dot, i) => {
        if (!dot) return;

        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: eventRefs.current[i],
              start: 'top 75%',
              end: 'top 25%',
              markers: false,
            },
          }
        );
      });

      yearRefs.current.forEach((year, i) => {
        if (!year) return;

        gsap.fromTo(
          year,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            delay: 0.2,
            ease,
            scrollTrigger: {
              trigger: eventRefs.current[i],
              start: 'top 70%',
              end: 'top 30%',
              markers: false,
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
        <h2 ref={titleRef} className="text-3xl font-bold text-white mb-2">Nested ScrollTriggers</h2>
        <p className="text-gray-400">
          Parent ScrollTrigger pins the section while child triggers animate individual items
        </p>
      </div>

      <div
        ref={parentPinRef}
        className="w-full max-w-3xl mx-auto px-4"
      >
        <div ref={timelineRef} className="relative">
          <div
            ref={lineRef}
            className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-violet-500 rounded-full origin-top scale-y-0"
          />

          <div className="relative space-y-8">
            {timeline.map((event, i) => (
              <div
                key={event.year}
                ref={(el) => { eventRefs.current[i] = el; }}
                className="relative flex items-start gap-6 pl-16"
              >
                <div
                  ref={(el) => { dotRefs.current[i] = el; }}
                  className={`absolute left-3 w-6 h-6 rounded-full bg-gradient-to-br ${event.color} shadow-lg border-2 border-gray-900 -translate-x-1/2`}
                />

                <div className="flex-1 rounded-xl bg-gray-800/50 border border-gray-700 p-6 hover:border-cyan-500/30 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span
                      ref={(el) => { yearRefs.current[i] = el; }}
                      className="text-cyan-400 font-mono font-bold text-sm"
                    >
                      {event.year}
                    </span>
                    <span className="text-2xl">{event.icon}</span>
                  </div>
                  <h4 className="text-white font-bold text-lg mb-1">{event.title}</h4>
                  <p className="text-gray-400 text-sm">{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full max-w-lg mx-auto mt-16 px-4">
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h4 className="text-white font-semibold mb-2">How Nesting Works</h4>
          <p className="text-gray-400 text-sm">
            The parent ScrollTrigger uses <code className="text-cyan-400">pin: true</code> to keep the
            timeline section fixed. Child ScrollTriggers on each event card animate independently
            as the user scrolls within the pinned area. This creates a seamless nested animation flow.
          </p>
        </div>
      </div>
    </div>
  );
}
