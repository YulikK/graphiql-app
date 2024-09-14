import { http, HttpResponse } from 'msw';

const handlers = [
  http.get('https://swapi.dev/api/people', () => HttpResponse.json({})),
];

export default handlers;
