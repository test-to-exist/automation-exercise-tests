import { chromium, expect, type FullConfig } from "@playwright/test";
import { SignupPage } from "@pages/sign-up.page";
import { v4 as uuid } from "uuid";
import { faker } from "@faker-js/faker";
import { AcceptCookiesPage } from "@pages/accept-cookies.page";
import * as path from "path";

const authFile = path.join(__dirname, "/playwright/.auth/user.json");

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const signupPage = new SignupPage(page);

  process.env.USERNAME = uuid() + "@test.com";
  const email = process.env.USERNAME;

  await signupPage.goto();
  const acceptCookiesPage = new AcceptCookiesPage(page);
  await acceptCookiesPage.consentButton.click();
  await expect(signupPage.signupHeader).toBeVisible();
  const accountInformationPage = await signupPage.signUp(uuid(), email);
  await expect(accountInformationPage.accountInformaionHeader).toBeVisible();

  await accountInformationPage.selectTitle("Mr");

  const password = faker.internet.password({ length: 12 });
  process.env.PASSWORD = password;

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
  await page.context().storageState({ path: authFile });

  await browser.close();
}

export default globalSetup;
