import { screen } from '@testing-library/react';
import { ReactElement } from 'react';
import * as firebaseHooks from 'react-firebase-hooks/auth';

import { userMock } from '@/tests/setup/mocks/user-mock';
import { renderWithProviders } from '@/tests/setup/render-router';

import {
  testRouterPush,
  testUseLocale,
  testUseTranslations,
} from '../../../vitest.setup';

import GraphqlClient from './graphql-client';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
}));

describe('GraphqlClient', () => {
  beforeEach(() => {
    testUseLocale.mockReturnValue('en');
    testUseTranslations.mockReturnValue((key: string) => key);
  });

  it('renders Loader when loading', () => {
    vi.mocked(firebaseHooks.useAuthState).mockReturnValue([
      null,
      true,
      undefined,
    ]);

    renderWithProviders(<GraphqlClient>Child Content</GraphqlClient>);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('redirects to locale when not logged in', () => {
    vi.mocked(firebaseHooks.useAuthState).mockReturnValue([
      null,
      false,
      undefined,
    ]);

    renderWithProviders(<GraphqlClient>Child Content</GraphqlClient>);

    expect(testRouterPush).toHaveBeenCalledWith('/en');
  });

  it('renders children when logged in', () => {
    vi.mocked(firebaseHooks.useAuthState).mockReturnValue([
      userMock,
      false,
      undefined,
    ]);
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
