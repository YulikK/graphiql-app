import { describe, expect, it } from 'vitest';

import { RestSliceType } from '@/shared/models/types';
import buildRestUrl from '@/shared/utils/build-rest-url';
import encodeToBase64 from '@/shared/utils/encode-to-base64';
import sanitizeJsonString from '@/shared/utils/sanitize-json-string';

describe('buildRestUrl', () => {
  const defaultState = {
    body: '',
    headers: [['', '']],
    method: 'GET',
    url: '',
    variables: [],
    textMode: false,
    query: [],
  } as RestSliceType;

  const locale = 'en';

  it('should return undefined and update history when url is missing', () => {
    const mockReplaceState = vi.spyOn(window.history, 'replaceState');

    const result = buildRestUrl(defaultState, locale);

    expect(result).toBeUndefined();
    expect(mockReplaceState).toHaveBeenCalledWith(null, '', '/en/GET');
  });

  it('should build URL with encoded URL and body', () => {
    const state = {
      ...defaultState,
      url: 'https://example.com/{{id}}',
      body: '{ "name": "{{name}}" }',
      variables: [
        ['id', '123'],
        ['name', 'John'],
      ],
      textMode: true,
    };

    const result = buildRestUrl(state, locale);
    const encodedUrl = encodeToBase64('https://example.com/123');
    const encodedBody = encodeToBase64('{ "name": "John" }');

    expect(result).toBe(`/en/GET/${encodedUrl}/${encodedBody}`);
  });

  it('should sanitize and encode JSON body when textMode is false', () => {
    const state = {
      ...defaultState,
      url: 'https://example.com/{{id}}',
      body: `{ "name": "{{name}}", "age": "{{age}}" }`,
      variables: [
        ['id', '123'],
        ['name', 'John'],
        ['age', '30'],
      ],
      textMode: false,
    };

    const result = buildRestUrl(state, locale);
    const encodedUrl = encodeToBase64('https://example.com/123');
    const sanitizedBody = sanitizeJsonString(`{ "name": "John", "age": "30" }`);
    const encodedBody = encodeToBase64(sanitizedBody);

    expect(result).toBe(`/en/GET/${encodedUrl}/${encodedBody}`);
  });

  it('should append headers as query parameters', () => {
    const state = {
      ...defaultState,
      url: 'https://example.com/{{id}}',
      body: 'simple body',
      variables: [['id', '123']],
      headers: [
        ['Content-Type', 'application/json'],
        ['Authorization', 'Bearer token'],
      ],
      textMode: true,
    };

    const result = buildRestUrl(state, locale);
    const encodedUrl = encodeToBase64('https://example.com/123');
    const encodedBody = encodeToBase64('simple body');

    expect(result).toBe(
      `/en/GET/${encodedUrl}/${encodedBody}?Content-Type=application%2Fjson&Authorization=Bearer+token`
    );
  });

  it('should handle missing headers gracefully', () => {
    const state = {
      ...defaultState,
      url: 'https://example.com/{{id}}',
      body: 'simple body',
      variables: [['id', '123']],
      headers: [
        ['', ''],
        ['Authorization', 'Bearer token'],
      ],
      textMode: true,
    };

    const result = buildRestUrl(state, locale);
    const encodedUrl = encodeToBase64('https://example.com/123');
    const encodedBody = encodeToBase64('simple body');

    expect(result).toBe(
      `/en/GET/${encodedUrl}/${encodedBody}?Authorization=Bearer+token`
    );
  });

  it('should handle missing body gracefully', () => {
    const state = {
      ...defaultState,
      url: 'https://example.com/{{id}}',
      variables: [['id', '123']],
      body: '',
    };

    const result = buildRestUrl(state, locale);
    const encodedUrl = encodeToBase64('https://example.com/123');

    expect(result).toBe(`/en/GET/${encodedUrl}`);
  });
});
