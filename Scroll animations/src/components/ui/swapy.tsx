import React from 'react';

export const SwapyLayout = ({ children, className, id, style }: any) => (
  <div className={`border border-dashed border-zinc-500 p-4 rounded-md bg-zinc-800/50 ${className || ''}`} id={id} style={style}>
    <p className="text-zinc-400 text-sm mb-2">[Mocked] SwapyLayout</p>
    {children}
  </div>
);

export const SwapySlot = ({ children, className, id, style }: any) => (
  <div className={`border border-dashed border-zinc-600 p-2 rounded-md bg-zinc-700/50 ${className || ''}`} id={id} style={style}>
    {children}
  </div>
);

export const SwapyItem = ({ children, className, id, style }: any) => (
  <div className={`border border-solid border-zinc-500 p-2 rounded-md bg-zinc-600/50 ${className || ''}`} id={id} style={style}>
    {children}
  </div>
);

export const DragHandle = ({ children, className, id, style }: any) => (
  <div className={`cursor-grab text-zinc-400 ${className || ''}`} id={id} style={style}>
    {children || '::: Drag :::'}
  </div>
);
