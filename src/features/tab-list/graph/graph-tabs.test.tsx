import { screen } from '@testing-library/react';

import { renderWithProviders } from '@/tests/setup/render-router';

import { GraphTabs, GraphTabValue } from './graph-tabs';

vi.mock('@/features/client-endpoint/client-endpoint', () => {
  const MockClientEndpoint = () => (
    <div data-testid="client-endpoint">ClientEndpoint</div>
  );
  MockClientEndpoint.displayName = 'MockClientEndpoint';

  return { default: MockClientEndpoint };
});
vi.mock('@/features/client-headers/client-headers', () => {
  const MockClientHeaders = () => (
    <div data-testid="client-headers">ClientHeaders</div>
  );
  MockClientHeaders.displayName = 'MockClientHeaders';

  return { default: MockClientHeaders };
});

describe('GraphTabs', () => {
  it('should render UrlTap component correctly', () => {
    const UrlTap = GraphTabs.find(
      tab => tab.name === GraphTabValue.URL
    )?.renderComponent;

    if (UrlTap) {
      renderWithProviders(<UrlTap />);
    } else {
      throw new Error('UrlTap component is undefined');
    }

    expect(screen.getAllByTestId('client-endpoint')).toHaveLength(2);
  });

  it('should render HeadersTab component correctly', () => {
    const HeadersTab = GraphTabs.find(
      tab => tab.name === GraphTabValue.HEADERS
    )?.renderComponent;

    if (HeadersTab) {
      renderWithProviders(<HeadersTab />);
    } else {
      throw new Error('HeadersTab component is undefined');
    }

    expect(screen.getByTestId('client-headers')).toBeInTheDocument();
  });

  it('should render VariablesTab component correctly', () => {
    const VariablesTab = GraphTabs.find(
      tab => tab.name === GraphTabValue.VARIABLES
    )?.renderComponent;

    if (VariablesTab) {
      renderWithProviders(<VariablesTab />);
    } else {
      throw new Error('VariablesTab component is undefined');
    }

    expect(document.querySelector('.cm-editor')).toBeInTheDocument();
  });
});
