import PixelHoverGrid from './PixelHoverGrid'

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, overflow: 'hidden' }}>
      <PixelHoverGrid 
        gridSize={120}
        hoverColor="#00FF00"
        hoverColor2="#00FF00"
        hoverColor3="#00FF00"
        hoverColor4="#00FF00"
        backgroundColor="#FFFFFF"
        borderColor="#F0F0F0"
        showCursor={false}
      />
    </div>
  )
}

export default App
