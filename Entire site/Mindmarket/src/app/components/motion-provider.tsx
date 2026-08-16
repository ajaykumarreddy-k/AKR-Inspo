'use client';

import { useEffect, type ReactNode } from 'react';

export default function MotionProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let lenisInstance: any = null;
    let animationFrameId: number | null = null;

    Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
      import('lenis'),
    ])
      .then(([{ default: gsap }, { ScrollTrigger }, { default: Lenis }]) => {
        gsap.registerPlugin(ScrollTrigger);

        lenisInstance = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
        });

        lenisInstance.on('scroll', ScrollTrigger.update);

        function raf(time: number) {
          lenisInstance?.raf(time);
          animationFrameId = requestAnimationFrame(raf);
        }

        animationFrameId = requestAnimationFrame(raf);
      })
      .catch((err) => console.error('Failed to load motion libraries:', err));

    return () => {
      if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
      if (lenisInstance) lenisInstance.destroy();
    };
  }, []);

  return <>{children}</>;
}
