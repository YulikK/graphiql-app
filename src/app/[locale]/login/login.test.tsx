import { cleanup, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { vi } from 'vitest';

import { UseLoginFormReturn } from '@/shared/hooks/use-login-form';
import * as text from '@/shared/locales/messages/en.json';
import { renderWithProviders } from '@/tests/setup/render-router';

import LoginPage from './page';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: () => [null, false, null],
}));

type Translations = {
  [key: string]: string;
};

const translations: Translations = {
  ...text['LoginPage'],
  ...text['Validation'],
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

  it('should render LoginPage with the correct title and text', async () => {
    renderWithProviders(<LoginPage params={{ locale: 'en' }} />);

    const title = screen.getByText(translations['title']);
    const text = screen.getByText(translations['registration-text']);
    expect(title).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });

  it('should display email input error messages for invalid and empty email', async () => {
    renderWithProviders(<LoginPage params={{ locale: 'en' }} />);

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

  it('should display password input error messages for invalid or empty password', async () => {
    renderWithProviders(<LoginPage params={{ locale: 'en' }} />);

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

  it('should enable submit button and submit form when all fields are filled correctly', async () => {
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
