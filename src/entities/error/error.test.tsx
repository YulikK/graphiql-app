import { render, screen } from '@testing-library/react';

import ErrorComponent from './error';

describe('ErrorComponent', () => {
  it('renders without errors', () => {
    render(<ErrorComponent />);

    expect(screen.getByText('text')).toBeInTheDocument();
    expect(screen.getByText('button')).toBeInTheDocument();
  });
});
