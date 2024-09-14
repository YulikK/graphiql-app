import { screen } from '@testing-library/react';
import React from 'react';

import { renderWithProviders } from '@/shared/test-setup/render-router';

import { ResizeHorizontal } from './resize-horizontal';

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

describe('ResizeHorizontal', () => {
  it('should render both panes', () => {
    renderWithProviders(
      <ResizeHorizontal
        pane1={<div data-testid="pane1">Pane 1</div>}
        pane2={<div data-testid="pane2">Pane 2</div>}
      />
    );

    expect(screen.getByTestId('pane1')).toBeInTheDocument();
    expect(screen.getByTestId('pane2')).toBeInTheDocument();
  });
});
