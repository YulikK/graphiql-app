import { describe, expect, it } from 'vitest';

import parsePathAndParams from '@/shared/utils/parse-path-and-params';

describe('parsePathAndParams', () => {
  it('should parse method, url, body, and search params correctly', () => {
    const path = 'api/rest/GET/some-url/some-body';
    const searchParams = 'key1=value1&key2=value2';

    const result = parsePathAndParams(path, searchParams);
    expect(result).toEqual({
      method: 'GET',
      url: 'some-url',
      body: 'some-body',
      params: [
        ['key1', 'value1'],
        ['key2', 'value2'],
      ],
    });
  });

  it('should handle URL-encoded search params', () => {
    const path = 'api/rest/POST/another-url/another-body';
    const searchParams = 'key1=value%201&key2=value%202';

    const result = parsePathAndParams(path, searchParams);
    expect(result).toEqual({
      method: 'POST',
      url: 'another-url',
      body: 'another-body',
      params: [
        ['key1', 'value 1'],
        ['key2', 'value 2'],
      ],
    });
  });

  it('should handle missing body in the path', () => {
    const path = 'api/rest/PUT/some-url';
    const searchParams = 'key=value';

    const result = parsePathAndParams(path, searchParams);
    expect(result).toEqual({
      method: 'PUT',
      url: 'some-url',
      body: undefined,
      params: [['key', 'value']],
    });
  });

  it('should handle single parameter in searchParams', () => {
    const path = 'api/rest/GET/resource-url/resource-body';
    const searchParams = 'singleParam=singleValue';

    const result = parsePathAndParams(path, searchParams);
    expect(result).toEqual({
      method: 'GET',
      url: 'resource-url',
      body: 'resource-body',
      params: [['singleParam', 'singleValue']],
    });
  });

  it('should handle an empty path', () => {
    const path = '';
    const searchParams = 'key1=value1';

    const result = parsePathAndParams(path, searchParams);
    expect(result).toEqual({
      method: undefined,
      url: undefined,
      body: undefined,
      params: [['key1', 'value1']],
    });
  });
});
