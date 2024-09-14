import { render, screen } from '@testing-library/react';

import Loading from './loading';

describe('Loading', () => {
  it('renders the Loader component', () => {
    render(<Loading />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
