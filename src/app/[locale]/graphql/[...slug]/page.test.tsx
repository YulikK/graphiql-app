import { screen } from '@testing-library/react';

import { renderWithProviders } from '@/shared/test-setup/render-router';

import GraphResult from './page';

describe('GraphResult', () => {
  it('renders CodeEditor with fetched data', async () => {
    vi.mock('@/features/code-editor/code-editor', () => ({
      CodeEditor: ({
        value,
        isEdit,
        status,
      }: {
        value: string;
        isEdit: boolean;
        status: number;
      }) => (
        <div>
          <div>{value}</div>
          <div>{isEdit ? 'Editable' : 'Read-only'}</div>
          <div>{status}</div>
        </div>
      ),
    }));
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

    expect(screen.getByText('Read-only')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
  });
});
