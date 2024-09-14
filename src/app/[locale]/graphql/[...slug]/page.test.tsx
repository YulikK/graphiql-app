import { screen } from '@testing-library/react';

import { renderWithProviders } from '@/shared/test-setup/render-router';

import GraphResult from './page';

describe('GraphResult', () => {
  it('renders CodeEditor with fetched data', async () => {
    const params = {
      slug: [
        'aHR0cHM6Ly9hcGkudXJsLmNvbQ',
        'eyJxdWVyeSI6IiIsInZhcmlhYmxlcyI6IiJ9',
      ],
    };
    const searchParams = { 'Content-Type': 'application/json' };

    const component = await (async (): Promise<React.ReactElement> =>
      GraphResult({ params, searchParams }))();

    renderWithProviders(<>{component}</>);

    const textbox = screen.getByRole('textbox');
    expect(textbox).toHaveAttribute('contenteditable', 'false');
  });
});
