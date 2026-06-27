import React, { useEffect } from 'react';

const NoiseFilter = () => (
  <svg style={{ display: 'none' }}>
    <filter id="noiseFilter">
      <feTurbulence 
        type="fractalNoise" 
        baseFrequency="0.8" 
        numOctaves="3" 
        stitchTiles="stitch" 
      />
      <feColorMatrix 
        type="matrix" 
        values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.15 0" 
      />
      <feComposite operator="in" in2="SourceGraphic" result="monoNoise" />
      <feBlend in="SourceGraphic" in2="monoNoise" mode="multiply" />
    </filter>
  </svg>
);

const ArrowGraphic = ({ className, style }) => (
  <svg viewBox="0 0 180 80" fill="none" className={className} style={style}>
    <circle cx="20" cy="40" r="14" stroke="#222" strokeWidth="6" />
    <line x1="34" y1="40" x2="110" y2="40" stroke="#222" strokeWidth="6" />
    <circle cx="140" cy="40" r="36" fill="#ff7448" filter="url(#noiseFilter)" />
    <path d="M125 25 L145 40 L125 55" stroke="#222" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DotsGraphic = ({ className, style }) => (
  <svg viewBox="0 0 140 40" fill="none" className={className} style={style}>
    <circle cx="20" cy="20" r="18" fill="#4285f4" filter="url(#noiseFilter)" />
    <path d="M60 12 L76 28 M76 12 L60 28" stroke="#222" strokeWidth="6" strokeLinecap="round" />
    <circle cx="120" cy="20" r="18" fill="#34a853" filter="url(#noiseFilter)" />
  </svg>
);

const CapsuleGraphic = ({ className, style }) => (
  <svg viewBox="0 0 200 100" fill="none" className={className} style={style}>
    <path d="M50 0 H150 A50 50 0 0 1 200 50 A50 50 0 0 1 150 100 H0 L25 50 L0 0 Z" fill="#fbbc05" filter="url(#noiseFilter)" />
    <circle cx="60" cy="50" r="30" fill="#ff7448" filter="url(#noiseFilter)" />
    <line x1="30" y1="50" x2="140" y2="50" stroke="#222" strokeWidth="6" strokeDasharray="8 6" />
    <circle cx="30" cy="50" r="4" fill="#222" />
    <circle cx="140" cy="50" r="16" stroke="#222" strokeWidth="6" fill="white" />
  </svg>
);

const HalfCirclesGraphic = ({ className, style }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className} style={style}>
    <path d="M45 10 A40 40 0 0 0 45 90 V10 Z" fill="#b062c8" filter="url(#noiseFilter)" />
    <path d="M55 10 A40 40 0 0 1 55 90 V10 Z" fill="#34a853" filter="url(#noiseFilter)" />
  </svg>
);

const TrianglesGraphic = ({ className, style }) => (
  <svg viewBox="0 0 120 100" fill="none" className={className} style={style}>
    {/* Right triangle pointing bottom-left */}
    <path d="M50 0 H0 L50 100 Z" fill="#ff7448" filter="url(#noiseFilter)" />
    {/* Right triangle pointing bottom-left */}
    <path d="M60 0 H120 V100 Z" fill="#4285f4" filter="url(#noiseFilter)" />
  </svg>
);

const UpRightArrow = ({ className, style }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} style={style}>
    <path d="M8 32 L32 8 M16 8 H32 V24 M8 38 H32" stroke="#222" strokeWidth="5" strokeLinecap="square" strokeLinejoin="miter" />
  </svg>
);

const AtomIcon = ({ className, style }) => (
  <svg viewBox="0 0 32 32" fill="none" className={className} style={style}>
    <ellipse cx="16" cy="16" rx="6" ry="14" stroke="#222" strokeWidth="2" transform="rotate(45 16 16)" />
    <ellipse cx="16" cy="16" rx="6" ry="14" stroke="#222" strokeWidth="2" transform="rotate(-45 16 16)" />
    <ellipse cx="16" cy="16" rx="6" ry="14" stroke="#222" strokeWidth="2" transform="rotate(90 16 16)" />
    <circle cx="16" cy="16" r="3" fill="#222" />
  </svg>
);

