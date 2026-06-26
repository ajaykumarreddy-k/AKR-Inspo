const cssVariableRegex = /var\s*\(\s*(--[\w-]+)(?:\s*,\s*((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*))?\s*\)/;

function extractDefaultValue(cssVar: string): string {
  if (!cssVar || !cssVar.startsWith("var(")) return cssVar;
  const match = cssVariableRegex.exec(cssVar);
  if (!match) return cssVar;
  const fallback = (match[2] || "").trim();
  if (fallback.startsWith("var(")) return extractDefaultValue(fallback);
  return fallback || cssVar;
}

export function resolveTokenColor(input: string): string {
  if (typeof input !== "string") return input;
  if (!input.startsWith("var(")) return input;
  return extractDefaultValue(input);
}

export function parseColorToRgba(input: string): { r: number; g: number; b: number; a: number } {
  if (!input) return { r: 0, g: 0, b: 0, a: 1 };
  const str = input.trim();

  const rgbaMatch = str.match(
    /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)/i
  );
  if (rgbaMatch) {
    const r = Math.max(0, Math.min(255, parseFloat(rgbaMatch[1]!))) / 255;
    const g = Math.max(0, Math.min(255, parseFloat(rgbaMatch[2]!))) / 255;
    const b = Math.max(0, Math.min(255, parseFloat(rgbaMatch[3]!))) / 255;
    const a = rgbaMatch[4] !== undefined ? Math.max(0, Math.min(1, parseFloat(rgbaMatch[4]!))) : 1;
    return { r, g, b, a };
  }

  const hex = str.replace(/^#/, "");
  if (hex.length === 8) {
    return {
      r: parseInt(hex.slice(0, 2), 16) / 255,
      g: parseInt(hex.slice(2, 4), 16) / 255,
      b: parseInt(hex.slice(4, 6), 16) / 255,
      a: parseInt(hex.slice(6, 8), 16) / 255,
    };
  }
  if (hex.length === 6) {
    return {
      r: parseInt(hex.slice(0, 2), 16) / 255,
      g: parseInt(hex.slice(2, 4), 16) / 255,
      b: parseInt(hex.slice(4, 6), 16) / 255,
      a: 1,
    };
  }
  if (hex.length === 4) {
    const h = hex;
    return {
      r: parseInt(h[0]! + h[0]!, 16) / 255,
      g: parseInt(h[1]! + h[1]!, 16) / 255,
      b: parseInt(h[2]! + h[2]!, 16) / 255,
      a: parseInt(h[3]! + h[3]!, 16) / 255,
    };
  }
  if (hex.length === 3) {
    const h = hex;
    return {
      r: parseInt(h[0]! + h[0]!, 16) / 255,
      g: parseInt(h[1]! + h[1]!, 16) / 255,
      b: parseInt(h[2]! + h[2]!, 16) / 255,
      a: 1,
    };
  }
  return { r: 0, g: 0, b: 0, a: 1 };
}
