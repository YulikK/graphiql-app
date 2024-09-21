import { describe, expect, it } from 'vitest';

import insertVariables from '@/shared/utils/insert-variables';

describe('insertVariables', () => {
  it('should replace single variable correctly', () => {
    const value = 'Hello, {{name}}!';
    const variables = [['name', 'Alice']];
    const result = insertVariables(value, variables);

    expect(result).toBe('Hello, Alice!');
  });

  it('should replace multiple variables correctly', () => {
    const value = 'Hello, {{name}}! Welcome to {{place}}.';
    const variables = [
      ['name', 'Alice'],
      ['place', 'Wonderland'],
    ];
    const result = insertVariables(value, variables);

    expect(result).toBe('Hello, Alice! Welcome to Wonderland.');
  });

  it('should replace variables with empty values if provided', () => {
    const value = 'Hello, {{name}}! Welcome to {{place}}.';
    const variables = [
      ['name', ''],
      ['place', 'Wonderland'],
    ];
    const result = insertVariables(value, variables);

    expect(result).toBe('Hello, ! Welcome to Wonderland.');
  });

  it('should handle missing placeholders gracefully', () => {
    const value = 'Hello, {{name}}!';
    const variables = [['place', 'Wonderland']];
    const result = insertVariables(value, variables);

    expect(result).toBe('Hello, {{name}}!');
  });

  it('should handle empty value and variables', () => {
    const value = '';
    const variables: string[][] = [];
    const result = insertVariables(value, variables);

    expect(result).toBe('');
  });

  it('should replace variable occurring multiple times', () => {
    const value = '{{name}} is here. {{name}} likes coding.';
    const variables = [['name', 'Alice']];
    const result = insertVariables(value, variables);

    expect(result).toBe('Alice is here. Alice likes coding.');
  });

  it('should replace a variable even if it looks similar to another', () => {
    const value = 'Value for {{var}} is different from {{variable}}.';
    const variables = [
      ['var', 'X'],
      ['variable', 'Y'],
    ];
    const result = insertVariables(value, variables);

    expect(result).toBe('Value for X is different from Y.');
  });
});
