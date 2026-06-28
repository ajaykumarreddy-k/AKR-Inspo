import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PageLoader.css';

interface PageLoaderProps {
  heading?: string;
  subtitle?: string;
  transitionColor?: string;
  backgroundColor?: string;
  textColor?: string;
  onComplete?: () => void;
}

const PageLoader: React.FC<PageLoaderProps> = ({
  heading = "BOX STUDIOS",
  subtitle = "[ ESTD 2025 ]",
  transitionColor = "rgb(14, 109, 204)",
  backgroundColor = "rgb(0, 0, 0)",
  textColor = "rgb(0, 0, 0)",
  onComplete,
}) => {
  const [phase, setPhase] = useState<'enter' | 'split' | 'done'>('enter');

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('split');
    }, 1500); 
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase === 'split') {
      const timer = setTimeout(() => {
        setPhase('done');
        if (onComplete) onComplete();
      }, 1000); 
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  if (phase === 'done') return null;

  return (
    <motion.div
      className="page-loader-container"
      initial={{ backgroundColor }}
      animate={{ backgroundColor: phase === 'split' ? 'rgba(0,0,0,0)' : backgroundColor }}
      transition={{ duration: 0.6, ease: [0.44, 0, 0.56, 1] }}
    >
      {/* Top Half */}
      <motion.div
        className="page-loader-half top-half"
        style={{ backgroundColor: transitionColor }}
        initial={{ y: 0 }}
        animate={{ y: phase === 'split' ? '-100%' : 0 }}
        transition={{ duration: 0.6, ease: [0.44, 0, 0.56, 1], delay: 0.2 }}
      >
        <motion.h1
          className="page-loader-text-top"
          style={{ color: textColor }}
          initial={{ opacity: 0.001, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.44, 0, 0.56, 1] }}
        >
          {heading}
        </motion.h1>
      </motion.div>

      {/* Bottom Half */}
      <motion.div
        className="page-loader-half bottom-half"
        style={{ backgroundColor: transitionColor }}
        initial={{ y: 0 }}
        animate={{ y: phase === 'split' ? '100%' : 0 }}
        transition={{ duration: 0.6, ease: [0.44, 0, 0.56, 1], delay: 0.2 }}
      >
        <motion.p
          className="page-loader-text-bottom"
          style={{ color: textColor }}
          initial={{ opacity: 0.001, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.44, 0, 0.56, 1] }}
        >
          {subtitle}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default PageLoader;
