export const supadupaTheme = {
  colors: {
    background: {
      primary: "#163300",
      secondary: "#260A2F",
    },
    accent: {
      primary: "#9FE870",
      secondary: "#FFC091",
      tertiary: "#FFD7EF",
    },
    interaction: {
      hover: "#FFEB69",
    },
    subtle: {
      dark: "rgba(255, 255, 255, 0.5)",
      light: "rgba(39, 39, 39, 0.5)",
    }
  },
  fontFamily: {
    bricolage: ["Bricolage", "sans-serif"],
  },
  screens: {
    xm: { max: "400px" },
    sm: { min: "401px", max: "768px" },
    md: { min: "769px", max: "1024px" },
    lg: { min: "1025px", max: "1490px" },
    xl: { min: "1491px" },
  },
  borderRadius: {
    'lg-block': '30px',
    'md-block': '20px',
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
  }
};

/**
 * Usage in tailwind.config.ts:
 * 
 * import { supadupaTheme } from './design-system/tailwind-theme';
 * 
 * export default {
 *   theme: {
 *     extend: {
 *       colors: supadupaTheme.colors,
 *       screens: supadupaTheme.screens,
 *       // ...etc
 *     }
 *   }
 * }
 */
