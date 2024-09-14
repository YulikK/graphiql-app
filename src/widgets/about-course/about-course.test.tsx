import { cleanup, screen } from '@testing-library/react';
import { vi } from 'vitest';

import * as text from '@/shared/locales/messages/en.json';
import { renderWithProviders } from '@/tests/setup/render-router';

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

describe('AboutCourse component', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it('should render the AboutCourse component with provided data', async () => {
    renderWithProviders(<AboutCourse />);

    const title = screen.getByText(translations['about-title']);
    const description = screen.getByText(translations['about-description']);

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
