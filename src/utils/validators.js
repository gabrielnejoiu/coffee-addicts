import { logger } from './logger.js';

/**
 * Check if a value is a valid numeric string
 * @param {any} val - value to check (expected string from command line)
 * @returns {boolean} true if val is a non-empty string that converts to a number
 */
export const isNumeric = (val) =>
  typeof val === 'string' && val.trim() !== '' && Number.isFinite(Number(val));

/**
 * Validate x and y coordinates from command line arguments
 * @param {string} x - x coordinate
 * @param {string} y - y coordinate
 * @returns {boolean} true if both coordinates are numbers, false otherwise
 */
export function validateArgs(x, y) {
  if (!isNumeric(x) || !isNumeric(y)) {
    logger.error('Coordinates must be valid numbers.');
    logger.usage();
    return false;
  }
  return true;
}
