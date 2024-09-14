import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import LocaleLayout from './layout';

vi.mock('next-intl/server', () => ({
  getMessages: vi.fn().mockResolvedValue({}),
}));

vi.mock('next-intl', () => ({
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock('@mui/material', () => ({
  Container: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock('@/entities/bg-container/bg-container', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock('@/widgets/footer/footer.tsx', () => ({
  default: () => <div>Footer Component</div>,
}));

vi.mock('@/widgets/header/header.tsx', () => ({
  default: () => <div>Header Component</div>,
}));

describe('LocaleLayout', () => {
  it('renders without errors', async () => {
    const children = <div>Test Children</div>;

    render(await LocaleLayout({ children }));

    expect(screen.getByText('Header Component')).toBeInTheDocument();
    expect(screen.getByText('Footer Component')).toBeInTheDocument();
    expect(screen.getByText('Test Children')).toBeInTheDocument();
  });
});
