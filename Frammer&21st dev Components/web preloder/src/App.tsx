import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  {
    id: 1,
    src: 'https://framerusercontent.com/images/pE1kDlzZIQL08N7do8peogJ2ZQ.jpg',
    left: '25%',
    top: '37.5%',
    initialRotate: -2,
    finalRotate: -10,
    delay: 0,
    initialY: 480,
  },
  {
    id: 2,
    src: 'https://framerusercontent.com/images/cKvzUgY1xOODK7lAFkV2q5SrI4.png',
    left: '50%',
    top: '18.5%',
    initialRotate: 0,
    finalRotate: 0,
    delay: 0.2,
    initialY: 680,
  },
  {
    id: 3,
    src: 'https://framerusercontent.com/images/yqgeFlsSXib7Trr10tG9EsBXhM.png',
    left: '75%',
    top: '37.5%',
    initialRotate: 2,
    finalRotate: 10,
    delay: 0.4,
    initialY: 480,
  },
  {
    id: 4,
    src: 'https://framerusercontent.com/images/wbrWTnwMksIfSq6mqrHJeGkabWg.png',
    left: '31.25%',
    top: '74.8%',
    initialRotate: -5,
    finalRotate: 10,
    delay: 0.6,
    initialY: 360,
  },
  {
    id: 5,
    src: 'https://framerusercontent.com/images/2aKuT0roruNaxlaUN4NUiRIU.png',
    left: '68.75%',
    top: '74.8%',
    initialRotate: 5,
    finalRotate: -10,
    delay: 0.8,
    initialY: 360,
  },
];

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 2.5 seconds + 1.8 seconds max animation duration = ~4.3 seconds total
    // But we want it to start moving up after a bit. Let's say at 3.5s it slides up.
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-50 text-black">
      {/* Main Content behind the preloader */}
      <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-zinc-900 text-white">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-center"
        >
          Welcome to the Future
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-xl md:text-2xl text-zinc-400 max-w-2xl text-center"
        >
          The preloader has successfully animated out of view.
        </motion.p>
      </div>

      {/* Pre-loader overlay */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            key="preloader"
            initial={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-white"
          >
            <motion.div
              exit={{ filter: 'blur(8px)', opacity: 0 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              className="relative w-full max-w-7xl h-full flex items-center justify-center"
            >
              {images.map((img) => (
                <motion.div
                  key={img.id}
                  initial={{ 
                    opacity: 0, 
                    rotate: img.initialRotate,
                    x: '-50%',
                    y: `calc(-50% + ${img.initialY}px)`
                  }}
                  animate={{ 
                    opacity: 1, 
                    rotate: img.finalRotate,
                    x: '-50%',
                    y: '-50%'
                  }}
                  transition={{ 
                    delay: img.delay, 
                    duration: 1.8, 
                    ease: [0.8, 0.2, 0.2, 0.8] 
                  }}
                  className="absolute w-[140px] h-[160px] sm:w-[180px] sm:h-[200px] rounded-[10px] shadow-[0px_4px_16px_2px_rgba(0,0,0,0.15)] overflow-hidden"
                  style={{
                    left: img.left,
                    top: img.top,
                  }}
                >
                  <img 
                    src={img.src} 
                    alt={`Preloader image ${img.id}`} 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 'calc(-50% + 600px)', x: '-50%' }}
                animate={{ opacity: 1, y: '-50%', x: '-50%' }}
                transition={{ delay: 1.3, duration: 1.8, ease: [0.8, 0.2, 0.2, 0.8] }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              >
                <h2 className="instrument-serif-italic text-4xl sm:text-5xl md:text-6xl lg:text-[72px] whitespace-nowrap text-zinc-900 tracking-tight" style={{ fontSize: 'var(--framer-font-size, 44px)' }}>
                  Pre Studio
                </h2>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
