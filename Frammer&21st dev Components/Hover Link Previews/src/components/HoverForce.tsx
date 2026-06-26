import { useEffect, useRef, useCallback, useState } from "react"
import { animate, useMotionValue, useTransform } from "framer-motion"

interface HoverForceProps {
  threshold?: number
  animationDistance?: number
  mode?: "attract" | "repel"
  direction?: "vertical" | "horizontal" | "both"
  smoothness?: number
  enabled?: boolean
}

const THROTTLE_INTERVAL = 16

function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<string | null>(null)

  useEffect(() => {
    const check = () => {
      if (window.innerWidth <= 809) {
        setBreakpoint("mobile")
      } else if (window.innerWidth <= 1199) {
        setBreakpoint("tablet")
      } else {
        setBreakpoint("desktop")
      }
    }
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  return breakpoint
}

function getAnimationConfig(smoothness: number) {
  const stiffness = 800 + smoothness * 20
  const damping = 50 + smoothness * 10
  return { type: "spring" as const, stiffness, damping, mass: 1 }
}

function calculateDistance(
  p1: { x: number; y: number },
  p2: { x: number; y: number },
) {
  return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2)
}

export function HoverForce(props: HoverForceProps) {
  const {
    threshold = 600,
    animationDistance = 200,
    mode = "attract",
    direction = "both",
    smoothness = 10,
    enabled = true,
  } = props

  const id = useRef(Math.random().toString(36).substring(2, 15))
  const mainRef = useRef<HTMLDivElement>(null)
  const parentRef = useRef<HTMLElement | null>(null)
  const anchorRef = useRef<{ x: number; y: number } | null>(null)

  const breakpoint = useBreakpoint()
  const isMobile = breakpoint === "mobile"

  const ANIMATION_CONFIG_2 = { type: "spring" as const, stiffness: 1000, damping: 100, mass: 1 }

  const distance = useMotionValue(threshold)
  const yDirection = useMotionValue(1)
  const xDirection = useMotionValue(1)
  const modeMultiplier = mode === "attract" ? 1 : -1

  const yPosition = useTransform([distance, yDirection], ([dist, dir]) => {
    if (typeof dist !== "number" || typeof dir !== "number") return 0
    if (direction === "horizontal") return 0
    if (direction === "both") {
      if (!anchorRef.current) return 0
      const mouseY = (window as any).mouseY || 0
      const progress = Math.max(0, 1 - dist / threshold)
      const targetY = mouseY - anchorRef.current.y
      const clamped = Math.max(-animationDistance, Math.min(animationDistance, targetY))
      return clamped * progress * modeMultiplier
    }
    const progress = Math.max(0, 1 - dist / threshold)
    return progress * animationDistance * dir * modeMultiplier
  })

  const xPosition = useTransform([distance, xDirection], ([dist, dir]) => {
    if (typeof dist !== "number" || typeof dir !== "number") return 0
    if (direction === "vertical") return 0
    if (direction === "both") {
      if (!anchorRef.current) return 0
      const mouseX = (window as any).mouseX || 0
      const progress = Math.max(0, 1 - dist / threshold)
      const targetX = mouseX - anchorRef.current.x
      const clamped = Math.max(-animationDistance, Math.min(animationDistance, targetX))
      return clamped * progress * modeMultiplier
    }
    const progress = Math.max(0, 1 - dist / threshold)
    return progress * animationDistance * dir * modeMultiplier
  })

  const initializeParent = useCallback(() => {
    if (!mainRef.current || !enabled || isMobile) return
    const subparent = mainRef.current.parentElement
    if (!subparent) return
    const parent = subparent.parentElement
    if (!parent) return
    parentRef.current = parent
    parent.setAttribute("data-hover-force", id.current)
    const rect = parent.getBoundingClientRect()
    anchorRef.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
    parent.style.willChange = "transform"
    parent.style.transform = "none"
  }, [enabled, isMobile])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!anchorRef.current || !enabled || isMobile) return
      ;(window as any).mouseX = e.clientX
      ;(window as any).mouseY = e.clientY
      const mousePoint = { x: e.clientX, y: e.clientY }
      const newDistance = calculateDistance(mousePoint, anchorRef.current)
      if (direction === "both") {
        animate(distance, Math.min(newDistance, threshold), ANIMATION_CONFIG_2)
      } else {
        const newYDirection = e.clientY > anchorRef.current.y ? 1 : -1
        const newXDirection = e.clientX > anchorRef.current.x ? 1 : -1
        animate(yDirection, newYDirection, ANIMATION_CONFIG_2)
        animate(xDirection, newXDirection, ANIMATION_CONFIG_2)
        animate(distance, Math.min(newDistance, threshold), ANIMATION_CONFIG_2)
      }
    },
    [threshold, direction, enabled, isMobile, distance, yDirection, xDirection],
  )

  const createThrottledHandler = useCallback(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null
    return (e: MouseEvent) => {
      if (timeout) return
      timeout = setTimeout(() => {
        handleMouseMove(e)
        timeout = null
      }, THROTTLE_INTERVAL)
    }
  }, [handleMouseMove])

  useEffect(() => {
    initializeParent()
  }, [initializeParent])

  useEffect(() => {
    if (!anchorRef.current || !enabled || isMobile) return

    const throttledHandler = createThrottledHandler()
    window.addEventListener("mousemove", throttledHandler)

    const unsubY = yPosition.on("change", (latestY) => {
      const latestX = xPosition.get()
      if (parentRef.current) {
        parentRef.current.style.transform = `translate(${latestX}px, ${latestY}px)`
      }
    })

    const unsubX = xPosition.on("change", (latestX) => {
      const latestY = yPosition.get()
      if (parentRef.current) {
        parentRef.current.style.transform = `translate(${latestX}px, ${latestY}px)`
      }
    })

    return () => {
      window.removeEventListener("mousemove", throttledHandler)
      unsubY()
      unsubX()
    }
  }, [threshold, animationDistance, mode, direction, enabled, isMobile, createThrottledHandler, yPosition, xPosition])

  return <div ref={mainRef} style={{ width: 0, height: 0 }} />
}
