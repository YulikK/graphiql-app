import { cleanup, screen } from '@testing-library/react';
import { vi } from 'vitest';

import * as text from '@/shared/locales/messages/en.json';
import { renderWithProviders } from '@/tests/setup/render-router';

import Highlights from './highlights';

type Translations = {
  [key: string]: string;
};

const translations: Translations = text['WelcomePage'];

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    return translations[key] || key;
  },
}));

describe('Highlights component', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it('should render the Highlights component with provided data', async () => {
    vi.mock('react-firebase-hooks/auth', () => ({
      useAuthState: () => [null, false, null],
    }));

    renderWithProviders(<Highlights />);

    const title: string = JSON.parse(
      translations['highlights-names'].replace(/'/g, '"')
    )[0];

    const description: string = JSON.parse(
      translations['highlights-descriptions'].replace(/'/g, '"')
    )[0];

    const titleElement = screen.getByText(title);
    const descriptionElement = screen.getByText(description);

    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });
});
