import * as React from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

function normalizeFont(font: any) {
  if (!font) return {};
  const s: any = {};
  if (font.fontFamily) s.fontFamily = font.fontFamily;
  if (font.family) s.fontFamily = font.family;
  if (font.fontSize != null) s.fontSize = font.fontSize;
  if (font.size != null) s.fontSize = font.size;
  if (font.fontWeight != null) s.fontWeight = font.fontWeight;
  if (font.weight != null) s.fontWeight = font.weight;
  if (font.lineHeight != null) s.lineHeight = font.lineHeight;
  if (font.letterSpacing != null) s.letterSpacing = font.letterSpacing;
  if (font.textAlign) s.textAlign = font.textAlign;
  if (font.align) s.textAlign = font.align;
  if (font.alignment) s.textAlign = font.alignment;
  return s;
}

function tokenizeWordsOrLetters(raw: string, unit: string) {
  const lines = (raw ?? "").split("\n");
  const out = [];
  let animIndex = 0;
  for (let li = 0; li < lines.length; li++) {
    const line = lines[li];
    if (unit === "Words") {
      const words = line.trim() ? line.trim().split(/\s+/) : [];
      for (let i = 0; i < words.length; i++) {
        out.push({ kind: "token", value: words[i], animIndex });
        animIndex++;
        if (i !== words.length - 1) {
          out.push({ kind: "token", value: " ", animIndex: null });
        }
      }
      if (!words.length) out.push({ kind: "token", value: "\xa0", animIndex: null });
    } else {
      for (const ch of line) {
        if (ch === " ") {
          out.push({ kind: "token", value: ch, animIndex: null });
        } else {
          out.push({ kind: "token", value: ch, animIndex });
          animIndex++;
        }
      }
      if (!line.length) out.push({ kind: "token", value: "\xa0", animIndex: null });
    }
    if (li !== lines.length - 1) out.push({ kind: "br" });
  }
  return out;
}

function tokenizeLines(raw: string) {
  const lines = (raw ?? "").split("\n");
  return lines.map((line, idx) => ({ kind: "line", value: line, animIndex: idx }));
}

function RevealToken({ value, animIndex, totalAnimated, progress, unit }: any) {
  if (animIndex === null || totalAnimated <= 0) {
    if (unit === "Letters") {
      return <span>{value === " " ? "\xa0" : value}</span>;
    }
    return <span>{value}</span>;
  }
  const start = animIndex / totalAnimated;
  const end = start + 1 / totalAnimated;
  const opacity = useTransform(progress, [start, end], [0, 1]);
  return unit === "Letters" ? (
    <motion.span style={{ opacity, display: "inline-block" }}>
      {value === " " ? "\xa0" : value}
    </motion.span>
  ) : (
    <motion.span style={{ opacity, display: "inline" }}>
      {value}
    </motion.span>
  );
}

function RevealLine({ line, animIndex, totalLines, progress }: any) {
  const denom = Math.max(1, totalLines);
  const start = animIndex / denom;
  const end = start + 1 / denom;
  const opacity = useTransform(progress, [start, end], [0, 1]);
  return (
    <motion.div style={{ opacity, display: "block" }}>
      {line.length ? line : "\xa0"}
    </motion.div>
  );
}

function GhostLayer({ raw, unit, textColor, ghostColor, ghostOpacity, textAlign }: any) {
  const color = ghostColor || textColor;
  const content =
    unit === "Lines"
      ? raw.split("\n").map((line: string, i: number) => (
          <div key={`g-l-${i}`}>{line.length ? line : "\xa0"}</div>
        ))
      : raw.split("\n").map((line: string, li: number) => {
          const safeLine =
            unit === "Words"
              ? line.trim()
                ? line.trim().split(/\s+/).join(" ")
                : "\xa0"
              : line.length
              ? line
              : "\xa0";
          return (
            <React.Fragment key={`g-ln-${li}`}>
              {li > 0 && <br />}
              {unit === "Letters"
                ? [...safeLine].map((ch, i) => (
                    <span key={`g-c-${li}-${i}`}>{ch === " " ? "\xa0" : ch}</span>
                  ))
                : safeLine}
            </React.Fragment>
          );
        });
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        pointerEvents: "none",
        opacity: ghostOpacity,
        color,
        whiteSpace: "pre-wrap",
        textAlign,
      }}
    >
      {content}
    </div>
  );
}

