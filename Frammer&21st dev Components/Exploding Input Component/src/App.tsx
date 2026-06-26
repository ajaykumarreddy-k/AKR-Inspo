import ExplodingInput from "./components/ExplodingInput";
import "./styles/globals.css";

export default function App() {
  return (
    <div className="demo-page">
      <h1 className="demo-title">Exploding Input</h1>
      <p className="demo-subtitle">Type something to see the magic</p>
      <div className="demo-form">
        <label className="input-label">
          <input
            className="demo-input"
            type="text"
            placeholder="Start typing..."
            autoFocus
          />
          <ExplodingInput
            mode="components"
            content={[
              <div
                key="1"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                }}
              />,
              <div
                key="2"
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #f093fb, #f5576c)",
                }}
              />,
              <div
                key="3"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "linear-gradient(135deg, #4facfe, #00f2fe)",
                }}
              />,
              <div
                key="4"
                style={{
                  width: 30,
                  height: 30,
                  clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                  background: "linear-gradient(135deg, #43e97b, #38f9d7)",
                }}
              />,
            ]}
            count={3}
            direction={{ horizontal: "right", vertical: "bottom" }}
            gravity={0.7}
            duration={1.5}
            scale={{ value: 1, randomize: true, randomVariation: 30 }}
            rotation={{ value: 0, animate: true }}
          />
        </label>
      </div>
      <p className="demo-hint">Particles explode from your cursor as you type</p>
    </div>
  );
}
