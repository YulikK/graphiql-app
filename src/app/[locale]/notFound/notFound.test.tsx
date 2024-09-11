import { cleanup, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { renderWithProviders } from '@/shared/test-setup/render-router';

import NotFound from './page';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: () => [null, false, null],
}));

type Translations = {
  [key: string]: string;
};

const translations: Translations = {
  text: 'We searched high and low but couldn`t find what are you looking for. Lets find a better place for you to go.',
  button: 'Go back to Home',
};

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    return translations[key] || key;
  },
}));

describe('404 Page', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it('404 page render right data', async () => {
    renderWithProviders(<NotFound />);

    const text = screen.getByText(translations['text']);
    const button = screen.getByText(translations['button']);

    expect(text).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
