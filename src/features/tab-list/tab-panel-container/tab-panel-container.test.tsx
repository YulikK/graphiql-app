import { render, screen } from '@testing-library/react';

import { TabPanelContainer } from './tab-panel-container';

describe('TabPanelContainer', () => {
  it('should render children when value matches index', () => {
    render(
      <TabPanelContainer value={0} index={0}>
        <div data-testid="content">Content</div>
      </TabPanelContainer>
    );

    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('should not render children when value does not match index', () => {
    render(
      <TabPanelContainer value={1} index={0}>
        <div data-testid="content">Content</div>
      </TabPanelContainer>
    );

    expect(screen.queryByTestId('content')).toBeNull();
  });
});
