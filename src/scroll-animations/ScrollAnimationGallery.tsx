import { useState } from 'react';
import type { AnimationCategory } from './types';
import { CATEGORY_LABELS } from './types';
import { ScrollAnimationPreview } from './ScrollAnimationPreview';
import { components } from './metadata';

const categories = Object.keys(CATEGORY_LABELS) as AnimationCategory[];

export function ScrollAnimationGallery() {
  const [activeCategory, setActiveCategory] = useState<AnimationCategory | 'all'>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const selected = components.find((c) => c.id === selectedId);

  const filtered = components.filter((c) => {
    if (activeCategory !== 'all' && c.category !== activeCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="w-full max-w-[1440px] mx-auto px-5 md:px-16 py-8">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
          Scroll<span className="text-neutral-400">Animations</span>
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl text-lg">
          A comprehensive collection of production-ready scroll-driven animations
          built with GSAP ScrollTrigger. Each example includes a live preview,
          configurable controls, and complete source code.
        </p>
      </div>

      {selected ? (
        <div>
          <button
            onClick={() => setSelectedId(null)}
            className="mb-6 text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 12L6 8L10 4" />
            </svg>
            Back to gallery
          </button>
          <ScrollAnimationPreview component={selected} />
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search animations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeCategory === 'all'
                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                  : 'bg-neutral-100 dark:bg-white/8 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-white/12'
              }`}
            >
              All ({components.length})
            </button>
            {categories.map((cat) => {
              const count = components.filter((c) => c.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    activeCategory === cat
                      ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                      : 'bg-neutral-100 dark:bg-white/8 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-white/12'
                  }`}
                >
                  {CATEGORY_LABELS[cat]} ({count})
                </button>
              );
            })}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-neutral-400">
              <p className="text-lg">No animations found</p>
              <p className="text-sm mt-1">Try a different search or category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {filtered.map((comp) => (
                <button
                  key={comp.id}
                  onClick={() => setSelectedId(comp.id)}
                  className="group text-left w-full cursor-pointer focus:outline-none focus-visible:ring-2 ring-neutral-500 ring-offset-4 dark:ring-offset-black rounded-2xl transition-all"
                >
                  <div className="border border-neutral-200/50 dark:border-neutral-800/50 rounded-2xl overflow-hidden bg-white dark:bg-[#111] mb-3 aspect-[16/10] relative transition-all duration-500 group-hover:border-neutral-400/50 dark:group-hover:border-neutral-600/50 group-hover:shadow-lg">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl opacity-20 group-hover:opacity-40 transition-opacity">
                        {getCategoryIcon(comp.category)}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="px-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 leading-snug">
                        {comp.title}
                      </h3>
                      <span className="shrink-0 mt-0.5 text-[10px] font-medium px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                        {CATEGORY_LABELS[comp.category].split(' ')[0]}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1 line-clamp-2">
                      {comp.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {comp.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800/50 text-neutral-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function getCategoryIcon(cat: AnimationCategory): string {
  const icons: Record<AnimationCategory, string> = {
    fundamentals: '⚙️',
    reveal: '👁️',
    pinning: '📌',
    scrub: '🎨',
    horizontal: '↔️',
    parallax: '🏔️',
    svg: '🖊️',
    timelines: '⏱️',
    cards: '🃏',
    images: '🖼️',
    text: '🔤',
    progress: '📊',
    physics: '⚡',
    'smooth-scroll': '💨',
    performance: '🚀',
  };
  return icons[cat] ?? '✨';
}
