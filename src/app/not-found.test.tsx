import { waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '@/tests/setup/render-router';

import { testRouterPush } from '../../vitest.setup';

import NotFound from './not-found';

describe('NotFound', () => {
  it('redirects to /en/notFound', async () => {
    renderWithProviders(<NotFound />);

    await waitFor(() => {
      expect(testRouterPush).toHaveBeenCalledWith('/en/notFound');
    });
  });
});
