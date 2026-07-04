import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] font-['Google_Sans',_sans-serif] text-black selection:bg-black selection:text-[#F4FC03] overflow-x-hidden">
      <style>{`@import url('https://fonts.cdnfonts.com/css/google-sans');`}</style>
      
      {/* Top Section - Vibrant Yellow */}
      <div className="bg-[#f0ff00] px-6 py-6 flex flex-col justify-between border-b border-black/10 relative" style={{ minHeight: '62vh' }}>
        
        {/* Top Header Grid */}
        <div className="grid grid-cols-4 text-[10px] sm:text-xs font-semibold uppercase tracking-widest leading-tight">
          <div>
            <p>Grid</p>
            <p>10 Columns</p>
          </div>
          <div>
            <p>Centrix - Agency</p>
            <p>& Portfolio Template</p>
          </div>
          <div className="relative">
            <p>2021</p>
            {/* Absolutely positioned inner text block to match alignment in image */}
            <div className="absolute top-16 left-0">
              <p>8 Homepages</p>
              <p>17 Inner Pages</p>
              <p>Bootstrap 5</p>
            </div>
          </div>
          <div className="text-right">
            <p>Author</p>
            <p>Paul_TF</p>
          </div>
        </div>

        {/* Bottom area of Yellow Section */}
        <div className="flex justify-between items-end w-full mt-32 relative">
          {/* Custom Arrow SVG */}
          <div className="mb-2 sm:mb-4">
            <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32">
              <path d="M5 5 L92 92" stroke="#111" strokeWidth="8" />
              <path d="M30 92 L92 92 L92 30" stroke="#111" strokeWidth="8" fill="none" strokeLinejoin="miter" strokeLinecap="square" />
            </svg>
          </div>
          
          {/* Huge 'centrix' text */}
          <h1 className="text-[20vw] leading-[0.75] font-bold tracking-tighter text-[#111] mb-[-2%]">
            centrix
          </h1>
        </div>
      </div>

      {/* Bottom Section - Off White */}
      <div className="px-6 pt-16 pb-24">
        
        {/* Text Area */}
        <div className="flex flex-col md:flex-row justify-between mb-16 gap-8">
          <h2 className="text-4xl md:text-[3.5rem] font-medium w-full md:w-1/2 leading-[1.1] tracking-tight">
            Get started with a pre-<br className="hidden md:block"/>made website
          </h2>
          <div className="w-full md:w-[40%] flex items-end">
            <p className="text-sm font-medium leading-relaxed text-[#111] max-w-md">
              Centrix has included 8 Home Page layouts.<br/>
              Approach with new trending design, focus on clean, modern and<br/>
              minimalist design, Centrix will make your website look more<br/>
              impressive and attractive to viewers. Included many animations<br/>
              help you easy to coding with special effects of it
            </p>
          </div>
        </div>

        {/* Divider and Label */}
        <div className="border-t border-black/30 pt-3 mb-10">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#111]">
            Homepages
          </span>
        </div>

        {/* Thumbnail Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[400px]">
          
          {/* Card 1 */}
          <div className="relative bg-[#d4d4d4] group overflow-hidden h-[300px] md:h-full cursor-pointer">
            <div className="absolute inset-0 bg-black/20 mix-blend-multiply z-10 transition-opacity group-hover:opacity-0"></div>
            {/* Grayscale image placeholder */}
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sat=-100" 
              alt="Team" 
              className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125"
            />
            {/* Overlay UI elements to match image */}
            <div className="absolute top-4 left-4 right-4 flex justify-between text-[8px] text-white/70 uppercase z-20">
               <span>Centrix</span>
               <div className="flex gap-4">
                 <span>Home</span>
                 <span>Pages</span>
                 <span>Portfolio</span>
                 <span>Blog</span>
                 <span>Contact</span>
               </div>
               <span>By Paul_TF</span>
            </div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-8 text-center">
              <h3 className="text-white text-3xl font-serif italic mb-1 opacity-90">Nobody</h3>
              <h3 className="text-white text-3xl font-medium leading-tight mb-4">doesn't look<br/>advertising</h3>
              <div className="w-12 h-1 bg-[#f0ff00]"></div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#0a0a0a] text-white p-6 relative overflow-hidden h-[300px] md:h-full flex flex-col justify-between cursor-pointer group">
            {/* Top tiny nav */}
            <div className="flex justify-between text-[8px] text-white/50 uppercase z-20 w-full">
               <span>Centrix</span>
               <div className="flex gap-4"><span>Home</span><span>Pages</span><span>Portfolio</span><span>Blog</span><span>Contact</span></div>
               <div className="flex gap-2"><span>In</span><span>Tw</span><span>Be</span></div>
            </div>

            <div className="relative z-10 flex-grow mt-8">
              {/* Circular Logo */}
              <div className="w-12 h-12 rounded-full border border-[#f0ff00] flex items-center justify-center text-[#f0ff00] mb-8 relative">
                <span className="text-lg font-bold">C.</span>
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite] opacity-50">
                  <path id="curve" d="M 50 10 A 40 40 0 1 1 49.9 10" fill="transparent" />
                  <text className="text-[11px] uppercase tracking-widest" fill="#f0ff00">
                    <textPath href="#curve">Centrix • Creative • Agency •</textPath>
                  </text>
                </svg>
              </div>

              {/* Distorted Typography background */}
              <div className="absolute top-10 left-0 right-0 bottom-0 text-white/30 text-5xl font-bold leading-[1.1] tracking-tighter flex flex-col gap-4 pointer-events-none">
                <div>/ Kodak</div>
                <div>/ Copenh</div>
                <div className="text-right pr-4">Swiss typ /</div>
                <div className="text-right pr-4">aming /</div>
              </div>
            </div>

            {/* Inset Image */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-40 bg-gray-200 z-20 shadow-2xl transition-transform group-hover:-translate-y-4">
              <img 
                src="https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                alt="Yellow book" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#f0ff00] text-black p-6 relative overflow-hidden h-[300px] md:h-full flex flex-col justify-between cursor-pointer">
             {/* Top tiny nav */}
             <div className="flex justify-between text-[8px] text-black/50 uppercase z-20 w-full">
               <span>Centrix</span>
               <div className="flex gap-4"><span>Home</span><span>Pages</span><span>Portfolio</span><span>Blog</span><span>Contact</span></div>
               <div className="flex gap-2"><span>In</span><span>Tw</span><span>Be</span></div>
            </div>

            <div className="mt-8 flex flex-col justify-between h-full pb-4 relative z-10">
               {/* Circular Logo */}
               <div className="w-12 h-12 rounded-full border border-black flex items-center justify-center text-black mb-8 relative">
                <span className="text-lg font-bold">C.</span>
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite] opacity-70">
                  <path id="curve2" d="M 50 10 A 40 40 0 1 1 49.9 10" fill="transparent" />
                  <text className="text-[11px] uppercase tracking-widest" fill="black">
                    <textPath href="#curve2">Centrix • Creative • Agency •</textPath>
                  </text>
                </svg>
              </div>

              {/* Main Text */}
              <div className="text-right flex flex-col items-end w-full">
                <h3 className="text-[2.75rem] font-bold leading-[0.9] tracking-tighter text-[#111]">
                  DESIGN<br/>
                  & ENGINE<br/>
                  —ERIGNG
                </h3>
              </div>
              
              {/* Bottom icons */}
              <div className="absolute bottom-0 left-0 flex items-center justify-between w-full mt-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                  <path d="M5 5 L19 19" />
                  <path d="M9 19 L19 19 L19 9" />
                </svg>
                
                <div className="w-8 h-8 rounded-full border border-black flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.59-9.21L21.5 8" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
