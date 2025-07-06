import { test, expect } from "@playwright/test";
import { LoginPage } from "@pages/login.page";
import { AcceptCookiesPage } from "@pages/accept-cookies.page";
import { isNil } from "lodash";

test("User logs in successfully", async ({ page }, { parallelIndex }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  await expect(loginPage.loginHeader).toBeVisible();

  const env = process.env;
  if (isNil(env["CI"]) || env["CI"] === "false") {
    const acceptCookiesPage = new AcceptCookiesPage(page);
    await acceptCookiesPage.consentButton.click();
  }
  const username = env[`USERNAME${parallelIndex}`];
  const password = env[`PASSWORD${parallelIndex}`];

  await loginPage.login(username, password);

  await expect(page.getByText("Logged in as")).toBeVisible();
});
