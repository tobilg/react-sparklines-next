import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./__tests__/setup-vitest.js'],
    include: ['__tests__/**/*.{ts,tsx}'],
    exclude: ['__tests__/setup.js', '__tests__/test-helper.js', '__tests__/register.js', '__tests__/fixtures.js', '__tests__/graphical-tests.js', '__tests__/compareSvg.js', '__tests__/setup-vitest.js', '__tests__/sampleData.js']
  }
});
