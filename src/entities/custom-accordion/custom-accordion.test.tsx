import { render, screen } from '@testing-library/react';

import CustomAccordion from './custom-accordion';

describe('CustomAccordion', () => {
  it('renders without errors', () => {
    render(
      <CustomAccordion>
        <div>Child Content</div>
      </CustomAccordion>
    );

    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });
});
