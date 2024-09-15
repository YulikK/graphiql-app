import { cleanup, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { vi } from 'vitest';

import * as text from '@/shared/locales/messages/en.json';
import { renderWithProviders } from '@/tests/setup/render-router';

import Preview, { graphqlRequest, restGet, restPost } from './preview';

vi.unmock('@/shared/hooks/redux-hooks');

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: () => [{}, false, null],
}));

type Translations = {
  [key: string]: string;
};

const translations: Translations = text['WelcomePage'];

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    return translations[key] || key;
  },
}));

const routerPushMock = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: routerPushMock,
  }),
}));

describe('Preview component', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it('should render Preview with 3 buttons and navigate to the correct URL when the button is clicked', async () => {
    renderWithProviders(<Preview />);

    const links = screen.getAllByRole('button');
    expect(links).toHaveLength(3);

    await userEvent.click(links[0]);
    expect(routerPushMock).toHaveBeenCalledWith(restGet.browserUrl);

    await userEvent.click(links[1]);
    expect(routerPushMock).toHaveBeenCalledWith(restPost.browserUrl);

    await userEvent.click(links[2]);
    expect(routerPushMock).toHaveBeenCalledWith(graphqlRequest.browserUrl);
  });
});
