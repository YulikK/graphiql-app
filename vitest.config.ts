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
      '@codemirror/view': path.resolve(
        __dirname,
        'node_modules/@codemirror/view/dist/index.cjs'
      ),
    },
  },
  optimizeDeps: {
    exclude: ['@codemirror/state', '@codemirror/view'],
  },
});
