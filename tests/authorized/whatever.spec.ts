import { test, expect } from "@playwright/test";

test("Whatever", async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await expect(page.getByText("Logged in as")).toBeVisible();
});
