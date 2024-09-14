import { fireEvent, screen, waitFor } from '@testing-library/react';

import {
  TEST_GRAPH_SCHEMA_200,
  testGraphQLSchema,
} from '@/shared/test-setup/msw/handlers/graph';
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
  beforeEach(() => {
    testUseAppSelector
      .mockReturnValueOnce(TEST_GRAPH_SCHEMA_200)
      .mockReturnValueOnce(testGraphQLSchema);
  });

  it('opens the documentation drawer', async () => {
    testUseAppSelector
      .mockReturnValueOnce(TEST_GRAPH_SCHEMA_200)
      .mockReturnValueOnce(testGraphQLSchema);

    renderWithProviders(<Docs />);
    fireEvent.click(screen.getByRole('button', { name: /show-doc/i }));

    await waitFor(() =>
      expect(screen.getByRole('presentation')).toBeInTheDocument()
    );
  });
});
