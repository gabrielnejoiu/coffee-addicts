# Coffee Shop Finder

A CLI tool that finds the three closest coffee shops to a given location.

## Problem Description

Build an app for coffee addicts that takes the user's location and returns a list of the three closest coffee shops.

### Input

The program receives two command line arguments: the user's x and y coordinates.

```
npm start -- <user x coordinate> <user y coordinate>
```

### Output

A newline-separated list of the three closest coffee shops with distances rounded to four decimal places, ordered from closest to farthest.

Example:
```
npm start -- 47.6 -122.4
```

Output:
```
Starbucks Seattle2, 0.0645
Starbucks Seattle, 0.0861
Starbucks SF, 10.0793
```

## Commands

```
npm start -- <x> <y>   # Run the main script with coordinates
npm run dev            # Start development mode
npm test               # Run tests
```

## Notes

- Coffee shop data comes from an external API
- The API may fail occasionally - the program handles retries
- Distances are calculated assuming a flat plane (Euclidean distance)