export interface TextScrollRevealProps {
  text?: string;
  unit?: "Words" | "Letters" | "Lines";
  font?: React.CSSProperties;
  textColor?: string;
  sectionHeightVh?: number;
  speed?: number;
  alignY?: "Top" | "Center" | "Bottom";
  stickyOffsetPx?: number;
  maxWidth?: number;
  paddingVw?: number;
  wordGapEm?: number;
  ghostEnabled?: boolean;
  ghostOpacity?: number;
  ghostColor?: string;
  className?: string;
}

export default function TextScrollReveal({
  text = "Scroll-synced text reveal.\n\nWords, letters, or lines.\nSticky layout + alignment.\nNative fonts, ghost layer.",
  unit = "Words",
  font = { fontSize: "48px", fontWeight: "bold" },
  textColor = "currentColor",
  sectionHeightVh = 300,
  speed = 1,
  alignY = "Center",
  stickyOffsetPx = 0,
  maxWidth = 900,
  paddingVw = 5,
  wordGapEm = 0.25,
  ghostEnabled = true,
  ghostOpacity = 0.15,
  ghostColor = "",
  className = ""
}: TextScrollRevealProps) {
  const raw = typeof text === "string" ? text : "";
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const progress = useTransform(scrollYProgress, (v: number) => clamp01(v * speed));
  const fontStyles = React.useMemo(() => normalizeFont(font), [font]);
  const resolvedTextAlign = fontStyles.textAlign || "center";
  const justifyContent =
    resolvedTextAlign === "left"
      ? "flex-start"
      : resolvedTextAlign === "right"
      ? "flex-end"
      : "center";
  const top =
    alignY === "Top"
      ? `${stickyOffsetPx}px`
      : alignY === "Bottom"
      ? `calc(100vh - ${stickyOffsetPx}px)`
      : `calc(50vh + ${stickyOffsetPx}px)`;
  const transform =
    alignY === "Top"
      ? "translateY(0)"
      : alignY === "Bottom"
      ? "translateY(-100%)"
      : "translateY(-50%)";
  const wordOrLetterTokens = React.useMemo(() => {
    if (unit === "Words" || unit === "Letters")
      return tokenizeWordsOrLetters(raw, unit);
    return [];
  }, [raw, unit]);
  
  const totalAnimated = React.useMemo(() => {
    let max = -1;
    for (const t of wordOrLetterTokens) {
      if (t.kind === "token" && t.animIndex !== null)
        max = Math.max(max, t.animIndex);
    }
    return max + 1;
  }, [wordOrLetterTokens]);
  
  const lineTokens = React.useMemo(() => {
    if (unit === "Lines") return tokenizeLines(raw);
    return [];
  }, [raw, unit]);
  
  return (
    <section
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        height: `${sectionHeightVh}vh`,
        overflow: "visible",
      }}
    >
      <div
        style={{
          position: "sticky",
          top,
          transform,
          padding: `0 ${paddingVw}vw`,
          display: "flex",
          justifyContent,
        }}
      >
        <div
          style={{
            position: "relative",
            maxWidth,
            width: "100%",
            color: textColor,
            whiteSpace: "pre-wrap",
            textAlign: resolvedTextAlign,
            ...(unit === "Words" ? { wordSpacing: `${wordGapEm}em` } : null),
            ...fontStyles,
          }}
        >
          {ghostEnabled && (
            <GhostLayer
              raw={raw}
              unit={unit}
              textColor={textColor}
              ghostColor={ghostColor}
              ghostOpacity={ghostOpacity}
              textAlign={resolvedTextAlign}
            />
          )}
          <div style={{ position: "relative" }}>
            {unit === "Lines"
              ? lineTokens.map((t: any, i: number) => (
                  <RevealLine
                    key={`l-${i}`}
                    line={t.value}
                    animIndex={t.animIndex}
                    totalLines={lineTokens.length}
                    progress={progress}
                  />
                ))
              : wordOrLetterTokens.map((t: any, i: number) =>
                  t.kind === "br" ? (
                    <br key={`br-${i}`} />
                  ) : (
                    <RevealToken
                      key={`t-${i}`}
                      value={t.value}
                      animIndex={t.animIndex}
                      totalAnimated={totalAnimated}
                      progress={progress}
                      unit={unit}
                    />
                  )
                )}
          </div>
        </div>
      </div>
    </section>
  );
}
