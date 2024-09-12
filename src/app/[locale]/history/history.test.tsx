import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import * as text from '@/shared/locales/messages/en.json';
import { renderWithProviders } from '@/shared/test-setup/render-router';

import History from './page';

const savedRequestsMock = [
  {
    id: 'd877d58f-5aa9-4580-b106-408952c56d2b',
    type: 'rest',
    method: 'GET',
    url: 'https://swapi.dev/api/people/1',
    browserUrl:
      '/en/GET/aHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3BsZS8x?Content-type=application%2Fjson',
    query: [['', '']],
    headers: [['', '']],
    body: '',
    status: 200,
    textMode: false,
    variables: [['', '']],
  },
  {
    id: '3ca1599f-a164-4b58-9618-ebe013a85938',
    type: 'rest',
    method: 'GET',
    url: 'https://swapi.dev/api/peopl',
    browserUrl:
      '/en/GET/aHR0cHM6Ly9zd2FwaS5kZXYvYXBpL3Blb3Bs?Content-type=application%2Fjson',
    query: [['', '']],
    headers: [['', '']],
    body: '',
    status: 500,
    textMode: false,
    variables: [['', '']],
  },
  {
    id: 'df1add8d-cbce-4751-a77c-85a3518eb8d2',
    type: 'graphql',
    method: '',
    url: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
    browserUrl:
      '/en/graphql/aHR0cHM6Ly9zd2FwaS1ncmFwaHFsLm5ldGxpZnkuYXBwLy5uZXRsaWZ5L2Z1bmN0aW9ucy9pbmRleA/eyJxdWVyeSI6IntcbiAgYWxsRmlsbXMge1xuICAgIGZpbG1zIHtcbiAgICAgIHRpdGxlXG4gICAgfVxuICB9XG59IiwidmFyaWFibGVzIjoiIn0?Content-type=application%2Fjson',
    query: '{\n  allFilms {\n    films {\n      title\n    }\n  }\n}',
    headers: [['', '']],
    body: '',
    status: 200,
    textMode: false,
    variables: '',
    isTrySchemaDownload: true,
    schema: '{\n  "__schema": {\n    "queryType": {\n      ...',
    urlDoc: 'https://swapi-graphql.netlify.app/.netlify/functions/index?sdl',
  },
  {
    id: '4c0300e3-9c68-42e8-868f-8b38aa434093',
    type: 'graphql',
    method: '',
    url: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
    browserUrl:
      '/en/graphql/aHR0cHM6Ly9zd2FwaS1ncmFwaHFsLm5ldGxpZnkuYXBwLy5uZXRsaWZ5L2Z1bmN0aW9ucy9pbmRleA/eyJxdWVyeSI6IiIsInZhcmlhYmxlcyI6IiJ9?Content-type=application%2Fjson',
    query: '',
    headers: [['', '']],
    body: '',
    status: 400,
    textMode: false,
    variables: '',
    isTrySchemaDownload: true,
    schema: '{\n  "__schema": {\n    "queryType": {\n      ...',
    urlDoc: 'https://swapi-graphql.netlify.app/.netlify/functions/index?sdl',
  },
];

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: () => [{}, false, null],
}));

type Translations = {
  [key: string]: string;
};

const translations: Translations = text['HistoryPage'];

vi.mock('next-intl', async importOriginal => ({
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

  it('Login page render right data', async () => {
    renderWithProviders(<History params={{ locale: 'en' }} />);

    const title = screen.getByText(translations['title']);
    expect(title).toBeInTheDocument();

    const list = screen.getAllByRole('listitem');
    expect(list).toHaveLength(4);

    const removeItemButton = screen.getAllByRole('button', {
      name: /delete/i,
    })[0];
    expect(removeItemButton).toBeInTheDocument();

    await userEvent.click(removeItemButton);

    const updatedList = screen.getAllByRole('listitem');
    expect(updatedList).toHaveLength(3);

    const historyItem = screen.getAllByTestId('history-item')[0];
    await userEvent.click(historyItem);

    expect(routerPushMock).toHaveBeenCalled();

    const clearAllButton = screen.getByText(translations['button']);

    await userEvent.click(clearAllButton);

    const EmptyHistory = screen.getByText(translations['empty-text']);
    expect(EmptyHistory).toBeInTheDocument();
  });
});
