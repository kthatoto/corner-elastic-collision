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

  RECTANGLES.forEach((rect: Rectangle) => {
    const overlaps = {
      // 円の中心が矩形と重なっているか
      // center: {
      //   before: {
      //     horizontal: rect.x <= pos.x && pos.x <= rect.x + rect.width,
      //     vertical: rect.y <= pos.y && pos.y <= rect.y + rect.height,
      //   },
      //   after: {
      //     horizontal: rect.x <= newPos.x && newPos.x <= rect.x + rect.width,
      //     vertical: rect.y <= newPos.y && newPos.y <= rect.y + rect.height,
      //   },
      // },
      center: {
        horizontal: rect.x <= newPos.x && newPos.x <= rect.x + rect.width,
        vertical: rect.y <= newPos.y && newPos.y <= rect.y + rect.height,
      },
      // 円を囲む矩形が矩形と重なっているか
      // rect: {
      //   before: {
      //     horizontal: rect.x <= pos.x + CIRCLE_RADIUS && pos.x - CIRCLE_RADIUS <= rect.x + rect.width,
      //     vertical: rect.y <= pos.y + CIRCLE_RADIUS && pos.y - CIRCLE_RADIUS <= rect.y + rect.height,
      //   },
      //   after: {
      //     horizontal: rect.x <= newPos.x + CIRCLE_RADIUS && newPos.x - CIRCLE_RADIUS <= rect.x + rect.width,
      //     vertical: rect.y <= newPos.y + CIRCLE_RADIUS && newPos.y - CIRCLE_RADIUS <= rect.y + rect.height,
      //   },
      // },
      rect: {
        horizontal: rect.x <= newPos.x + CIRCLE_RADIUS && newPos.x - CIRCLE_RADIUS <= rect.x + rect.width,
        vertical: rect.y <= newPos.y + CIRCLE_RADIUS && newPos.y - CIRCLE_RADIUS <= rect.y + rect.height,
      },
    };

    // 上辺or下辺に衝突
    if (overlaps.center.horizontal && overlaps.rect.vertical) {
      newVelocity.y = velocity.y * -1;
    }
    // 左辺or右辺に衝突
    if (overlaps.center.vertical && overlaps.rect.horizontal) {
      newVelocity.x = velocity.x * -1;
    }
    // 角に衝突
    if (
      !overlaps.center.horizontal &&
      !overlaps.center.vertical &&
      overlaps.rect.horizontal &&
      overlaps.rect.vertical
    ) {
      newVelocity.y = velocity.y * -1;
      newVelocity.x = velocity.x * -1;
      // TODO
    }
  });

  setPosition(newPos);
  setVelocity(newVelocity);
  return;
};
