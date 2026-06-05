import { useState, useRef, useEffect } from "react";
import { ComponentModal } from "./ComponentModal";
import { useCategories, type ComponentEntry } from "../hooks/useComponents";

// ─── Category tab bar ────────────────────────────────────────────────────────

interface TabBarProps {
  categories: { name: string; slug: string; components: ComponentEntry[] }[];
  active: string | null;
  onSelect: (name: string | null) => void;
}

function TabBar({ categories, active, onSelect }: TabBarProps) {
  const totalCount = categories.reduce((sum, cat) => sum + cat.components.length, 0);

  return (
    <div className="sticky top-0 z-30 -mx-5 md:-mx-16 px-5 md:px-16 py-3 mb-10 backdrop-blur-xl bg-white/80 dark:bg-[#0a0a0a]/80 border-b border-black/5 dark:border-white/5">
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide w-full max-w-[1440px] mx-auto">
        {/* "All" pill */}
        <button
          id="gallery-filter-all"
          onClick={() => onSelect(null)}
          className={`shrink-0 px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
            active === null
              ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-sm"
              : "bg-neutral-100 dark:bg-white/8 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-white/12"
          }`}
        >
          All
          <span
            className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full ${
              active === null
                ? "bg-white/20 dark:bg-black/20 text-current"
                : "bg-neutral-200 dark:bg-white/10 text-neutral-500 dark:text-neutral-500"
            }`}
          >
            {totalCount}
          </span>
        </button>

        {categories.map((cat) => (
          <button
            key={cat.slug}
            id={`gallery-filter-${cat.slug}`}
            onClick={() => onSelect(cat.name)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              active === cat.name
                ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-sm"
                : "bg-neutral-100 dark:bg-white/8 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-white/12"
            }`}
          >
            {cat.name}
            <span
              className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full ${
                active === cat.name
                  ? "bg-white/20 dark:bg-black/20 text-current"
                  : "bg-neutral-200 dark:bg-white/10 text-neutral-500 dark:text-neutral-500"
              }`}
            >
              {cat.components.length}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Category section ────────────────────────────────────────────────────────

interface CategorySectionProps {
  name: string;
  slug: string;
  components: ComponentEntry[];
  onSelect: (comp: ComponentEntry) => void;
}

function CategorySection({ name, slug, components, onSelect }: CategorySectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section ref={ref} id={`category-${slug}`} className="mb-20">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-8">
        <h3 className="text-[22px] md:text-[28px] font-bold tracking-tight text-neutral-800 dark:text-neutral-100">
          {name}
        </h3>
        <span className="text-[13px] font-semibold px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-white/8 text-neutral-500 dark:text-neutral-400">
          {components.length} {components.length === 1 ? "component" : "components"}
        </span>
        {/* Divider line */}
        <div className="flex-1 h-px bg-neutral-200 dark:bg-white/8" />
      </div>

      {/* Component grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-14 lg:gap-x-12 lg:gap-y-20">
        {components.map((comp) => (
          <button
            key={comp.id}
            id={`gallery-card-${comp.id}`}
            onClick={() => onSelect(comp)}
            className="group block text-left w-full cursor-pointer focus:outline-none focus-visible:ring-2 ring-neutral-500 ring-offset-4 dark:ring-offset-black rounded-[32px] transition-all"
          >
            {/* Thumbnail */}
            <div className="border border-black/5 dark:border-white/5 rounded-[32px] overflow-hidden bg-white dark:bg-[#111] mb-4 aspect-[16/11] relative transition-all duration-500 group-hover:border-black/20 dark:group-hover:border-white/20 group-hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] dark:group-hover:shadow-[0_20px_60px_rgb(255,255,255,0.05)] shadow-sm">
              <img
                src={comp.image}
                alt={comp.title}
                className="w-full h-full object-contain object-top opacity-90 group-hover:opacity-100 transition-all duration-700"
              />
            </div>

            {/* Title + category badge */}
            <div className="flex items-start justify-between gap-3 pl-2">
              <h4 className="text-[18px] md:text-[22px] font-bold tracking-tight text-[#1b1b1b] dark:text-gray-100 transition-colors leading-snug">
                {comp.title}
              </h4>
              <span className="shrink-0 mt-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-white/8 text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
                {comp.category}
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

// ─── Main Gallery ────────────────────────────────────────────────────────────

export function Gallery() {
  const categories = useCategories();
  const [selected, setSelected] = useState<ComponentEntry | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Scroll to top of gallery when filter changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeFilter]);

  if (categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <p className="text-5xl mb-4">📂</p>
        <p className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
          No components yet
        </p>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-500 max-w-sm">
          Add a folder inside{" "}
          <code className="font-mono bg-neutral-100 dark:bg-neutral-800 px-1 rounded">
            Components-maintiles/{"{Category}/{component-name}/"}
          </code>{" "}
          containing a{" "}
          <code className="font-mono bg-neutral-100 dark:bg-neutral-800 px-1 rounded">
            .html
          </code>{" "}
          and a matching{" "}
          <code className="font-mono bg-neutral-100 dark:bg-neutral-800 px-1 rounded">
            .png
          </code>{" "}
          screenshot. They'll appear here automatically.
        </p>
      </div>
    );
  }

  const visibleCategories =
    activeFilter === null
      ? categories
      : categories.filter((c) => c.name === activeFilter);

  return (
    <>
      {/* Filter tab bar */}
      <TabBar
        categories={categories}
        active={activeFilter}
        onSelect={setActiveFilter}
      />

      {/* Category sections */}
      {visibleCategories.map((cat) => (
        <CategorySection
          key={cat.slug}
          name={cat.name}
          slug={cat.slug}
          components={cat.components}
          onSelect={setSelected}
        />
      ))}

      {/* Component detail modal */}
      <ComponentModal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        card={selected}
      />
    </>
  );
}
