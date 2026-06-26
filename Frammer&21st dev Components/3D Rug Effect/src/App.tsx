import ThreeDRugEffect from "./components/ThreeDRugEffect";

export default function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        fontFamily: "'Google Sans', 'Google Sans Text', Inter, system-ui, sans-serif",
        letterSpacing: "-0.02em",
      }}
    >
      <ThreeDRugEffect />
    </div>
  );
}
