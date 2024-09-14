import { screen } from '@testing-library/react';

import { renderWithProviders } from '@/tests/setup/render-router';

import { testUseAppDispatch } from '../../../../vitest.setup';

import { RestTabs, RestTabValue } from './rest-tabs';

vi.mock('@/features/client-headers/client-headers', () => {
  const MockClientHeaders = () => (
    <div data-testid="client-headers">ClientHeaders</div>
  );
  MockClientHeaders.displayName = 'MockClientHeaders';

  return { default: MockClientHeaders };
});

vi.mock('@/features/client-variables/client-variables', () => {
  const MockClientVariables = () => (
    <div data-testid="client-variables">ClientVariables</div>
  );
  MockClientVariables.displayName = 'MockClientVariables';

  return { default: MockClientVariables };
});

vi.mock('@/features/rest', () => ({
  RestQuery: () => <div data-testid="rest-query">RestQuery</div>,
  RestBody: () => <div data-testid="rest-body">RestBody</div>,
}));

describe('RestTabs', () => {
  it('should render QueryTap component correctly', () => {
    const QueryTap = RestTabs.find(
      tab => tab.name === RestTabValue.QUERY
    )?.renderComponent;

    if (QueryTap) {
      renderWithProviders(<QueryTap />);
    } else {
      throw new Error('QueryTap component is undefined');
    }

    expect(screen.getByTestId('rest-query')).toBeInTheDocument();
  });

  it('should render BodyTap component correctly', () => {
    const BodyTap = RestTabs.find(
      tab => tab.name === RestTabValue.BODY
    )?.renderComponent;

    if (BodyTap) {
      renderWithProviders(<BodyTap />);
    } else {
      throw new Error('BodyTap component is undefined');
    }

    expect(screen.getByTestId('rest-body')).toBeInTheDocument();
  });

  it('should render HeadersTab component correctly', () => {
    const HeadersTab = RestTabs.find(
      tab => tab.name === RestTabValue.HEADERS
    )?.renderComponent;

    if (HeadersTab) {
      renderWithProviders(<HeadersTab />);
    } else {
      throw new Error('HeadersTab component is undefined');
    }

    expect(screen.getByTestId('client-headers')).toBeInTheDocument();
  });

  it('should render VariablesTab component correctly', () => {
    const VariablesTab = RestTabs.find(
      tab => tab.name === RestTabValue.VARIABLES
    )?.renderComponent;

    if (VariablesTab) {
      const mockDispatch = vi.fn();
      testUseAppDispatch.mockReturnValue(mockDispatch);
      testUseAppDispatch.mockReturnValue('mocked variables');

      renderWithProviders(<VariablesTab />);

      expect(screen.getByTestId('client-variables')).toBeInTheDocument();
    } else {
      throw new Error('VariablesTab component is undefined');
    }
  });
});
