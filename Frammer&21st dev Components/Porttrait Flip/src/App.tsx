import React from 'react';
import PolaroidFlipCard from './components/PolaroidFlipCard';

function App() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw'
    }}>
      <div style={{ width: 340, height: 400 }}>
        <PolaroidFlipCard />
      </div>
    </div>
  );
}

export default App;
