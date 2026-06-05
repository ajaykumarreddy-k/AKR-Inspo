interface FooterProps {
  onNavigate?: (path: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleNavigation = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    }
  };

  return (
    <footer className="bg-[#f9f9f9] dark:bg-[#050505] text-[#111] dark:text-white border-t border-black/10 dark:border-white/10 w-full mt-auto pt-20 md:pt-32 pb-8 px-6 md:px-12 lg:px-16 overflow-hidden transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto w-full">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row mb-24 lg:mb-32 gap-10 md:gap-0">
          <div className="w-full md:w-1/2 md:pr-10 lg:pr-20">
            <h2 className="text-4xl md:text-5xl lg:text-[68px] font-sans font-bold leading-[1.05] tracking-tight">
              wow u know me well .
            </h2>
          </div>
          <div className="w-full md:w-1/2 flex items-end">
            <p className="max-w-[380px] text-[14px] md:text-[15px] text-gray-700 dark:text-gray-300 leading-[1.65] font-medium tracking-tight">
              AKR Inspo Vault is a Chennai-based developer and brand transformation portfolio helping organizations navigate growth, reinvention, and change through strategy, design, and digital.
            </p>
          </div>
        </div>

        {/* Divider and Grid Sections */}
        <div className="border-t border-black/20 dark:border-white/20 pt-6 pb-12 flex flex-col md:flex-row gap-8 md:gap-0">
          <div className="w-full md:w-1/2 text-[14px] font-bold tracking-tight text-gray-900 dark:text-white">
            Sitemap
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-1.5 text-[14px] font-medium text-gray-600 dark:text-gray-400 tracking-tight">
            <a href="/" onClick={handleNavigation("/")} className="hover:text-black dark:hover:text-white transition-colors w-fit">Home</a>
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors w-fit">Case Studies</a>
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors w-fit">Approach</a>
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors w-fit">Insights</a>
            <a href="/links" onClick={handleNavigation("/links")} className="hover:text-black dark:hover:text-white transition-colors w-fit mt-1">Contact</a>
          </div>
        </div>

        <div className="border-t border-black/20 dark:border-white/20 pt-6 pb-12 flex flex-col md:flex-row gap-8 md:gap-0">
          <div className="w-full md:w-1/2 text-[14px] font-bold tracking-tight text-gray-900 dark:text-white">
            Visit
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-1 text-[14px] font-medium text-gray-600 dark:text-gray-400 tracking-tight">
            <p>Chennai, India</p>
            <p>Ring me up a call</p>
          </div>
        </div>

        <div className="border-t border-black/20 dark:border-white/20 pt-6 pb-12 flex flex-col md:flex-row gap-8 md:gap-0">
          <div className="w-full md:w-1/2 text-[14px] font-bold tracking-tight text-gray-900 dark:text-white">
            Work With Us
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-1.5 text-[14px] font-medium text-gray-600 dark:text-gray-400 tracking-tight">
            <a href="mailto:ajaykumarreddykrishnareddygari@gmail.com" className="hover:text-black dark:hover:text-white transition-colors w-fit">ajaykumarreddykrishnareddygari@gmail.com</a>
            <a href="/links" onClick={handleNavigation("/links")} className="hover:text-black dark:hover:text-white transition-colors w-fit">Schedule a call</a>
          </div>
        </div>

        <div className="border-t border-black/20 dark:border-white/20 mb-8 md:mb-10"></div>

        {/* Huge AKR Inspo Vault Title */}
        <div className="w-full overflow-hidden flex justify-start items-center mb-10 md:mb-12">
          <h1 className="text-[10vw] lg:text-[140px] font-bold leading-[0.85] tracking-[-0.04em] text-neutral-900 dark:text-white whitespace-nowrap">
            AKR Inspo Vault
          </h1>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-[13px] font-medium text-gray-500 dark:text-gray-400 gap-6 mt-4 tracking-tight">
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <a href="https://github.com/ajaykumarreddy-k" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/ajay-kumar-reddy-krishnareddy-gari-a4885b282/" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors">LinkedIn</a>
          </div>
          <div className="whitespace-nowrap">
            © 2026 AKR Inspo Vault. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
