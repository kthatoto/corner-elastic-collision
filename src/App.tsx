import { useState } from "react";

import './App.css';
import { useInterval } from "./useInterval";
import { moveCircle } from "./moveCircle";
import { CIRCLE_RADIUS, RECTANGLES } from "./constants";

const App = () => {
  const [position, setPosition] = useState({
    x: CIRCLE_RADIUS + Math.random() * 50,
    y: CIRCLE_RADIUS + Math.random() * 50,
  });
  const [velocity, setVelocity] = useState({
    x: Math.random() * 5,
    y: Math.random() * 5,
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
      {RECTANGLES.map((rectangle) => (
        <div
          className="rectangle"
          style={{
            top: rectangle.y,
            left: rectangle.x,
            width: rectangle.width,
            height: rectangle.height,
          }}
        />
      ))}
    </div>
  );
}

export default App;
