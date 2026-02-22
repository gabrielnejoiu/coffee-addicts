import { getNearestShops } from './app.js';

async function main() {
  const position = {
    x: process.argv[2],
    y: process.argv[3],
  };

  await getNearestShops(position);
}

main();
