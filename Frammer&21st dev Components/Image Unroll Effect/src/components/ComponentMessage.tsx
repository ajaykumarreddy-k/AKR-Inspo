import type { CSSProperties } from "react";

interface ComponentMessageProps {
  title?: string;
  subtitle?: string;
  style?: CSSProperties;
}

export function ComponentMessage({
  title = "Unrolling Image",
  subtitle = "Add an image to see the unroll effect",
  style,
}: ComponentMessageProps) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minWidth: 0,
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        padding: "0 20px",
        backgroundColor: "rgba(136, 85, 255, 0.1)",
        ...style,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 28 28"
        width={28}
        height={28}
      >
        <path d="M 0 0 L 28 0 L 28 28 L 0 28 Z" fill="transparent" />
        <path
          d="M 21 7.113 C 21 7.041 21.029 6.971 21.079 6.921 L 27.534 0.465 C 27.613 0.388 27.73 0.365 27.831 0.407 C 27.933 0.449 28 0.548 28 0.658 L 28 13.888 C 28 13.96 27.971 14.028 27.921 14.079 L 21 21 Z M 7 21 L 7 7.658 C 7 7.548 6.933 7.449 6.831 7.407 C 6.73 7.365 6.613 7.388 6.534 7.465 L 0.079 13.921 C 0.028 13.972 0 14.041 0 14.113 L 0 27.728 C 0 27.877 0.122 28 0.273 28 L 13.888 28 C 13.96 28 14.028 27.971 14.079 27.921 L 21 21 Z"
          fill="rgb(153, 102, 255)"
        />
      </svg>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          maxWidth: 200,
          width: "100%",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: "-0.02em",
            lineHeight: 1,
            color: "rgb(153, 102, 255)",
            margin: 0,
          }}
        >
          {title}
        </p>
        <p
          style={{
            fontSize: 11,
            letterSpacing: "-0.03em",
            lineHeight: 1.4,
            color: "rgba(153, 102, 255, 0.7)",
            margin: 0,
          }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}
