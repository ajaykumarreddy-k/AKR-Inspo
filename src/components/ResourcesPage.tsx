import { ArrowLeft, Copy, Check, ExternalLink, Type, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

interface ResourcesPageProps {
  onNavigate: (path: string) => void;
}

interface FontPairing {
  id: number;
  name: string;
  category: string;
  headerFont: string;
  bodyFont: string;
  headerFamily: string;
  bodyFamily: string;
  headerClass: string;
  bodyClass: string;
  description: string;
  sampleHeader: string;
  sampleBody: string;
  importUrl: string;
  tailwindConfig: string;
}

export function ResourcesPage({ onNavigate }: ResourcesPageProps) {
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [customText, setCustomText] = useState("");

  const fontPairings: FontPairing[] = [
    {
      id: 1,
      name: "Brutalist Tech",
      category: "Brutalist & Modern",
      headerFont: "Outfit",
      bodyFont: "Inter",
      headerFamily: "'Outfit', sans-serif",
      bodyFamily: "'Inter', sans-serif",
      headerClass: "font-outfit font-black tracking-tight",
      bodyClass: "font-inter font-normal text-neutral-600 dark:text-neutral-400",
      description: "A solid, heavy geometric heading paired with a clean, neutral body font. Extremely readable for modern SaaS, Web3, and portfolios.",
      sampleHeader: "The Next Generation of Interface Design",
      sampleBody: "Building premium interactive components with clean geometry and smooth micro-interactions. The brutalist style stands out through high-contrast typography.",
      importUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@800;900&display=swap",
      tailwindConfig: `// tailwind.config.js
theme: {
  extend: {
    fontFamily: {
      display: ['Outfit', 'sans-serif'],
      sans: ['Inter', 'sans-serif'],
    }
  }
}`
    },
    {
      id: 2,
      name: "Editorial Elegance",
      category: "Serif & Sans",
      headerFont: "Playfair Display",
      bodyFont: "Plus Jakarta Sans",
      headerFamily: "'Playfair Display', serif",
      bodyFamily: "'Plus Jakarta Sans', sans-serif",
      headerClass: "font-playfair font-black italic",
      bodyClass: "font-jakarta font-medium text-neutral-600 dark:text-neutral-400",
      description: "A timeless, high-contrast serif heading matched with an elegant, modern geometric sans-serif body. Perfect for premium fashion, editorial, or design studios.",
      sampleHeader: "Curated Aesthetics & Minimalist Design",
      sampleBody: "A careful curation of visual guidelines, spacing tokens, and typographic scale that elevates ordinary structures into extraordinary experiences.",
      importUrl: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap",
      tailwindConfig: `// tailwind.config.js
theme: {
  extend: {
    fontFamily: {
      serifDisplay: ['"Playfair Display"', 'serif'],
      sans: ['"Plus Jakarta Sans"', 'sans-serif'],
    }
  }
}`
    },
    {
      id: 3,
      name: "Creative Vanguard",
      category: "Artistic Display",
      headerFont: "Syne",
      bodyFont: "Sora",
      headerFamily: "'Syne', sans-serif",
      bodyFamily: "'Sora', sans-serif",
      headerClass: "font-syne font-extrabold tracking-tight",
      bodyClass: "font-sora font-light text-neutral-600 dark:text-neutral-400",
      description: "An ultra-modern, expressive wide-sans heading paired with a sleek, tech-influenced geometric body. Ideal for agency sites, portfolio concepts, and futuristic startups.",
      sampleHeader: "Expressive Forms and Radical Layouts",
      sampleBody: "Typography is not just a tool for readability; it's the core canvas of your art direction. Break constraints and let the letterforms guide the layout.",
      importUrl: "https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600&family=Syne:wght@700;800&display=swap",
      tailwindConfig: `// tailwind.config.js
theme: {
  extend: {
    fontFamily: {
      creative: ['Syne', 'sans-serif'],
      tech: ['Sora', 'sans-serif'],
    }
  }
}`
    },
    {
      id: 4,
      name: "Neo-Classic Editorial",
      category: "Sleek Serif & Sans",
      headerFont: "DM Serif Display",
      bodyFont: "DM Sans",
      headerFamily: "'DM Serif Display', serif",
      bodyFamily: "'DM Sans', sans-serif",
      headerClass: "font-dm-serif font-normal",
      bodyClass: "font-dm-sans font-normal text-neutral-600 dark:text-neutral-400",
      description: "A charming, elegant, lower-contrast serif heading combined with a clean and neutral sans-serif body. Outstanding for newsletters, SaaS marketing, and corporate publications.",
      sampleHeader: "Decisions made simple with modern layout design",
      sampleBody: "We design structures that flow with reading habits. Combining editorial sophistication with standard usability brings out the best of both worlds.",
      importUrl: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=DM+Serif+Display:ital@0;1&display=swap",
      tailwindConfig: `// tailwind.config.js
theme: {
  extend: {
    fontFamily: {
      editorial: ['"DM Serif Display"', 'serif'],
      sans: ['"DM Sans"', 'sans-serif'],
    }
  }
}`
    }
  ];

  // Dynamically load Google Fonts on mount
  useEffect(() => {
    fontPairings.forEach(pairing => {
      const linkId = `google-font-${pairing.headerFont.replace(/\s+/g, '-').toLowerCase()}`;
      if (!document.getElementById(linkId)) {
        const link = document.createElement("link");
        link.id = linkId;
        link.rel = "stylesheet";
        link.href = pairing.importUrl;
        document.head.appendChild(link);
      }
    });
  }, []);

  const copyConfig = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-5 md:px-16 py-12 md:py-20 z-10 flex-grow flex flex-col justify-start animate-fade-in">
      
      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <button 
          onClick={() => onNavigate("/")}
          className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer w-fit"
        >
          <span className="p-2 rounded-full border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] group-hover:bg-black/5 dark:group-hover:bg-white/5 transition-all">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          </span>
          Back to Showcase
        </button>

        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white md:text-center">
          Typography Resources
        </h1>
        <div className="hidden md:block w-36"></div> {/* Spacer for symmetry */}
      </div>

      {/* Intro section */}
      <div className="w-full max-w-3xl mb-12">
        <h2 className="text-lg font-bold text-[#FF4200] mb-3 flex items-center gap-2 uppercase tracking-wider text-xs">
          <Sparkles className="w-4 h-4" /> Font Pairing Guide
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed font-medium">
          typography sets the voice of your interface. Below are premium, hand-picked Google Font pairings designed for components and layouts in our library.
        </p>

        {/* Live Playground Input */}
        <div className="mt-8 p-6 rounded-[24px] border border-black/10 dark:border-white/10 bg-neutral-50/50 dark:bg-neutral-950/20 backdrop-blur-md">
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2 pl-1">
            Global Preview Sandbox
          </label>
          <div className="relative">
            <input 
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Type custom text here to preview in all headings..."
              className="w-full bg-white dark:bg-black/50 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-[#FF4200] transition-all pr-12 font-medium"
            />
            <Type className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          </div>
        </div>
      </div>

      {/* Pairings Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        {fontPairings.map((pairing) => (
          <div 
            key={pairing.id}
            className="p-8 rounded-[32px] border border-black/10 dark:border-white/10 bg-neutral-50/50 dark:bg-neutral-950/20 backdrop-blur-md flex flex-col justify-between shadow-sm"
          >
            {/* Header info */}
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#FF4200]/10 text-[#FF4200] text-[10px] font-bold uppercase tracking-wider mb-2">
                    {pairing.category}
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50">{pairing.name}</h3>
                </div>
                <div className="text-xs font-mono font-bold text-neutral-400 dark:text-neutral-500 text-right">
                  <div className="text-neutral-700 dark:text-neutral-300">{pairing.headerFont}</div>
                  <div className="text-[10px] opacity-70">paired with {pairing.bodyFont}</div>
                </div>
              </div>

              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-8 font-medium leading-relaxed">
                {pairing.description}
              </p>

              {/* Rendering Section */}
              <div className="border border-neutral-100 dark:border-neutral-900 rounded-[20px] p-6 mb-8 bg-white/40 dark:bg-black/20">
                <h4 
                  style={{ fontFamily: pairing.headerFamily }}
                  className={`text-[28px] leading-[1.1] mb-4 text-neutral-950 dark:text-neutral-50 ${pairing.headerClass}`}
                >
                  {customText || pairing.sampleHeader}
                </h4>
                <p 
                  style={{ fontFamily: pairing.bodyFamily }}
                  className={`text-sm leading-relaxed ${pairing.bodyClass}`}
                >
                  {pairing.sampleBody}
                </p>
              </div>
            </div>

            {/* Code / Configuration Copy Section */}
            <div className="border-t border-neutral-100 dark:border-neutral-900 pt-6 mt-2">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  Tailwind Setup
                </span>
                <button
                  onClick={() => copyConfig(pairing.tailwindConfig, pairing.id)}
                  className="flex items-center gap-1.5 text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                >
                  {copiedId === pairing.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-500" />
                      Copied config!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy config
                    </>
                  )}
                </button>
              </div>
              <pre className="text-[11px] font-mono p-4 rounded-xl bg-black/5 dark:bg-black/40 text-neutral-600 dark:text-neutral-400 overflow-x-auto select-all max-h-40 border border-black/5 dark:border-white/5">
                {pairing.tailwindConfig}
              </pre>
            </div>
          </div>
        ))}
      </div>

      {/* Subtle Footer Citation */}
      <footer className="mt-20 text-center text-xs font-mono font-medium text-neutral-400 dark:text-neutral-500 tracking-wider flex items-center justify-center gap-1.5">
        LOADED VIA GOOGLE FONTS API <ExternalLink className="w-3 h-3" />
      </footer>
    </div>
  );
}
