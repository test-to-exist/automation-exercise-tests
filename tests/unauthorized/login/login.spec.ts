import { test, expect } from "@playwright/test";
import { LoginPage } from "@pages/login.page";
import { AcceptCookiesPage } from "@pages/accept-cookies.page";
import { isNil } from "lodash";
import { faker } from "@faker-js/faker";

test.describe("Login Tests", () => {
  let loginPage: LoginPage;
  let env: object;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(loginPage.loginHeader).toBeVisible();

    env = process.env;
    if (isNil(env["CI"]) || env["CI"] === "false") {
      const acceptCookiesPage = new AcceptCookiesPage(page);
      await acceptCookiesPage.consentButton.click();
    }
  });

  test("User logs in successfully", async ({ page }, { parallelIndex }) => {
    const username = env[`USERNAME${parallelIndex}`];
    const password = env[`PASSWORD${parallelIndex}`];

    await loginPage.login(username, password);

    await expect(page.getByText("Logged in as")).toBeVisible();
  });

  test("User fails to log in with incorrect password", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(faker.internet.email(), "incorrectPassword123");

    await expect(
      page.getByText("Your email or password is incorrect!")
    ).toBeVisible();
  });

  test("User fails to log in with an empty email", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("", "password");

    await expect(
      page.getByRole("heading", { name: "Login to your account" })
    ).toBeVisible();
  });

  test("User fails to log in with an empty password", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(faker.internet.email(), "");

    await expect(
      page.getByRole("heading", { name: "Login to your account" })
    ).toBeVisible();
  });
});
