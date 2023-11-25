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

  if (newPosition.x - CIRCLE_RADIUS <= 0 || width <= newPosition.x + CIRCLE_RADIUS) {
    velocity.x = velocity.x * -1;
  }
  if (newPosition.y - CIRCLE_RADIUS <= 0 || height <= newPosition.y + CIRCLE_RADIUS) {
    velocity.y = velocity.y * -1;
  }

  setPosition(newPosition);
  return;
};
