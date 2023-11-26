import { useState } from "react";
import { useInterval } from "./useInterval";
import { moveCircle } from "./moveCircle";
import { CIRCLE_RADIUS } from "./constants";

const Ball = () => {
  const [position, setPosition] = useState({
    // x: CIRCLE_RADIUS + Math.random() * 10,
    // y: CIRCLE_RADIUS + Math.random() * 10,
    x: 50,
    y: 120,
  });
  const [velocity, setVelocity] = useState({
    // x: Math.random() * 3,
    // y: Math.random() * 3,
    x: 4,
    y: 0,
  });

  useInterval(
    () => moveCircle(position, setPosition, velocity, setVelocity),
    500
  );

  return (
    <div
      className="circle"
      style={{
        width: CIRCLE_RADIUS * 2,
        height: CIRCLE_RADIUS * 2,
        top: position.y - CIRCLE_RADIUS,
        left: position.x - CIRCLE_RADIUS,
      }}
    />
  );
};

export default Ball;
