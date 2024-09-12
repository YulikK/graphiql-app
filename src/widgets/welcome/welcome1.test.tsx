import { cleanup, screen } from '@testing-library/react';
import { vi } from 'vitest';

import * as text from '@/shared/locales/messages/en.json';
import { renderWithProviders } from '@/shared/test-setup/render-router';

import Welcome from './welcome';

type Translations = {
  [key: string]: string;
};

const translations: Translations = text['WelcomePage'];

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    return translations[key] || key;
  },
}));

describe('Welcome Component', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it('Welcome  render right data with unauthorized user', async () => {
    vi.mock('react-firebase-hooks/auth', () => ({
      useAuthState: () => [null, false, null],
    }));

    renderWithProviders(<Welcome locale="en" />);

    const title = screen.getByText(translations['title-anonymous']);
    const signInButton = screen.getByText(translations['sign-in']);
    const signUpButton = screen.getByText(translations['sign-up']);

    expect(title).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();
  });
});
