import path from 'path';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist',
        '.vite',
        'vitest.config.ts',
        '.validate-branch-namerc.cjs',
        './src/global.d.ts',
        './src/middleware.ts',
        'postcss.config.js',
        '.eslintrc.cjs',
        '**/*.test.{js,jsx,ts,tsx}',
        '.next/',
        'next-env.d.ts',
        'next.config.js',
        './src/shared/locales/**',
        './src/shared/models/**',
      ],
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
