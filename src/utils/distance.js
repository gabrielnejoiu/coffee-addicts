// Euclidean distance: sqrt((x2-x1)^2 + (y2-y1)^2)

export function calculateDistance(point1, point2) {
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  return Math.sqrt(dx * dx + dy * dy);
}
