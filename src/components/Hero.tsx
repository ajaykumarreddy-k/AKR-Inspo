import { ArrowUpRight, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function Hero({ onNavigate }: { onNavigate: (path: string) => void }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDark(document.documentElement.classList.contains('dark'));
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove('dark');
      setIsDark(false);
    } else {
      root.classList.add('dark');
      setIsDark(true);
    }
  };

  return (
    <div className="w-full px-4 md:px-6 py-2 z-10 mt-4 md:mt-8">
      <section className="relative w-full min-h-[85vh] flex flex-col justify-between bg-[#FF4200] text-black rounded-[32px] md:rounded-[48px] overflow-hidden p-6 md:p-12 lg:p-14 mb-6 shadow-sm">
        
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start w-full relative z-10 gap-12 lg:gap-0">
          {/* Circle Dots Logo & Theme Toggle */}
          <div className="flex flex-col gap-6 opacity-100">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="w-[68px] h-[68px] object-contain" 
            />
            <button 
              onClick={toggleTheme}
              className="p-2 w-fit rounded-full bg-black/10 hover:bg-black/20 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-5 h-5 text-black" strokeWidth={2.5} /> : <Moon className="w-5 h-5 text-black" strokeWidth={2.5} />}
            </button>
          </div>

          {/* Top Link Grid */}
          <div className="flex flex-row flex-wrap lg:flex-nowrap gap-x-8 gap-y-10 lg:gap-16 font-[700] text-[15px] lg:text-[17px] tracking-tight w-full lg:w-auto">
            <div className="flex flex-col w-[45%] sm:w-[160px] lg:w-[150px]">
              <a href="#" className="border-t border-black/30 pt-3 pb-4 hover:opacity-60 transition-opacity mix-blend-multiply">How it works</a>
              <a 
                href="/resources" 
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("/resources");
                }}
                className="border-t border-black/30 pt-3 pb-4 flex justify-between items-center hover:opacity-60 transition-opacity mix-blend-multiply"
              >
                Resources <ArrowUpRight className="w-4 h-4"/>
              </a>
            </div>
            <div className="flex flex-col w-[45%] sm:w-[160px] lg:w-[150px]">
              <a 
                href="/links" 
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("/links");
                }}
                className="border-t border-black/30 pt-3 pb-4 flex justify-between items-center hover:opacity-60 transition-opacity mix-blend-multiply"
              >
                Links <ArrowUpRight className="w-4 h-4"/>
              </a>
              <a 
                href="/inspiration" 
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("/inspiration");
                }}
                className="border-t border-black/30 pt-3 pb-4 flex justify-between items-center hover:opacity-60 transition-opacity mix-blend-multiply"
              >
                Inspiration <ArrowUpRight className="w-4 h-4"/>
              </a>
              <a 
                href="/scroll-animations" 
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("/scroll-animations");
                }}
                className="border-t border-black/30 pt-3 pb-4 flex justify-between items-center hover:opacity-60 transition-opacity mix-blend-multiply"
              >
                Scroll <ArrowUpRight className="w-4 h-4"/>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col w-full relative z-10 mt-20 lg:mt-32">
          <div className="w-full flex justify-center lg:justify-end mb-4 md:mb-8 px-2 lg:px-16">
             <h2 className="text-[36px] sm:text-[44px] lg:text-[56px] font-[800] leading-[1.05] tracking-[-0.03em] text-black w-full lg:w-[55%] text-left">
               The next generation of UI.<br/>Possible with
             </h2>
          </div>
          
          {/* Giant Text */}
          <div className="w-full flex justify-center -mb-4 md:-mb-10 overflow-hidden">
             <h1 className="text-[18vw] leading-[0.72] font-[900] tracking-[-0.05em] text-black text-center select-none w-full">
               akrinspo
             </h1>
          </div>
        </div>
      </section>
    </div>
  );
}
