import { useState, useEffect } from "react";

import './App.css';

const CIRCLE_RADIUS = 50;

const App = () => {
  const [position, setPosition] = useState({ x: CIRCLE_RADIUS, y: CIRCLE_RADIUS });
  const [intervalId, setIntervalId] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
    }, 10);
    setIntervalId(id);

    return () => {
      window.clearInterval(intervalId);
    }
  }, []);

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
