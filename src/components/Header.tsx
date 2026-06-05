import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function Header() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') || 
             window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div className="w-full px-4 pt-4 md:px-6 md:pt-6 pb-2 z-50 sticky top-0 transition-colors duration-300">
      <header className="bg-gradient-to-b from-[#3E9F44] to-[#2E8134] rounded-lg shadow-md w-full max-w-[1440px] mx-auto overflow-hidden">
        <div className="flex justify-between items-center w-full px-6 py-4 md:py-5">
          <div className="flex items-center">
            <span className="text-[13px] md:text-[15px] font-mono tracking-[0.2em] text-white uppercase font-semibold">
              AKR-Inspo
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={toggleTheme}
              className="p-1 rounded-full hover:bg-white/20 transition-colors text-white"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-4 h-4" strokeWidth={2.5} /> : <Moon className="w-4 h-4" strokeWidth={2.5} />}
            </button>
            
            {/* Diamond Grid Icon */}
            <button className="flex items-center justify-center hover:opacity-80 transition-opacity" aria-label="Menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L15 7L12 10L9 7L12 4Z" fill="white"/>
                <path d="M7 9L10 12L7 15L4 12L7 9Z" fill="white"/>
                <path d="M17 9L20 12L17 15L14 12L17 9Z" fill="white"/>
                <path d="M12 14L15 17L12 20L9 17L12 14Z" fill="white"/>
              </svg>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
