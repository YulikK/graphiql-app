import { describe, expect, it } from 'vitest';

import updateUlrAndQuery from '@/shared/utils/update-url-and-query';

describe('updateUlrAndQuery', () => {
  it('should return URL without query when no query params are provided', () => {
    const url = 'https://example.com';
    const query: string[][] = [];

    const [newUrl, newQuery] = updateUlrAndQuery(url, query);

    expect(newUrl).toBe('https://example.com');
    expect(newQuery).toEqual([['', '']]);
  });

  it('should return URL with query when valid query params are provided', () => {
    const url = 'https://example.com';
    const query = [
      ['key1', 'value1'],
      ['key2', 'value2'],
    ];

    const [newUrl, newQuery] = updateUlrAndQuery(url, query);

    expect(newUrl).toBe('https://example.com?key1=value1&key2=value2');
    expect(newQuery).toEqual([
      ['key1', 'value1'],
      ['key2', 'value2'],
      ['', ''],
    ]);
  });

  it('should remove empty query parameters', () => {
    const url = 'https://example.com';
    const query = [
      ['key1', 'value1'],
      ['', ''],
      ['key2', 'value2'],
      ['', ''],
    ];

    const [newUrl, newQuery] = updateUlrAndQuery(url, query);

    expect(newUrl).toBe('https://example.com?key1=value1&key2=value2');
    expect(newQuery).toEqual([
      ['key1', 'value1'],
      ['key2', 'value2'],
      ['', ''],
    ]);
  });

  it('should handle URLs with existing query string', () => {
    const url = 'https://example.com?oldKey=oldValue';
    const query = [['newKey', 'newValue']];

    const [newUrl, newQuery] = updateUlrAndQuery(url, query);

    expect(newUrl).toBe('https://example.com?newKey=newValue');
    expect(newQuery).toEqual([
      ['newKey', 'newValue'],
      ['', ''],
    ]);
  });

  it('should return correct URL when query string is empty', () => {
    const url = 'https://example.com?existingQuery=existingValue';
    const query: string[][] = [['', '']];

    const [newUrl, newQuery] = updateUlrAndQuery(url, query);

    expect(newUrl).toBe('https://example.com');
    expect(newQuery).toEqual([['', '']]);
  });
});
