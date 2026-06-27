import { useRef, useEffect, useMemo, useState, type ReactNode } from "react"
import { cubicBezier } from "framer-motion"

const brightnessCurve = cubicBezier(0.6, 0.18, 0.84, 0.7)

interface ShinyCursorProps {
  color?: string
  size?: number
  brightness?: number
  edgeBlur?: number
  radius?: number
  children: ReactNode
}

export default function ShinyCursor({
  color = "#ffffff",
  size = 100,
  brightness = 75,
  edgeBlur = 10,
  radius = 80,
  children,
}: ShinyCursorProps) {
  const id = useMemo(generateId, [])
  const filterRef = useRef<SVGFilterElement>(null)
  const pointLightRef = useRef<SVGFEPointLightElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const [pos, setPos] = useState({ x: -999, y: -999 })

  useEffect(() => {
    const move = (e: PointerEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      if (containerRef.current && pointLightRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        setPos({ x, y })
        pointLightRef.current.setAttribute("x", x.toString())
        pointLightRef.current.setAttribute("y", y.toString())
      }
    }

    document.addEventListener("pointermove", move)
    return () => document.removeEventListener("pointermove", move)
  }, [])

  const maskStyle = {
    WebkitMaskImage: `radial-gradient(circle ${radius}px at ${pos.x}px ${pos.y}px, black 0%, transparent 100%)`,
    maskImage: `radial-gradient(circle ${radius}px at ${pos.x}px ${pos.y}px, black 0%, transparent 100%)`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskComposite: "source-over",
    maskComposite: "add",
  }

  const hiddenMask = pos.x === -999 ? { display: "none" } : {}

  return (
    <div ref={containerRef} className="relative">
      <div className="relative z-0">{children}</div>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          filter: `url(#${id})`,
          isolation: "isolate",
          color: "inherit",
          ...maskStyle,
          ...hiddenMask,
        }}
      >
        {children}
      </div>
      <svg width="0" height="0" className="absolute">
        <filter ref={filterRef} id={id} colorInterpolationFilters="sRGB">
          <feGaussianBlur
            in="SourceAlpha"
            stdDeviation={edgeBlur}
            result="blur1"
          />
          <feSpecularLighting
            result="spec1"
            in="blur1"
            surfaceScale={5}
            specularConstant={brightnessCurve(brightness / 100)}
            specularExponent={100}
            lightingColor={color}
          >
            <fePointLight
              ref={pointLightRef}
              x="0"
              y="0"
              z={mapRange(size, 10, 200, 100, 600)}
            />
          </feSpecularLighting>
          <feComposite
            in="spec1"
            in2="SourceAlpha"
            operator="in"
            result="specOut2"
          />
          <feComposite
            in="SourceGraphic"
            in2="specOut2"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
            result="litPaint"
          />
        </filter>
      </svg>
    </div>
  )
}

ShinyCursor.displayName = "Shiny Cursor"

function mapRange(
  value: number,
  fromLow: number,
  fromHigh: number,
  toLow: number,
  toHigh: number,
): number {
  if (fromLow === fromHigh) return toLow
  const percentage = (value - fromLow) / (fromHigh - fromLow)
  return toLow + percentage * (toHigh - toLow)
}

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

function generateId(): string {
  let result = ""
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * CHARACTERS.length)
    result += CHARACTERS.charAt(randomIndex)
  }
  return result
}
