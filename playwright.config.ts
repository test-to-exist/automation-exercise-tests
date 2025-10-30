import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  globalSetup: require.resolve("./global-setup"),
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  timeout: 45 * 1000, // Default timeout for each test
  expect: {
    /* Maximum time expect() should wait for the condition to be met. */
    timeout: 10000,
  },
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "authorized user tests chromium",
      testDir: "./tests/authorized",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "authorized user tests firefox",
      testDir: "./tests/authorized",
      use: {
        ...devices["Desktop Firefox"],
      },
    },
    {
      name: "authorized user tests webkit",
      testDir: "./tests/authorized",
      use: {
        ...devices["Desktop Safari"],
      },
    },
    {
      name: "authorized user tests microsoft edge",
      testDir: "./tests/authorized",
      use: {
        ...devices["Desktop Edge"],
        channel: "msedge",
      },
    },
    {
      name: "authorized user tests google chrome",
      testDir: "./tests/authorized",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chrome",
      },
    },
    {
      name: "unauthorized tests firefox",
      testDir: "./tests/unauthorized",
      use: {
        ...devices["Desktop Firefox"],
      },
    },
    {
      name: "unauthorized tests webkit",
      testDir: "./tests/unauthorized",
      use: {
        ...devices["Desktop Safari"],
      },
    },
    {
      name: "unauthorized tests microsoft edge",
      testDir: "./tests/unauthorized",
      use: {
        ...devices["Desktop Edge"],
      },
    },
    {
      name: "unauthorized tests google chrome",
      testDir: "./tests/unauthorized",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
