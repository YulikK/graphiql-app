import { fireEvent, screen } from '@testing-library/react';

import { TabsMap } from '@/shared/models/view';
import { renderWithProviders } from '@/shared/test-setup/render-router';

import { testUseResizeContext } from '../../../../vitest.setup';

import { TabListHeader } from './tab-list-header';

describe('TabListHeader', () => {
  const mockOnMaximize = vi.fn();
  const mockOnMinimize = vi.fn();
  const mockSetActiveTab = vi.fn();

  beforeEach(() => {
    testUseResizeContext.mockReturnValue({
      onMaximize: mockOnMaximize,
      onMinimize: mockOnMinimize,
      isPaneHide: false,
    });
  });

  const tabs: TabsMap[] = [
    {
      index: 0,
      name: 'Tab 1',
      location: 'Location 1',
      renderComponent: () => <div>Tab 1</div>,
    },
    {
      index: 1,
      name: 'Tab 2',
      location: 'Location 2',
      renderComponent: () => <div>Tab 2</div>,
    },
  ];

  it('should render tabs', () => {
    renderWithProviders(
      <TabListHeader
        tabs={tabs}
        activeTab={0}
        setActiveTab={mockSetActiveTab}
      />
    );

    expect(screen.getByText('Location 1')).toBeInTheDocument();
    expect(screen.getByText('Location 2')).toBeInTheDocument();
  });

  it('should call setActiveTab on tab change', () => {
    renderWithProviders(
      <TabListHeader
        tabs={tabs}
        activeTab={0}
        setActiveTab={mockSetActiveTab}
      />
    );

    fireEvent.click(screen.getByText('Location 2'));
    expect(mockSetActiveTab).toHaveBeenCalledWith(1);
  });

  it('should call onMaximize when tab is clicked and pane is hidden', () => {
    testUseResizeContext.mockReturnValue({
      onMaximize: mockOnMaximize,
      onMinimize: mockOnMinimize,
      isPaneHide: true,
    });

    renderWithProviders(
      <TabListHeader
        tabs={tabs}
        activeTab={0}
        setActiveTab={mockSetActiveTab}
      />
    );

    fireEvent.click(screen.getByText('Location 1'));
    expect(mockOnMaximize).toHaveBeenCalled();
  });

  it('should call onMinimize when panel visibility button is clicked and pane is visible', () => {
    renderWithProviders(
      <TabListHeader
        tabs={tabs}
        activeTab={0}
        setActiveTab={mockSetActiveTab}
      />
    );

    fireEvent.click(screen.getByLabelText('label-resize'));
    expect(mockOnMinimize).toHaveBeenCalled();
  });

  it('should call onMaximize when panel visibility button is clicked and pane is hidden', () => {
    testUseResizeContext.mockReturnValue({
      onMaximize: mockOnMaximize,
      onMinimize: mockOnMinimize,
      isPaneHide: true,
    });

    renderWithProviders(
      <TabListHeader
        tabs={tabs}
        activeTab={0}
        setActiveTab={mockSetActiveTab}
      />
    );

    fireEvent.click(screen.getByLabelText('label-resize'));
    expect(mockOnMaximize).toHaveBeenCalled();
  });

  it('should render Docs component if isGraph is true', () => {
    renderWithProviders(
      <TabListHeader
        tabs={tabs}
        activeTab={0}
        setActiveTab={mockSetActiveTab}
        isGraph={true}
      />
    );
    expect(
      screen.getByRole('button', { name: /show-doc/i })
    ).toBeInTheDocument();
  });
});
