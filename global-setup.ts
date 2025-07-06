import { chromium, expect, type FullConfig } from "@playwright/test";
import { SignupPage } from "@pages/sign-up.page";
import { v4 as uuid } from "uuid";
import { faker } from "@faker-js/faker";
import { AcceptCookiesPage } from "@pages/accept-cookies.page";
import * as path from "path";
import { isNil } from "lodash";
import { getStoragePath } from "@helpers/general";

const authFile = path.join(__dirname, "/playwright/.auth/");

async function globalSetup(config: FullConfig) {
  const env = process.env;
  for (let i = 0; i < Number.parseInt(process.env.USERS_NUMBER); i++) {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    const signupPage = new SignupPage(page);

    const email = uuid() + "@test.com";
    env[`USERNAME${i}`] = email;
    await signupPage.goto();

    if (isNil(process.env.CI) || process.env.CI === "false") {
      const acceptCookiesPage = new AcceptCookiesPage(page);
      await acceptCookiesPage.consentButton.click();
    }
    await expect(signupPage.signupHeader).toBeVisible();
    const accountInformationPage = await signupPage.signUp(uuid(), email);
    await expect(accountInformationPage.accountInformationHeader).toBeVisible();

    await accountInformationPage.selectTitle("Mr");

    const password = faker.internet.password({ length: 12 });
    env[`PASSWORD${i}`] = password;

    await accountInformationPage.fillAccountInfo({
      name: faker.person.fullName(),
      password: password,
      day: faker.number.int({ min: 1, max: 28 }).toString(),
      month: faker.number.int({ min: 1, max: 12 }).toString(),
      year: faker.number.int({ min: 1950, max: 2000 }).toString(),
      subscribe: true,
      offers: true,
    });

    await accountInformationPage.fillAddressInfo({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      address1: faker.location.streetAddress(),
      country: "India",
      state: faker.location.state(),
      city: faker.location.city(),
      zipcode: faker.location.zipCode(),
      mobileNumber: faker.phone.number({ style: "international" }),
    });

    await accountInformationPage.submitForm();

    await expect(page.getByText("Account Created!")).toBeVisible();

    await accountInformationPage.continueButton.click();
    await page.context().storageState({ path: getStoragePath(i) });

    await browser.close();
  }
}

export default globalSetup;
