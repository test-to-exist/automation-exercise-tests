import { getStoragePath } from "@helpers/general";
import { test as baseTest } from "@playwright/test";
import * as fs from "fs";
// import path from 'path';

export * from "@playwright/test";
export const test = baseTest.extend<{}, { workerStorageState: string }>({
  storageState: ({ workerStorageState }, use) => use(workerStorageState),

  workerStorageState: [
    async ({ browser }, use) => {
      // Use parallelIndex as a unique identifier for each worker.
      const id = test.info().parallelIndex;
      const fileName = getStoragePath(id);
      if (fs.existsSync(fileName)) {
        // Reuse existing authentication state if any.
        await use(fileName);
        return;
      }

      // TODO: consider adding a code for login if there is no existing storage state.
      // // Important: make sure we authenticate in a clean environment by unsetting storage state.
      // const page = await browser.newPage({ storageState: undefined });

      // // Acquire a unique account, for example create a new one.
      // // Alternatively, you can have a list of precreated accounts for testing.
      // // Make sure that accounts are unique, so that multiple team members
      // // can run tests at the same time without interference.
      // const account = await acquireAccount(id);

      // // Perform authentication steps. Replace these actions with your own.
      // await page.goto('https://github.com/login');
      // await page.getByLabel('Username or email address').fill(account.username);
      // await page.getByLabel('Password').fill(account.password);
      // await page.getByRole('button', { name: 'Sign in' }).click();
      // // Wait until the page receives the cookies.
      // //
      // // Sometimes login flow sets cookies in the process of several redirects.
      // // Wait for the final URL to ensure that the cookies are actually set.
      // await page.waitForURL('https://github.com/');
      // // Alternatively, you can wait until the page reaches a state where all cookies are set.
      // await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible();

      // // End of authentication steps.

      // await page.context().storageState({ path: fileName });
      // await page.close();
      // await use(fileName);
    },
    { scope: "worker" },
  ],
});
