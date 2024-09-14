import { screen } from '@testing-library/react';
import { ReactElement } from 'react';

import { renderWithProviders } from '@/shared/test-setup/render-router';

import {
  testRouterPush,
  testUseAuth,
  testUseLocale,
  testUseTranslations,
} from '../../../vitest.setup';

import GraphqlClient from './graphql-client';

describe('GraphqlClient', () => {
  beforeEach(() => {
    testUseLocale.mockReturnValue('en');
    testUseTranslations.mockReturnValue((key: string) => key);
  });

  it('renders Loader when loading', () => {
    testUseAuth.mockReturnValue({ isLoggedIn: false, loading: true });

    renderWithProviders(<GraphqlClient>Child Content</GraphqlClient>);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('redirects to locale when not logged in', () => {
    testUseAuth.mockReturnValue({ isLoggedIn: false, loading: false });

    renderWithProviders(<GraphqlClient>Child Content</GraphqlClient>);

    expect(testRouterPush).toHaveBeenCalledWith('/en');
  });

  it('renders children when logged in', () => {
    testUseAuth.mockReturnValue({ isLoggedIn: true, loading: false });
    vi.mock('@/widgets/settings-tab/settings-tab', () => ({
      SettingsTab: () => <div>SettingsTab</div>,
    }));
    vi.mock('@/features/client-query/client-query', () => ({
      GraphQuery: () => <div>GraphQuery</div>,
    }));
    vi.mock('@/features/resize-horizontal/resize-horizontal', () => ({
      ResizeHorizontal: ({
        pane1,
        pane2,
      }: {
        pane1: ReactElement;
        pane2: ReactElement;
      }) => (
        <div>
          {pane1}
          {pane2}
        </div>
      ),
    }));
    vi.mock('@/features/resize-vertical/resize-vertical', () => ({
      ResizeVertical: ({
        pane1,
        pane2,
      }: {
        pane1: ReactElement;
        pane2: ReactElement;
      }) => (
        <div>
          {pane1}
          {pane2}
        </div>
      ),
    }));

    renderWithProviders(<GraphqlClient>Child Content</GraphqlClient>);

    expect(screen.getByText('SettingsTab')).toBeInTheDocument();
    expect(screen.getByText('GraphQuery')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });
});
