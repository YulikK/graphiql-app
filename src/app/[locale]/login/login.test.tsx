import { cleanup, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { vi } from 'vitest';

import { renderWithProviders } from '@/shared/test-setup/render-router';

import LoginPage from './page';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: () => [null, false, null],
}));

type Translations = {
  [key: string]: string;
};

const translations: Translations = {
  title: 'Login',
  'email-input': 'Email',
  'password-input': 'Password',
  'sign-up-button': 'Sign In',
  'registration-text': "Don't have an account?",
  'registration-link': 'Sign Up',
  'google-text': 'Continue with Google',
  'authentication-loading': 'Wait, your authentication in progress',
  'success-login-message': 'Congratulations, you have successfully logged in!',
  'unexpected-error': 'An unexpected error occurred.',
  'email-required': 'Email is a required field',
  'email-invalid': 'Must be a valid email format',
};

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    return translations[key] || key;
  },
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('Login Page', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it('it render inputs and button', async () => {
    renderWithProviders(<LoginPage params={{ locale: 'en' }} />);

    const emailDiv = screen.getByTestId('email');
    const emailInput = emailDiv.querySelector('input[name="email"]');
    expect(emailInput).toBeInTheDocument();

    await userEvent.type(emailInput!, 'testgmail.com');

    const invalidError = await screen.findByText(translations['email-invalid']);
    expect(invalidError).toBeInTheDocument();

    await userEvent.clear(emailInput!);

    const requiredError = await screen.findByText(
      translations['email-required']
    );

    expect(requiredError).toBeInTheDocument();

    expect(screen.getByTestId('password')).toBeInTheDocument();
  });
});
