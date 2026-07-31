import { useState, useEffect } from 'react';
import DepthTextEffect from "./DepthTextEffect";
import './App.css';

function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="container">
      <DepthTextEffect 
        text="Yolo!" 
        font={{
          fontSize: "280px",
          fontFamily: '"Abril Fatface", cursive',
          letterSpacing: "-0.02em"
        }}
        textColor="#e4e5e6"
        outlineWidth={2}
        outlineColor="#fb0101"
        shadowColor="#fb0101"
        shadowOffset={60}
      />
    </div>
  );
}

export default App;
