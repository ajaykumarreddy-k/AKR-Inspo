import { useState, useCallback } from 'react';
import { motion, Variants } from 'framer-motion';
import { ShieldAlert, FileKey } from 'lucide-react';

const paperVariants: Variants = {
  closed: {
    x: 0,
    y: 0,
    rotateZ: 0,
    rotateY: 0,
    z: 0,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    transition: { type: "spring", bounce: 0.2, duration: 0.8 }
  },
  hovered: {
    x: 0,
    y: 0,
    rotateZ: 6,
    rotateY: 0,
    z: 0,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    transition: { type: "spring", bounce: 0.2, duration: 0.8 }
  },
  open: {
    x: 320,
    y: -10,
    rotateZ: -7,
    rotateY: 180,
    z: 50,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0,0,0,0.1)',
    transition: { type: "spring", bounce: 0.2, duration: 1.2 }
  }
};

const coverVariants: Variants = {
  closed: { rotateY: 0, z: 2 },
  hovered: { rotateY: -45, z: 2 },
  open: { rotateY: -45, z: 2 }
};

export const DocumentFolder = () => {
  const [state, setState] = useState<'closed' | 'hovered' | 'open'>('closed');

  const handleMouseEnter = useCallback(() => {
    setState((prev) => (prev === 'closed' ? 'hovered' : prev));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setState((prev) => (prev === 'hovered' ? 'closed' : prev));
  }, []);

  const handleClick = useCallback(() => {
    setState((prev) => (prev === 'open' ? 'closed' : 'open'));
  }, []);

  return (
    <div 
      className="relative w-[318px] h-[398px] cursor-pointer preserve-3d select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ perspective: 1200 }}
    >
      {/* Folder Back */}
      <div 
        className="absolute inset-0 bg-[#335db0] rounded-[20px] shadow-2xl preserve-3d"
        style={{ border: '1px solid rgba(0,0,0,0.1)', transform: 'translateZ(-2px)' }}
      />
      
      {/* Document (Paper) */}
      <motion.div
        className="absolute w-[267px] h-[333px] bg-white rounded-[20px] preserve-3d flex items-center justify-center p-8 will-change-transform"
        initial={false}
        variants={paperVariants}
        animate={state}
        style={{
          top: '50%',
          left: '50%',
          marginTop: '-166.5px', // half of 333
          marginLeft: '-133.5px', // half of 267
        }}
      >
        {/* Paper Front (DO NOT OPEN) */}
        <div className="absolute inset-0 flex items-center justify-center bg-white rounded-[20px] backface-hidden preserve-3d border border-zinc-200 shadow-inner">
           <p className="font-mono text-zinc-900 tracking-[0.3em] font-bold rotate-90 text-2xl opacity-80 mix-blend-multiply">
             DO NOT OPEN
           </p>
           
           {/* Subtle texture or watermark can go here */}
           <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
        </div>

        {/* Paper Back (Classified Message) */}
        <div 
          className="absolute inset-0 bg-white rounded-[20px] backface-hidden flex flex-col p-8 items-start text-left preserve-3d border border-zinc-200 shadow-inner"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="flex items-center gap-2 mb-6 text-red-600 border-b border-red-100 pb-4 w-full">
             <ShieldAlert size={24} />
             <span className="font-mono font-bold text-sm tracking-widest uppercase">Top Secret</span>
          </div>
          
          <div className="space-y-4 text-[13px] text-zinc-800 leading-relaxed font-sans">
            <p className="font-semibold text-zinc-900">
              This document is classified and intended solely for authorized personnel.
            </p>
            <p className="text-zinc-600">
              Access without proper clearance is strictly prohibited and may lead to serious consequences.
            </p>
            <div className="h-4" />
            <p className="font-medium">
              By continuing, you acknowledge that you understand the sensitivity of the material and agree to handle it responsibly.
            </p>
          </div>
          
          <div className="flex-1" />
          
          <p className="text-[12px] text-zinc-400 font-mono italic">
            ...You really don't follow instructions, do you?
          </p>
        </div>
      </motion.div>

      {/* Folder Cover */}
      <motion.div
        className="absolute inset-0 rounded-[20px] preserve-3d flex flex-col justify-between p-8 will-change-transform"
        style={{
          background: "linear-gradient(180deg, rgb(51, 108, 220) 0%, rgb(40, 89, 189) 100%)",
          boxShadow: "inset 0px 3px 2px 0px rgba(255, 255, 255, 0.2), 5px 0px 15px rgba(0,0,0,0.2)",
          transformOrigin: 'left center',
        }}
        variants={coverVariants}
        initial={false}
        animate={state}
        transition={{ type: "spring", bounce: 0.15, duration: 0.8 }}
      >
        {/* Decorative Badge */}
        <div className="preserve-3d" style={{ transform: 'translateZ(1px)' }}>
          <div className="bg-white/10 p-3 rounded-full inline-block backdrop-blur-sm border border-white/20">
            <FileKey size={28} className="text-white" />
          </div>
        </div>

        {/* Cover Content (CONFIDENTIAL FILES) */}
        <div className="flex flex-col gap-1 preserve-3d" style={{ transform: 'translateZ(1px)' }}>
          <p className="font-mono text-white text-base font-bold tracking-widest drop-shadow-md">
            CONFIDENTIAL FILES
          </p>
          <p className="font-sans text-white/70 text-xs tracking-wider uppercase font-medium">
            Internal use only
          </p>
        </div>
      </motion.div>
    </div>
  );
};
