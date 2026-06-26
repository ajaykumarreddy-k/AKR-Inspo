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

interface SlideData {
  label: string;
  color: string;
  icon: string;
  description: string;
}

const slides: SlideData[] = [
  { label: 'Explore', color: 'from-violet-600 to-purple-800', icon: '🔭', description: 'Discover new horizons as you scroll horizontally through this section.' },
  { label: 'Create', color: 'from-blue-600 to-indigo-800', icon: '🎨', description: 'Build beautiful scroll-driven experiences with GSAP and ScrollTrigger.' },
  { label: 'Animate', color: 'from-emerald-600 to-teal-800', icon: '✨', description: 'Bring your designs to life with smooth, performant animations.' },
  { label: 'Launch', color: 'from-amber-600 to-orange-800', icon: '🚀', description: 'Deploy your creation and share it with the world.' },
  { label: 'Celebrate', color: 'from-rose-600 to-pink-800', icon: '🎉', description: 'You built something amazing. Time to celebrate!' },
];

export default function HorizontalContainers({
  markers = false,
  scrub = false,
  pin = true,
  start = 'top 80%',
  end = 'bottom 20%',
  duration = 1,
  ease = 'power2.out',
  disabled = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    if (!el || !section || !wrapper || disabled) return;

    const getScrollWidth = () => wrapper.scrollWidth - section.offsetWidth;

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          end: 'top 50%',
          markers: false,
          toggleActions: 'play none none none',
        },
      });

      gsap.to(wrapper, {
        x: () => -getScrollWidth(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: 'top 10%',
          end: () => `+=${getScrollWidth()}`,
          scrub: 1,
          markers,
          id: 'horizontal-scroll',
          invalidateOnRefresh: true,
        },
      });

      slideRefs.current.forEach((slide, i) => {
        if (!slide) return;

        gsap.fromTo(
          slide,
          { opacity: 0, scale: 0.8, rotationY: 45 },
          {
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: slide,
              containerAnimation: undefined,
              start: 'left 80%',
              end: 'left 20%',
              horizontal: true,
              markers: false,
              toggleActions: 'play none none none',
            },
          }
        );
      });

      ScrollTrigger.create({
        trigger: section,
        start: 'top 10%',
        end: () => `+=${getScrollWidth()}`,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          if (counterRef.current) {
            const currentSlide = Math.min(Math.floor(progress * slides.length), slides.length - 1);
            counterRef.current.textContent = `${currentSlide + 1} / ${slides.length}`;
          }
          if (progressRef.current) {
            gsap.set(progressRef.current, { scaleX: progress });
          }
        },
      });
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen py-32">
      <div className="text-center mb-16 max-w-xl">
        <h2 ref={titleRef} className="text-3xl font-bold text-white mb-2">Horizontal Containers</h2>
        <p className="text-gray-400">
          Horizontal scroll within a pinned section — slides move left as you scroll down
        </p>
      </div>

      <div
        ref={sectionRef}
        className="w-full max-w-5xl mx-auto overflow-hidden rounded-2xl border border-gray-700 bg-gray-900"
        style={{ height: '500px' }}
      >
        <div
          ref={wrapperRef}
          className="flex will-change-transform"
          style={{ width: `${slides.length * 100}%` }}
        >
          {slides.map((slide, i) => (
            <div
              key={slide.label}
              ref={(el) => { slideRefs.current[i] = el; }}
              className="flex-1 min-w-0 h-full flex items-center justify-center p-12"
              style={{ width: `${100 / slides.length}%` }}
            >
              <div className={`w-full h-full rounded-2xl bg-gradient-to-br ${slide.color} shadow-2xl flex flex-col items-center justify-center p-8 text-center`}>
                <span className="text-7xl mb-6">{slide.icon}</span>
                <h3 className="text-white text-4xl font-bold mb-3">{slide.label}</h3>
                <p className="text-white/70 text-lg max-w-sm">{slide.description}</p>
                <div className="mt-8 flex items-center gap-2 text-white/50 text-sm">
                  <span className="w-16 h-px bg-white/20" />
                  <span>Slide {i + 1} of {slides.length}</span>
                  <span className="w-16 h-px bg-white/20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 mt-6 w-full max-w-5xl mx-auto px-4">
        <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full w-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full origin-left scale-x-0"
          />
        </div>
        <span
          ref={counterRef}
          className="text-white font-mono text-sm font-bold shrink-0"
        >
          1 / {slides.length}
        </span>
      </div>
    </div>
  );
}
