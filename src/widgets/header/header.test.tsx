import { cleanup, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import * as firebaseHooks from 'react-firebase-hooks/auth';
import { vi } from 'vitest';

import * as text from '@/shared/locales/messages/en.json';
import { userMock } from '@/tests/setup/mocks/userMock';
import { renderWithProviders } from '@/tests/setup/render-router';

import Header from './header';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
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

  it('should render header component with sign-out button for authorized users', async () => {
    vi.mocked(firebaseHooks.useAuthState).mockReturnValue([
      userMock,
      false,
      undefined,
    ]);

    renderWithProviders(<Header />);

    const signOutButton = screen.getByText(translations['sign-out']);
    expect(signOutButton).toBeInTheDocument();
  });

  it('should render header component with sign-in button for unauthorized users', async () => {
    vi.mocked(firebaseHooks.useAuthState).mockReturnValue([
      null,
      false,
      undefined,
    ]);

    renderWithProviders(<Header />);

    const signInButton = screen.getByText(translations['sign-in']);
    expect(signInButton).toBeInTheDocument();
  });

  it('should change language when a language menu item is clicked', async () => {
    vi.mocked(firebaseHooks.useAuthState).mockReturnValue([
      null,
      false,
      undefined,
    ]);

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
  });
});
