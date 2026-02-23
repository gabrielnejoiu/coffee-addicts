// API communication with retry logic
// The concern is that the API can be unreliable, returning 503/504 errors temporarily

import { logger } from './utils/logger.js';

const API_BASE = 'https://api-challenge.agilefreaks.com/v1';
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

/**
 * Delay for async/await usage
 * @param {number} ms - milliseconds to wait
 * @returns {Promise<void>}
 */
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch with automatic retry on temporary failures
 * @param {string} url - URL to fetch
 * @param {object} options - fetch options (method, headers, etc.)
 * @param {number} attempt - current attempt number (starts at 1)
 * @returns {Promise<object>} parsed JSON response
 */
async function fetchWithRetry(url, options = {}, attempt = 1) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      // Only retry on 503/504 (temporary errors), fail fast on others
      const shouldRetry = (response.status === 503 || response.status === 504) && attempt < MAX_RETRIES;

      if (shouldRetry) {
        logger.retry(attempt, MAX_RETRIES);
        await delay(RETRY_DELAY_MS);
        return fetchWithRetry(url, options, attempt + 1);
      }

      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    // Retry on network errors
    // Check it's not an API error we already handled above
    if (!error.message?.startsWith('API error:') && attempt < MAX_RETRIES) {
      logger.retryNetwork(attempt, MAX_RETRIES);
      await delay(RETRY_DELAY_MS);
      return fetchWithRetry(url, options, attempt + 1);
    }
    throw error;
  }
}

/**
 * Get token from API - this also can fail, so we use the same retry logic
 * @returns {Promise<string>} authentication token
 */
export async function getToken() {
  const data = await fetchWithRetry(`${API_BASE}/tokens`, { method: 'POST' });
  return data.token;
}

/**
 * Get list of coffee shops from API - this also can fail, so we use the same retry logic
 * @param {string} token - authentication token
 * @returns {Promise<Array>} array of coffee shop objects
 */
export async function getCoffeeShops(token) {
  return fetchWithRetry(`${API_BASE}/coffee_shops?token=${token}`);
}
