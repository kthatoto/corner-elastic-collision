import { CIRCLE_RADIUS } from "./constants";

interface Vector {
  x: number;
  y: number;
}

export const moveCircle = (
  position: Vector,
  setPosition: (newPosition: Vector) => void,
  velocity: Vector,
  setVelocity: (newVelocity: Vector) => void,
) => {
  const newPosition = { x: position.x + velocity.x, y: position.y + velocity.y };

  const height = document.body.clientHeight;
  const width = document.body.clientWidth;
  const velocityChange = { x: 1, y: 1 };
  if (newPosition.x - CIRCLE_RADIUS <= 0 || width <= newPosition.x + CIRCLE_RADIUS) {
    velocityChange.x = -1;
  }
  if (newPosition.y - CIRCLE_RADIUS <= 0 || height <= newPosition.y + CIRCLE_RADIUS) {
    velocityChange.y = -1;
  }

  setVelocity({ x: velocity.x * velocityChange.x, y: velocity.y * velocityChange.y });
  setPosition(newPosition);
  return;
};
