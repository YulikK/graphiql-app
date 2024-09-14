import { screen } from '@testing-library/react';

import { renderWithProviders } from '@/shared/test-setup/render-router';

import { ResizeVertical } from './resize-vertical';

vi.mock('@/shared/contexts/resize-provider', () => ({
  ResizeProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock('allotment', () => {
  const Allotment = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  );
  Allotment.displayName = 'Allotment';

  const Pane = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  );
  Pane.displayName = 'Pane';

  Allotment.Pane = Pane;

  return { Allotment };
});

describe('ResizeVertical', () => {
  it('should render both panes', () => {
    renderWithProviders(
      <ResizeVertical
        pane1={<div data-testid="pane1">Pane 1</div>}
        pane2={<div data-testid="pane2">Pane 2</div>}
      />
    );

    expect(screen.getByTestId('pane1')).toBeInTheDocument();
    expect(screen.getByTestId('pane2')).toBeInTheDocument();
  });
});
