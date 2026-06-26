import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

interface BouncingBallProps {
  children?: React.ReactNode;
  bounceHeight?: number;
  duration?: number;
  containerClassName?: string;
  ballClassName?: string;
}

export default function BouncingBall({
  children,
  bounceHeight = 100,
  duration = 0.5,
  containerClassName = '',
  ballClassName = '',
}: BouncingBallProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!ballRef.current) return;
      const ball = ballRef.current;

      // Master timeline for better synchronization and no latency issues
      const tl = gsap.timeline({ repeat: -1 });

      // Up movement
      tl.to(ball, {
        y: -bounceHeight,
        duration: duration,
        ease: 'power1.out',
      })
      // Down movement
      .to(ball, {
        y: 0,
        duration: duration,
        ease: 'power1.in',
      })
      // Squish at the bottom (overlapping with the hit)
      .to(ball, {
        scaleY: 0.7,
        scaleX: 1.3,
        duration: duration * 0.3,
        ease: 'power1.out',
        yoyo: true,
        repeat: 1,
      }, `-=${duration * 0.1}`);
      
    }, containerRef);

    return () => ctx.revert();
  }, [bounceHeight, duration]);

  return (
    <div 
      ref={containerRef} 
      className={`flex flex-col items-center justify-end h-[200px] md:h-[250px] w-full border-b-2 border-[var(--color-border)] ${containerClassName}`}
    >
      <div 
        ref={ballRef}
        className={`will-change-transform origin-bottom ${!children ? 'w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-accent)] shadow-[0_0_20px_rgba(34,211,238,0.5)]' : ''} ${ballClassName}`}
      >
        {children}
      </div>
    </div>
  );
}
