import React from 'react';
import PageLoader from './PageLoader';

function App() {
  return (
    <div className="App">
      <PageLoader />
      <main style={{ padding: '2rem', textAlign: 'center', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Welcome to the Site</h1>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>The page loader has finished animating.</p>
      </main>
    </div>
  );
}

export default App;
