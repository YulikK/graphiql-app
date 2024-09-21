'use client';

import { useTranslations } from 'next-intl';

import Image from 'next/image';

import { Box, Button, Container, Typography } from '@mui/material';

import done from '@/assets/done.svg';
import { useHistoryRequest } from '@/shared/hooks/use-history-requests';
import { SavedGraphqlRequest, SavedRestRequest } from '@/shared/models/types';

export const restGet: SavedRestRequest = {
  body: '',
  browserUrl:
    '/en/GET/aHR0cHM6Ly9yaWNrYW5kbW9ydHlhcGkuY29tL2FwaS9jaGFyYWN0ZXIvP25hbWU9cmljayZzdGF0dXM9YWxpdmU?Content-type=application%2Fjson&Accept=*%2F*&Connection=keep-alive',
  headers: [
    ['Content-Type', 'application/json'],
    ['Accept', '*/*'],
    ['Connection', 'keep-alive'],
    ['', ''],
  ],
  id: 'dff6be53-e59e-4e63-8ef8-169d58e30489',
  method: 'GET',
  query: [
    ['name', 'rick'],
    ['status', 'alive'],
    ['', ''],
  ],
  status: 200,
  textMode: false,
  type: 'rest',
  url: 'https://rickandmortyapi.com/api/{{type}}/?name=rick&status=alive',
  variables: [
    ['type', 'character'],
    ['', ''],
  ],
};

export const restPost: SavedRestRequest = {
  body: '{\n  "userId": "{{user_id}}",\n  "title": "{{post_title}}",\n  "body": "{{post_body}}",\n  "status": "new"\n}',
  browserUrl:
    '/en/POST/aHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3Bvc3Rz/eyJ1c2VySWQiOiIxIiwidGl0bGUiOiJNeU5ld1Bvc3QiLCJib2R5IjoiVGhpc2lzdGhlYm9keW9mbXluZXdwb3N0Iiwic3RhdHVzIjoibmV3In0?Content-type=application%2Fjson&Accept=*%2F*&Connection=keep-alive',
  headers: [
    ['Content-type', 'application/json'],
    ['Accept', '*/*'],
    ['Connection', 'keep-alive'],
    ['', ''],
  ],
  id: '1a2add95-eeb6-4011-881c-8676f74e57b6',
  method: 'POST',
  query: [['', '']],
  status: 201,
  textMode: false,
  type: 'rest',
  url: 'https://jsonplaceholder.typicode.com/posts',
  variables: [
    ['user_id', '1'],
    ['post_title', 'My New Post'],
    ['post_body', 'This is the body of my new post'],
    ['', ''],
  ],
};

export const graphqlRequest: SavedGraphqlRequest = {
  browserUrl:
    '/en/graphql/aHR0cHM6Ly9yaWNrYW5kbW9ydHlhcGkuY29tL2dyYXBocWw/eyJxdWVyeSI6InF1ZXJ5ICgkbmFtZTogU3RyaW5nKSB7XG4gIGNoYXJhY3RlcnMgKGZpbHRlcjoge25hbWU6ICRuYW1lfSkge1xuICAgIHJlc3VsdHMge1xuICAgICAgbmFtZVxuICAgIH1cbiAgfVxufSIsInZhcmlhYmxlcyI6eyJuYW1lIjoiTW9ydHkifX0?Content-type=application%2Fjson&Connection=keep-alive',
  headers: [
    ['Content-type', 'application/json'],
    ['Connection', 'keep-alive'],
    ['', ''],
  ],
  id: '95030ebd-2e53-486e-957d-dc9e80a56daa',
  isTrySchemaDownload: true,
  query:
    'query ($name: String) {\n  characters (filter: {name: $name}) {\n    results {\n      name\n    }\n  }\n}',
  schema: '',
  status: 200,
  type: 'graphql',
  url: 'https://rickandmortyapi.com/graphql',
  urlDoc: 'https://rickandmortyapi.com/graphql?sdl',
  variables: '{\n  "name": "Morty"\n}',
};

const links = [
  { name: 'Rest Get', request: restGet, id: '1' },
  { name: 'Rest Post', request: restPost, id: '2' },
  { name: 'Graphql', request: graphqlRequest, id: '3' },
];

export default function Preview() {
  const t = useTranslations('WelcomePage');

  const { handleRequest } = useHistoryRequest();

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={6}
      paddingBlock={5}
    >
      <Typography variant="h4" textAlign={'center'} fontWeight={400}>
        {t('preview-title')}
      </Typography>
      <Typography variant="body1" width="70%" textAlign={'center'}>
        {t('preview-text')}
      </Typography>
      <Container
        sx={{
          display: 'flex',
          gap: '30px',
          justifyContent: 'center',
          '@media (max-width: 768px)': {
            flexWrap: 'wrap',
          },
        }}
      >
        {links.map(el => (
          <Button
            onClick={e => handleRequest(e, el.request)}
            key={el.id}
            variant="contained"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              padding: '20px 30px',
            }}
          >
            <Image src={done} alt={'done'} width={80} height={80} />
            <Typography variant="body1" textAlign={'center'} marginTop={'auto'}>
              {el.name}
            </Typography>
          </Button>
        ))}
      </Container>
    </Box>
  );
}
