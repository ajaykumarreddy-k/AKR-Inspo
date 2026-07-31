import { useMemo } from "react";

export default function DepthTextEffect(props) {
  const {
    text = "Yolo!",
    font = {
      fontSize: "200px",
      fontFamily: "'Inter', sans-serif"
    },
    textColor = "#e4e5e6",
    outlineWidth = 2,
    outlineColor = "#fb0101",
    shadowOffset = 60,
    shadowAngle = 45,
    shadowColor = "#fb0101",
    textOverflow = "nowrap",
    style
  } = props;

  const shadowStyles = useMemo(() => {
    const angleRad = (shadowAngle * Math.PI) / 180;
    const offsetX = Math.cos(angleRad) * shadowOffset;
    const offsetY = Math.sin(angleRad) * shadowOffset;
    let textShadow = "";

    if (outlineWidth > 0) {
      const outlineShadows = [];
      for (let x = -outlineWidth; x <= outlineWidth; x++) {
        for (let y = -outlineWidth; y <= outlineWidth; y++) {
          if (x !== 0 || y !== 0) {
            outlineShadows.push(`${x}px ${y}px 0px ${outlineColor}`);
          }
        }
      }
      textShadow = outlineShadows.join(", ");
    }

    for (let i = 1; i <= shadowOffset; i++) {
      const x = (offsetX * i) / shadowOffset;
      const y = (offsetY * i) / shadowOffset;
      const blur = 0;
      if (textShadow) textShadow += ", ";
      textShadow += `${x}px ${y}px ${blur}px ${shadowColor}`;
    }
    return textShadow;
  }, [shadowOffset, shadowAngle, shadowColor, outlineWidth, outlineColor]);

  const textStyles = {
    ...font,
    color: textColor,
    textShadow: shadowStyles,
    margin: 0,
    padding: 0,
    lineHeight: 1,
    display: "inline-block",
    whiteSpace: textOverflow === "wrap" ? "normal" : "nowrap",
    fontWeight: "bold",
    fontFamily: font?.fontFamily || "sans-serif",
    ...(textOverflow === "ellipsis" && {
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: "100%"
    })
  };

  const containerStyles = {
    ...style,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  };

  return (
    <div style={containerStyles}>
      <span style={textStyles}>{text}</span>
    </div>
  );
}
