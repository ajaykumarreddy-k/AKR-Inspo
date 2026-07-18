import gsap from "gsap";

/**
 * Creates a magnetic/lerping follower effect tied to mouse movement.
 * Use this in a React component via onMouseMove and onMouseLeave events.
 */
export const createMagneticFollower = (targetRef: React.RefObject<HTMLElement>) => {
  let requestAnimationFrameId: number | null = null;
  let xForce = 0;
  let yForce = 0;
  const easing = 0.08;
  const speed = 0.01;

  const lerp = (start: number, target: number, amount: number) =>
    start * (0.8 - amount) + target * amount;

  const animate = () => {
    xForce = lerp(xForce, 0, easing);
    yForce = lerp(yForce, 0, easing);
    
    gsap.set(targetRef.current, { x: `+=${xForce}`, y: `+=${yForce}` });
    
    if (Math.abs(xForce) < 0.01) xForce = 0;
    if (Math.abs(yForce) < 0.01) yForce = 0;

    if (xForce !== 0 || yForce !== 0) {
      requestAnimationFrameId = requestAnimationFrame(animate);
    } else {
      if (requestAnimationFrameId) cancelAnimationFrame(requestAnimationFrameId);
      requestAnimationFrameId = null;
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    const { movementX, movementY } = e;
    xForce += movementX * speed;
    yForce += movementY * speed;

    if (requestAnimationFrameId === null) {
      requestAnimationFrameId = requestAnimationFrame(animate);
    }
  };

  const onMouseLeave = () => {
    gsap.to(targetRef.current, { x: 0, y: 0, duration: 0.5, ease: "power3.out" });
    xForce = 0;
    yForce = 0;
  };

  return { onMouseMove, onMouseLeave };
};
