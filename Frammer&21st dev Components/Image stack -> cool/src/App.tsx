import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CARD_DATA = [
  {
    id: 'cosmos',
    title: 'COSMOS®',
    bgClass: 'bg-[#111111] text-white',
    content: (
      <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden">
        {/* Abstract shapes to mimic the cosmos image */}
        <div className="absolute w-[150%] h-[150%] opacity-40 pointer-events-none flex items-center justify-center">
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg"
                    style={{
                        width: Math.random() * 60 + 20,
                        height: Math.random() * 60 + 20,
                        // Position them roughly in a ring
                        left: `calc(50% + ${Math.cos((i / 12) * Math.PI * 2) * (Math.random() * 100 + 100)}px)`,
                        top: `calc(50% + ${Math.sin((i / 12) * Math.PI * 2) * (Math.random() * 80 + 80)}px)`,
                        transform: `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`,
                        borderRadius: Math.random() > 0.5 ? '4px' : '50%',
                    }}
                    animate={{
                        rotate: [0, Math.random() * 360 * (Math.random() > 0.5 ? 1 : -1)],
                    }}
                    transition={{
                        duration: Math.random() * 20 + 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    {/* Inner detail for some shapes */}
                    {Math.random() > 0.7 && (
                        <div className="absolute inset-2 border border-white/30 rounded-sm" />
                    )}
                </motion.div>
            ))}
        </div>
        <h2 className="text-4xl md:text-6xl font-medium tracking-tight z-10 font-google-sans" style={{ letterSpacing: '-0.02em' }}>
            COSMOS<sup className="text-xl md:text-2xl font-light ml-1">©</sup>
        </h2>
      </div>
    )
  },
  {
    id: 'blue-glow',
    title: 'Blue Glow',
    bgClass: 'bg-[#1a1a1a]',
    content: (
      <div className="absolute inset-0 flex items-start justify-center pt-8 overflow-hidden">
        <div className="w-32 h-32 bg-blue-600 rounded-full blur-[40px] opacity-80 mix-blend-screen" />
        <div className="absolute top-0 w-full h-full bg-gradient-to-b from-transparent to-[#1a1a1a] opacity-80" />
      </div>
    )
  },
  {
    id: 'minimal-sand',
    title: 'Minimalist Sand',
    bgClass: 'bg-[#e3d7c7]',
    content: (
      <div className="absolute inset-0 flex items-center justify-center">
         <div className="w-full h-1/2 bg-white/20 backdrop-blur-md mt-auto border-t border-white/40" />
      </div>
    )
  },
  {
    id: 'dark-grey',
    title: 'Dark Grey',
    bgClass: 'bg-[#333333]',
    content: (
       <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-2 border-white/10" />
       </div>
    )
  },
  {
    id: 'light-grey',
    title: 'Light UI',
    bgClass: 'bg-[#e5e5e5]',
    content: (
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex space-x-2 opacity-50">
        <div className="w-1.5 h-1.5 rounded-full bg-black/40" />
        <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
        <div className="w-1.5 h-1.5 rounded-full bg-black/40" />
      </div>
    )
  },
  {
    id: 'dots-pattern',
    title: 'Dots',
    bgClass: 'bg-[#f4f4f4]',
    content: (
       <div className="absolute top-4 left-1/2 -translate-x-1/2 flex space-x-4 opacity-20">
        {[...Array(7)].map((_, i) => (
           <div key={i} className="w-2 h-2 rounded-full bg-black" />
        ))}
      </div>
    )
  }
];

