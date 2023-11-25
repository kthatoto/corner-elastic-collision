import { useState } from "react";

import './App.css';
import { useInterval } from "./useInterval";
import { moveCircle } from "./moveCircle";
import { CIRCLE_RADIUS, RECTANGLES } from "./constants";

const App = () => {
  const [position, setPosition] = useState({
    x: CIRCLE_RADIUS + Math.random() * 50,
    y: CIRCLE_RADIUS + Math.random() * 50,
    // x: CIRCLE_RADIUS + 80,
    // y: CIRCLE_RADIUS + 80,
  });
  const [velocity, setVelocity] = useState({
    x: Math.random() * 5,
    y: Math.random() * 5,
    // x: 2,
    // y: 2,
  });

  useInterval(
    () => moveCircle(position, setPosition, velocity, setVelocity),
    10
  );

  return (
    <div className="app">
      <div
        className="circle"
        style={{
          width: CIRCLE_RADIUS * 2,
          height: CIRCLE_RADIUS * 2,
          top: position.y - CIRCLE_RADIUS,
          left: position.x - CIRCLE_RADIUS,
        }}
      />
      {RECTANGLES.map((rect) => (
        <div
          className="rectangle"
          style={{
            top: rect.y,
            left: rect.x,
            width: rect.width,
            height: rect.height,
          }}
        />
      ))}
    </div>
  );
}

export default App;
