import { render, screen } from '@testing-library/react';

import Highlight from './highlight';

describe('Highlight', () => {
  it('renders without errors', () => {
    const props = {
      title: 'Test Title',
      description: 'Test Description',
      icon: '/path/to/icon.png',
    };

    render(<Highlight {...props} />);

    expect(screen.getByAltText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });
});
