import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '@/tests/setup/render-router';

import WelcomePage from './page';

vi.mock('@mui/material', async importOriginal => {
  const actual = await importOriginal();

  if (typeof actual === 'object' && actual !== null) {
    return {
      ...(actual as object),
      Container: ({ children }: { children: React.ReactNode }) => (
        <div>{children}</div>
      ),
    };
  }

  return actual;
});

vi.mock('@/entities/teams/teams', () => ({
  Teams: () => <div>Teams Component</div>,
}));

vi.mock('@/widgets/about-course/about-course', async importOriginal => {
  const actual = await importOriginal();

  return {
    ...(typeof actual === 'object' && actual !== null ? actual : {}),
    default: () => <div>AboutCourse Component</div>,
  };
});

vi.mock('@/widgets/developers/developers', async importOriginal => {
  const actual = await importOriginal();

  if (typeof actual === 'object' && actual !== null) {
    return {
      ...actual,
      default: () => <div>Developers Component</div>,
    };
  }

  return actual;
});

vi.mock('@/widgets/highlights/highlights', async importOriginal => {
  const actual = await importOriginal();

  if (typeof actual === 'object' && actual !== null) {
    return {
      ...actual,
      default: () => <div>Highlights Component</div>,
    };
  }

  return actual;
});

vi.mock('@/widgets/welcome/welcome', async importOriginal => {
  const actual = await importOriginal();

  if (typeof actual === 'object' && actual !== null) {
    return {
      ...actual,
      default: ({ locale }: { locale: string }) => (
        <div>Welcome Component with locale: {locale}</div>
      ),
    };
  }

  return actual;
});

describe('WelcomePage', () => {
  it('renders without errors', () => {
    const locale = 'en';

    renderWithProviders(<WelcomePage params={{ locale }} />);

    expect(
      screen.getByText(`Welcome Component with locale: ${locale}`)
    ).toBeInTheDocument();
    expect(screen.getByText('Highlights Component')).toBeInTheDocument();
    expect(screen.getByText('Teams Component')).toBeInTheDocument();
    expect(screen.getByText('Developers Component')).toBeInTheDocument();
    expect(screen.getByText('AboutCourse Component')).toBeInTheDocument();
  });
});
