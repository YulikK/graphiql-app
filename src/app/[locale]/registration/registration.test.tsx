import { cleanup, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { vi } from 'vitest';

import { useRegistrationFormReturn } from '@/shared/hooks/use-registration-form';
import * as text from '@/shared/locales/messages/en.json';
import { renderWithProviders } from '@/shared/test-setup/render-router';

import RegistrationPage from './page';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: () => [null, false, null],
}));

type Translations = {
  [key: string]: string;
};

const translations: Translations = {
  ...text['RegistrationPage'],
  ...text['Validation'],
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

  it('should render RegistrationPage with the correct title and text', async () => {
    renderWithProviders(<RegistrationPage params={{ locale: 'en' }} />);

    const title = screen.getByText(translations['title']);
    const text = screen.getByText(translations['login-text']);
    expect(title).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });

  it('should display name input error messages for invalid and empty input', async () => {
    renderWithProviders(<RegistrationPage params={{ locale: 'en' }} />);

    const nameDiv = screen.getByTestId('name');
    const nameInput = nameDiv.querySelector('input[name="name"]');
    expect(nameInput).toBeInTheDocument();

    await userEvent.type(nameInput!, 'yuliya');

    const capitalizedError = await screen.findByText(
      translations['name-capitalized']
    );
    expect(capitalizedError).toBeVisible();

    await userEvent.clear(nameInput!);

    const requiredError = await screen.findByText(
      translations['name-required']
    );

    expect(requiredError).toBeVisible();
  });

  it('should display email input error messages for invalid and empty email', async () => {
    renderWithProviders(<RegistrationPage params={{ locale: 'en' }} />);

    const emailDiv = screen.getByTestId('email');
    const emailInput = emailDiv.querySelector('input[name="email"]');
    expect(emailInput).toBeInTheDocument();

    await userEvent.type(emailInput!, 'testgmail.com');

    const invalidError = await screen.findByText(translations['email-invalid']);
    expect(invalidError).toBeVisible();

    await userEvent.clear(emailInput!);

    const requiredError = await screen.findByText(
      translations['email-required']
    );

    expect(requiredError).toBeVisible();
  });

  it('should display password input error messages for invalid, empty password or shorter than the minimum length password', async () => {
    renderWithProviders(<RegistrationPage params={{ locale: 'en' }} />);

    const passwordDiv = screen.getByTestId('password');
    const passwordInput = passwordDiv.querySelector('input[name="password"]');

    await userEvent.type(passwordInput!, '12345');

    const minLengthError = await screen.findByText(
      translations['password-min-length']
    );
    expect(minLengthError).toBeVisible();

    await userEvent.clear(passwordInput!);

    const requiredError = await screen.findByText(
      translations['password-required']
    );
    expect(requiredError).toBeVisible();

    await userEvent.type(passwordInput!, '12345QQ!');

    const strengthError = await screen.findByText(
      translations['password-strength']
    );
    expect(strengthError).toBeVisible();
  });

  it('should display password confirm input error when passwords do not match', async () => {
    renderWithProviders(<RegistrationPage params={{ locale: 'en' }} />);

    const passwordDiv = screen.getByTestId('password');
    const passwordInput = passwordDiv.querySelector('input[name="password"]');

    await userEvent.type(passwordInput!, '123456Qq!');

    const passwordConfirmDiv = screen.getByTestId('password-confirm');
    const passwordConfirmInput = passwordConfirmDiv.querySelector(
      'input[name="confirmPassword"]'
    );

    await userEvent.type(passwordConfirmInput!, '123455Qq!');

    const matchError = screen.getByText(translations['passwords-must-match']);

    expect(matchError).toBeVisible();
  });

  it('should display accept terms error when checkbox is not checked', async () => {
    renderWithProviders(<RegistrationPage params={{ locale: 'en' }} />);

    const checkboxDiv = screen.getByTestId('accept-terms');
    const checkbox = checkboxDiv.querySelector('input[type="checkbox"]');

    await userEvent.click(checkbox!);
    await userEvent.click(checkbox!);

    const requiredError = await screen.findByText(translations['accept-term']);
    expect(requiredError).toBeVisible();
  });

  it('should enable submit button and submit form when all fields are filled correctly', async () => {
    renderWithProviders(<RegistrationPage params={{ locale: 'en' }} />);

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
