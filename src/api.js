const API_BASE = 'https://api-challenge.agilefreaks.com/v1';
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

/**
 * Delay API call for specified milliseconds
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise} Resolves after delay
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Fetch with retry logic if API fails
 *
 * @param {string} url - URL to fetch
 * @param {Object} options - Fetch options
 * @param {number} attempt - Current attempt number
 * @returns {Promise<Object>} Parsed JSON response
 */
async function fetchWithRetry(url, options = {}, attempt = 1) {
  try {
    const response = await fetch(url, options);

    // Check for retryable HTTP errors (503 Service Unavailable, 504 Gateway Timeout)
    if (!response.ok) {
      if ((response.status === 503 || response.status === 504) && attempt < MAX_RETRIES) {
        console.log(`Service unavailable, retrying... (${attempt}/${MAX_RETRIES})`);
        await delay(RETRY_DELAY_MS);
        return fetchWithRetry(url, options, attempt + 1);
      }

      // Non-retryable error
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    // Network errors (connection refused, timeout, etc.)
    if (attempt < MAX_RETRIES && error.name !== 'AbortError') {
      console.log(`Request failed, retrying... (${attempt}/${MAX_RETRIES})`);
      await delay(RETRY_DELAY_MS);
      return fetchWithRetry(url, options, attempt + 1);
    }

    throw error;
  }
}

/**
 * Get authentication token from API
 * @returns {Promise<string>} Authentication token
 */
export async function getToken() {
  const data = await fetchWithRetry(`${API_BASE}/tokens`, {
    method: 'POST'
  });
  return data.token;
}

/**
 * Get list of coffee shops from API
 * @param {string} token - Authentication token
 * @returns {Promise<Array>} List of coffee shops
 */
export async function getCoffeeShops(token) {
  return fetchWithRetry(`${API_BASE}/coffee_shops?token=${token}`);
}
