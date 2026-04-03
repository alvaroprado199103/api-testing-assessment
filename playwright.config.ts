import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './src/tests',
  outputDir: './test-results',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html'], ['list']],

  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],

  use: {
    baseURL: 'https://restful-booker.herokuapp.com',
    trace: 'on-first-retry',
  },
});