export default function App() {
  useEffect(() => {
    // Inject Tailwind
    if (!document.getElementById('tailwind-static-css')) {
      const link = document.createElement('link');
      link.id = 'tailwind-static-css';
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css';
      document.head.appendChild(link);
    }
    // Inject custom geometric font to match the reference's bold typography
    if (!document.getElementById('google-fonts')) {
      const fontLink = document.createElement('link');
      fontLink.id = 'google-fonts';
      fontLink.rel = 'stylesheet';
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800&display=swap';
      document.head.appendChild(fontLink);
    }
  }, []);

  return (
    <div 
      className="min-h-screen overflow-hidden relative flex justify-center items-center p-4 md:p-8"
      style={{ 
        backgroundColor: '#faf9f8', 
        color: '#222',
        fontFamily: "'Plus Jakarta Sans', sans-serif" 
      }}
    >
      <style>
        {`
          ::selection { background-color: #ff7448; color: white; }
          ::-moz-selection { background-color: #ff7448; color: white; }
          .hero-text { font-weight: 800; letter-spacing: -0.04em; color: #1a1a1a; }
        `}
      </style>

      {/* Background Gradient Effect */}
      <div 
        className="absolute top-0 left-0 pointer-events-none" 
        style={{ 
          width: 800, 
          height: 800, 
          background: 'radial-gradient(circle at top left, rgba(255,180,136,0.3) 0%, transparent 70%)', 
          opacity: 0.8, 
          mixBlendMode: 'multiply' 
        }} 
      />

      {/* Main Container */}
      <div 
        className="w-full rounded-2xl border relative overflow-hidden flex flex-col shadow-xl" 
        style={{ 
          maxWidth: 1400, 
          minHeight: '85vh', 
          backgroundColor: '#fdfdfc',
          borderColor: 'rgba(229,231,235,0.5)',
        }}
      >
        <NoiseFilter />

        {/* Navigation */}
        <nav className="flex justify-between items-center p-8 lg:px-12 border-b relative z-10" style={{ borderColor: 'rgba(229,231,235,0.6)' }}>
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold tracking-tight">DSM</span>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#ff7448' }}></div>
          </div>
          <div className="flex items-center gap-6">
            <button className="hover:opacity-60 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            <button className="hover:opacity-60 transition-opacity">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
              </svg>
            </button>
          </div>
        </nav>

        {/* Main Content Area - Scrollable horizontally on small screens to preserve the layout */}
        <main className="flex-1 relative w-full h-full p-8 lg:p-12 z-10 flex items-center overflow-x-auto">
          
          {/* Fixed Bounding Box to prevent wrapping and breaking */}
          <div className="mx-auto flex flex-col relative" style={{ width: 1000, paddingBottom: '40px' }}>
            
            {/* ROW 1: o--> build ^. */}
            <div className="flex items-center" style={{ gap: '2rem' }}>
              <ArrowGraphic style={{ width: 160, height: 80, marginLeft: '-10px' }} />
              <h1 className="hero-text leading-none" style={{ fontSize: 130 }}>
                build
              </h1>
              <UpRightArrow style={{ width: 45, height: 45, marginTop: '10px' }} />
              <DotsGraphic style={{ width: 120, height: 40, marginTop: '10px' }} />
            </div>

            {/* ROW 2: beautiful (Capsule) */}
            <div className="flex items-center" style={{ gap: '3rem', marginTop: '-1rem' }}>
              <h1 className="hero-text leading-none" style={{ fontSize: 130 }}>
                beautiful
              </h1>
              <CapsuleGraphic style={{ width: 260, height: 130 }} />
            </div>

            {/* ROW 3 & 4 Layout Setup (Two Columns) */}
            <div className="flex mt-8">
              
              {/* Left Column: Description & Button */}
              <div className="flex flex-col items-start pt-4" style={{ width: 340 }}>
                <p className="text-sm font-medium leading-relaxed mb-8" style={{ color: '#6b7280' }}>
                  DSM is an <span style={{ color: '#34a853', fontWeight: 700 }}>{'{ open source }'}</span><br/>
                  project that celebrates<br/>
                  internal and external<br/>
                  contributions *
                </p>
                <button 
                  className="text-white px-6 py-4 rounded-sm font-semibold flex items-center gap-3 transition-colors group text-sm"
                  style={{ backgroundColor: '#1a1a1a' }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#000'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1a1a1a'}
                >
                  Download
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-y-1 transition-transform">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <polyline points="19 12 12 19 5 12"></polyline>
                  </svg>
                </button>
              </div>

              {/* Right Column: product faster & remaining graphics */}
              <div className="flex-1 flex flex-col relative">
                
                {/* ROW 3: (Half Circles) product */}
                <div className="flex items-center" style={{ gap: '1.5rem', marginLeft: '-2rem' }}>
                  <HalfCirclesGraphic style={{ width: 80, height: 80 }} />
                  <h1 className="hero-text leading-none" style={{ fontSize: 130 }}>
                    product
                  </h1>
                </div>

                {/* ROW 4: faster (Triangles) (Atom) */}
                <div className="flex items-end mt-2">
                  <div className="relative">
                    <h1 className="hero-text" style={{ fontSize: 130, lineHeight: 0.85 }}>
                      faster
                      <span className="align-baseline" style={{ fontSize: 40, marginLeft: '4px' }}>.</span>
                    </h1>
                    {/* Thick underline for faster */}
                    <div className="absolute left-0 rounded-full" style={{ bottom: '-20px', width: '100%', height: 14, backgroundColor: '#1a1a1a' }}></div>
                  </div>
                  
                  <AtomIcon style={{ width: 35, height: 35, marginLeft: '8px', marginBottom: '8px' }} />
                  
                  <TrianglesGraphic style={{ width: 130, height: 110, marginLeft: '3rem' }} />
                </div>

              </div>
            </div>

          </div>
        </main>

        {/* Bottom Right Icon */}
        <div className="absolute bottom-6 right-6 text-gray-400">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
            <path d="M3 3v5h5"></path>
            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
            <path d="M16 21v-5h5"></path>
          </svg>
        </div>

      </div>
    </div>
  );
}