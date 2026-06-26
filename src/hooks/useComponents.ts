/**
 * useComponents — auto-discovers every component in Components-maintiles/.
 *
 * Category convention (new, zero-config):
 *   Components-maintiles/{Category}/{component-folder}/file.html + file.png
 *
 * The top-level folder name IS the category. Adding a new category folder
 * makes it appear automatically — no manual editing needed.
 *
 * For backwards-compatibility, a CATEGORY_LABELS map can be used to give
 * nicer display names (e.g. "UI-Components" → "UI Components").
 */

// ─── Vite glob imports ──────────────────────────────────────────────────────

const pngModules = import.meta.glob(
  '/Components-maintiles/**/*.png',
  { eager: true, query: '?url' }
) as Record<string, any>;

const htmlModules = import.meta.glob(
  '/Components-maintiles/**/*.html',
  { eager: true, query: '?raw' }
) as Record<string, any>;

// ─── Category display names ─────────────────────────────────────────────────
// Map folder slug → human-readable label.
// Any slug NOT listed here falls back to auto-formatting (below).

const CATEGORY_LABELS: Record<string, string> = {
  // ── New organised categories ────────────────────────────────────
  "Full-Sites":        "Full Sites",
  "Hero-Sections":     "Hero Sections",
  "Navigation":        "Navigation",
  "Cards":             "Cards",
  "Features-Sections": "Features Sections",
  "Pricing":           "Pricing",
  "Buttons":           "Buttons",
  "CTA-Sections":      "CTA Sections",
  "UI-Components":     "UI Components",
  "Page-Templates":    "Page Templates",
  "Themes":            "Themes",
  "Footers":           "Footers",
  "Testimonials":      "Testimonials",
  "Flows-Layouts":     "Flows & Layouts",
  // ── Legacy folder names (pre-reorganisation) ────────────────────
  "components":        "UI Components",
  "theme":             "Themes",
  "theme-unique":      "Themes",
  "footer":            "Footers",
  "testimonials":      "Testimonials",
  "Flow":              "Flows & Layouts",
  "Trvel agency":      "Page Templates",
};

// ─── Preferred category sort order ─────────────────────────────────────────
// Categories appear in the tab bar and gallery in this order.
// Any new category not listed here falls to the bottom alphabetically.
const CATEGORY_ORDER = [
  "Full Sites",
  "Hero Sections",
  "Navigation",
  "Cards",
  "Features Sections",
  "Pricing",
  "Buttons",
  "CTA Sections",
  "UI Components",
  "Page Templates",
  "Themes",
  "Footers",
  "Testimonials",
  "Flows & Layouts",
];

// ─── helpers ────────────────────────────────────────────────────────────────

/** Strip directory + extension: "/foo/bar/compo1.png" → "compo1" */
function stem(filePath: string): string {
  return filePath.split('/').pop()!.replace(/\.[^.]+$/, '');
}

/**
 * Extract the category slug from a Components-maintiles path.
 * Path format: /Components-maintiles/{category}/...
 * Returns the first segment after "Components-maintiles/".
 */
function categorySlug(filePath: string): string {
  // e.g. "/Components-maintiles/Themes/t1/t1.html" → ["", "Components-maintiles", "Themes", "t1", "t1.html"]
  const parts = filePath.split('/');
  // parts[0]="" parts[1]="Components-maintiles" parts[2]=category...
  return parts[2] ?? 'Uncategorized';
}

/** Map a category slug to a human-readable label. */
function categoryLabel(slug: string): string {
  if (CATEGORY_LABELS[slug]) return CATEGORY_LABELS[slug];
  // auto-format: "My-Category" → "My Category"
  return slug.replace(/[-_]+/g, ' ').trim();
}

/** Pull the text from the first <title>…</title> in an HTML string. */
function extractTitle(html: string): string {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m ? m[1].trim() : '';
}

