import { SavedGraphqlRequest, SavedRestRequest } from '../models/types';

export function isRestRequest(
  el: SavedRestRequest | SavedGraphqlRequest
): el is SavedRestRequest {
  return el.type === 'rest';
}

export function isGraphqlRequest(
  el: SavedRestRequest | SavedGraphqlRequest
): el is SavedGraphqlRequest {
  return el.type === 'graphql';
}
