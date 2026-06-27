import { useEffect } from "react";
import Lenis from "lenis";

export function useSmoothScroll(): void {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    let animFrame: number;

    function onFrame(time: number) {
      lenis.raf(time);
      animFrame = requestAnimationFrame(onFrame);
    }

    animFrame = requestAnimationFrame(onFrame);

    return () => {
      cancelAnimationFrame(animFrame);
      lenis.destroy();
    };
  }, []);
}
