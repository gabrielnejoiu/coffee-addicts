# Coffee Shop Finder

A command-line tool that finds the three closest coffee shops to a given location.

## Problem Description

Build an app for coffee addicts that takes the user's location (x, y coordinates) and returns a list of the three closest coffee shops from an external API.

## Installation

```bash
npm install
# or
yarn install
```

## Usage

```bash
npm start -- <x coordinate> <y coordinate>
# or
yarn start <x coordinate> <y coordinate>
```

### Example

```bash
npm start -- 47.6 -122.4
# or
yarn start 47.6 -122.4
```

**Output:**
```
Blue Bottle Seattle2, 0.0643
Blue Bottle Seattle, 0.0861
Blue Bottle SF, 10.0792
```

## How It Works

1. **Input Validation** - Validates that coordinates are valid numbers
2. **API Authentication** - Fetches an access token from the API
3. **Data Retrieval** - Gets the list of coffee shops using the token
4. **Distance Calculation** - Calculates Euclidean distance to each shop
5. **Sorting & Output** - Sorts by distance and displays the top 3

## API Handling

The coffee shop API may occasionally fail with 503/504 errors. The app handles this with:

- **Automatic retry** - Up to 3 attempts with 1 second delay
- **Clear messaging** - User is informed during retries
- **Graceful failure** - Helpful error messages if all retries fail

## Project Structure

```
src/
├── index.js              # Entry point, CLI handling
├── app.js                # Main business logic
├── api.js                # API communication with retry
└── utils/
    ├── distance.js       # Euclidean distance calculation
    ├── validators.js     # Input validation
    └── logger.js         # Centralized logging

test/
├── app.test.js           # Main app tests
├── api.test.js           # API retry logic tests
├── distance.test.js      # Distance calculation tests
└── validation.test.js    # Input validation tests
```

## Testing

```bash
npm test
# or
yarn test
```

19 tests covering:
- Input validation (valid numbers, edge cases)
- Distance calculation (3-4-5 triangle, negative coords, GPS-like decimals)
- API communication (success, retry on 503, network errors)
- App logic (sorting, top 3, edge cases)

## Commands

| Command | Description |
|---------|-------------|
| `npm start -- <x> <y>` | Find nearest coffee shops |
| `yarn start <x> <y>` | Find nearest coffee shops |
| `npm test` | Run test suite |
| `npm run dev` | Development mode with auto-reload |

## Technical Notes

- Node.js 18+ required (uses native `fetch`)
- Euclidean distance formula (flat plane assumption)
- Distances rounded to 4 decimal places

## Error Handling

| Scenario | Output |
|----------|--------|
| Missing/invalid coordinates | `Error: Coordinates must be valid numbers.` + usage |
| API failure after retries | `Error: [details]. Please try again later.` |

## License

MIT