const CardStack = ({ items, offset = 14, scaleFactor = 0.05 }) => {
  const [cards, setCards] = useState(items);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);

  // Auto-cycle disabled for a more interactive feel based on the prompt's simplicity request
  // but keeping the logic in case it's needed later.
  useEffect(() => {
    let intervalId;
    if (!isHovering) {
      intervalId = setInterval(() => {
        handleCardClick(cards[0].id);
      }, 4000); // Faster cycle
    }
    return () => clearInterval(intervalId);
  }, [cards, isHovering]);

  const handleCardClick = (clickedId) => {
    setCards((prevCards) => {
      const cardIndex = prevCards.findIndex((card) => card.id === clickedId);
      if (cardIndex === -1) return prevCards;
      
      // If clicking the top card, move it to the back
      if (cardIndex === 0) {
        const newArray = [...prevCards];
        const topCard = newArray.shift();
        newArray.push(topCard);
        return newArray;
      }
      
      // If clicking a background card, bring it to the front
      const newArray = [...prevCards];
      const clickedCard = newArray.splice(cardIndex, 1)[0];
      newArray.unshift(clickedCard);
      return newArray;
    });
  };

  return (
    <div 
      className="relative w-full max-w-4xl mx-auto h-[500px] flex items-center justify-center perspective-[1200px]"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      ref={containerRef}
    >
      <div className="relative w-full max-w-[800px] aspect-[21/9]">
        <AnimatePresence initial={false}>
          {cards.map((card, index) => {
             // Calculate reverse index for z-index and styling
            const reverseIndex = index;
            const isTop = index === 0;

            // Spring configuration matching Framer's feel
            const springConfig = {
                type: "spring",
                stiffness: 260,
                damping: 20,
                mass: 1,
            };

            return (
              <motion.div
                key={card.id}
                layoutId={`card-${card.id}`}
                onClick={() => handleCardClick(card.id)}
                className={`
                  absolute top-0 left-0 w-full h-full 
                  rounded-[24px] sm:rounded-[32px] 
                  overflow-hidden cursor-pointer
                  transition-colors duration-300
                  ${card.bgClass}
                `}
                initial={{ 
                  opacity: 0, 
                  y: -40,
                  scale: 1 - reverseIndex * scaleFactor,
                  zIndex: cards.length - reverseIndex
                }}
                animate={{
                  opacity: 1,
                  // Y offset moves cards UP (negative y) to stack them visually behind
                  y: -reverseIndex * offset,
                  // Scale them down as they go back
                  scale: 1 - reverseIndex * scaleFactor,
                  zIndex: cards.length - reverseIndex,
                  
                  // Interaction effects on hover for the top card
                  rotateX: isTop && isHovering ? 2 : 0,
                  
                  // Shadows: stronger for the top card, softer for those behind
                  boxShadow: isTop 
                    ? '0 30px 60px -12px rgba(0, 0, 0, 0.4), 0 18px 36px -18px rgba(0, 0, 0, 0.3)' 
                    : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    
                  // Darken cards as they go further back in the stack
                  filter: `brightness(${1 - reverseIndex * 0.08})`,
                }}
                exit={{ 
                  opacity: 0,
                  scale: 0.95,
                  y: 40,
                  transition: { duration: 0.2 }
                }}
                transition={{
                  ...springConfig,
                  // Stagger the animation slightly for a "deck dealing" effect
                  delay: isTop ? 0 : 0.015 * reverseIndex
                }}
                style={{
                  transformOrigin: 'top center',
                }}
              >
                {/* Content wrapper */}
                <div className={`w-full h-full relative ${isTop ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                  {card.content}
                  
                  {/* Subtle inner shadow/border for depth */}
                  <div className="absolute inset-0 rounded-[24px] sm:rounded-[32px] border border-white/5 pointer-events-none" />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Product+Sans:wght@300;400;500;700&display=swap');
          
          .font-google-sans {
            font-family: 'Product Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          }
        `}
      </style>
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden font-google-sans">
        <div className="w-full max-w-6xl mx-auto space-y-12">
          
          {/* Main Card Stack Component */}
          <div className="pt-32 pb-20">
            {/* 
          i    Tuning parameters for the stack:
              offset: how far up each card moves
              scaleFactor: how much each card shrinks
            */}
            <CardStack items={CARD_DATA} offset={22} scaleFactor={0.06} />
          </div>

        </div>
      </div>
    </>
  );
}
