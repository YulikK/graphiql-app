import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://swapi.dev/api/people', () => HttpResponse.json({})),
];
