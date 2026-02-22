import { getToken, getCoffeeShops } from './api.js';
import { calculateDistance } from './utils/distance.js';

/**
 * Find top 3 nearest coffee shops based on user's position
 *
 * @param {Object} position - User position
 * @param {number} position.x - User x coordinate
 * @param {number} position.y - User y coordinate
 * @returns {Promise<Array>} The list of nearest shops
 */
export async function getNearestShops(position) {
  // Convert user coordinates from string to number
  const userPosition = {
    x: parseFloat(position.x),
    y: parseFloat(position.y)
  };

  // Get authentication token
  const token = await getToken();

  // Get coffee shops list
  const shops = await getCoffeeShops(token);

  // Calculate distance for each shop
  const shopsWithDistance = shops.map(shop => {
    // API returns coordinates as strings, convert to numbers
    const shopPosition = {
      x: parseFloat(shop.x),
      y: parseFloat(shop.y)
    };

    const distance = calculateDistance(userPosition, shopPosition);

    return {
      name: shop.name,
      distance: distance
    };
  });

  // Sort by distance (closest first)
  const sorted = shopsWithDistance.sort((a, b) => a.distance - b.distance);

  // Take top 3
  const nearest = sorted.slice(0, 3);

  // Print results in required format
  nearest.forEach(shop => {
    console.log(`${shop.name}, ${shop.distance.toFixed(4)}`);
  });

  return nearest;
}
