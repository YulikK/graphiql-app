import { cleanup, screen } from '@testing-library/react';
import { vi } from 'vitest';

import * as text from '@/shared/locales/messages/en.json';
import { renderWithProviders } from '@/shared/test-setup/render-router';

import AboutCourse from './about-course';

type Translations = {
  [key: string]: string;
};

const translations: Translations = text['WelcomePage'];

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: () => [null, false, null],
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    return translations[key] || key;
  },
}));

describe('Developers component', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it('Highlights component render right data', async () => {
    renderWithProviders(<AboutCourse />);

    const title = screen.getByText(translations['about-title']);
    const description = screen.getByText(translations['about-description']);

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
