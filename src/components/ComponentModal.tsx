// src/components/ComponentModal.tsx
import { X, Copy, Check, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { type ComponentEntry } from "../hooks/useComponents";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: ComponentEntry | null;
}

export function ComponentModal({ isOpen, onClose, card }: ModalProps) {
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<"code" | "preview">("code");

  // Reset to code tab whenever a new card opens
  useEffect(() => {
    if (isOpen) setTab("code");
  }, [isOpen, card?.id]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen || !card) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(card.html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /** Open the raw HTML as a blob URL in a new browser tab */
  const handleOpenPreview = () => {
    const blob = new Blob([card.html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank", "noopener,noreferrer");
    // Revoke after a short delay so the tab has time to load
    setTimeout(() => URL.revokeObjectURL(url), 10_000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-white/70 dark:bg-[#111]/90 backdrop-blur-2xl border border-white/50 dark:border-white/5 rounded-3xl shadow-2xl shadow-black/10 dark:shadow-black/50 overflow-hidden flex flex-col">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/5 dark:border-white/5 shrink-0">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {card.title}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-mono">
              {card.id}.html
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Open in new tab */}
            <button
              id={`modal-open-preview-${card.id}`}
              onClick={handleOpenPreview}
              title="Open live preview in new tab"
              className="flex items-center gap-1.5 text-xs font-semibold bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-neutral-800 dark:text-white px-3 py-1.5 rounded-lg transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Preview
            </button>

            <button
              id={`modal-close-${card.id}`}
              onClick={onClose}
              className="p-2 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-gray-800 dark:text-gray-200" />
            </button>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden min-h-0">

          {/* Left: thumbnail */}
          <div className="w-full md:w-[42%] bg-white/40 dark:bg-black/40 p-6 flex items-start justify-center shrink-0 overflow-auto border-b md:border-b-0 md:border-r border-black/5 dark:border-white/5">
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-auto object-cover rounded-2xl shadow-lg border border-black/5 dark:border-white/5"
            />
          </div>

          {/* Right: code / preview tabs */}
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            {/* Tab bar */}
            <div className="flex items-center justify-between bg-neutral-100/60 dark:bg-neutral-900/60 backdrop-blur-md px-4 py-2.5 border-b border-neutral-200/50 dark:border-neutral-800/50 shrink-0">
              <div className="flex gap-1">
                {(["code", "preview"] as const).map((t) => (
                  <button
                    key={t}
                    id={`modal-tab-${t}-${card.id}`}
                    onClick={() => setTab(t)}
                    className={`text-[13px] font-semibold px-3 py-1 rounded-lg transition-all ${
                      tab === t
                        ? "bg-white dark:bg-white/15 text-neutral-900 dark:text-white shadow-sm"
                        : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
                    }`}
                  >
                    {t === "code" ? "Source" : "Preview"}
                  </button>
                ))}
              </div>

              {tab === "code" && (
                <button
                  id={`modal-copy-${card.id}`}
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-xs font-semibold bg-white/60 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 text-neutral-800 dark:text-white px-3 py-1.5 rounded-lg transition-all shadow-sm"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  {copied ? "Copied!" : "Copy HTML"}
                </button>
              )}
            </div>

            {/* Tab content */}
            <div className="flex-1 overflow-auto min-h-0">
              {tab === "code" ? (
                <pre className="p-5 text-[12.5px] font-mono text-neutral-800 dark:text-neutral-200 leading-relaxed whitespace-pre-wrap break-words">
                  <code>{card.html}</code>
                </pre>
              ) : (
                <iframe
                  key={card.id}
                  srcDoc={card.html}
                  title={`${card.title} live preview`}
                  sandbox="allow-scripts allow-same-origin"
                  className="w-full h-full border-none bg-white"
                  style={{ minHeight: "400px" }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
