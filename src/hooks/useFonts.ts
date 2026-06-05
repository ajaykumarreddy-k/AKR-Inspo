/**
 * useFonts — auto-discovers every .otf / .ttf / .woff / .woff2 file
 * inside assets/Fonts/ (including subfolders) and injects @font-face
 * rules at runtime.  Drop a new font file into assets/Fonts/ and it
 * becomes available on the page with no extra config.
 *
 * Font-family name = file name without extension.
 * e.g.  Thunder-BoldLC.otf  →  font-family: 'Thunder-BoldLC'
 */

import { useEffect } from "react";

// Eagerly import all font file URLs from assets/Fonts/**
const fontModules = import.meta.glob(
  "../../assets/Fonts/**/*.{otf,ttf,woff,woff2,OTF,TTF,WOFF,WOFF2}",
  { eager: true }
);

const STYLE_ID = "akr-auto-fonts";

function buildFontCSS(): string {
  let css = "";

  Object.entries(fontModules).forEach(([path, mod]) => {
    const url = (mod as { default: string }).default;
    const filename = path.split("/").pop() ?? "";
    const ext = filename.split(".").pop()?.toLowerCase() ?? "";

    // Derive family name from the filename stem
    const family = filename.replace(/\.[^/.]+$/, "");

    const format =
      ext === "otf" ? "opentype"
      : ext === "ttf" ? "truetype"
      : ext === "woff2" ? "woff2"
      : "woff";

    css +=
      `@font-face {\n` +
      `  font-family: '${family}';\n` +
      `  src: url('${url}') format('${format}');\n` +
      `  font-display: swap;\n` +
      `}\n`;
  });

  return css;
}

export function useFonts() {
  useEffect(() => {
    // Avoid duplicate injection on HMR re-renders
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = buildFontCSS();
    document.head.appendChild(style);

    // No cleanup — fonts should persist for the app's lifetime
  }, []);
}

/**
 * Returns an array of { family, url, format } objects for every discovered
 * font — useful if you need to embed fonts inside an <iframe> srcdoc.
 */
export function getDiscoveredFonts(): { family: string; url: string; format: string }[] {
  return Object.entries(fontModules).map(([path, mod]) => {
    const url = (mod as { default: string }).default;
    const filename = path.split("/").pop() ?? "";
    const ext = filename.split(".").pop()?.toLowerCase() ?? "";
    const family = filename.replace(/\.[^/.]+$/, "");
    const format =
      ext === "otf" ? "opentype"
      : ext === "ttf" ? "truetype"
      : ext === "woff2" ? "woff2"
      : "woff";
    return { family, url, format };
  });
}
