import { test, expect } from "@playwright/test";
import { LoginPage } from "@pages/login.page";
import { AcceptCookiesPage } from "@pages/accept-cookies.page";

test("Whatever", async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await expect(page.getByText("Logged in as")).toBeVisible();
});
