import { fireEvent, render, screen } from '@testing-library/react';

import { TabsMap } from '@/shared/models/view';

import { SettingsTab } from './settings-tab';

vi.mock('@/features/tab-list/header/tab-list-header', () => ({
  TabListHeader: vi.fn(() => <div>Mocked TabListHeader</div>),
}));

vi.mock('@/features/tab-list/tab-panel-container/tab-panel-container', () => ({
  TabPanelContainer: vi.fn(({ children }) => <div>{children}</div>),
}));

describe('SettingsTab', () => {
  const mockTabs: TabsMap[] = [
    {
      index: 0,
      name: 'Tab 1',
      renderComponent: vi.fn(() => <div>Tab 1 Content</div>),
    },
    {
      index: 1,
      name: 'Tab 2',
      renderComponent: vi.fn(() => <div>Tab 2 Content</div>),
    },
  ];

  it('renders the SettingsTab component', () => {
    render(<SettingsTab tabPanelList={mockTabs} />);
    expect(screen.getByText('Mocked TabListHeader')).toBeInTheDocument();
    expect(screen.getByText('Tab 1 Content')).toBeInTheDocument();
  });

  it('switches tabs correctly', () => {
    render(<SettingsTab tabPanelList={mockTabs} />);
    const tabListHeader = screen.getByText('Mocked TabListHeader');
    fireEvent.click(tabListHeader);

    expect(screen.getByText('Tab 2 Content')).toBeInTheDocument();
  });
});
