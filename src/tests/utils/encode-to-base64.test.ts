import { describe, expect, it } from 'vitest';

import encodeToBase64 from '@/shared/utils/encode-to-base64';

describe('encodeToBase64', () => {
  it('should encode a regular string to base64 format', () => {
    const input = 'hello world';
    const result = encodeToBase64(input);
    expect(result).toBe('aGVsbG8gd29ybGQ');
  });

  it('should encode a string with special characters', () => {
    const input = 'hello+world/!';
    const result = encodeToBase64(input);
    expect(result).toBe('aGVsbG8rd29ybGQvIQ');
  });

  it('should encode an empty string', () => {
    const input = '';
    const result = encodeToBase64(input);
    expect(result).toBe('');
  });

  it('should encode a string with both Latin and Cyrillic characters', () => {
    const input = 'hello мир';
    const result = encodeToBase64(input);
    expect(result).toBe('aGVsbG8g0LzQuNGA');
  });

  it('should remove padding characters "=" from base64 encoding', () => {
    const input = 'test';
    const result = encodeToBase64(input);
    expect(result).toBe('dGVzdA');
  });

  it('should replace "+" with "-" and "/" with "_" in the base64 string', () => {
    const input = 'man+woman/child';
    const result = encodeToBase64(input);
    expect(result).toBe('bWFuK3dvbWFuL2NoaWxk');
  });
});
