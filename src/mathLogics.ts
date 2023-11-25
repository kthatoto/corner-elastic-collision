interface Vector {
  x: number;
  y: number;
}

// 2点間の距離
export const distance = (x1: number, y1: number, x2: number, y2: number) => {
  return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
};

// 単位ベクトル化
const unitVectorize = (vector: Vector) => {
  const vectorNorm = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
  return { x: vector.x / vectorNorm, y: vector.y / vectorNorm };
};

// 線対称変換
export const reflectVectorAcrossLine = (vector: Vector, lineVector: Vector) => {
  const unitVector = unitVectorize(vector);
  const unitLineVector = unitVectorize(lineVector);

  // 内積
  const dotProduct = unitVector.x * unitLineVector.x + unitVector.y * unitLineVector.y;
  return {
    x: 2 * dotProduct * unitLineVector.x - unitVector.x,
    y: 2 * dotProduct * unitLineVector.y - unitVector.y,
  };
};
