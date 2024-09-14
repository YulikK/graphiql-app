import { fireEvent, screen, waitFor } from '@testing-library/react';

import { TEST_GRAPH_SCHEMA_200 } from '@/shared/test-setup/msw/handlers/graph';
import { renderWithProviders } from '@/shared/test-setup/render-router';

import { testUseAppSelector } from '../../../vitest.setup';

import { Docs } from './docs';

vi.mock('@graphiql/react', () => ({
  GraphiQLProvider: vi.fn(({ children }) => <div>{children}</div>),
  useTheme: vi.fn(() => ({ setTheme: vi.fn() })),
}));

vi.mock('@graphiql/toolkit', () => ({
  createGraphiQLFetcher: vi.fn(),
}));

describe('Docs', () => {
  it('renders the Docs component', () => {
    renderWithProviders(<Docs />);
    expect(screen.getByLabelText('show-doc')).toBeInTheDocument();
  });

  it('opens and closes the documentation drawer', async () => {
    testUseAppSelector.mockReturnValueOnce(TEST_GRAPH_SCHEMA_200);

    renderWithProviders(<Docs />);
    fireEvent.click(screen.getByRole('button', { name: /show-doc/i }));

    await waitFor(() =>
      expect(screen.getByRole('presentation')).toBeInTheDocument()
    );

    fireEvent.click(screen.getByRole('button', { name: /show-doc/i }));
    await waitFor(() =>
      expect(screen.queryByTestId('presentation')).not.toBeInTheDocument()
    );
  });
});
