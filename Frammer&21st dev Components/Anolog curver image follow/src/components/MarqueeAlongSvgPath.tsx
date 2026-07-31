import React, { RefObject, useCallback, useEffect, useRef } from "react"
import {
  motion,
  MotionValue,
  SpringOptions,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react"

import { cn } from "@/lib/utils"

// Custom wrap function to handle negative and positive wrapping seamlessly
const wrap = (min: number, max: number, value: number): number => {
  const range = max - min
  return ((((value - min) % range) + range) % range) + min
}

type PreserveAspectRatioAlign =
  | "none"
  | "xMinYMin"
  | "xMidYMin"
  | "xMaxYMin"
  | "xMinYMid"
  | "xMidYMid"
  | "xMaxYMid"
  | "xMinYMax"
  | "xMidYMax"
  | "xMaxYMax"

export interface CSSVariableInterpolation {
  property: string
  from: number | string
  to: number | string
}

type PreserveAspectRatioMeetOrSlice = "meet" | "slice"

type PreserveAspectRatio =
  | PreserveAspectRatioAlign
  | `${Exclude<PreserveAspectRatioAlign, "none">} ${PreserveAspectRatioMeetOrSlice}`

export interface MarqueeAlongSvgPathProps {
  children: React.ReactNode
  className?: string

  // Path properties
  path: string
  pathId?: string
  preserveAspectRatio?: PreserveAspectRatio
  showPath?: boolean

  // SVG properties
  width?: string | number
  height?: string | number
  viewBox?: string

  // Marquee properties
  baseVelocity?: number
  direction?: "normal" | "reverse"
  easing?: (value: number) => number
  slowdownOnHover?: boolean
  slowDownFactor?: number
  slowDownSpringConfig?: SpringOptions

  // Scroll properties
  useScrollVelocity?: boolean
  scrollAwareDirection?: boolean
  scrollSpringConfig?: SpringOptions
  scrollContainer?: RefObject<HTMLElement | null> | HTMLElement | null

  // Item repetition
  repeat?: number

  // Drag properties
  draggable?: boolean
  dragSensitivity?: number
  dragVelocityDecay?: number
  dragAwareDirection?: boolean
  grabCursor?: boolean

  // Z-index properties
  enableRollingZIndex?: boolean
  zIndexBase?: number
  zIndexRange?: number

  cssVariableInterpolation?: CSSVariableInterpolation[]

  // Responsive properties
  responsive?: boolean
}

interface MarqueeItemProps {
  child: React.ReactNode
  repeatIndex: number
  itemIndex: number
  totalItems: number
  baseOffset: MotionValue<number>
  easing?: (value: number) => number
  zIndexBase: number
  zIndexRange: number
  enableRollingZIndex: boolean
  draggable: boolean
  grabCursor: boolean
  cssVariableInterpolation?: CSSVariableInterpolation[]
  onHoverStart: () => void
  onHoverEnd: () => void
  path: string
}

const MarqueeItem = ({
  child,
  repeatIndex,
  itemIndex,
  totalItems,
  baseOffset,
  easing,
  zIndexBase,
  zIndexRange,
  enableRollingZIndex,
  draggable,
  grabCursor,
  cssVariableInterpolation = [],
  onHoverStart,
  onHoverEnd,
  path,
}: MarqueeItemProps) => {
  // Calculate numerical progress (0 to 100) directly without string parsing
  const progress = useTransform(baseOffset, (v: number) => {
    const position = (itemIndex * 100) / totalItems
    return wrap(0, 100, v + position)
  })

  // Eased CSS offsetDistance string for hardware accelerated CSS motion path
  const itemOffset = useTransform(progress, (val: number) => {
    const easedVal = easing ? easing(val / 100) * 100 : val
    return `${easedVal}%`
  })

  // Deterministic, non-colliding Z-index calculation to eliminate overlapping glitches / Z-fighting
  const zIndex = useTransform(progress, (val: number) => {
    if (!enableRollingZIndex) {
      return zIndexBase + itemIndex
    }
    const normalizedDistance = val / 100
    // Combine depth tier with unique itemIndex tie-breaker to prevent stacking flickering
    return Math.floor(zIndexBase + normalizedDistance * zIndexRange) * 100 + itemIndex
  })

  // Interpolated CSS variables from numeric progress
  const cssVariables = Object.fromEntries(
    (cssVariableInterpolation || []).map(({ property, from, to }) => [
      property,
      useTransform(progress, [0, 100], [from, to]),
    ])
  )

  return (
    <motion.div
      className={cn(
        "absolute top-0 left-0 pointer-events-auto select-none",
        draggable && grabCursor && "cursor-grab active:cursor-grabbing"
      )}
      style={{
        offsetPath: `path('${path}')`,
        WebkitOffsetPath: `path('${path}')`,
        offsetDistance: itemOffset,
        WebkitOffsetDistance: itemOffset,
        transform: "translate(-50%, -50%)",
        zIndex: zIndex,
        willChange: "offset-distance, transform",
        backfaceVisibility: "hidden",
        transformStyle: "preserve-3d",
        ...cssVariables,
      }}
      aria-hidden={repeatIndex > 0}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      {child}
    </motion.div>
  )
}

const MarqueeAlongSvgPath = ({
  children,
  className,

  // Path defaults
  path,
  pathId,
  preserveAspectRatio = "xMidYMid meet",
  showPath = false,

  // SVG defaults
  width = "100%",
  height = "100%",
  viewBox = "0 0 100 100",

  // Marquee defaults
  baseVelocity = 5,
  direction = "normal",
  easing,
  slowdownOnHover = false,
  slowDownFactor = 0.3,
  slowDownSpringConfig = { damping: 50, stiffness: 400 },

  // Scroll defaults
  useScrollVelocity = false,
  scrollAwareDirection = false,
  scrollSpringConfig = { damping: 50, stiffness: 400 },
  scrollContainer,

  // Items repetition
  repeat = 3,

  // Drag defaults
  draggable = false,
  dragSensitivity = 0.2,
  dragVelocityDecay = 0.96,
  dragAwareDirection = false,
  grabCursor = false,

  // Z-index defaults
  enableRollingZIndex = true,
  zIndexBase = 1,
  zIndexRange = 10,

  cssVariableInterpolation = [],

  // Responsive defaults
  responsive = false,
}: MarqueeAlongSvgPathProps) => {
  const container = useRef<HTMLDivElement>(null)
  const marqueeContainerRef = useRef<HTMLDivElement>(null)
  const baseOffset = useMotionValue(0)
  const pathRef = useRef<SVGPathElement>(null)

  // Unique ID for SVG path
  const id = useRef(pathId || `marquee-path-${Math.random().toString(36).substring(2, 9)}`).current

  // Responsive scaling using direct DOM manipulation (no re-renders)
  useEffect(() => {
    const marqueeContainer = marqueeContainerRef.current
    if (!marqueeContainer) return

    if (!responsive) {
      marqueeContainer.style.width = "100%"
      marqueeContainer.style.height = "100%"
      marqueeContainer.style.transform = "none"
      return
    }

    const [, , vbWidth, vbHeight] = viewBox.split(" ").map(Number)
    const originalWidth = vbWidth || 100
    const originalHeight = vbHeight || 100

    const updateScale = () => {
      const wrapper = container.current
      if (!wrapper || !marqueeContainer) return

      const wrapperWidth = wrapper.clientWidth
      const wrapperHeight = wrapper.clientHeight

      const scaleX = wrapperWidth / originalWidth
      const scaleY = wrapperHeight / originalHeight
      const scale = Math.min(scaleX, scaleY)

      const scaledWidth = originalWidth * scale
      const scaledHeight = originalHeight * scale

      const offsetX = (wrapperWidth - scaledWidth) / 2
      const offsetY = (wrapperHeight - scaledHeight) / 2

      marqueeContainer.style.width = `${originalWidth}px`
      marqueeContainer.style.height = `${originalHeight}px`
      marqueeContainer.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`
      marqueeContainer.style.transformOrigin = "top left"
    }

    updateScale()
    window.addEventListener("resize", updateScale)
    return () => window.removeEventListener("resize", updateScale)
  }, [responsive, viewBox])

  // Create an array of items outside of render function
  const items = React.useMemo(() => {
    const childrenArray = React.Children.toArray(children)

    return childrenArray.flatMap((child, childIndex) =>
      Array.from({ length: repeat }, (_, repeatIndex) => {
        const itemIndex = repeatIndex * childrenArray.length + childIndex
        const key = `${childIndex}-${repeatIndex}`
        return {
          child,
          childIndex,
          repeatIndex,
          itemIndex,
          key,
        }
      })
    )
  }, [children, repeat])

  // Scroll tracking
  const { scrollY } = useScroll({
    container: (scrollContainer as RefObject<HTMLDivElement | null>) || container,
  })

  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, scrollSpringConfig)

  // Hover & drag state tracking
  const isHovered = useRef(false)
  const isDragging = useRef(false)
  const dragVelocity = useRef(0)

  // Direction factor
  const directionFactor = useRef(direction === "normal" ? 1 : -1)

  useEffect(() => {
    directionFactor.current = direction === "normal" ? 1 : -1
  }, [direction])

  // Motion values for animation
  const hoverFactorValue = useMotionValue(1)
  const defaultVelocity = useMotionValue(1)
  const smoothHoverFactor = useSpring(hoverFactorValue, slowDownSpringConfig)

  // Transform scroll velocity into speed factor
  const velocityFactor = useTransform(
    useScrollVelocity ? smoothVelocity : defaultVelocity,
    [0, 1000],
    [0, 5],
    { clamp: false }
  )

  // Buttery-smooth animation frame handler
  useAnimationFrame((_, delta) => {
    // Cap delta to prevent huge jumps when browser tab regains focus
    const safeDelta = Math.min(delta, 32)

    if (isDragging.current && draggable) {
      baseOffset.set(baseOffset.get() + dragVelocity.current)
      dragVelocity.current *= 0.9

      if (Math.abs(dragVelocity.current) < 0.01) {
        dragVelocity.current = 0
      }
      return
    }

    // Update hover factor smoothly
    if (isHovered.current) {
      hoverFactorValue.set(slowdownOnHover ? slowDownFactor : 1)
    } else {
      hoverFactorValue.set(1)
    }

    // Calculate regular movement
    let moveBy =
      directionFactor.current *
      baseVelocity *
      (safeDelta / 1000) *
      smoothHoverFactor.get()

    // Adjust movement based on scroll velocity
    if (scrollAwareDirection && !isDragging.current) {
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1
      }
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get()

    if (draggable) {
      moveBy += dragVelocity.current

      if (dragAwareDirection && Math.abs(dragVelocity.current) > 0.1) {
        directionFactor.current = Math.sign(dragVelocity.current)
      }

      if (!isDragging.current && Math.abs(dragVelocity.current) > 0.01) {
        dragVelocity.current *= dragVelocityDecay
      } else if (!isDragging.current) {
        dragVelocity.current = 0
      }
    }

    baseOffset.set(baseOffset.get() + moveBy)
  })

  // Pointer event handlers for dragging
  const lastPointerPosition = useRef({ x: 0, y: 0 })

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!draggable) return
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)

    if (grabCursor) {
      ;(e.currentTarget as HTMLElement).style.cursor = "grabbing"
    }

    isDragging.current = true
    lastPointerPosition.current = { x: e.clientX, y: e.clientY }
    dragVelocity.current = 0
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggable || !isDragging.current) return

    const currentPosition = { x: e.clientX, y: e.clientY }
    const deltaX = currentPosition.x - lastPointerPosition.current.x
    const deltaY = currentPosition.y - lastPointerPosition.current.y
    const delta = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    const projectedDelta = deltaX > 0 ? delta : -delta

    dragVelocity.current = projectedDelta * dragSensitivity
    lastPointerPosition.current = currentPosition
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!draggable) return
    ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
    isDragging.current = false

    if (grabCursor) {
      ;(e.currentTarget as HTMLElement).style.cursor = "grab"
    }
  }

  return (
    <div
      ref={container}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={cn("relative overflow-hidden select-none w-full h-full", className)}
    >
      <div
        ref={marqueeContainerRef}
        className="relative w-full h-full"
        style={{ contain: "layout style" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          viewBox={viewBox}
          preserveAspectRatio={preserveAspectRatio}
          className="w-full h-full pointer-events-none"
        >
          <path
            id={id}
            d={path}
            stroke={showPath ? "rgba(244, 63, 94, 0.4)" : "none"}
            strokeWidth={showPath ? 2.5 : 0}
            strokeDasharray={showPath ? "8 6" : undefined}
            fill="none"
            ref={pathRef}
          />
        </svg>

        {items.map(({ child, repeatIndex, itemIndex, key }) => (
          <MarqueeItem
            key={key}
            child={child}
            repeatIndex={repeatIndex}
            itemIndex={itemIndex}
            totalItems={items.length}
            baseOffset={baseOffset}
            easing={easing}
            zIndexBase={zIndexBase}
            zIndexRange={zIndexRange}
            enableRollingZIndex={enableRollingZIndex}
            draggable={draggable}
            grabCursor={grabCursor}
            cssVariableInterpolation={cssVariableInterpolation}
            onHoverStart={() => (isHovered.current = true)}
            onHoverEnd={() => (isHovered.current = false)}
            path={path}
          />
        ))}
      </div>
    </div>
  )
}

export default MarqueeAlongSvgPath
