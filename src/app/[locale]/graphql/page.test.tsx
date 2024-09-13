import { render } from '@testing-library/react';

import GraphPage from './page';

describe('GraphPage', () => {
  it('renders without crashing', () => {
    render(<GraphPage />);
  });
});
