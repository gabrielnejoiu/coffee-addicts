// Tests for distance calculation
// - same point returns 0
// - 3-4-5 triangle verifies the math
// - negative coordinates work
// - GPS-like decimals work

import { calculateDistance } from '../src/utils/distance.js';

describe('calculateDistance', () => {
  it('returns 0 for same point', () => {
    const point = { x: 47.6, y: -122.4 };
    expect(calculateDistance(point, point)).toBe(0);
  });

  it('calculates 3-4-5 triangle correctly', () => {
    expect(calculateDistance({ x: 0, y: 0 }, { x: 3, y: 4 })).toBe(5);
  });

  it('handles negative coordinates', () => {
    // (-1,-1) to (2,3) = sqrt(9 + 16) = 5
    expect(calculateDistance({ x: -1, y: -1 }, { x: 2, y: 3 })).toBe(5);
  });

  it('handles GPS-like coordinates', () => {
    const seattle = { x: 47.6, y: -122.4 };
    const nearbyShop = { x: 47.587, y: -122.337 };
    const distance = calculateDistance(seattle, nearbyShop);
    expect(distance).toBeCloseTo(0.064, 2);
  });
});
