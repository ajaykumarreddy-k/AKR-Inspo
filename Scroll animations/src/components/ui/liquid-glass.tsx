import React from 'react';

export const LiquidGlassCard = ({ children, className, id, style }: any) => {
  return (
    <div className={`border border-dashed border-zinc-500 p-4 rounded-md text-center bg-zinc-800/50 backdrop-blur-md ${className || ''}`} id={id} style={style}>
      <p className="text-zinc-400 text-sm mb-2">[Mocked] LiquidGlassCard</p>
      {children}
    </div>
  );
};
