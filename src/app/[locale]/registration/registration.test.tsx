import { cleanup, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { vi } from 'vitest';

import { useRegistrationFormReturn } from '@/shared/hooks/use-registration-form';
import { renderWithProviders } from '@/shared/test-setup/render-router';

import LoginPage from './page';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: () => [null, false, null],
}));

type Translations = {
  [key: string]: string;
};

const onSubmitMock = vi.fn();

vi.mock('@/shared/hooks/use-registration-form', async importOriginal => {
  const actual = (await importOriginal()) as {
    useRegistrationForm: () => useRegistrationFormReturn;
  };

  return {
    ...(actual ?? {}),
    useRegistrationForm: vi.fn(() => ({
      ...actual.useRegistrationForm(),
      onSubmit: onSubmitMock,
    })),
  };
});

const translations: Translations = {
  title: 'Registration',
  'sign-up-button': 'Sign Up',
  'login-text': 'Already have an account?',
  'email-required': 'Email is a required field',
  'email-invalid': 'Must be a valid email format',
  'password-required': 'Password is a required field',
  'password-min-length': 'Password must be at least {min} characters long',
  'password-strength':
    'Password must contain 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character',
  'name-capitalized':
    'Name must start with a capital letter and be followed by lowercase letters',
  'name-required': 'Name is a required field',
  'passwords-must-match': 'Passwords must match',
  'accept-term': 'You must accept the terms and conditions',
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

describe('Registration Page', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it('Registration page render right data', async () => {
    renderWithProviders(<LoginPage params={{ locale: 'en' }} />);

    const title = screen.getByText(translations['title']);
    const text = screen.getByText(translations['login-text']);
    expect(title).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });

  it('test for name input error', async () => {
    renderWithProviders(<LoginPage params={{ locale: 'en' }} />);

    const nameDiv = screen.getByTestId('name');
    const nameInput = nameDiv.querySelector('input[name="name"]');
    expect(nameInput).toBeInTheDocument();

    await userEvent.type(nameInput!, 'yuliya');

    const capitalizedError = await screen.findByText(
      translations['name-capitalized']
    );
    expect(capitalizedError).toBeInTheDocument();

    await userEvent.clear(nameInput!);

    const requiredError = await screen.findByText(
      translations['name-required']
    );

    expect(requiredError).toBeInTheDocument();
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

  it('test for password confirm input error', async () => {
    renderWithProviders(<LoginPage params={{ locale: 'en' }} />);

    const passwordDiv = screen.getByTestId('password');
    const passwordInput = passwordDiv.querySelector('input[name="password"]');

    await userEvent.type(passwordInput!, '123456Qq!');

    const passwordConfirmDiv = screen.getByTestId('password-confirm');
    const passwordConfirmInput = passwordConfirmDiv.querySelector(
      'input[name="confirmPassword"]'
    );

    await userEvent.type(passwordConfirmInput!, '123455Qq!');

    const matchError = screen.getByText(translations['passwords-must-match']);

    expect(matchError).toBeInTheDocument();
  });

  it('test for acceptTerms confirm input error', async () => {
    renderWithProviders(<LoginPage params={{ locale: 'en' }} />);

    const checkboxDiv = screen.getByTestId('accept-terms');
    const checkbox = checkboxDiv.querySelector('input[type="checkbox"]');

    await userEvent.click(checkbox!);
    await userEvent.click(checkbox!);

    const requiredError = await screen.findByText(translations['accept-term']);
    expect(requiredError).toBeInTheDocument();
  });

  it('test inputs with correct data', async () => {
    renderWithProviders(<LoginPage params={{ locale: 'en' }} />);

    const submitButton = screen.getByRole('button', { name: /sign up/i });

    expect(submitButton).toBeDisabled();

    const emailDiv = screen.getByTestId('email');
    const emailInput = emailDiv.querySelector('input[name="email"]');

    const passwordDiv = screen.getByTestId('password');
    const passwordInput = passwordDiv.querySelector('input[name="password"]');

    const nameDiv = screen.getByTestId('name');
    const nameInput = nameDiv.querySelector('input[name="name"]');

    const passwordConfirmDiv = screen.getByTestId('password-confirm');
    const passwordConfirmInput = passwordConfirmDiv.querySelector(
      'input[name="confirmPassword"]'
    );

    const checkboxDiv = screen.getByTestId('accept-terms');
    const checkbox = checkboxDiv.querySelector('input[type="checkbox"]');

    await userEvent.type(emailInput!, 'test@gmail.com');
    await userEvent.type(passwordInput!, '123456Qq!');
    await userEvent.type(nameInput!, 'Yuliya');
    await userEvent.type(passwordConfirmInput!, '123456Qq!');
    await userEvent.click(checkbox!);

    expect(submitButton).not.toBeDisabled();

    await userEvent.click(submitButton);

    expect(onSubmitMock).toHaveBeenCalled();
  });
});
