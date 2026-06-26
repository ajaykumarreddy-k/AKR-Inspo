import { motion } from "framer-motion"

export function FirstWord() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <svg
        role="presentation"
        viewBox="0 0 100 50"
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <text
          x="0"
          y="36"
          fontFamily="'Caveat', 'Caveat Variable', cursive"
          fontSize={32}
          fill="var(--color-stroke)"
          fontWeight={500}
        >
          Ajay
        </text>
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "#ffffff",
          transformOrigin: "left",
        }}
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{
          delay: 0,
          duration: 0.8,
          ease: [0.5, 0, 0.88, 0.77],
        }}
      />
    </div>
  )
}
