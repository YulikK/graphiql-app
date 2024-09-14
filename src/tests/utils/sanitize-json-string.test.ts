import { describe, expect, it } from 'vitest';

import sanitizeJsonString from '@/shared/utils/sanitize-json-string';

describe('sanitizeJsonString', () => {
  it('should replace single quotes with double quotes', () => {
    const input = "{'key': 'value'}";
    const expected = '{"key":"value"}';
    expect(sanitizeJsonString(input)).toBe(expected);
  });

  it('should add missing double quotes to keys', () => {
    const input = '{key: "value"}';
    const expected = '{"key":"value"}';
    expect(sanitizeJsonString(input)).toBe(expected);
  });

  it('should remove trailing commas before closing brackets', () => {
    const input = '{"key1": "value1", "key2": "value2",}';
    const expected = '{"key1":"value1","key2":"value2"}';
    expect(sanitizeJsonString(input)).toBe(expected);
  });

  it('should handle multiple invalid commas between closing brackets', () => {
    const input = '{"key": "value"},}';
    const expected = '{"key":"value"}}';
    expect(sanitizeJsonString(input)).toBe(expected);
  });

  it('should remove unnecessary whitespace', () => {
    const input = `{
      "key1": "value1",  
      "key2": "value2"
    }`;
    const expected = '{"key1":"value1","key2":"value2"}';
    expect(sanitizeJsonString(input)).toBe(expected);
  });

  it('should handle nested objects and arrays correctly', () => {
    const input =
      '{"key1": {"nestedKey": "nestedValue"}, "key2": [1, 2, 3, ], }';
    const expected = '{"key1":{"nestedKey":"nestedValue"},"key2":[1,2,3]}';
    expect(sanitizeJsonString(input)).toBe(expected);
  });

  it('should handle empty objects and arrays correctly', () => {
    const input = '{"emptyObj": {}, "emptyArr": []}';
    const expected = '{"emptyObj":{},"emptyArr":[]}';
    expect(sanitizeJsonString(input)).toBe(expected);
  });

  it('should remove commas before closing array brackets', () => {
    const input = '{"key": [1, 2, ]}';
    const expected = '{"key":[1,2]}';
    expect(sanitizeJsonString(input)).toBe(expected);
  });
});
