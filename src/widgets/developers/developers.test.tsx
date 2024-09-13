import { cleanup, screen } from '@testing-library/react';
import { vi } from 'vitest';

import * as text from '@/shared/locales/messages/en.json';
import { renderWithProviders } from '@/shared/test-setup/render-router';

import Developers from './developers';

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

  it('should render the Developers component with provided data', async () => {
    renderWithProviders(<Developers />);

    const name: string = JSON.parse(
      translations['developers-names'].replace(/'/g, '"')
    )[0];

    const description: string = JSON.parse(
      translations['developers-roles'].replace(/'/g, '"')
    )[0];

    const nameElement = screen.getByText(name);
    const descriptionElement = screen.getByText(description);

    expect(nameElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });
});
