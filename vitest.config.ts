import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/__tests__/setup-vitest.ts'],
    include: ['src/__tests__/**/*.{ts,tsx}'],
    exclude: ['src/__tests__/**/*.d.ts', 'src/__tests__/setup.ts', 'src/__tests__/test-helper.ts', 'src/__tests__/register.ts', 'src/__tests__/fixtures.tsx', 'src/__tests__/graphical-tests.ts', 'src/__tests__/compareSvg.ts', 'src/__tests__/setup-vitest.ts', 'src/__tests__/sampleData.ts']
  }
});
