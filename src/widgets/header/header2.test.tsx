import { cleanup, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { vi } from 'vitest';

import * as text from '@/shared/locales/messages/en.json';
import { renderWithProviders } from '@/shared/test-setup/render-router';

import Header from './header';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: () => [null, false, null],
}));

const routerReplaceMock = vi.fn();

vi.mock('next/navigation', async importOriginal => {
  const actual = await importOriginal();

  return {
    ...(actual ?? {}),
    useRouter: () => ({
      push: vi.fn(),
      replace: routerReplaceMock,
    }),
    usePathname: () => '/en',
    useSearchParams: () => new URLSearchParams('?param1=value1&param2=value2'),
  };
});

type Translations = {
  [key: string]: string;
};

const translations: Translations = text['Header'];

vi.mock('next-intl', async () => ({
  useTranslations: () => (key: string) => {
    return translations[key] || key;
  },
  useLocale: () => 'en',
}));

describe('Header component', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it('header component render right data with unauthorized user', async () => {
    renderWithProviders(<Header />);

    const langButton = screen.getByRole('button', { name: /en/i });

    await userEvent.click(langButton);

    const menuItems = screen.getAllByRole('menuitem');
    expect(menuItems).toHaveLength(2);

    const ruButton = screen.getByRole('menuitem', { name: /ru/i });
    expect(ruButton).toBeInTheDocument();

    await userEvent.click(ruButton);

    expect(routerReplaceMock).toHaveBeenCalledWith(
      '/ru?param1=value1&param2=value2'
    );

    const signInButton = screen.getByText(translations['sign-in']);
    expect(signInButton).toBeInTheDocument();
  });
});
