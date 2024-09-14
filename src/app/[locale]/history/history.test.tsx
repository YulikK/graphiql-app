import { cleanup, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { vi } from 'vitest';

import * as text from '@/shared/locales/messages/en.json';
import { savedRequestsMock } from '@/tests/setup/mocks/savedRequestsMock';
import { renderWithProviders } from '@/tests/setup/render-router';

import History from './page';

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: () => [{}, false, null],
}));

type Translations = {
  [key: string]: string;
};

const translations: Translations = text['HistoryPage'];

vi.mock('next-intl', async () => ({
  useTranslations: () => (key: string) => {
    return translations[key] || key;
  },
  useLocale: () => 'en',
}));

const routerPushMock = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: routerPushMock,
  }),
}));

vi.mock('@/shared/hooks/use-local-storage', () => ({
  useLocalStorage: () => ({
    getStorage: () => savedRequestsMock,
    setStorage: vi.fn(),
    removeStorage: vi.fn(),
  }),
}));

describe('History Page', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it('should render the History page with correct data, when Local Storage is not empty', async () => {
    renderWithProviders(<History params={{ locale: 'en' }} />);

    const title = screen.getByText(translations['title']);
    expect(title).toBeInTheDocument();

    const list = screen.getAllByRole('listitem');
    expect(list).toHaveLength(4);

    const removeItemButton = screen.getAllByRole('button', {
      name: /delete/i,
    })[0];
    expect(removeItemButton).toBeInTheDocument();
  });

  it('should remove a single history item, when RemoveItem button is clicked', async () => {
    renderWithProviders(<History params={{ locale: 'en' }} />);

    const initialList = screen.getAllByRole('listitem');
    expect(initialList).toHaveLength(4);

    const removeItemButton = screen.getAllByRole('button', {
      name: /delete/i,
    })[0];
    await userEvent.click(removeItemButton);

    const updatedList = screen.getAllByRole('listitem');
    expect(updatedList).toHaveLength(3);
  });

  it('should clear all history items and display empty message, when ClearAll button is clicked', async () => {
    renderWithProviders(<History params={{ locale: 'en' }} />);

    const clearAllButton = screen.getByText(translations['button']);
    await userEvent.click(clearAllButton);

    const emptyHistoryMessage = screen.getByText(translations['empty-text']);
    expect(emptyHistoryMessage).toBeVisible();
  });
});
