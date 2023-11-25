import { useState } from "react";

import './App.css';
import useInterval from "./useInterval";

const CIRCLE_RADIUS = 50;

const App = () => {
  const [position, setPosition] = useState({ x: CIRCLE_RADIUS, y: CIRCLE_RADIUS });

  useInterval(
    () => {
      setPosition({ x: position.x + 1, y: position.y + 1 });
    },
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
