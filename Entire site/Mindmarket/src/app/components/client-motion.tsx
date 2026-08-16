'use client';

import HeroMotion from './hero-motion';
import ScrollAnimations from './scroll-animations';
import HoverInteractions from './hover-interactions';

export default function ClientMotion() {
  return (
    <>
      <HeroMotion />
      <ScrollAnimations />
      <HoverInteractions />
    </>
  );
}
