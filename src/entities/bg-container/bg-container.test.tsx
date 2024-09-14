import { screen } from '@testing-library/react';

import { renderWithProviders } from '@/tests/setup/render-router';

import BgContainer from './bg-container';

describe('BgContainer', () => {
  it('renders without errors', () => {
    renderWithProviders(
      <BgContainer>
        <div>Child Content</div>
      </BgContainer>
    );

    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });
});
