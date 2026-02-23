// Tests for main app logic
// - returns 3 closest shops sorted by distance
// - each shop has name and distance
// - edge cases: empty list, less than 3 shops, negative coords

import { getNearestShops } from '../src/app.js';
import * as api from '../src/api.js';

jest.mock('../src/api.js');

describe('getNearestShops', () => {
  // Shop D at (3,4) is distance 5 from origin (3-4-5 triangle)
  const mockShops = [
    { name: 'Shop A', x: '10', y: '10' },
    { name: 'Shop B', x: '5', y: '5' },
    { name: 'Shop C', x: '20', y: '20' },
    { name: 'Shop D', x: '3', y: '4' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
    api.getToken.mockResolvedValue('token');
  });

  afterEach(() => {
    console.log.mockRestore();
  });

  describe('happy path', () => {
    beforeEach(() => {
      api.getCoffeeShops.mockResolvedValue(mockShops);
    });

    it('returns 3 closest shops sorted by distance', async () => {
      const result = await getNearestShops({ x: '0', y: '0' });

      expect(result).toHaveLength(3);
      // Shop D (3,4) = 5, Shop B (5,5) = 7.07, Shop A (10,10) = 14.14
      expect(result[0].name).toBe('Shop D');
      expect(result[1].name).toBe('Shop B');
      expect(result[2].name).toBe('Shop A');
    });

    it('returns shops with name and distance properties', async () => {
      const result = await getNearestShops({ x: '0', y: '0' });

      result.forEach(shop => {
        expect(shop).toHaveProperty('name');
        expect(shop).toHaveProperty('distance');
        expect(typeof shop.distance).toBe('number');
      });
    });

    it('calculates correct distance (3-4-5 triangle)', async () => {
      const result = await getNearestShops({ x: '0', y: '0' });
      expect(result[0].distance).toBe(5);
    });
  });

  describe('edge cases', () => {
    it('handles empty shop list', async () => {
      api.getCoffeeShops.mockResolvedValue([]);
      const result = await getNearestShops({ x: '0', y: '0' });
      expect(result).toHaveLength(0);
    });

    it('handles less than 3 shops', async () => {
      api.getCoffeeShops.mockResolvedValue([{ name: 'Only Shop', x: '1', y: '1' }]);
      const result = await getNearestShops({ x: '0', y: '0' });
      expect(result).toHaveLength(1);
    });

    it('handles negative coordinates', async () => {
      api.getCoffeeShops.mockResolvedValue([{ name: 'Shop', x: '-10', y: '-20' }]);
      const result = await getNearestShops({ x: '-5', y: '-10' });
      // sqrt(25 + 100) = sqrt(125) ≈ 11.18
      expect(result[0].distance).toBeCloseTo(11.18, 1);
    });
  });
});
