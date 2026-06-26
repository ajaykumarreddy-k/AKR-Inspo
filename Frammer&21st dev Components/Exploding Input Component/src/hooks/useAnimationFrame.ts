import { useEffect, useRef } from "react";

export function useAnimationFrame(
  callback: (time: number, delta: number) => void,
  active: boolean = true
) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (!active) return;
    let rafId: number;
    let lastTime = performance.now();
    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;
      callbackRef.current(time, Math.min(delta, 32));
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [active]);
}
