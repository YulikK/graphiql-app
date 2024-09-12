import { cleanup, screen } from '@testing-library/react';
import { vi } from 'vitest';

import * as text from '@/shared/locales/messages/en.json';
import { renderWithProviders } from '@/shared/test-setup/render-router';

import Header from './header';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: () => [{}, false, null],
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

  it('header component render right data with authorized user', async () => {
    renderWithProviders(<Header />);

    const signOutButton = screen.getByText(translations['sign-out']);
    expect(signOutButton).toBeInTheDocument();
  });
});
