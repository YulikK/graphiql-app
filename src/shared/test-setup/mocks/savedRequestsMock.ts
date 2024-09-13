import { SavedGraphqlRequest, SavedRestRequest } from '@/shared/models/types';

export const savedRequestsMock: (SavedRestRequest | SavedGraphqlRequest)[] = [
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
    url: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
    browserUrl:
      '/en/graphql/aHR0cHM6Ly9zd2FwaS1ncmFwaHFsLm5ldGxpZnkuYXBwLy5uZXRsaWZ5L2Z1bmN0aW9ucy9pbmRleA/eyJxdWVyeSI6IntcbiAgYWxsRmlsbXMge1xuICAgIGZpbG1zIHtcbiAgICAgIHRpdGxlXG4gICAgfVxuICB9XG59IiwidmFyaWFibGVzIjoiIn0?Content-type=application%2Fjson',
    query: '{\n  allFilms {\n    films {\n      title\n    }\n  }\n}',
    headers: [['', '']],
    status: 200,
    variables: '',
    isTrySchemaDownload: true,
    schema: '{\n  "__schema": {\n    "queryType": {\n      ...',
    urlDoc: 'https://swapi-graphql.netlify.app/.netlify/functions/index?sdl',
  },
  {
    id: '4c0300e3-9c68-42e8-868f-8b38aa434093',
    type: 'graphql',
    url: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
    browserUrl:
      '/en/graphql/aHR0cHM6Ly9zd2FwaS1ncmFwaHFsLm5ldGxpZnkuYXBwLy5uZXRsaWZ5L2Z1bmN0aW9ucy9pbmRleA/eyJxdWVyeSI6IiIsInZhcmlhYmxlcyI6IiJ9?Content-type=application%2Fjson',
    query: '',
    headers: [['', '']],
    status: 400,
    variables: '',
    isTrySchemaDownload: true,
    schema: '{\n  "__schema": {\n    "queryType": {\n      ...',
    urlDoc: 'https://swapi-graphql.netlify.app/.netlify/functions/index?sdl',
  },
];
