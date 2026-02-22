import { getToken, getCoffeeShops } from './api.js';

/**
 * @param {Object} position
 * @param {Number} position.x
 * @param {Number} position.y
 *
 * @returns {Promise<Array>}
 */
export async function getNearestShops(position) {
  const token = await getToken();
  const shops = await getCoffeeShops(token);

  // Log to see the data structure
  console.log('Token received:', token);
  console.log('Shops data:', JSON.stringify(shops, null, 2));

  return shops;
}
