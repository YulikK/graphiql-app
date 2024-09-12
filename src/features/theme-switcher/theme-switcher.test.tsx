import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { renderWithProviders } from '@/shared/test-setup/render-router';

import { ThemeSwitcher } from './theme-switcher';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: () => [null, false, null],
}));

const toggleThemeMock = vi.fn();

vi.mock('@/shared/contexts/contexts', async importOriginal => {
  const actual = (await importOriginal()) as {
    useTheme: () => {
      toggleTheme: () => void;
      darkMode: boolean;
    };
  };

  return {
    ...(actual ?? {}),
    useTheme: vi.fn(() => ({
      ...actual.useTheme(),
      toggleTheme: toggleThemeMock,
      darkMode: false,
    })),
  };
});

describe('Theme-switcher component', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it('component change theme when is toggled', async () => {
    renderWithProviders(<ThemeSwitcher />);

    const checkbox = await screen.findByRole('checkbox');

    const image = screen.getByRole('img');
    const src = image.getAttribute('src');
    expect(src).includes('sun.png');

    await userEvent.click(checkbox);

    expect(toggleThemeMock).toHaveBeenCalled();
  });
});
