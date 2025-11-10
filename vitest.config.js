import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./__tests__/setup-vitest.js'],
    include: ['__tests__/**/*.js'],
    exclude: ['__tests__/setup.js', '__tests__/test-helper.js', '__tests__/register.js', '__tests__/fixtures.js', '__tests__/graphical-tests.js', '__tests__/compareSvg.js', '__tests__/setup-vitest.js', '__tests__/sampleData.js']
  },
  esbuild: {
    loader: 'jsx',
    include: /\.[jt]sx?$/,
    exclude: []
  }
});
