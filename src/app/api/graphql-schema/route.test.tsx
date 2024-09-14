import { NextRequest } from 'next/server';

import { describe, expect, it } from 'vitest';

import {
  TEST_GRAPH_SCHEMA_200,
  TEST_GRAPH_SCHEMA_400,
  TEST_GRAPH_SCHEMA_500,
  testSchemaAnswer400,
  testSchemaAnswer500,
} from '@/tests/setup/msw/handlers/graph';

import { GET } from './route';

describe('GET', () => {
  it('should return 400 if urlDoc is not provided', async () => {
    const req = new NextRequest(TEST_GRAPH_SCHEMA_400);
    const res = await GET(req);

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json).toEqual({ error: 'Invalid URL' });
  });

  it('should return 400 if fetchGraphSchema returns 400', async () => {
    const req = new NextRequest(
      `http://example.com/api/graphql-schema?urlDoc=${TEST_GRAPH_SCHEMA_400}`
    );
    const res = await GET(req);
    const json = await res.json();

    expect(JSON.parse(json)).toEqual(testSchemaAnswer400.data);
  });

  it('should return 200 with schema if urlDoc is provided', async () => {
    const req = new NextRequest(
      `http://example.com/api/graphql-schema?urlDoc=${TEST_GRAPH_SCHEMA_200}`
    );
    const res = await GET(req);
    expect(res.status).toBe(200);
  });

  it('should return 500 if fetchGraphSchema throws an error', async () => {
    const req = new NextRequest(
      `http://example.com/api/graphql-schema?urlDoc=${TEST_GRAPH_SCHEMA_500}`
    );
    const res = await GET(req);
    const json = await res.json();
    expect(JSON.parse(json)).toEqual(testSchemaAnswer500.data);
  });
});
