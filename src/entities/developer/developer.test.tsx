import { StaticImageData } from 'next/image';

import { render, screen } from '@testing-library/react';

import Developer from './developer';

describe('Developer', () => {
  it('renders without errors', () => {
    const props = {
      name: 'John Doe',
      role: 'Frontend Developer',
      skills: 'JavaScript, React, CSS',
      photo: '/path/to/photo.jpg' as unknown as StaticImageData,
      tech: ['JavaScript', 'React', 'CSS'],
    };

    render(<Developer {...props} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByText('JavaScript, React, CSS')).toBeInTheDocument();
    props.tech.forEach(tech => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });
  });
});
