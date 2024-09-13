import { render, screen } from '@testing-library/react';
import { ReactElement } from 'react';

import GraphLayout from './layout';

vi.mock('@/widgets/graphql-client/graphql-client', async importOriginal => {
  const actual = await importOriginal();

  return {
    ...(typeof actual === 'object' ? actual : {}),
    default: ({ children }: { children: ReactElement }) => (
      <div>{children}</div>
    ),
  };
});

describe('GraphLayout', () => {
  it('renders children with GraphqlClient and Loader', () => {
    render(
      <GraphLayout>
        <div>Child Content</div>
      </GraphLayout>
    );

    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });
});
