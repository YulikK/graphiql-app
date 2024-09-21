import { render, screen } from '@testing-library/react';

import { Logo } from './logo';

describe('Logo', () => {
  it('renders without errors', () => {
    render(<Logo />);

    expect(screen.getByAltText('Logo')).toBeInTheDocument();
  });
});
