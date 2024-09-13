import { describe, expect, it } from 'vitest';

import checkLastTuple from '@/shared/utils/check-last-tuple';

describe('checkLastTuple', () => {
  it('should append ["", ""] if the last tuple is filled', () => {
    const input = [
      ['key1', 'value1'],
      ['key2', 'value2'],
    ];
    const result = checkLastTuple(input);
    expect(result).toEqual([
      ['key1', 'value1'],
      ['key2', 'value2'],
      ['', ''],
    ]);
  });

  it('should not append ["", ""] if the last tuple has an empty string', () => {
    const input = [
      ['key1', 'value1'],
      ['', ''],
    ];
    const result = checkLastTuple(input);
    expect(result).toEqual([
      ['key1', 'value1'],
      ['', ''],
    ]);
  });

  it('should append ["", ""] if the array is empty', () => {
    const input: string[][] = [];
    const result = checkLastTuple(input);
    expect(result).toEqual([['', '']]);
  });

  it('should not append ["", ""] if the last tuple is incomplete', () => {
    const input = [
      ['key1', 'value1'],
      ['key2', ''],
    ];
    const result = checkLastTuple(input);
    expect(result).toEqual(input);
  });

  it('should not modify the input array directly', () => {
    const input = [['key1', 'value1']];
    const original = [...input];
    checkLastTuple(input);
    expect(input).toEqual(original);
  });
});
