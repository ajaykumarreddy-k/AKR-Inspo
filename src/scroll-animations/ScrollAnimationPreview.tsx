import { useState, useRef, useEffect, useCallback } from 'react';
import { Copy, Check, RotateCw, Eye, Code2 } from 'lucide-react';
import type { ScrollAnimationComponent, AnimationProps } from './types';
import { Controls } from './playground/Controls';

interface PreviewProps {
  component: ScrollAnimationComponent;
}

export function ScrollAnimationPreview({ component }: PreviewProps) {
  const Cmp = component.component;
  const [props, setProps] = useState<AnimationProps>({});
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [isCopied, setIsCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePropChange = (key: string, value: unknown) => {
    setProps((prev) => ({ ...prev, [key]: value }));
  };

  const handleRefresh = () => setRefreshKey((k) => k + 1);

  const handleCopyCode = useCallback(async () => {
    const source = generateComponentCode(component.id, component.title);
    try {
      await navigator.clipboard.writeText(source);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = source;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }, [component]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const max = scrollHeight - clientHeight;
      setScrollProgress(max > 0 ? Math.min(scrollTop / max, 1) : 0);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight mb-1">{component.title}</h2>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm">{component.description}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {component.tags.map((tag) => (
            <span key={tag} className="text-[11px] px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
              {tag}
            </span>
          ))}
          {component.plugins.map((p) => (
            <span key={p} className="text-[11px] px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium">
              {p}
            </span>
          ))}
        </div>
      </div>

      <Controls
        configs={component.controls ?? []}
        values={props}
        onChange={handlePropChange}
      />

      <div className="mt-4 bg-white dark:bg-[#0a0a0a] border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
          <div className="flex items-center gap-1 p-0.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg">
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeTab === 'preview'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
              }`}
            >
              <Eye className="w-3.5 h-3.5" /> Preview
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeTab === 'code'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm'
                  : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" /> Code
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-neutral-400">
              {(scrollProgress * 100).toFixed(0)}%
            </span>
            <button
              onClick={handleRefresh}
              className="p-1.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
              title="Restart"
            >
              <RotateCw className="w-4 h-4" />
            </button>
            <button
              onClick={handleCopyCode}
              className="p-1.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
              title="Copy component code"
            >
              {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="relative">
          {activeTab === 'preview' ? (
            <div
              ref={containerRef}
              className="overflow-auto max-h-[70vh] min-h-[400px]"
            >
              <div className="min-h-[400px]">
                <Cmp key={refreshKey} {...props} />
              </div>
            </div>
          ) : (
            <div className="max-h-[70vh] overflow-auto bg-neutral-900">
              <pre className="p-6 text-xs text-neutral-300 font-mono leading-relaxed whitespace-pre-wrap">
                <code>{generateComponentCode(component.id, component.title)}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function generateComponentCode(id: string, title: string): string {
  return `import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ${title.replace(/\s+/g, '')}() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Your ScrollTrigger animation here
      // See the live preview for the full implementation
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      {/* Animation content */}
    </div>
  );
}`;
}
