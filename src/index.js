import { getNearestShops } from './app.js';
import { validateArgs } from './utils/validators.js';
import { logger } from './utils/logger.js';

/**
 * Main entry point - parses the arguments from user and runs application logic to find nearest coffee shops
 * Exits with error code 1 if arguments are invalid or if there is an error during API calls
 * Logs user messages for errors and usage instructions
 */
async function main() {
  // process.argv: [node path, script path, x, y] - skip first two with commas
  const [, , x, y] = process.argv;

  if (!validateArgs(x, y)) {
    process.exit(1);
  }

  try {
    await getNearestShops({ x, y });
  } catch (error) {
    logger.error(error.message);
    console.error('Please try again later.');
    process.exit(1);
  }
}

main();
