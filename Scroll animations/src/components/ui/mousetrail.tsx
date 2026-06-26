import React from 'react';

export default function ImageMouseTrail({ items, children, className, id, style }: any) {
  return (
    <div className={`border border-dashed border-zinc-500 p-4 rounded-md text-center bg-zinc-800/50 relative ${className || ''}`} id={id} style={style}>
      <p className="text-zinc-400 text-sm mb-2">[Mocked] ImageMouseTrail ({items?.length} items)</p>
      {children}
    </div>
  );
}
