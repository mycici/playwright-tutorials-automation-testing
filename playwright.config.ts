import { defineConfig, devices } from '@playwright/test';

const envName = (process.env.ENV || 'qa') as 'qa' | 'dev';

// Map environments to their default base URLs. Can be overridden by BASE_URL env var.
const defaultBaseUrls: Record<'qa' | 'dev', string> = {
  qa: 'https://rahulshettyacademy.com',
  dev: 'https://rahulshettyacademy.com', // Change this to your dev URL
};

function resolveBaseUrl(env: 'qa' | 'dev'): string {
  return process.env.BASE_URL || defaultBaseUrls[env];
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Global timeout for each test */
  timeout: 30 * 1000,  // 30 seconds per test
  /* Expect timeout for assertions */
  expect: { timeout: 5 * 1000 },  // 5 seconds for assertions
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,  // Reduced from 2 to 1
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : undefined,  // Increased from 1 to 2
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: process.env.CI ? 'on-first-retry' : 'off',  // Less trace collection on CI
    screenshot: 'only-on-failure',
    video: process.env.CI ? 'off' : 'retain-on-failure',  // No video on CI for speed
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'qa',
      use: { ...devices['Desktop Chrome'], baseURL: resolveBaseUrl('qa') },
    },
    {
      name: 'dev',
      use: { ...devices['Desktop Chrome'], baseURL: resolveBaseUrl('dev') },
    },

    /*{
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

     Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
