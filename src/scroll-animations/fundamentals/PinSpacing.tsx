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

interface SectionData {
  id: string;
  label: string;
  color: string;
  icon: string;
  description: string;
}

const sections: SectionData[] = [
  { id: 'intro', label: 'Introduction', color: 'from-violet-600 to-purple-800', icon: '🌅', description: 'The first pinned section pushes the next one down automatically.' },
  { id: 'features', label: 'Features', color: 'from-blue-600 to-indigo-800', icon: '⚙️', description: 'GSAP handles pin spacing so sections don&apos;t overlap.' },
  { id: 'gallery', label: 'Gallery', color: 'from-emerald-600 to-teal-800', icon: '🖼️', description: 'Each section gets its own pinning duration.' },
  { id: 'pricing', label: 'Pricing', color: 'from-amber-600 to-orange-800', icon: '💳', description: 'The pin-spacer div is managed automatically.' },
  { id: 'cta', label: 'Call to Action', color: 'from-rose-600 to-pink-800', icon: '🎯', description: 'Final pinned section before normal scroll resumes.' },
];

export default function PinSpacing({
  markers = false,
  scrub = false,
  pin = true,
  start = 'top 10%',
  end = 'bottom 90%',
  duration = 1,
  ease = 'power2.out',
  disabled = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    const ctx = gsap.context(() => {
      sectionRefs.current.forEach((section, i) => {
        if (!section) return;

        ScrollTrigger.create({
          trigger: section,
          start: 'top 10%',
          end: '+=120%',
          pin: true,
          pinSpacing: true,
          markers,
          id: `pin-section-${sections[i].id}`,
          onEnter: () => {
            gsap.to(overlayRefs.current[i], {
              opacity: 1,
              duration: 0.4,
              ease: 'power2.out',
            });
          },
          onLeaveBack: () => {
            gsap.to(overlayRefs.current[i], {
              opacity: 0,
              duration: 0.4,
              ease: 'power2.out',
            });
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  return (
    <div ref={containerRef} className="min-h-screen py-32">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-white mb-2">Pin Spacing</h2>
        <p className="text-gray-400">
          GSAP automatically adds spacer elements to prevent layout jumps when pinning
        </p>
      </div>

      <div className="w-full max-w-2xl mx-auto px-4">
        {sections.map((section, i) => (
          <div
            key={section.id}
            ref={(el) => { sectionRefs.current[i] = el; }}
            className="relative h-screen flex items-center justify-center"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${section.color} rounded-2xl shadow-2xl`}
            />
            <div
              ref={(el) => { overlayRefs.current[i] = el; }}
              className="relative z-10 text-center px-8 opacity-0"
            >
              <span className="text-6xl block mb-6">{section.icon}</span>
              <h3 className="text-white text-4xl font-bold mb-3">{section.label}</h3>
              <p className="text-white/70 text-lg max-w-md mx-auto">{section.description}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-white/50 text-sm">
                <span className="w-2 h-2 rounded-full bg-white/30" />
                <span>Section {i + 1} of {sections.length}</span>
                <span className="w-2 h-2 rounded-full bg-white/30" />
              </div>
            </div>
          </div>
        ))}

        <div className="h-64 flex items-center justify-center">
          <p className="text-gray-500 text-center">
            All pinned sections have passed.<br />
            Normal scrolling resumes here.
          </p>
        </div>
      </div>

      <div className="w-full max-w-2xl mx-auto mt-16 px-4">
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h4 className="text-white font-semibold mb-2">How Pin Spacing Works</h4>
          <p className="text-gray-400 text-sm">
            When <code className="text-cyan-400">pin: true</code>, GSAP creates a
            <code className="text-cyan-400">.pin-spacer</code> div that matches the pinned
            element&apos;s dimensions. This prevents the page from collapsing while the element
            is fixed. With <code className="text-cyan-400">pinSpacing: true</code> (default),
            this happens automatically — no manual adjustments needed.
          </p>
        </div>
      </div>
    </div>
  );
}
