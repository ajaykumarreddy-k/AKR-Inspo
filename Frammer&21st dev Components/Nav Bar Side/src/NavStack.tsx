import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { id: 'home', label: 'HOME', title: '', description: '' },
  { id: 'features', label: 'FEATURES', title: 'Features Title', description: 'Features Description' },
  { id: 'pricing', label: 'PRICING', title: 'Pricing Title', description: 'Pricing Description' },
  { id: 'about', label: 'ABOUT', title: 'About Title', description: 'About Description' }
];

const transition1 = { delay: 0, duration: 0.52, ease: [0.44, 0, 0.56, 1], type: "tween" };
const transition2 = { bounce: 0.18, delay: 0, duration: 0.7, type: "spring" };

export default function NavStack() {
  const [activeState, setActiveState] = useState('home');

  const activeItem = navItems.find(i => i.id === activeState);

  return (
    <div className="flex w-full h-screen min-h-[800px] relative justify-center items-end bg-black overflow-hidden">
      
      {/* Active Overlay Panel */}
      <AnimatePresence>
        {activeState !== 'home' && (
          <motion.div
            initial={{ opacity: 0.001, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0.001, scale: 0.95, filter: 'blur(10px)' }}
            transition={transition1}
            className="absolute top-2.5 left-2.5 right-2.5 bottom-2.5 z-10 flex flex-col justify-center items-start p-12 bg-[#2a2a2a]/60 backdrop-blur-[8px] rounded-3xl"
          >
            <motion.div 
              key={activeItem?.id}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={{
                initial: { opacity: 0 },
                animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
                exit: { opacity: 0 }
              }}
              className="flex flex-col gap-4 min-w-[450px]"
            >
              <motion.h2
                variants={{
                  initial: { opacity: 0.001, y: 8, filter: 'blur(4px)' },
                  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { delay: 0.05, duration: 0.52, ease: [0.44, 0, 0.56, 1] } }
                }}
                className="text-[64px] font-light tracking-tight text-white leading-[1.2] font-['Inter']"
              >
                {activeItem?.title}
              </motion.h2>
              <motion.p
                variants={{
                  initial: { opacity: 0.001, y: 6, filter: 'blur(3px)' },
                  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { delay: 0.09, duration: 0.46, ease: [0.44, 0, 0.56, 1] } }
                }}
                className="text-[22px] font-light text-white/80 leading-[1.6] tracking-tight font-['Inter']"
              >
                {activeItem?.description}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* State Content Shell */}
      <div className="absolute inset-0 p-8 flex flex-col items-start justify-start z-20 pointer-events-none">
        <div className="flex flex-col gap-4 pointer-events-auto items-start mt-4 ml-4">
          {navItems.map((item) => (
            <motion.div
              key={item.id}
              onMouseEnter={() => setActiveState(item.id)}
              className={`text-[13px] uppercase font-['Inter'] tracking-wider font-medium cursor-pointer transition-colors duration-300 relative ${
                activeState === item.id || (activeState === 'home' && item.id === 'home') 
                  ? 'text-red-600' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {/* If we wanted to animate the layout similar to Framer we'd use layoutId, but standard hover color works similarly. */}
              {item.label}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Ticker Track */}
      <div className="absolute bottom-0 left-0 right-0 h-[400px] flex items-center z-10 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 15, ease: "linear", repeat: Infinity }}
          className="flex whitespace-nowrap gap-4 opacity-90"
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-[250px] font-black tracking-tighter text-red-600 blur-[8px] leading-none select-none">
              APEX  APEX
            </span>
          ))}
        </motion.div>
      </div>

      {/* Bottom Fade Overlay */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[472px] z-15 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(255, 0, 0, 0.4) 100%)',
        }}
      />
    </div>
  );
}
