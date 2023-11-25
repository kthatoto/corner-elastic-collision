import { useState } from "react";

import './App.css';
import { useInterval } from "./useInterval";
import { moveCircle } from "./moveCircle";
import { CIRCLE_RADIUS } from "./constants";

const App = () => {
  const [position, setPosition] = useState({ x: CIRCLE_RADIUS, y: CIRCLE_RADIUS });
  const [velocity, setVelocity] = useState({ x: 3, y: 5 });

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
    </div>
  );
}

export default App;
