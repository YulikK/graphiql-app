import { screen } from '@testing-library/react';
import { vi } from 'vitest';

import { Loader } from '@/features/loader/loader';
import { renderWithProviders } from '@/tests/setup/render-router';

import RestLayout from './layout';

vi.mock('@/widgets/rest-client/rest-client', async importOriginal => {
  const actual = await importOriginal();

  return {
    ...(typeof actual === 'object' ? actual : {}),
    default: ({ children }: { children: React.ReactNode }) => (
      <div>
        RestClient
        {children}
      </div>
    ),
  };
});

describe('RestLayout', () => {
  it('renders children inside RestClient and Suspense', () => {
    renderWithProviders(
      <RestLayout>
        <div>Child Content</div>
      </RestLayout>
    );

    expect(screen.getByText('RestClient')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('shows Loader when Suspense is loading', () => {
    renderWithProviders(
      <RestLayout>
        <Loader />
      </RestLayout>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
