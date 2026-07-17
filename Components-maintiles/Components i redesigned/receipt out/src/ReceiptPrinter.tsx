import React, { useState, useEffect } from 'react';
import { RefreshCcw } from 'lucide-react';

const ReceiptPrinter = () => {
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPrinting(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleReplay = () => {
    setIsPrinting(false);
    setTimeout(() => {
      setIsPrinting(true);
    }, 100);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#d1d1d1] via-[#a3a3a3] to-[#6b6b6b] relative overflow-hidden selection:bg-purple-200">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&family=PT+Serif:ital,wght@1,700&display=swap');
        .pixel-font {
          font-family: 'VT323', monospace;
        }
        .serif-italic {
          font-family: 'PT Serif', serif;
          font-style: italic;
          font-weight: 700;
        }
      `}</style>
      
      {/* Background depth overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/20 pointer-events-none"></div>

      {/* Main Container */}
      <div className="relative z-10 w-[450px] flex flex-col items-center mt-[-40px]">
        
        {/* Printer Slot Top Plate */}
        <div className="relative w-full h-24 bg-gradient-to-b from-[#fdfdfd] to-[#dedede] rounded-[14px] shadow-[0_20px_40px_rgba(0,0,0,0.3),inset_0_2px_5px_rgba(255,255,255,1),inset_0_-2px_5px_rgba(0,0,0,0.05)] z-30 flex items-center justify-center">
          {/* Inner Slot */}
          <div className="w-[85%] h-4 bg-[#1a1a1a] rounded-full shadow-[inset_0_4px_8px_rgba(0,0,0,1),0_1px_1px_rgba(255,255,255,0.8)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-black opacity-90"></div>
          </div>
        </div>

        {/* Wrapper for the receipt (handles clipping) */}
        <div className="relative w-[81%] -mt-8 z-20 overflow-hidden" style={{ height: '580px' }}>
          
          {/* The Receipt Paper */}
          <div 
            className={`
              absolute top-0 left-0 w-full bg-[#ffffff] 
              flex flex-col transition-transform duration-[3000ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]
              ${isPrinting ? 'translate-y-0' : '-translate-y-[100%]'}
            `}
            style={{ 
              minHeight: '520px',
              boxShadow: '0 25px 35px -5px rgba(0,0,0,0.3), inset 6px 0 15px -8px rgba(0,0,0,0.1), inset -6px 0 15px -8px rgba(0,0,0,0.1)' 
            }}
          >
            {/* Top inner shadow for depth exiting the slot */}
            <div className="w-full h-8 bg-gradient-to-b from-[rgba(0,0,0,0.4)] to-transparent absolute top-0 left-0 z-10 pointer-events-none"></div>

            <div className="pt-20 pb-8 px-10 flex-grow flex flex-col relative z-0">
              
              {/* Main Title */}
              <div className="text-center mb-5">
                <h1 className="text-[34px] pixel-font tracking-widest text-[#1a1a1a] leading-none">
                  COMING UP NEXT
                </h1>
              </div>

              {/* Dashed Line */}
              <div className="w-full border-b-[2px] border-dashed border-[#888] mb-4 opacity-60"></div>

              {/* Date Row */}
              <div className="flex justify-between items-center mb-4 text-[#1a1a1a] pixel-font text-[22px]">
                <span>Date.</span>
                <span>2025.05.27</span>
              </div>

              {/* Dashed Line */}
              <div className="w-full border-b-[2px] border-dashed border-[#888] mb-6 opacity-60"></div>

              {/* Hint Row */}
              <div className="flex justify-between items-center mb-8 text-[#1a1a1a] pixel-font text-[22px]">
                <span>Hint.</span>
                <span>I-KE</span>
              </div>

              {/* Pixel Art Notebook Graphic */}
              <div className="flex justify-center my-6 flex-grow items-center">
                <div className="relative w-[130px] h-[150px]">
                  
                  {/* Bookmark Tag */}
                  <div className="absolute -bottom-8 left-7 z-0">
                    <svg width="28" height="44" viewBox="0 0 28 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 0 V34 L14 24 L26 34 V0" fill="#ffb6c1" stroke="black" strokeWidth="4" strokeLinejoin="round"/>
                      {/* Flower details */}
                      <rect x="10" y="14" width="3" height="3" fill="#d6677a" />
                      <rect x="14" y="14" width="3" height="3" fill="#d6677a" />
                      <rect x="10" y="18" width="3" height="3" fill="#d6677a" />
                      <rect x="14" y="18" width="3" height="3" fill="#d6677a" />
                    </svg>
                  </div>

                  {/* Notebook Base */}
                  <div className="absolute inset-0 bg-[#d1c4e9] border-[3.5px] border-black border-r-[8px] border-b-[8px] rounded-sm z-10 flex items-center justify-center">
                     
                     {/* Pixel Heart */}
                     <div className="relative w-[49px] h-[42px] mt-2 mr-2">
                        {/* 7x6 Grid for heart (7px per cell) */}
                        <div className="grid grid-cols-7 grid-rows-6 gap-0 w-full h-full">
                          {[
                            0,1,1,0,1,1,0,
                            1,0,0,1,0,0,1,
                            1,0,0,0,0,0,1,
                            0,1,0,0,0,1,0,
                            0,0,1,0,1,0,0,
                            0,0,0,1,0,0,0
                          ].map((val, i) => (
                            <div key={i} className={val ? "bg-[#fde047]" : ""}></div>
                          ))}
                        </div>
                        {/* Inner detail pixels */}
                        <div className="absolute top-[14px] left-[14px] w-[7px] h-[7px] bg-[#a78bfa]"></div>
                        <div className="absolute top-[21px] left-[21px] w-[7px] h-[7px] bg-[#a78bfa]"></div>
                        <div className="absolute top-[14px] left-[28px] w-[7px] h-[7px] bg-[#a78bfa]"></div>
                     </div>
                  </div>

                  {/* Spiral binding */}
                  <div className="absolute -left-[5px] top-4 bottom-4 flex flex-col justify-between z-20">
                    {[...Array(7)].map((_, i) => (
                      <div key={i} className="w-[10px] h-[10px] bg-black rounded-[1px]"></div>
                    ))}
                  </div>

                </div>
              </div>

              {/* Footer text and logo */}
              <div className="mt-12 flex justify-center items-center gap-2 pb-4">
                <span className="text-[11px] font-bold tracking-widest text-black font-sans">ONLY IN</span>
                <div className="bg-black text-white px-3 py-[2px] rounded-[100%] flex items-center justify-center scale-y-90">
                  <span className="text-[15px] serif-italic tracking-tighter mt-[1px]">AKR</span>
                </div>
              </div>

            </div>

            {/* Jagged Bottom Edge */}
            <div 
              className="absolute bottom-[-10px] left-0 w-full h-[10px]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='10' viewBox='0 0 20 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 L10 10 L20 0 Z' fill='%23ffffff'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat-x'
              }}
            ></div>
            
          </div>
        </div>
      </div>

      {/* Floating Elements on the Right */}
      <div 
        className={`absolute bottom-16 right-16 flex flex-col items-end gap-5 z-40 transition-all duration-[1500ms] delay-[2000ms] ${isPrinting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        {/* Floating Oval Logo */}
        <div className="bg-white px-7 py-[6px] rounded-[100%] shadow-[0_10px_25px_rgba(0,0,0,0.15)] transform rotate-[-8deg] mr-8 flex items-center justify-center scale-y-90">
          <span className="text-[28px] serif-italic tracking-tighter text-black mt-[2px]">AKR</span>
        </div>
        
        {/* Floating Barcode Tag */}
        <div className="bg-white p-3 shadow-[0_10px_25px_rgba(0,0,0,0.15)] transform rotate-[-5deg] w-56 rounded-sm">
           <div className="h-12 w-full flex gap-[2px]">
              {[...Array(50)].map((_, i) => (
                <div 
                  key={i} 
                  className="h-full bg-black" 
                  style={{ 
                    width: `${Math.max(1, Math.floor(Math.random() * 4))}px`,
                    opacity: Math.random() > 0.6 ? 0 : 1
                  }}
                ></div>
              ))}
           </div>
        </div>
      </div>

      {/* Replay Button */}
      <button 
        onClick={handleReplay}
        className="absolute top-8 right-8 bg-black/5 hover:bg-black/10 text-black p-3 rounded-full backdrop-blur-md transition-all z-50 shadow-sm"
        title="Replay Animation"
      >
        <RefreshCcw size={24} className={!isPrinting ? 'animate-spin' : ''} />
      </button>

    </div>
  );
};

export default ReceiptPrinter;
