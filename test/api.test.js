// Tests for API communication
// - token endpoint returns the token
// - retry on 503 errors, give up after 3 times
// - coffee shops endpoint includes token in URL
// - retry on network errors

import { getToken, getCoffeeShops } from '../src/api.js';

global.fetch = jest.fn();

describe('API', () => {
  beforeEach(() => {
    fetch.mockReset();
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    console.log.mockRestore();
  });

  describe('getToken', () => {
    it('returns token on success', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ token: 'abc123' })
      });

      expect(await getToken()).toBe('abc123');
    });

    it('retries on 503 and succeeds', async () => {
      fetch
        .mockResolvedValueOnce({ ok: false, status: 503, statusText: 'Service Unavailable' })
        .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ token: 'abc123' }) });

      expect(await getToken()).toBe('abc123');
      expect(fetch).toHaveBeenCalledTimes(2);
    });

    it('throws after 3 failed retries', async () => {
      fetch
        .mockResolvedValueOnce({ ok: false, status: 503, statusText: 'Service Unavailable' })
        .mockResolvedValueOnce({ ok: false, status: 503, statusText: 'Service Unavailable' })
        .mockResolvedValueOnce({ ok: false, status: 503, statusText: 'Service Unavailable' });

      await expect(getToken()).rejects.toThrow('503');
      expect(fetch).toHaveBeenCalledTimes(3);
    });
  });

  describe('getCoffeeShops', () => {
    it('returns shops and includes token in URL', async () => {
      const mockShops = [{ id: 1, name: 'Shop A' }];
      fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockShops)
      });

      const shops = await getCoffeeShops('my-token');

      expect(shops).toEqual(mockShops);
      expect(fetch.mock.calls[0][0]).toContain('token=my-token');
    });

    it('retries on network error', async () => {
      const mockShops = [{ id: 1, name: 'Shop A' }];
      fetch
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockShops) });

      expect(await getCoffeeShops('token')).toEqual(mockShops);
      expect(fetch).toHaveBeenCalledTimes(2);
    });
  });
});
