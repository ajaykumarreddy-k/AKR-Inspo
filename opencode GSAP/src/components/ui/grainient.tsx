import React, { useMemo } from 'react';

interface GrainientProps {
  timeSpeed?: number;
  colorBalance?: number;
  warpStrength?: number;
  warpFrequency?: number;
  warpSpeed?: number;
  warpAmplitude?: number;
  blendAngle?: number;
  blendSoftness?: number;
  rotationAmount?: number;
  noiseScale?: number;
  grainAmount?: number;
  grainScale?: number;
  grainAnimated?: boolean;
  contrast?: number;
  gamma?: number;
  saturation?: number;
  centerX?: number;
  centerY?: number;
  zoom?: number;
  color1?: string;
  color2?: string;
  color3?: string;
  className?: string;
}

const Grainient: React.FC<GrainientProps> = ({
  color1 = '#ffffff',
  color2 = '#EF4444',
  color3 = '#0061ff',
  className = '',
  timeSpeed = 0.25,
  grainAmount = 0.1,
  // Accept and safely ignore WebGL specific props
  ...rest
}) => {
  const gradientStyle = useMemo(() => {
    return {
      background: `radial-gradient(circle at 10% 20%, ${color3} 0%, transparent 50%),
                   radial-gradient(circle at 90% 80%, ${color2} 0%, transparent 50%),
                   radial-gradient(circle at 50% 50%, ${color1} 0%, transparent 70%),
                   #050505`,
      animation: `spin ${20 / Math.max(timeSpeed, 0.01)}s ease-in-out infinite alternate`,
      filter: 'blur(40px)',
      width: '100%',
      height: '100%',
    };
  }, [color1, color2, color3, timeSpeed]);

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`.trim()}>
      <div className="absolute inset-0 z-0 origin-center scale-[1.5]" style={gradientStyle} />
      
      {/* SVG Grain Overlay */}
      <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" style={{ opacity: Math.max(grainAmount, 0.15), mixBlendMode: 'overlay' }}>
        <filter id="grain-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 1 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>
      
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg) scale(1.5); }
          33% { transform: rotate(120deg) scale(1.8) translate(5%, 5%); }
          66% { transform: rotate(240deg) scale(1.6) translate(-5%, -5%); }
          100% { transform: rotate(360deg) scale(1.5); }
        }
      `}</style>
    </div>
  );
};

export default Grainient;
