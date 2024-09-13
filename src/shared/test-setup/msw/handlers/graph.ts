import { HttpResponse, http } from 'msw';

const TEST_GRAPH_API = 'https://api.url.com';

export const TEST_GRAPH_SCHEMA_200 = 'http://schema.200.url.com';

export const TEST_GRAPH_SCHEMA_500 = 'http://schema.500.url.com';

export const TEST_GRAPH_SCHEMA_400 = 'http://schema.400.url.com';

export const testAnswer = {
  status: 200,
  data: {
    person: {
      name: 'Luke Skywalker',
      birthYear: '19BBY',
      eyeColor: 'blue',
    },
  },
};

export const testSchemaAnswer200 = {
  status: 200,
  data: { schema: 'schema' },
};

export const testSchemaAnswer500 = {
  status: 500,
  data: { error: '500' },
};

export const testSchemaAnswer400 = {
  status: 400,
  data: { error: '400' },
};

const handlers = [
  http.post(`${TEST_GRAPH_API}`, () => HttpResponse.json(testAnswer)),
  http.post(`${TEST_GRAPH_SCHEMA_200}`, () =>
    HttpResponse.json(testSchemaAnswer200)
  ),
  http.post(`${TEST_GRAPH_SCHEMA_500}`, () =>
    HttpResponse.json(testSchemaAnswer500)
  ),
  http.post(`${TEST_GRAPH_SCHEMA_400}`, () =>
    HttpResponse.json(testSchemaAnswer400)
  ),
];

export default handlers;
