import { faker } from "@faker-js/faker";
import { AcceptCookiesPage } from "@pages/accept-cookies.page";
import { SignupPage } from "@pages/sign-up.page";
import test, { expect } from "@playwright/test";
import { isNil } from "lodash";

test.describe("Signup Tests", () => {
  let env = process.env;
  let signupPage: SignupPage;

  test.beforeEach(async ({ page }) => {
    signupPage = new SignupPage(page);
    await signupPage.goto();

    if (isNil(env["CI"]) || env["CI"] === "false") {
      const acceptCookiesPage = new AcceptCookiesPage(page);
      await acceptCookiesPage.consentButton.click();
    }
  });

  test("User fails to sign up with an existing email", async ({ page }, {
    parallelIndex,
  }) => {
    const accontInformationPage = await signupPage.signUp(
      faker.person.fullName(),
      env[`USERNAME${parallelIndex}`]
    );
    await expect(page.getByText("Email Address already exist!")).toBeVisible;
  });

  test("User fails to sign up with invalid email", async ({ page }) => {
    const accontInformationPage = await signupPage.signUp(
      faker.person.fullName(),
      "invalidEmail"
    );
    await expect(
      page.getByRole("heading", { name: "New User Signup!" })
    ).toBeVisible();
  });

  test("User fails to sign up with missing name", async ({ page }, {
    parallelIndex,
  }) => {
    const accontInformationPage = await signupPage.signUp(
      "",
      env[`USERNAME${parallelIndex}`]
    );
    await expect(
      page.getByRole("heading", { name: "New User Signup!" })
    ).toBeVisible();
  });
});
