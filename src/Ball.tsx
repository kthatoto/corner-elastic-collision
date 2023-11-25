import { useState } from "react";
import { useInterval } from "./useInterval";
import { moveCircle } from "./moveCircle";
import { CIRCLE_RADIUS } from "./constants";

const Ball = (params: { log?: boolean }) => {
  const [position, setPosition] = useState({
    x: CIRCLE_RADIUS + Math.random() * 50,
    y: CIRCLE_RADIUS + Math.random() * 50,
  });
  const [velocity, setVelocity] = useState({
    x: Math.random() * 5,
    y: Math.random() * 5,
  });

  useInterval(
    () => moveCircle(position, setPosition, velocity, setVelocity, params.log),
    10
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
