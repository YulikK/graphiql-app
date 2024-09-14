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

export const testGraphQLSchema = JSON.stringify({
  data: {
    __schema: {
      queryType: {
        name: 'Query',
      },
      types: [
        {
          kind: 'OBJECT',
          name: 'Query',
          fields: [
            {
              name: 'user',
              args: [
                {
                  name: 'id',
                  type: {
                    kind: 'NON_NULL',
                    name: null,
                    ofType: {
                      kind: 'SCALAR',
                      name: 'ID',
                      ofType: null,
                    },
                  },
                },
              ],
              type: {
                kind: 'OBJECT',
                name: 'User',
                ofType: null,
              },
            },
            {
              name: 'users',
              args: [],
              type: {
                kind: 'LIST',
                name: null,
                ofType: {
                  kind: 'OBJECT',
                  name: 'User',
                  ofType: null,
                },
              },
            },
          ],
        },
        {
          kind: 'OBJECT',
          name: 'User',
          fields: [
            {
              name: 'id',
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'SCALAR',
                  name: 'ID',
                  ofType: null,
                },
              },
            },
            {
              name: 'name',
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'SCALAR',
                  name: 'String',
                  ofType: null,
                },
              },
            },
            {
              name: 'email',
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  kind: 'SCALAR',
                  name: 'String',
                  ofType: null,
                },
              },
            },
          ],
        },
      ],
    },
  },
});

export const testSchemaAnswer200 = {
  status: 200,
  data: { schema: testGraphQLSchema },
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
  http.get(`/api/graphql-schema*`, () =>
    HttpResponse.json(testSchemaAnswer200)
  ),
];

export default handlers;
