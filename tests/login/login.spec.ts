import { test, expect } from "@playwright/test";
import { LoginPage } from "@pages/login.page";
import { AcceptCookiesPage } from "@pages/accept-cookies.page";
import { isNil } from "lodash";

test("User logs in successfully", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  await expect(loginPage.loginHeader).toBeVisible();

  if (isNil(process.env.CI) || process.env.CI === "false") {
    const acceptCookiesPage = new AcceptCookiesPage(page);
    await acceptCookiesPage.consentButton.click();
  }

  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;

  await loginPage.login(username, password);

  await expect(page.getByText("Logged in as")).toBeVisible();
});
