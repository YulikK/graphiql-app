import { render, screen } from '@testing-library/react';

import Principle from './principle';

describe('Principle', () => {
  it('renders without errors', () => {
    const props = {
      principle: 'Test Principle',
      description: 'Test Description',
      icon: '/path/to/icon.png',
    };

    render(<Principle {...props} />);

    expect(screen.getByAltText('Test Principle')).toBeInTheDocument();
    expect(screen.getByText('Test Principle')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });
});
