import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [
    ['line'],
    [
      'allure-playwright',
      {
        detail: true,
        outputFolder: 'allure-results',
        suiteTitle: false,
      },
    ],
    ['html', { open: 'never' }]
  ],
  use: {
    baseURL: 'https://demowebshop.tricentis.com',
    trace: 'on-first-retry',
    screenshot: 'on',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});