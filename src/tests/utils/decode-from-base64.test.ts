import { describe, expect, it } from 'vitest';

import decodeFromBase64 from '@/shared/utils/decode-from-base64';

describe('decodeFromBase64', () => {
  it('should decode a regular base64 string', () => {
    const input = 'aGVsbG8gd29ybGQ';
    const result = decodeFromBase64(input);
    expect(result).toBe('hello world');
  });

  it('should decode a base64 string with special characters', () => {
    const input = 'aGVsbG8td29ybGQh';
    const result = decodeFromBase64(input);
    expect(result).toBe('hello-world!');
  });

  it('should decode an empty string', () => {
    const input = '';
    const result = decodeFromBase64(input);
    expect(result).toBe('');
  });

  it('should decode a base64 string with both Latin and Cyrillic characters', () => {
    const input = 'aGVsbG8t0LzQuNGA';
    const result = decodeFromBase64(input);
    expect(result).toBe('hello-мир');
  });

  it('should handle base64 strings with missing padding', () => {
    const input = 'dGVzdA';
    const result = decodeFromBase64(input);
    expect(result).toBe('test');
  });

  it('should correctly handle URL-safe base64 strings with "-" and "_"', () => {
    const input = 'bWFuK3dvbWFuL2NoaWxk';
    const result = decodeFromBase64(input);
    expect(result).toBe('man+woman/child');
  });
});
