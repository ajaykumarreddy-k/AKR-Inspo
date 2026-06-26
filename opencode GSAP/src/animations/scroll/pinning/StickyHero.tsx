import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StickyHeroProps {
  heroContent?: React.ReactNode;
  scrollContent?: React.ReactNode;
  className?: string;
}

export default function StickyHero({
  heroContent,
  scrollContent,
  className = '',
}: StickyHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Refresh ScrollTrigger to ensure correct layout calculations and eliminate latency/jumpiness
      ScrollTrigger.refresh();

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        pin: pinRef.current,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-[150vh] md:min-h-[200vh] ${className}`}
      style={{ background: 'var(--color-bg)' }}
    >
      <div
        ref={pinRef}
        className="flex h-[100svh] items-center justify-center will-change-transform"
        style={{ background: 'var(--color-surface)' }}
      >
        {heroContent || (
          <div className="text-center px-4 md:px-0">
            <h1 className="mb-4 md:mb-6 text-4xl md:text-6xl font-bold" style={{ color: 'var(--color-primary)' }}>
              Sticky Hero
            </h1>
            <p className="max-w-xl text-base md:text-lg mx-auto" style={{ color: 'var(--color-text-muted)' }}>
              This hero section stays pinned while the rest of the content scrolls behind it.
            </p>
          </div>
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-16 md:pb-32 px-4">
        {scrollContent || (
          <div
            className="flex h-64 md:h-96 w-full md:w-3/4 items-center justify-center rounded-2xl border shadow-xl backdrop-blur-sm"
            style={{
              background: 'var(--color-bg)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-muted)',
            }}
          >
            Scroll behind content
          </div>
        )}
      </div>
    </section>
  );
}
