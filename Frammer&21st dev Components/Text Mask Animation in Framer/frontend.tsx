import React, { useRef, useEffect, useCallback } from "react"
import { createRoot } from "react-dom/client"

type SplitMode = "lines" | "words" | "chars"

function splitText(element: HTMLElement, mode: SplitMode, maskLines: boolean): HTMLElement[] {
  const rawText = element.textContent || ""
  element.innerHTML = ""

  if (mode === "chars") {
    return Array.from(rawText).map((ch) => {
      const span = document.createElement("span")
      span.textContent = ch
      span.style.display = "inline-block"
      span.style.whiteSpace = "pre"
      element.appendChild(span)
      return span
    })
  }

  const wordSpans: HTMLSpanElement[] = []
  const segments = rawText.split(/(\s+)/)
  segments.forEach((seg) => {
    const span = document.createElement("span")
    span.textContent = seg
    span.style.display = "inline-block"
    span.style.whiteSpace = seg.trim() ? "nowrap" : "pre"
    element.appendChild(span)
    wordSpans.push(span)
  })

  if (mode === "words") return wordSpans

  const lineGroups: HTMLSpanElement[][] = []
  let currentLine: HTMLSpanElement[] = []
  let currentTop = -1

  wordSpans.forEach((span) => {
    const top = span.offsetTop
    if (currentTop === -1) currentTop = top
    if (top !== currentTop) {
      if (currentLine.length) lineGroups.push(currentLine)
      currentLine = []
      currentTop = top
    }
    currentLine.push(span)
  })
  if (currentLine.length) lineGroups.push(currentLine)

  element.innerHTML = ""
  const allElements: HTMLElement[] = []

  lineGroups.forEach((group) => {
    if (maskLines) {
      const wrapper = document.createElement("div")
      wrapper.style.overflow = "hidden"
      wrapper.style.display = "block"
      wrapper.style.position = "relative"
      group.forEach((w) => wrapper.appendChild(w))
      element.appendChild(wrapper)
      allElements.push(wrapper)
    } else {
      group.forEach((w) => {
        element.appendChild(w)
        allElements.push(w)
      })
    }
  })

  return allElements
}

function mapEase(ease?: string): string {
  if (!ease || ease === "easeOut") return "ease-out"
  if (ease === "easeIn") return "ease-in"
  if (ease === "easeInOut") return "ease-in-out"
  if (ease === "linear") return "linear"
  return ease
}

function buildFromStyle(
  opacity: number, tx: number, ty: number, rot: number, sc: number, bl: number,
) {
  return {
    opacity: opacity,
    transform: `translate(${tx}px, ${ty}px) rotate(${rot}deg) scale(${sc}) translateZ(0)`,
    filter: `blur(${bl}px)`,
  }
}

function buildToStyle() {
  return {
    opacity: 1,
    transform: "translate(0px, 0px) rotate(0deg) scale(1) translateZ(0)",
    filter: "blur(0px)",
  }
}

interface FontProps {
  fontFamily?: string
  fontSize?: number
  fontWeight?: string
  fontStyle?: string
  textDecoration?: string
  letterSpacing?: string
  lineHeight?: string
}

interface AnimationProps {
  translateXInitial?: number
  translateYInitial?: number
  opacityInitial?: number
  rotateInitial?: number
  scaleInitial?: number
  blurInitial?: number
}

interface LineMaskSplitProps {
  text?: string
  color?: string
  font?: FontProps
  tag?: string
  className?: string
  style?: React.CSSProperties
  staggerAmount?: number
  transition?: Record<string, unknown>
  trigger?: "Appear" | "Scroll"
  reverse?: boolean
  scrollTriggerPosition?: "top" | "center" | "bottom"
  splitMode?: SplitMode
  maskLines?: boolean
  animation?: AnimationProps
}

