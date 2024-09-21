import { screen } from '@testing-library/react';

import { renderWithProviders } from '@/tests/setup/render-router';

import RestResult from './page';

describe('RestResult', () => {
  it('renders CodeEditor with fetched data', async () => {
    const params = {
      locale: 'en',
      rest: [
        'GET',
        'aHR0cHM6Ly9hcGkudXJsLmNvbQ',
        'eyJxdWVyeSI6IiIsInZhcmlhYmxlcyI6IiJ9',
      ],
    };
    const searchParams = { 'Content-Type': 'application/json' };

    const component = await (async (): Promise<React.ReactElement> =>
      RestResult({ params, searchParams }))();

    renderWithProviders(<>{component}</>);

    const textbox = screen.getByRole('textbox');
    expect(textbox).toHaveAttribute('contenteditable', 'false');
  });
});
