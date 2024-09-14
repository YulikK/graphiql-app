import path from 'path';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
  resolve: {
    alias: {
      '@': '/src',
      '@codemirror/state': path.resolve(
        __dirname,
        'node_modules/@codemirror/state/dist/index.cjs'
      ),
    },
  },
});
