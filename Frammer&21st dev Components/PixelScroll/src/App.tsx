import React from 'react';
import PixelScrollTransition from './PixelScrollTransition';

function App() {
  return (
    <div style={{ width: '100%', margin: 0, padding: 0 }}>
      {/* Top Section: White background */}
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#ffffff', 
        color: '#000000' 
      }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 400, letterSpacing: '-0.02em' }}>
          Keep scrolling
        </h1>
      </div>

      {/* Transition Section */}
      <div style={{ height: '150vh', width: '100%' }}>
        <PixelScrollTransition 
          pixelSize={28}
          gap={0}
          endAt={0.9}
          direction="bottom-top"
          pattern="random"
          easing="linear"
          revealMode="colors"
          fromColor="#ffffff"
          toColor="#000000"
          accentShare={0.06}
          accentColorA="#FF4D6D"
          accentColorB="#00D1FF"
          accentColorC="#FFE047"
          accentColorD="#7CFF6B"
          jitter={0.25}
          feather={0.05}
          smoothing={0.5}
        />
      </div>

      {/* Bottom Section: Black background */}
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#000000', 
        color: '#ffffff' 
      }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 400, letterSpacing: '-0.02em' }}>
          Scroll up to see the pixel effect
        </h1>
      </div>
    </div>
  );
}

export default App;
