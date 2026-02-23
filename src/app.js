import { getToken, getCoffeeShops } from './api.js';
import { calculateDistance } from './utils/distance.js';

const TOP_RESULTS = 3;
const DECIMAL_PLACES = 4;

/**
 * Convert string coordinates to numbers - console input is always strings, but we want to work with numbers for distance calculation
 * @param {object} pos - position with x, y as strings
 * @returns {object} position with x, y as numbers
 */
const parsePosition = ({ x, y }) => ({ x: Number(x), y: Number(y) });

/**
 * Find and display the nearest coffee shops to user position
 * @param {object} position - user position with x, y coordinates
 * @returns {Promise<Array>} array of nearest shops with name and distance
 */
export async function getNearestShops(position) {
  const userPosition = parsePosition(position);

  const token = await getToken();
  const shops = await getCoffeeShops(token);

  // Calculate distance for each shop, sort by closest, take top 3
  const nearest = shops
    .map(shop => ({
      name: shop.name,
      distance: calculateDistance(userPosition, parsePosition(shop))
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, TOP_RESULTS);

  nearest.forEach(shop => {
    console.log(`${shop.name}, ${shop.distance.toFixed(DECIMAL_PLACES)}`);
  });

  return nearest;
}
