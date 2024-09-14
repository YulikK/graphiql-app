import graph from './handlers/graph.ts';
import rest from './handlers/rest.ts';

export const handlers = [...graph, ...rest];
