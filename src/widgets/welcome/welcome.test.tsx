import { cleanup, screen } from '@testing-library/react';
import * as firebaseHooks from 'react-firebase-hooks/auth';
import { vi } from 'vitest';

import * as text from '@/shared/locales/messages/en.json';
import { userMock } from '@/tests/setup/mocks/userMock';
import { renderWithProviders } from '@/tests/setup/render-router';

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

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

describe('Welcome Component', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it('should render welcome message and authentication buttons for unauthorized users', async () => {
    vi.mocked(firebaseHooks.useAuthState).mockReturnValue([
      null,
      false,
      undefined,
    ]);

    renderWithProviders(<Welcome locale="en" />);

    const title = screen.getByText(translations['title-anonymous']);
    const signInButton = screen.getByTestId('sign-in');
    const signUpButton = screen.getByTestId('sign-up');

    expect(title).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();
  });

  it('should render the Welcome component with user-specific title and private buttons for authorized users', async () => {
    vi.mocked(firebaseHooks.useAuthState).mockReturnValue([
      userMock,
      false,
      undefined,
    ]);

    renderWithProviders(<Welcome locale="en" />);

    const title = screen.getByText(
      `${translations['title-registered']} ${userMock.displayName}`
    );
    const restButton = screen.getByTestId('rest');
    const graphqlButton = screen.getByTestId('graphql');
    const historyButton = screen.getByTestId('history');

    expect(title).toBeInTheDocument();
    expect(restButton).toBeInTheDocument();
    expect(graphqlButton).toBeInTheDocument();
    expect(historyButton).toBeInTheDocument();
  });
});
