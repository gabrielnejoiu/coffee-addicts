// All user messages in one place and easy to update
//
// Usage:
//   logger.error('Something went wrong')  -> "Error: Something went wrong"
//   logger.info('Hello')                  -> "Hello"
//   logger.usage()                        -> shows usage instructions
//   logger.retry(1, 3)                    -> "Service unavailable, retrying... (1/3)"
//   logger.retryNetwork(2, 3)             -> "Request failed, retrying... (2/3)"

const USAGE = `Usage: npm start -- <x coordinate> <y coordinate>
Example: npm start -- 47.6 -122.4`;

export const logger = {
  error: (msg) => console.error(`Error: ${msg}`),
  info: (msg) => console.log(msg),
  usage: () => console.error(USAGE),
  retry: (attempt, max) => console.log(`Service unavailable, retrying... (${attempt}/${max})`),
  retryNetwork: (attempt, max) => console.log(`Request failed, retrying... (${attempt}/${max})`)
};
