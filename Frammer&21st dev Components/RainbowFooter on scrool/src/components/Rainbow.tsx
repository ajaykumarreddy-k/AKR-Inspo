import { type MotionValue, motion } from "framer-motion";
import { COLUMN_HEIGHTS_PCT, COLUMN_GRADIENT } from "../utils/rainbow";

interface RainbowProps {
  rotateX: MotionValue<number>;
  scaleY: MotionValue<number>;
  opacity: MotionValue<number>;
}

export function Rainbow({ rotateX, scaleY, opacity }: RainbowProps) {
  const count = COLUMN_HEIGHTS_PCT.length;

  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 origin-bottom"
      style={{
        height: "70%",
        rotateX,
        scaleY,
        opacity,
        willChange: "transform",
      }}
      aria-hidden="true"
    >
      {/*
        Strategy: no mix-blend-mode anywhere.
        Three pure, fully-opaque gradient layers:
          1. Wide outer glow (heavy blur, slightly taller)
          2. Mid glow (medium blur)
          3. Sharp base (crisp edges)
        The blurs cause adjacent columns to bleed into each other,
        creating the seamless rainbow bloom matching the Dia reference.
      */}

      {/* Layer 1 — outer bloom, very blurred, slightly oversized */}
      <div className="absolute inset-0" style={{ overflow: "visible" }}>
        {COLUMN_HEIGHTS_PCT.map((h, i) => {
          const leftPct = (i / count) * 100;
          const widthPct = 100 / count;
          return (
            <div
              key={`bloom-${i}`}
              className="absolute bottom-0"
              style={{
                left: `${leftPct}%`,
                width: `${widthPct}%`,
                height: `${h}%`,
                background: COLUMN_GRADIENT,
                filter: "blur(48px)",
                opacity: 1,
              }}
            />
          );
        })}
      </div>

      {/* Layer 2 — mid glow */}
      <div className="absolute inset-0" style={{ overflow: "visible" }}>
        {COLUMN_HEIGHTS_PCT.map((h, i) => {
          const leftPct = (i / count) * 100;
          const widthPct = 100 / count;
          return (
            <div
              key={`glow-${i}`}
              className="absolute bottom-0"
              style={{
                left: `${leftPct}%`,
                width: `${widthPct}%`,
                height: `${h}%`,
                background: COLUMN_GRADIENT,
                filter: "blur(20px)",
                opacity: 1,
              }}
            />
          );
        })}
      </div>

      {/* Layer 3 — crisp base columns */}
      <div className="absolute inset-0" style={{ overflow: "visible" }}>
        {COLUMN_HEIGHTS_PCT.map((h, i) => {
          const leftPct = (i / count) * 100;
          const widthPct = 100 / count;
          return (
            <div
              key={`base-${i}`}
              className="absolute bottom-0"
              style={{
                left: `${leftPct}%`,
                width: `${widthPct}%`,
                height: `${h}%`,
                background: COLUMN_GRADIENT,
                opacity: 1,
              }}
            />
          );
        })}
      </div>
    </motion.div>
  );
}
