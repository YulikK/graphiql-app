import { cleanup, screen } from '@testing-library/react';
import { vi } from 'vitest';

import * as text from '@/shared/locales/messages/en.json';
import { renderWithProviders } from '@/shared/test-setup/render-router';

import Welcome from './welcome';

const userName = 'Yuliya';

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

  it('Welcome component render right data with authorized user', async () => {
    vi.mock('react-firebase-hooks/auth', () => ({
      useAuthState: () => [{ displayName: userName }, false, null],
    }));

    renderWithProviders(<Welcome locale="en" />);

    const title = screen.getByText(
      `${translations['title-registered']} ${userName}`
    );
    const restButton = screen.getByText(translations['rest-client']);
    const graphqlButton = screen.getByText(translations['graphiql-client']);
    const historyButton = screen.getByText(translations['history']);

    expect(title).toBeInTheDocument();
    expect(restButton).toBeInTheDocument();
    expect(graphqlButton).toBeInTheDocument();
    expect(historyButton).toBeInTheDocument();
  });
});
