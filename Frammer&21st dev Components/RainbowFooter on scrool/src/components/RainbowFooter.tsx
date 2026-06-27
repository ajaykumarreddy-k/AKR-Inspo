import { useScrollReveal } from "../hooks/useScrollReveal";
import { Rainbow } from "./Rainbow";
import { FooterContent } from "./FooterContent";

export function RainbowFooter() {
  const { rotateX, scaleY, opacity, textProgress } = useScrollReveal();

  return (
    <footer
      className="fixed bottom-0 left-0 right-0 z-50 h-dvh pointer-events-none"
      aria-label="Site footer with rainbow reveal animation"
    >
      <div
        className="relative h-full w-full"
        style={{
          perspective: "1400px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* White backing plane */}
        <div
          className="absolute inset-0 bg-white"
          style={{ backfaceVisibility: "hidden" }}
        />

        <Rainbow rotateX={rotateX} scaleY={scaleY} opacity={opacity} />

        <FooterContent textProgress={textProgress} />
      </div>
    </footer>
  );
}
