import { useState, useRef, type CSSProperties } from "react"
import { motion } from "framer-motion"
import { HoverForce } from "./HoverForce"

interface HoverLinkProps {
  title?: string
  image?: { src: string; alt?: string }
  link?: string
}

const DEFAULT_IMAGE = {
  src: "https://framerusercontent.com/images/a6gWrc60o5QKYuVDaIQsYW0.png?scale-down-to=512",
  alt: "",
}

const linkStyle: CSSProperties = {
  display: "inline-flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  position: "relative",
  cursor: "pointer",
  textDecoration: "none",
  width: "auto",
  height: "min-content",
  padding: 0,
  overflow: "visible",
  verticalAlign: "middle",
}

const containerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  position: "relative",
  width: "min-content",
  height: 48,
  padding: 0,
  overflow: "visible",
}

const textStyle: CSSProperties = {
  fontFamily: '"Inter", "Google Sans", "Google Sans Text", system-ui, sans-serif',
  fontSize: 32,
  fontWeight: 700,
  letterSpacing: "-0.01em",
  lineHeight: "1.5em",
  color: "#000000",
  userSelect: "none",
  whiteSpace: "pre",
  flex: "none",
  position: "relative",
  zIndex: 1,
  height: "auto",
  width: "auto",
}

const imageWrapperStyle: CSSProperties = {
  position: "absolute",
  left: 37,
  right: 37,
  top: -40,
  height: 124,
  zIndex: 1,
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  padding: 0,
  overflow: "visible",
}

const imageStyle: CSSProperties = {
  position: "absolute",
  top: -93,
  width: 200,
  height: 124,
  left: "calc(50% - 100px)",
  border: "6px solid #ffffff",
  borderRadius: 14,
  objectFit: "cover",
  overflow: "clip",
}

export function HoverLink({
  title = "Framer University",
  image,
  link = "https://framer.university",
}: HoverLinkProps) {
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const imageData = image ?? DEFAULT_IMAGE

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      style={linkStyle}
    >
      <div
        ref={containerRef}
        style={containerStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span style={textStyle}>
          {title}
        </span>

        {isHovered && (
          <motion.div
            initial={{ opacity: 0.001, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            style={imageWrapperStyle}
          >
            <img
              src={imageData.src}
              alt={imageData.alt ?? ""}
              style={imageStyle}
            />
            <HoverForce
              threshold={600}
              animationDistance={200}
              mode="attract"
              direction="both"
              smoothness={10}
              enabled={true}
            />
          </motion.div>
        )}
      </div>
    </motion.a>
  )
}
