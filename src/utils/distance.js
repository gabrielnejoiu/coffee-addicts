/**
 * Calculate Euclidean distance between two points on a flat plane
 * Formula: sqrt((x2-x1)^2 + (y2-y1)^2)
 *
 * @param {Object} point1 - First point
 * @param {number} point1.x - X coordinate of first point
 * @param {number} point1.y - Y coordinate of first point
 * @param {Object} point2 - Second point
 * @param {number} point2.x - X coordinate of second point
 * @param {number} point2.y - Y coordinate of second point
 * @returns {number} Distance between the two points
 */
export function calculateDistance(point1, point2) {
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  return Math.sqrt(dx * dx + dy * dy);
}