function LineMaskSplit({
  text = "Welcome to the amazing world of random word appearances",
  color = "#1a1a1a",
  font = {},
  tag = "h1",
  className = "",
  style = {},
  staggerAmount = 0.05,
  transition = { type: "tween", duration: 0.8, ease: "easeOut", delay: 0 },
  trigger = "Appear",
  reverse = false,
  scrollTriggerPosition = "center",
  splitMode = "words",
  maskLines = true,
  animation = {},
}: LineMaskSplitProps) {
  const {
    translateXInitial = 0,
    translateYInitial = 60,
    opacityInitial = 0,
    rotateInitial = 0,
    scaleInitial = 1,
    blurInitial = 0,
  } = animation

  const textRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<Animation[]>([])
  const hasAnimated = useRef(false)
  const elementsRef = useRef<HTMLElement[]>([])

  function stopAll() {
    for (const a of animRef.current) a.cancel()
    animRef.current = []
  }

  const animateElements = useCallback(
    (elements: HTMLElement[], forward: boolean) => {
      stopAll()
      const t = transition as Record<string, any>
      const baseDelay = t.delay || 0
      const duration = (t.duration || 0.8) * 1000
      const easing = t.type === "spring" ? "ease-out" : mapEase(t.ease as string)

      for (let i = 0; i < elements.length; i++) {
        const el = elements[i]
        const delay = (baseDelay + i * staggerAmount) * 1000

        el.style.willChange = "transform, opacity"
        const from = buildFromStyle(opacityInitial, translateXInitial, translateYInitial, rotateInitial, scaleInitial, blurInitial)
        const to = buildToStyle()

        if (opacityInitial === 1 && !translateXInitial && !translateYInitial && !rotateInitial && scaleInitial === 1 && !blurInitial) {
          el.style.opacity = "1"
          continue
        }

        if (!forward) {
          el.style.opacity = "1"
          el.style.transform = "translate(0px, 0px) rotate(0deg) scale(1) translateZ(0)"
          el.style.filter = "blur(0px)"
        }

        Object.assign(el.style, forward ? from : to)

        const anim = el.animate(
          [forward ? from : to, forward ? to : from],
          { duration, delay, easing, fill: "forwards" },
        )
        animRef.current.push(anim)
      }
    },
    [transition, staggerAmount, opacityInitial, translateXInitial, translateYInitial, rotateInitial, scaleInitial, blurInitial],
  )

  const setup = useCallback(() => {
    if (!textRef.current) return null
    const elms = splitText(textRef.current, splitMode, maskLines)
    elementsRef.current = elms
    return elms
  }, [splitMode, maskLines])

  useEffect(() => {
    if (trigger !== "Appear") return
    if (hasAnimated.current) return
    hasAnimated.current = true
    const elms = setup()
    if (!elms) return
    animateElements(elms, true)
    return () => stopAll()
  }, [trigger, setup, animateElements])

  useEffect(() => {
    if (trigger !== "Scroll") return
    if (!textRef.current) return
    const elms = setup()
    if (!elms) return
    elementsRef.current = elms
    const from = buildFromStyle(opacityInitial, translateXInitial, translateYInitial, rotateInitial, scaleInitial, blurInitial)
    for (const el of elms) {
      el.style.willChange = "transform, opacity"
      Object.assign(el.style, from)
    }
    return () => stopAll()
  }, [trigger, splitMode, maskLines, setup, opacityInitial, translateXInitial, translateYInitial, rotateInitial, scaleInitial, blurInitial])

  useEffect(() => {
    if (trigger !== "Scroll") return
    const el = containerRef.current
    if (!el) return

    const rootMargin =
      scrollTriggerPosition === "top" ? "0px 0px -100% 0px"
      : scrollTriggerPosition === "bottom" ? "0px 0px 0px 0px"
      : "0px 0px -50% 0px"

    const ob = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const elms = elementsRef.current
          if (!elms?.length) return

          if (!entry.isIntersecting && entry.boundingClientRect.top > entry.rootBounds!.height) {
            if (reverse && hasAnimated.current) {
              stopAll()
              const from = buildFromStyle(opacityInitial, translateXInitial, translateYInitial, rotateInitial, scaleInitial, blurInitial)
              for (const e of elms) Object.assign(e.style, from)
              hasAnimated.current = false
            }
            continue
          }

          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            stopAll()
            animateElements(elms, true)
          }
        }
      },
      { rootMargin, threshold: 0 },
    )

    ob.observe(el)
    return () => { ob.disconnect(); stopAll() }
  }, [trigger, scrollTriggerPosition, reverse, animateElements, opacityInitial, translateXInitial, translateYInitial, rotateInitial, scaleInitial, blurInitial])

  const Tag = tag as keyof JSX.IntrinsicElements

  return (
    <div
      ref={containerRef}
      className={`line-mask-split ${className}`}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "auto",
        backgroundColor: "transparent",
        ...style,
      }}
    >
      <Tag
        ref={textRef as any}
        style={{
          margin: 0,
          color,
          fontSize: font.fontSize,
          fontWeight: font.fontWeight || "700",
          fontFamily: font.fontFamily || "'Google Sans', 'Product Sans', Inter, system-ui, -apple-system, sans-serif",
          fontStyle: font.fontStyle,
          textDecoration: font.textDecoration,
          letterSpacing: font.letterSpacing || "-0.02em",
          lineHeight: font.lineHeight || "1.4",
          marginBlock: 0,
          marginInline: 0,
          padding: 0,
          width: "100%",
        }}
      >
        {text}
      </Tag>
    </div>
  )
}

const root = createRoot(document.getElementById("root")!)
root.render(
  <>
    <section className="section">
      <span className="section-label">Appear Animation</span>
      <LineMaskSplit
        text="Text Mask Animation"
        color="#111"
        font={{ fontSize: 72, fontWeight: "800", letterSpacing: "-0.03em" }}
        tag="h1"
        splitMode="words"
        staggerAmount={0.08}
        transition={{ type: "tween", duration: 0.9, ease: "easeOut" }}
      />
      <p className="subtitle">
        A beautiful line-by-line text reveal animation built with Framer Motion.
        Each word gracefully fades and slides into view with precision timing.
      </p>
    </section>

    <section className="section">
      <span className="section-label">Scroll Trigger</span>
      <LineMaskSplit
        text="Scroll to reveal this text word by word in a smooth, elegant animation"
        color="#111"
        font={{ fontSize: 56, fontWeight: "700", letterSpacing: "-0.02em" }}
        tag="h2"
        trigger="Scroll"
        splitMode="words"
        staggerAmount={0.04}
        reverse
        transition={{ type: "tween", duration: 0.7, ease: "easeOut" }}
      />
    </section>

    <section className="section">
      <span className="section-label">Character Split</span>
      <LineMaskSplit
        text="Characters"
        color="#111"
        font={{ fontSize: 96, fontWeight: "800", letterSpacing: "-0.04em" }}
        tag="h1"
        splitMode="chars"
        staggerAmount={0.03}
        transition={{ type: "spring", stiffness: 100, damping: 20, mass: 0.5 }}
      />
    </section>

    <section className="section">
      <span className="section-label">Line by Line</span>
      <LineMaskSplit
        text="Each line appears one after another creating a beautiful cascading effect that draws the reader in"
        color="#111"
        font={{ fontSize: 44, fontWeight: "600", letterSpacing: "-0.02em", lineHeight: "1.5" }}
        tag="h2"
        trigger="Scroll"
        splitMode="lines"
        staggerAmount={0.15}
        reverse
        transition={{ type: "tween", duration: 0.8, ease: "easeOut" }}
      />
    </section>
  </>,
)
