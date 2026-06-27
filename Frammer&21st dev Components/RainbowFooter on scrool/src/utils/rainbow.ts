// Column heights in percentage of the container height (0–100)
// Pyramid shape: tallest in center, symmetric stepping down
export const COLUMN_HEIGHTS_PCT: readonly number[] = [
  28, 42, 60, 78, 95, 78, 60, 42, 28,
];

// Exact gradient matching the Dia browser / Framer University reference
// White center band separates the blue from the yellow naturally
export const COLUMN_GRADIENT =
  "linear-gradient(to top, #0047FF 0%, #1A7FFF 16%, #78D0FF 32%, #FFFFFF 46%, #FFF200 60%, #FFAA00 74%, #FF3C00 86%, #FF00CC 100%)";
