'use client';

import { useEffect } from 'react';

export default function HoverInteractions() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let ctx: any;

    import('gsap').then(({ default: gsap }) => {
      ctx = gsap.context(() => {
        // 1. Magnetic Arrow Buttons Effect
        const magneticTargets = document.querySelectorAll<HTMLElement>(
          'c-button-quote a, [data-cid="n310"], [data-cid="n333"], [data-cid="n653"], [data-cid="n59"], [data-cid="n35"], [data-cid="n61"]'
        );

        magneticTargets.forEach((btn) => {
          const iconCircle = btn.querySelector<HTMLElement>(
            'span[class*="rounded-[100%]"], [data-cid="n47"], [data-cid="n335"], [data-cid="n655"], [data-cid="n312"]'
          );

          const handleMouseMove = (e: MouseEvent) => {
            const rect = btn.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (e.clientX - centerX) * 0.25;
            const deltaY = (e.clientY - centerY) * 0.25;

            gsap.to(btn, {
              x: deltaX * 0.4,
              y: deltaY * 0.4,
              duration: 0.4,
              ease: 'power2.out',
            });

            if (iconCircle) {
              gsap.to(iconCircle, {
                x: deltaX * 0.8,
                y: deltaY * 0.8,
                duration: 0.4,
                ease: 'power2.out',
              });
            }
          };

          const handleMouseLeave = () => {
            gsap.to(btn, {
              x: 0,
              y: 0,
              duration: 0.6,
              ease: 'elastic.out(1, 0.4)',
            });

            if (iconCircle) {
              gsap.to(iconCircle, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: 'elastic.out(1, 0.4)',
              });
            }
          };

          btn.addEventListener('mousemove', handleMouseMove);
          btn.addEventListener('mouseleave', handleMouseLeave);
        });

        // 2. Card Hover Scale & Image Zoom
        const cards = document.querySelectorAll<HTMLElement>('[data-cid="n409"] > li, [data-cid="n480"]');
        cards.forEach((card) => {
          const img = card.querySelector<HTMLElement>('img');

          const handleEnter = () => {
            gsap.to(card, {
              y: -6,
              duration: 0.4,
              ease: 'power2.out',
            });
            if (img) {
              gsap.to(img, {
                scale: 1.06,
                duration: 0.5,
                ease: 'power2.out',
              });
            }
          };

          const handleLeave = () => {
            gsap.to(card, {
              y: 0,
              duration: 0.4,
              ease: 'power2.out',
            });
            if (img) {
              gsap.to(img, {
                scale: 1,
                duration: 0.5,
                ease: 'power2.out',
              });
            }
          };

          card.addEventListener('mouseenter', handleEnter);
          card.addEventListener('mouseleave', handleLeave);
        });
      });
    });

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return null;
}
