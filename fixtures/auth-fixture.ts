import { getStoragePath } from "@helpers/general";
import { test as baseTest } from "@playwright/test";
import * as fs from "fs";
// import path from 'path';

export * from "@playwright/test";
export const test = baseTest.extend<{}, { workerStorageState: string }>({
  storageState: ({ workerStorageState }, use) => use(workerStorageState),

  workerStorageState: [
    async ({}, use) => {
      const id = test.info().parallelIndex;
      const fileName = getStoragePath(id);
      if (fs.existsSync(fileName)) {
        // Reuse existing authentication state if any.
        await use(fileName);
        return;
      }
    },
    { scope: "worker" },
  ],
});
