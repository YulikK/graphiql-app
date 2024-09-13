import '@testing-library/jest-dom';
import { afterAll, afterEach, beforeAll } from 'vitest';

import { server } from './msw/server';

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'warn',
  });

  // Need it for debugging api requests
  server.events.on('request:start', ({ request }) => {
    console.log('Outgoing:', request.method, request.url);
  });
});
