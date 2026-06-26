import type { ComponentType } from 'react';

export interface ScrollAnimationComponent {
  id: string;
  title: string;
  description: string;
  category: AnimationCategory;
  tags: string[];
  plugins: string[];
  component: ComponentType<AnimationProps>;
  controls?: ControlConfig[];
}

export type AnimationCategory =
  | 'fundamentals'
  | 'reveal'
  | 'pinning'
  | 'scrub'
  | 'horizontal'
  | 'parallax'
  | 'svg'
  | 'timelines'
  | 'cards'
  | 'images'
  | 'text'
  | 'progress'
  | 'physics'
  | 'smooth-scroll'
  | 'performance';

export interface AnimationProps {
  scrub?: number | boolean;
  markers?: boolean;
  pin?: boolean;
  start?: string;
  end?: string;
  duration?: number;
  ease?: string;
  disabled?: boolean;
}

export interface ControlConfig {
  key: string;
  label: string;
  type: 'checkbox' | 'slider' | 'select' | 'text';
  default: unknown;
  options?: { label: string; value: unknown }[];
  min?: number;
  max?: number;
  step?: number;
}

export const CATEGORY_LABELS: Record<AnimationCategory, string> = {
  fundamentals: 'ScrollTrigger Fundamentals',
  reveal: 'Reveal Animations',
  pinning: 'Pinning Effects',
  scrub: 'Scrub Animations',
  horizontal: 'Horizontal Scrolling',
  parallax: 'Parallax',
  svg: 'SVG Scroll Animations',
  timelines: 'Advanced Timelines',
  cards: 'Cards & Sections',
  images: 'Image & Media Effects',
  text: 'Text Effects',
  progress: 'Progress Indicators',
  physics: 'Physics & Interactive Scroll',
  'smooth-scroll': 'Smooth Scrolling Integrations',
  performance: 'Performance Examples',
};
