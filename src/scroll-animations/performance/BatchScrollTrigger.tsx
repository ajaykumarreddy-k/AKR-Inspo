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

const BATCH_SIZE = 50;

export default function BatchScrollTrigger({
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
  const gridRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    const grid = gridRef.current;
    if (!el || !grid || disabled) return;

    const ctx = gsap.context(() => {
      const boxes = grid.querySelectorAll<HTMLDivElement>('.batch-box');
      let batchCount = 0;
      let totalAnimated = 0;

      ScrollTrigger.batch(boxes, {
        interval: 0.1,
        batchMax: 8,
        onEnter: (batch) => {
          batchCount++;
          totalAnimated += batch.length;
          gsap.to(batch, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
            ease: 'back.out(1.7)',
            stagger: 0.03,
            overwrite: true,
          });

          if (infoRef.current) {
            infoRef.current.textContent = `Batches fired: ${batchCount} | Total animated: ${totalAnimated}`;
          }
        },
        onLeave: (batch) => {
          gsap.to(batch, {
            opacity: 0.3,
            scale: 0.95,
            duration: 0.3,
            overwrite: true,
          });
        },
        onEnterBack: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.02,
            overwrite: true,
          });
        },
        onLeaveBack: (batch) => {
          gsap.to(batch, {
            opacity: 0.3,
            scale: 0.95,
            duration: 0.3,
            overwrite: true,
          });
        },
      });
    }, el);

    return () => ctx.revert();
  }, [disabled, markers, scrub, pin, start, end, duration, ease]);

  return (
    <div ref={containerRef} className="min-h-screen py-32">
      <div className="text-center mb-8 max-w-xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2">Batch ScrollTrigger</h2>
        <p className="text-gray-400">
          Uses ScrollTrigger.batch() to efficiently animate groups of elements
        </p>
      </div>

      <div
        ref={infoRef}
        className="text-center text-sm text-emerald-400 font-mono mb-6"
      >
        Scrolling...
      </div>

      <div
        ref={gridRef}
        className="max-w-4xl mx-auto px-4 grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2"
      >
        {Array.from({ length: BATCH_SIZE }).map((_, i) => (
          <div
            key={i}
            className="batch-box aspect-square rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg opacity-0 scale-0 translate-y-4 flex items-center justify-center"
          >
            <span className="text-xs text-white font-bold">{i + 1}</span>
          </div>
        ))}
      </div>

      <p className="text-gray-500 text-sm text-center mt-6 max-w-lg mx-auto">
        Elements are animated in batches as they enter the viewport, reducing layout thrashing
      </p>
    </div>
  );
}
