import { cleanup, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { renderWithProviders } from '@/tests/setup/render-router';

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

  it('should render footer with required 3 links to developers github and RS School link, and required year', async () => {
    renderWithProviders(<Footer />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(4);

    const githubLinks = links.filter(link =>
      link.getAttribute('href')?.includes('github.com')
    );
    expect(githubLinks).toHaveLength(3);

    const rsLink = links.filter(link =>
      link.getAttribute('href')?.includes('rs.school')
    );
    expect(rsLink).toHaveLength(1);

    const year = screen.getByText(/2024/i);
    expect(year).toBeVisible();
  });
});
