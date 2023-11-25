import { CIRCLE_RADIUS, RECTANGLES } from "./constants";
import { distance, reflectVectorAcrossLine } from "./mathLogics";

interface Vector {
  x: number;
  y: number;
}

export const moveCircle = (
  pos: Vector,
  setPosition: (newPosition: Vector) => void,
  velocity: Vector,
  setVelocity: (newVelocity: Vector) => void,
  log?: boolean,
) => {
  const newPos = { x: pos.x + velocity.x, y: pos.y + velocity.y };
  const newVelocity = { x: velocity.x, y: velocity.y };

  const height = document.body.clientHeight;
  const width = document.body.clientWidth;

  if (newPos.x - CIRCLE_RADIUS <= 0 || width <= newPos.x + CIRCLE_RADIUS) {
    newVelocity.x = velocity.x * -1;
  }
  if (newPos.y - CIRCLE_RADIUS <= 0 || height <= newPos.y + CIRCLE_RADIUS) {
    newVelocity.y = velocity.y * -1;
  }

  RECTANGLES.forEach((rect) => {
    const overlaps = {
      // 円の中心が矩形と重なっているか
      center: {
        horizontal: rect.x <= newPos.x && newPos.x <= rect.x + rect.width,
        vertical: rect.y <= newPos.y && newPos.y <= rect.y + rect.height,
      },
      // 円を囲む矩形が矩形と重なっているか
      rect: {
        horizontal: rect.x <= newPos.x + CIRCLE_RADIUS && newPos.x - CIRCLE_RADIUS <= rect.x + rect.width,
        vertical: rect.y <= newPos.y + CIRCLE_RADIUS && newPos.y - CIRCLE_RADIUS <= rect.y + rect.height,
      },
    };

    if (overlaps.center.horizontal && overlaps.rect.vertical) {
      // 上辺or下辺に衝突
      newVelocity.y = velocity.y * -1;
    } else if (overlaps.center.vertical && overlaps.rect.horizontal) {
      // 左辺or右辺に衝突
      newVelocity.x = velocity.x * -1;
    } else if (
      !overlaps.center.horizontal &&
      !overlaps.center.vertical &&
      overlaps.rect.horizontal &&
      overlaps.rect.vertical
    ) {
      // 角に衝突
      const leftSide = newPos.x <= rect.x;
      const rightSide = rect.x + rect.width <= newPos.x;
      const topSide = newPos.y <= rect.y;
      const bottomSide = rect.y + rect.height <= newPos.y;

      const cornerPoint = { x: -1, y: -1 };
      if (leftSide) {
        if (topSide) {
          cornerPoint.x = rect.x;
          cornerPoint.y = rect.y;
        } else if (bottomSide) {
          cornerPoint.x = rect.x;
          cornerPoint.y = rect.y + rect.height;
        }
      } else if (rightSide) {
        if (topSide) {
          cornerPoint.x = rect.x + rect.width;
          cornerPoint.y = rect.y;
        } else if (bottomSide) {
          cornerPoint.x = rect.x + rect.width;
          cornerPoint.y = rect.y + rect.height;
        }
      }

      if (distance(newPos.x, newPos.y, cornerPoint.x, cornerPoint.y) <= CIRCLE_RADIUS) {
        const convertedVector = reflectVectorAcrossLine(
          velocity,
          { x: cornerPoint.x - newPos.x, y: cornerPoint.y - newPos.y },
        );
        newVelocity.x = convertedVector.x * -1;
        newVelocity.y = convertedVector.y * -1;
      }
    }
  });

  setPosition(newPos);
  setVelocity(newVelocity);
  return;
};
