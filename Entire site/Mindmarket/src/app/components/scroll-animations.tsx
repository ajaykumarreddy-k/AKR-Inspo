'use client';

import { useEffect } from 'react';

export default function ScrollAnimations() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let ctx: any;

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          // 1. Real Human Insights Pinned Shrink & Fade
          const realHumanSection = document.querySelector('[data-cid="n76"]');
          const realHumanTitle = document.querySelector('[data-cid="n81"]');
          const realHumanSub = document.querySelector('[data-cid="n83"]');

          if (realHumanSection && realHumanTitle) {
            gsap.to([realHumanTitle, realHumanSub].filter(Boolean), {
              scrollTrigger: {
                trigger: realHumanSection,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
              },
              scale: 0.85,
              opacity: 0.2,
              y: -50,
              ease: 'none',
            });
          }

          // 2. Logo Cloud Illustration Parallax & Scale
          const logoCloudWrapper = document.querySelector('[data-cid="n95"]');
          if (logoCloudWrapper) {
            gsap.fromTo(
              logoCloudWrapper,
              { scale: 0.75, y: 60 },
              {
                scrollTrigger: {
                  trigger: '[data-cid="n91"]',
                  start: 'top 85%',
                  end: 'top 15%',
                  scrub: true,
                },
                scale: 1,
                y: 0,
                ease: 'power2.out',
              }
            );
          }

          // 3. Scroll-Triggered SVG Line Draw Animation for Section SVGs
          const scrollSvgPaths = document.querySelectorAll<SVGPathElement>(
            '#main-path, #secondary-path, #mobile-main-path, #mobile-overlap-end'
          );
          scrollSvgPaths.forEach((path) => {
            const length = path.getTotalLength() || 3000;
            gsap.set(path, {
              strokeDasharray: `${length}px ${length}px`,
              strokeDashoffset: length,
            });

            gsap.to(path, {
              scrollTrigger: {
                trigger: path.closest('svg') || path,
                start: 'top 85%',
                end: 'bottom 20%',
                scrub: 1.5,
              },
              strokeDashoffset: 0,
              ease: 'none',
            });
          });

          // 4. Enhanced Multi-Layer Parallax for Logo Cloud Stacked Landscape Layers (n299, n300, n301)
          const landscapeContainer =
            document.querySelector('[data-cid="n269"]') || document.querySelector('[data-cid="n91"]');
          const layerBack =
            document.querySelector('[data-cid="n299"]') ||
            document.querySelector('img[src*="140b61cb754d"]');
          const layerMid =
            document.querySelector('[data-cid="n300"]') ||
            document.querySelector('img[src*="58e3f70cc0b5"]');
          const layerFront =
            document.querySelector('[data-cid="n301"]') ||
            document.querySelector('img[src*="daad8157d5b2"]');

          if (landscapeContainer) {
            // Farthest Background Layer (High motion range)
            if (layerBack) {
              gsap.fromTo(
                layerBack,
                { y: -140 },
                {
                  scrollTrigger: {
                    trigger: landscapeContainer,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                  },
                  y: 140,
                  ease: 'none',
                }
              );
            }

            // Midground Hill Layer (Medium motion range)
            if (layerMid) {
              gsap.fromTo(
                layerMid,
                { y: -80 },
                {
                  scrollTrigger: {
                    trigger: landscapeContainer,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                  },
                  y: 80,
                  ease: 'none',
                }
              );
            }

            // Foreground Hill Layer (Subtle front anchor)
            if (layerFront) {
              gsap.fromTo(
                layerFront,
                { y: -30 },
                {
                  scrollTrigger: {
                    trigger: landscapeContainer,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                  },
                  y: 30,
                  ease: 'none',
                }
              );
            }

            // Amplified Floating Assets Parallax (Yellow Clock, Blue Folder & Flying Papers, Flower Asset)
            const clockElem =
              document.querySelector('[data-cid="n291"]') ||
              document.querySelector('[data-cid="n293"]') ||
              document.querySelector('img[src*="e11116d41b91"]');
            const folderElem =
              document.querySelector('[data-cid="n287"]') ||
              document.querySelector('[data-cid="n289"]') ||
              document.querySelector('img[src*="b14874c3c62e"]');
            const flowerElem =
              document.querySelector('[data-cid="n283"]') ||
              document.querySelector('[data-cid="n285"]') ||
              document.querySelector('img[src*="86cc400dc0b7"]');

            if (clockElem) {
              gsap.fromTo(
                clockElem,
                { y: 160, rotation: -25 },
                {
                  scrollTrigger: {
                    trigger: landscapeContainer,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                  },
                  y: -120,
                  rotation: 25,
                  ease: 'none',
                }
              );
            }

            if (folderElem) {
              gsap.fromTo(
                folderElem,
                { y: 180, scale: 0.88 },
                {
                  scrollTrigger: {
                    trigger: landscapeContainer,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                  },
                  y: -140,
                  scale: 1.12,
                  ease: 'none',
                }
              );
            }

            if (flowerElem) {
              gsap.fromTo(
                flowerElem,
                { y: 120, x: -45 },
                {
                  scrollTrigger: {
                    trigger: landscapeContainer,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                  },
                  y: -90,
                  x: 45,
                  ease: 'none',
                }
              );
            }
          }

          // 5. Section 6 Green Landscape Multi-Layer Parallax (SVG + Images)
          const section6 = document.querySelector('[data-cid="n348"]');
          if (section6) {
            // Foreground flowers SVG (Illustration5)
            const illus5 = section6.querySelector('[data-cid="n367"]');
            if (illus5) {
              gsap.fromTo(
                illus5,
                { yPercent: -28 },
                {
                  scrollTrigger: {
                    trigger: section6,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                  },
                  yPercent: 28,
                  ease: 'none',
                }
              );
            }

            // Background hill SVG (Illustration6)
            const illus6 = section6.querySelector('[data-cid="n368"]');
            if (illus6) {
              gsap.fromTo(
                illus6,
                { yPercent: -45 },
                {
                  scrollTrigger: {
                    trigger: section6,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                  },
                  yPercent: 45,
                  ease: 'none',
                }
              );
            }

            // Section 6 Background Images
            const section6Imgs = section6.querySelectorAll<HTMLElement>('img, picture');
            section6Imgs.forEach((img) => {
              gsap.fromTo(
                img,
                { yPercent: -38, scale: 1.2 },
                {
                  scrollTrigger: {
                    trigger: section6,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                  },
                  yPercent: 38,
                  scale: 1.0,
                  ease: 'none',
                }
              );
            });
          }

          // Standard Inner Parallax for all other c-inner-parallax elements
          const parallaxWrappers = document.querySelectorAll('c-inner-parallax');
          parallaxWrappers.forEach((wrapper) => {
            if (section6 && section6.contains(wrapper)) return;
            const img = wrapper.querySelector('img');
            if (img) {
              gsap.fromTo(
                img,
                { yPercent: -28 },
                {
                  scrollTrigger: {
                    trigger: wrapper,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                  },
                  yPercent: 28,
                  ease: 'none',
                }
              );
            }
          });

          // 6. Few Numbers Behind Section - MediaTile Stagger Reveal
          const mediaTiles = document.querySelectorAll('[data-cid="n381"] > div');
          if (mediaTiles.length > 0) {
            gsap.fromTo(
              mediaTiles,
              { y: 60, opacity: 0 },
              {
                scrollTrigger: {
                  trigger: '[data-cid="n369"]',
                  start: 'top 70%',
                  end: 'bottom 50%',
                  toggleActions: 'play none none reverse',
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out',
              }
            );
          }

          // 7. Brands Marquee Continuous Rail Loop
          const railContent = document.querySelector('[data-cid="n488"]');
          if (railContent) {
            const tween = gsap.to(railContent, {
              xPercent: -50,
              repeat: -1,
              duration: 25,
              ease: 'none',
            });

            // Speed up marquee slightly on scroll down
            ScrollTrigger.create({
              onUpdate: (self) => {
                const timeScale = 1 + Math.abs(self.getVelocity() / 300);
                gsap.to(tween, { timeScale, duration: 0.3 });
              },
            });
          }

          // 8. Featured Article Cards Stagger Reveal
          const cards = document.querySelectorAll('[data-cid="n409"] > li');
          if (cards.length > 0) {
            gsap.fromTo(
              cards,
              { y: 50, opacity: 0 },
              {
                scrollTrigger: {
                  trigger: '[data-cid="n406"]',
                  start: 'top 75%',
                },
                y: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.15,
                ease: 'power2.out',
              }
            );
          }

          // 9. Footer "Let's Connect" Underline Draw & Fade Reveal
          const footerConnect = document.querySelector('[data-cid="n687"]');
          if (footerConnect) {
            gsap.fromTo(
              footerConnect,
              { opacity: 0, scaleX: 0.9 },
              {
                scrollTrigger: {
                  trigger: '[data-cid="n646"]',
                  start: 'top 80%',
                },
                opacity: 1,
                scaleX: 1,
                duration: 1,
                ease: 'expo.out',
              }
            );
          }
        });
      }
    );

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return null;
}
