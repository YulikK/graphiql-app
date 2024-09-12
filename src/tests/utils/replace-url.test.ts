import { describe, expect, it, vi } from 'vitest';

import replaceUrl from '@/shared/utils/replace-url';

describe('replaceUrl', () => {
  beforeEach(() => {
    vi.spyOn(window.history, 'replaceState').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should call history.replaceState when url is provided', () => {
    const url = '/new-url';

    replaceUrl(url);

    expect(window.history.replaceState).toHaveBeenCalledWith(null, '', url);
  });

  it('should not call history.replaceState when url is undefined', () => {
    replaceUrl();

    expect(window.history.replaceState).not.toHaveBeenCalled();
  });
});
