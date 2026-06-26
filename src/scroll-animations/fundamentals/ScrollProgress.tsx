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

export default function ScrollProgress({
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
  const progressTrackRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const progressCircleRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectionIndicatorsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectionLabelsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const chapterLabels = ['Prologue', 'Chapter 1', 'Chapter 2', 'Chapter 3', 'Epilogue'];

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: progressTrackRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        markers,
        onUpdate: (self) => {
          const progress = self.progress;
          const percent = Math.round(progress * 100);

          if (progressFillRef.current) {
            gsap.set(progressFillRef.current, { scaleX: progress });
          }

          if (progressTextRef.current) {
            progressTextRef.current.textContent = `${percent}%`;
          }

          if (progressCircleRef.current) {
            gsap.set(progressCircleRef.current, {
              rotation: progress * 360,
              borderColor: `hsl(${progress * 240}, 80%, 55%)`,
            });
          }
        },
      });

      sectionsRef.current.forEach((section, i) => {
        if (!section) return;

        gsap.fromTo(
          section,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'top 20%',
              markers: false,
              toggleActions: 'play none none none',
            },
          }
        );
      });

      sectionIndicatorsRef.current.forEach((indicator, i) => {
        if (!indicator) return;

        ScrollTrigger.create({
          trigger: sectionsRef.current[i],
          start: 'top 80%',
          end: 'top 20%',
          markers: false,
          onEnter: () => {
            gsap.to(indicator, {
              scale: 1.5,
              backgroundColor: '#22d3ee',
              duration: 0.3,
              ease: 'power2.out',
            });
            if (sectionLabelsRef.current[i]) {
              gsap.to(sectionLabelsRef.current[i], {
                opacity: 1,
                x: 0,
                duration: 0.3,
              });
            }
          },
          onLeave: () => {
            gsap.to(indicator, {
              scale: 1,
              backgroundColor: '#374151',
              duration: 0.3,
            });
            if (sectionLabelsRef.current[i]) {
              gsap.to(sectionLabelsRef.current[i], {
                opacity: 0.5,
                x: -5,
                duration: 0.3,
              });
            }
          },
          onEnterBack: () => {
            gsap.to(indicator, {
              scale: 1.5,
              backgroundColor: '#22d3ee',
              duration: 0.3,
            });
            if (sectionLabelsRef.current[i]) {
              gsap.to(sectionLabelsRef.current[i], {
                opacity: 1,
                x: 0,
                duration: 0.3,
              });
            }
          },
          onLeaveBack: () => {
            gsap.to(indicator, {
              scale: 1,
              backgroundColor: '#374151',
              duration: 0.3,
            });
            if (sectionLabelsRef.current[i]) {
              gsap.to(sectionLabelsRef.current[i], {
                opacity: 0.5,
                x: -5,
                duration: 0.3,
              });
            }
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center min-h-screen py-32">
      <div className="text-center mb-16 max-w-xl">
        <h2 className="text-3xl font-bold text-white mb-2">Scroll Progress</h2>
        <p className="text-gray-400">
          Track scroll progress with a visual indicator tied to a specific element
        </p>
      </div>

      <div className="w-full max-w-4xl mx-auto px-4 flex gap-8">
        <div className="flex-1 space-y-8">
          {chapterLabels.map((label, i) => (
            <div
              key={label}
              ref={(el) => { sectionsRef.current[i] = el; }}
              className="h-48 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-lg flex items-center justify-center"
            >
              <div className="text-center">
                <span className="text-4xl block mb-2">
                  {['📖', '1️⃣', '2️⃣', '3️⃣', '🏁'][i]}
                </span>
                <h3 className="text-white text-xl font-bold">{label}</h3>
                <p className="text-gray-500 text-sm mt-1">
                  Scroll progress tracks through this content
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-16 shrink-0 flex flex-col items-center gap-4">
          <div
            ref={progressCircleRef}
            className="w-14 h-14 rounded-full border-4 border-gray-700 flex items-center justify-center transition-colors duration-200"
          >
            <span
              ref={progressTextRef}
              className="text-white text-sm font-bold font-mono"
            >
              0%
            </span>
          </div>

          <div
            ref={progressTrackRef}
            className="relative flex-1 w-3 bg-gray-800 rounded-full overflow-hidden"
          >
            <div
              ref={progressFillRef}
              className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-cyan-500 to-blue-500 rounded-full origin-bottom scale-x-0"
              style={{ height: '100%' }}
            />
          </div>

          <div className="space-y-3">
            {chapterLabels.map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div
                  ref={(el) => { sectionIndicatorsRef.current[i] = el; }}
                  className="w-3 h-3 rounded-full bg-gray-700 shrink-0"
                />
                <span
                  ref={(el) => { sectionLabelsRef.current[i] = el; }}
                  className="text-gray-500 text-xs opacity-50 -translate-x-1 whitespace-nowrap"
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
