import { cleanup, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { renderWithProviders } from '@/shared/test-setup/render-router';

import Footer from './footer';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: () => [{}, false, null],
}));

describe('Footer component', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it('footer component render right data', async () => {
    renderWithProviders(<Footer />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(4);

    const year = screen.getByText(/2024/i);
    expect(year).toBeInTheDocument();
  });
});
