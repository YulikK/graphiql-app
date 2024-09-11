import { cleanup, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { vi } from 'vitest';

import { UseLoginFormReturn } from '@/shared/hooks/use-login-form';
import { renderWithProviders } from '@/shared/test-setup/render-router';

import LoginPage from './page';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: () => [null, false, null],
}));

type Translations = {
  [key: string]: string;
};

const onSubmitMock = vi.fn();
const onGoogleSubmitMock = vi.fn();

vi.mock('@/shared/hooks/use-login-form', async importOriginal => {
  const actual = (await importOriginal()) as {
    useLoginForm: () => UseLoginFormReturn;
  };

  return {
    ...(actual ?? {}),
    useLoginForm: vi.fn(() => ({
      ...actual.useLoginForm(),
      onSubmit: onSubmitMock,
      onGoogleSubmit: onGoogleSubmitMock,
    })),
  };
});

const translations: Translations = {
  title: 'Login',
  'sign-up-button': 'Sign In',
  'registration-text': "Don't have an account?",
  'google-text': 'Continue with Google',
  'email-required': 'Email is a required field',
  'email-invalid': 'Must be a valid email format',
  'password-required': 'Password is a required field',
  'password-min-length': 'Password must be at least {min} characters long',
  'password-strength':
    'Password must contain 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character',
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

  it('Login page render right data', async () => {
    renderWithProviders(<LoginPage params={{ locale: 'en' }} />);

    const title = screen.getByText('Login');
    const text = screen.getByText("Don't have an account?");
    expect(title).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });

  it('test for email input error', async () => {
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
  });

  it('test for password input error', async () => {
    renderWithProviders(<LoginPage params={{ locale: 'en' }} />);

    const passwordDiv = screen.getByTestId('password');
    const passwordInput = passwordDiv.querySelector('input[name="password"]');

    await userEvent.type(passwordInput!, '12345');

    const minLengthError = await screen.findByText(
      translations['password-min-length']
    );
    expect(minLengthError).toBeInTheDocument();

    await userEvent.clear(passwordInput!);

    const requiredError = await screen.findByText(
      translations['password-required']
    );
    expect(requiredError).toBeInTheDocument();

    await userEvent.type(passwordInput!, '12345QQ!');

    const strengthError = await screen.findByText(
      translations['password-strength']
    );
    expect(strengthError).toBeInTheDocument();
  });

  it('test inputs with correct data', async () => {
    renderWithProviders(<LoginPage params={{ locale: 'en' }} />);

    const emailDiv = screen.getByTestId('email');
    const emailInput = emailDiv.querySelector('input[name="email"]');

    const passwordDiv = screen.getByTestId('password');
    const passwordInput = passwordDiv.querySelector('input[name="password"]');

    const submitButton = screen.getByRole('button', { name: /sign in/i });

    expect(submitButton).toBeDisabled();

    await userEvent.type(emailInput!, 'test@gmail.com');
    await userEvent.type(passwordInput!, '123456Qq!');

    expect(submitButton).not.toBeDisabled();

    await userEvent.click(submitButton);

    expect(onSubmitMock).toHaveBeenCalled();
  });

  it('test google auth', async () => {
    renderWithProviders(<LoginPage params={{ locale: 'en' }} />);

    const googleButton = screen.getByText(translations['google-text']);

    await userEvent.click(googleButton);

    expect(onGoogleSubmitMock).toHaveBeenCalled();
  });
});
