// Tests for input validation
// - isNumeric: accepts valid numbers, rejects invalid input
// - validateArgs: returns true/false and logs errors

import { isNumeric, validateArgs } from '../src/utils/validators.js';

describe('isNumeric', () => {
  it('accepts valid numbers (positive, negative, zero, decimals)', () => {
    expect(isNumeric('47.6')).toBe(true);
    expect(isNumeric('-122.4')).toBe(true);
    expect(isNumeric('0')).toBe(true);
    expect(isNumeric('.5')).toBe(true);
  });

  it('rejects invalid input (undefined, empty, whitespace, text)', () => {
    expect(isNumeric(undefined)).toBe(false);
    expect(isNumeric('')).toBe(false);
    expect(isNumeric('   ')).toBe(false);
    expect(isNumeric('abc')).toBe(false);
    expect(isNumeric('123abc')).toBe(false);
  });
});

describe('validateArgs', () => {
  // Mock console.error to prevent noise in test output
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  it('returns true for valid coordinates', () => {
    expect(validateArgs('47.6', '-122.4')).toBe(true);
  });

  it('returns false and logs error for invalid coordinates', () => {
    expect(validateArgs(undefined, '10')).toBe(false);
    expect(validateArgs('10', undefined)).toBe(false);
    expect(validateArgs('abc', '10')).toBe(false);
    expect(console.error).toHaveBeenCalled();
  });
});
