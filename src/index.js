import { getNearestShops } from './app.js';

/**
 * Validate command line arguments
 * @param {string} x - X coordinate argument
 * @param {string} y - Y coordinate argument
 * @returns {boolean} True if valid, false otherwise
 */
function validateArgs(x, y) {
  if (x === undefined || y === undefined) {
    console.error('Error: Missing coordinates.');
    console.error('Usage: npm start -- <x coordinate> <y coordinate>');
    console.error('Example: npm start -- 47.6 -122.4');
    return false;
  }

  const parsedX = parseFloat(x);
  const parsedY = parseFloat(y);

  if (isNaN(parsedX) || isNaN(parsedY)) {
    console.error('Error: Coordinates must be valid numbers.');
    console.error('Usage: npm start -- <x coordinate> <y coordinate>');
    console.error('Example: npm start -- 47.6 -122.4');
    return false;
  }

  return true;
}

async function main() {
  const x = process.argv[2];
  const y = process.argv[3];

  if (!validateArgs(x, y)) {
    process.exit(1);
  }

  try {
    await getNearestShops({ x, y });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.error('Please try again later.');
    process.exit(1);
  }
}

main();
