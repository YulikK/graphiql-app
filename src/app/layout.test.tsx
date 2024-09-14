import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import RootLayout from './layout';

vi.mock('next/headers', () => ({
  headers: vi.fn(),
}));

vi.mock('@mui/material-nextjs/v13-appRouter', () => ({
  AppRouterCacheProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock('@/shared/contexts/alert-context', () => ({
  AlertProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock('@/shared/contexts/history-context', () => ({
  HistoryProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock('@/shared/contexts/index.ts', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock('@/shared/contexts/theme-provider', () => ({
  ThemeAppProvider: ({
    children,
    initTheme,
  }: {
    children: React.ReactNode;
    initTheme: boolean;
  }) => <div>{children}</div>,
}));

vi.mock('@/shared/store/store-providers', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock('@/shared/theme/styled-root.tsx', () => ({
  StyledRoot: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock('@/shared/utils/get-init-theme', () => ({
  getInitialTheme: vi.fn().mockReturnValue(true),
}));

describe('RootLayout', () => {
  it('renders without errors', () => {
    const children = <div>Test Children</div>;

    render(<RootLayout>{children}</RootLayout>);

    expect(screen.getByText('Test Children')).toBeInTheDocument();
  });
});
