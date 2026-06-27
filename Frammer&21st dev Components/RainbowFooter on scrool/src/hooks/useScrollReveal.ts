import {
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { useMemo } from "react";

export type ScrollRevealValues = {
  readonly rotateX: MotionValue<number>;
  readonly scaleY: MotionValue<number>;
  readonly opacity: MotionValue<number>;
  readonly textProgress: MotionValue<number>;
};

export function useScrollReveal(): ScrollRevealValues {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  const revealStart = 0.6;
  const revealEnd = 0.92;

  const rotateOutput: number[] = prefersReducedMotion ? [0, 0] : [88, 0];
  const scaleOutput: number[] = prefersReducedMotion ? [1, 1] : [0.92, 1];

  const rotateX = useTransform(
    scrollYProgress,
    [revealStart, revealEnd],
    rotateOutput
  );

  const scaleY = useTransform(
    scrollYProgress,
    [revealStart, revealEnd],
    scaleOutput
  );

  const opacity = useTransform(
    scrollYProgress,
    [revealStart, revealStart + 0.08],
    [0, 1]
  );

  const textProgress = useTransform(
    scrollYProgress,
    [revealStart + 0.1, revealEnd],
    [0, 1]
  );

  return useMemo(
    () => ({ rotateX, scaleY, opacity, textProgress }),
    [rotateX, scaleY, opacity, textProgress]
  );
}
