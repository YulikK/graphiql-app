import { describe, expect, it } from 'vitest';

import { getInitialTheme } from '@/shared/utils/get-init-theme';

describe('getInitialTheme', () => {
  it('should return "dark" if sec-ch-prefers-color-scheme header is "dark"', () => {
    const headers = new Headers();
    headers.set('sec-ch-prefers-color-scheme', 'dark');

    const result = getInitialTheme(headers);
    expect(result).toBe('dark');
  });

  it('should return "light" if sec-ch-prefers-color-scheme header is "light"', () => {
    const headers = new Headers();
    headers.set('sec-ch-prefers-color-scheme', 'light');

    const result = getInitialTheme(headers);
    expect(result).toBe('light');
  });

  it('should return "light" if sec-ch-prefers-color-scheme header is missing', () => {
    const headers = new Headers();

    const result = getInitialTheme(headers);
    expect(result).toBe('light');
  });

  it('should return "light" for any other value of sec-ch-prefers-color-scheme', () => {
    const headers = new Headers();
    headers.set('sec-ch-prefers-color-scheme', 'unknown-value');

    const result = getInitialTheme(headers);
    expect(result).toBe('light');
  });
});
