import { CIRCLE_RADIUS, RECTANGLES } from "./constants";

interface Vector {
  x: number;
  y: number;
}

interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
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

  RECTANGLES.forEach((rect: Rectangle) => {
    const beforeHorizontalCollision =
      rect.x <= position.x + CIRCLE_RADIUS &&
      position.x - CIRCLE_RADIUS <= rect.x + rect.width;
    const beforeVerticalCollision =
      rect.y <= position.y + CIRCLE_RADIUS &&
      position.y - CIRCLE_RADIUS <= rect.y + rect.height;
    const afterHorizontalCollision =
      rect.x <= newPosition.x + CIRCLE_RADIUS &&
      newPosition.x - CIRCLE_RADIUS <= rect.x + rect.width;
    const afterVerticalCollision =
      rect.y <= newPosition.y + CIRCLE_RADIUS &&
      newPosition.y - CIRCLE_RADIUS <= rect.y + rect.height;

    if (afterHorizontalCollision && afterVerticalCollision) {
      if (beforeHorizontalCollision) {
        velocityChange.y = -1;
      }
      if (beforeVerticalCollision) {
        velocityChange.x = -1;
      }
    }
  });

  setVelocity({ x: velocity.x * velocityChange.x, y: velocity.y * velocityChange.y });
  setPosition(newPosition);
  return;
};