/** Turn a file-stem into a readable label ("compo1" → "Component 1") */
function stemToLabel(s: string): string {
  const numbered = s.match(/^(?:c|compo|fl|ts|f)(\d+)$/i);
  if (numbered) {
    if (s.startsWith('fl')) return `Flow ${numbered[1]}`;
    if (s.startsWith('ts')) return `Testimonial ${numbered[1]}`;
    if (s.startsWith('f') && !s.startsWith('fl')) return `Footer ${numbered[1]}`;
    return `Component ${numbered[1]}`;
  }
  const theme = s.match(/^t(\d+)$/i);
  if (theme) return `Theme ${theme[1]}`;
  return s
    .replace(/([A-Z])/g, ' $1')
    .replace(/[-_]+/g, ' ')
    .trim()
    .replace(/^\w/, (c) => c.toUpperCase());
}

// ─── public shapes ──────────────────────────────────────────────────────────

export interface ComponentEntry {
  /** Display name (from <title> or derived from filename) */
  title: string;
  /** Imported PNG URL */
  image: string;
  /** Full raw HTML source */
  html: string;
  /** The bare stem, e.g. "compo1" */
  id: string;
  /** Category slug, e.g. "UI-Components" */
  categorySlug: string;
  /** Human-readable category label, e.g. "UI Components" */
  category: string;
}

export interface ComponentCategory {
  /** Human-readable label, e.g. "UI Components" */
  name: string;
  /** Folder slug, e.g. "UI-Components" */
  slug: string;
  /** Components in this category, sorted */
  components: ComponentEntry[];
}

// ─── build the list once at module load ────────────────────────────────────

const _components: ComponentEntry[] = (() => {
  // Build a stem → { url, categorySlug } map from PNGs
  const pngByStem: Record<string, { url: string; cat: string }> = {};
  for (const [path, mod] of Object.entries(pngModules)) {
    const url = typeof mod === 'string' ? mod : mod?.default;
    if (!url) continue;
    const s = stem(path);
    // If there's a collision, prefer the one that's deeper (in a named subfolder)
    if (!pngByStem[s] || path.split('/').length > pngByStem[s].url.split('/').length) {
      pngByStem[s] = { url, cat: categorySlug(path) };
    }
  }

  const entries: ComponentEntry[] = [];

  for (const [path, mod] of Object.entries(htmlModules)) {
    const rawHtml = typeof mod === 'string' ? mod : mod?.default;
    if (!rawHtml) continue;
    const s = stem(path);
    const png = pngByStem[s];
    if (!png) continue; // skip HTML files with no matching PNG

    const cat = categorySlug(path);
    const label = categoryLabel(cat);
    const titleTag = extractTitle(rawHtml);

    entries.push({
      id: s,
      title: titleTag || stemToLabel(s),
      image: png.url,
      html: rawHtml,
      categorySlug: cat,
      category: label,
    });
  }

  // Sort by category order, then numeric/alpha within category
  entries.sort((a, b) => {
    const orderA = CATEGORY_ORDER.indexOf(a.category);
    const orderB = CATEGORY_ORDER.indexOf(b.category);
    const catSort = (orderA === -1 ? 99 : orderA) - (orderB === -1 ? 99 : orderB);
    if (catSort !== 0) return catSort;
    const numA = parseInt(a.id.replace(/\D/g, '') || '0', 10);
    const numB = parseInt(b.id.replace(/\D/g, '') || '0', 10);
    return numA - numB || a.id.localeCompare(b.id);
  });

  return entries;
})();

// ─── public hooks ───────────────────────────────────────────────────────────

/** Returns the full flat list of auto-discovered components. */
export function useComponents(): ComponentEntry[] {
  return _components;
}

/** Returns components grouped by category, in display order. */
export function useCategories(): ComponentCategory[] {
  const map = new Map<string, ComponentCategory>();

  for (const comp of _components) {
    if (!map.has(comp.category)) {
      map.set(comp.category, {
        name: comp.category,
        slug: comp.categorySlug,
        components: [],
      });
    }
    map.get(comp.category)!.components.push(comp);
  }

  return Array.from(map.values());
}
