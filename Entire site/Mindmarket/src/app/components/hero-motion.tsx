'use client';

import { useEffect } from 'react';

export default function HeroMotion() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let ctx: any;

    import('gsap').then(({ default: gsap }) => {
      ctx = gsap.context(() => {
        const heroContainer = document.querySelector('[data-cid="n1"]');
        const navbarDesktop = document.querySelector('[data-cid="n5"]');
        const navbarMobile = document.querySelector('[data-cid="n49"]');
        const headline = document.querySelector('[data-cid="n81"]');
        const subheadline = document.querySelector('[data-cid="n83"]');
        const heroSvgPath = document.querySelector<SVGPathElement>('[data-main-path]');

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Initial states
        if (heroContainer) {
          gsap.set(heroContainer, { clipPath: 'inset(0% 0% 0%)', opacity: 1 });
        }
        if (navbarDesktop) {
          gsap.set(navbarDesktop, { y: -30, opacity: 0 });
        }
        if (navbarMobile) {
          gsap.set(navbarMobile, { y: -30, opacity: 0 });
        }
        if (headline) {
          gsap.set(headline, { y: 40, opacity: 0 });
        }
        if (subheadline) {
          gsap.set(subheadline, { y: 30, opacity: 0 });
        }

        // SVG Draw Line Initial Setup
        if (heroSvgPath) {
          const length = heroSvgPath.getTotalLength() || 1590.02;
          gsap.set(heroSvgPath, {
            strokeDasharray: `${length}px ${length}px`,
            strokeDashoffset: length,
          });
        }

        // 1. Page load wipe sequence
        if (heroContainer) {
          tl.to(heroContainer, {
            clipPath: 'inset(0% 0% 100%)',
            duration: 1.2,
            ease: 'power4.inOut',
            delay: 0.2,
          });
        }

        // 2. Draw SVG line stroke
        if (heroSvgPath) {
          tl.to(
            heroSvgPath,
            {
              strokeDashoffset: 0,
              duration: 1.8,
              ease: 'power2.inOut',
            },
            '-=0.8'
          );
        }

        // 3. Navbar entrance
        if (navbarDesktop || navbarMobile) {
          tl.to(
            [navbarDesktop, navbarMobile].filter(Boolean),
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
            },
            '-=1.2'
          );
        }

        // 4. Headline reveal
        if (headline) {
          tl.to(
            headline,
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: 'power3.out',
            },
            '-=0.9'
          );
        }

        if (subheadline) {
          tl.to(
            subheadline,
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
            },
            '-=0.7'
          );
        }
      });
    });

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return null;
}
