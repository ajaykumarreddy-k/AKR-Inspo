import { useState, useEffect, useRef, Suspense } from 'react'
import { Copy, Check, MousePointer2 } from 'lucide-react'
import Prism from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-typescript'
import 'prismjs/themes/prism-tomorrow.css'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

import { Tabs, TabContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ErrorBoundary } from './ErrorBoundary'

interface ComponentPreviewProps {
  children: React.ReactNode
  code: string
  title?: string
  description?: string
  className?: string
}

export function ComponentPreview({
  children,
  code,
  title = 'Preview',
  description,
  className
}: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = useState('preview')
  const [isCopied, setIsCopied] = useState(false)
  const [isScrollable, setIsScrollable] = useState(false)

  // Highlight code on load and tab switch
  useEffect(() => {
    if (activeTab === 'code') {
      Prism.highlightAll()
    }
  }, [activeTab, code])

  // Recalculate GSAP ScrollTrigger positions when layout dramatically changes
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 150)
    return () => clearTimeout(timer)
  }, [isScrollable, activeTab])

  const containerRef = useRef<HTMLDivElement>(null)
  const [hasBeenInView, setHasBeenInView] = useState(false)

  // Lazy mount children when scrolled into view to prevent rendering 200 GSAP components at once
  useEffect(() => {
    if (!containerRef.current || hasBeenInView) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasBeenInView(true)
        observer.disconnect()
      }
    }, { rootMargin: '3000px 0px' }) // Pre-load ~5 components ahead of the scroll position

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [hasBeenInView])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  const tabs = [
    { id: 'preview', label: 'Preview' },
    { id: 'code', label: 'Code' }
  ]

  return (
    <div className={cn('flex flex-col gap-4 w-full max-w-7xl mx-auto my-12', className)}>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 px-2">
        <div>
          <h3 className="text-xl font-semibold text-[var(--color-text)] flex items-center gap-2">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-[var(--color-text-muted)] mt-1">
              {description}
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <Tabs 
            tabs={tabs} 
            activeTab={activeTab} 
            onChange={setActiveTab} 
          />
          {activeTab === 'preview' && (
            <Button
              variant={isScrollable ? "default" : "secondary"}
              size="sm"
              onClick={() => setIsScrollable(!isScrollable)}
              className="gap-2 transition-colors"
              title="Toggle Full Height Container"
            >
              <MousePointer2 className="w-4 h-4" />
              {isScrollable ? "Collapse" : "Full Height"}
            </Button>
          )}
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={handleCopy}
            className="w-24"
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </>
            )}
          </Button>
        </div>
      </div>

      <div 
        ref={containerRef}
        className={cn(
        "relative rounded-xl glass shadow-2xl transition-all duration-300 hover:shadow-indigo-500/10",
        !isScrollable && "overflow-hidden"
      )}>
        {/* Preview View */}
        <TabContent 
          id="preview" 
          activeTab={activeTab} 
          className="p-0"
        >
          <div 
            className={cn(
              "relative w-full custom-scrollbar",
              !isScrollable && "[transform:translateZ(0)]",
              isScrollable 
                ? "h-auto min-h-[60vh] block p-0" 
                : "min-h-[400px] flex items-center justify-center p-8 overflow-hidden"
            )}
          >
            <div className={cn(
              "relative z-10 w-full",
              isScrollable 
                ? "h-auto" 
                : "h-full flex items-center justify-center [&>div]:w-full [&>section]:w-full"
            )}>
              <ErrorBoundary>
                {hasBeenInView ? (
                  <Suspense fallback={
                    <div className="w-full h-full flex flex-col items-center justify-center min-h-[200px] animate-pulse">
                      <div className="w-8 h-8 rounded-full border-2 border-[var(--color-text-muted)] border-t-[var(--color-primary)] animate-spin opacity-50 mb-4"></div>
                      <span className="text-[var(--color-text-muted)] text-sm">Preparing component...</span>
                    </div>
                  }>
                    {children}
                  </Suspense>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center min-h-[200px] animate-pulse">
                    <div className="w-8 h-8 rounded-full border-2 border-[var(--color-text-muted)] border-t-[var(--color-primary)] animate-spin opacity-50 mb-4"></div>
                    <span className="text-[var(--color-text-muted)] text-sm">Preparing component...</span>
                  </div>
                )}
              </ErrorBoundary>
            </div>
          </div>
        </TabContent>

        {/* Code View */}
        <TabContent 
          id="code" 
          activeTab={activeTab}
          className="p-0"
        >
          <div className="relative max-h-[600px] overflow-auto custom-scrollbar">
            <pre className="!m-0 !bg-transparent text-sm">
              <code className="language-tsx">{code}</code>
            </pre>
          </div>
        </TabContent>
      </div>
    </div>
  )
}
