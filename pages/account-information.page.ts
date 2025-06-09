import { Locator, Page } from '@playwright/test';

export class AccountInformationPage {
  readonly page: Page;

  readonly accountInformaionHeader: Locator;
  readonly titleMr: Locator;
  readonly titleMrs: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly daysSelect: Locator;
  readonly monthsSelect: Locator;
  readonly yearsSelect: Locator;
  readonly newsletterCheckbox: Locator;
  readonly optinCheckbox: Locator;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly address1Input: Locator;
  readonly address2Input: Locator;
  readonly countrySelect: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileNumberInput: Locator;
  readonly createAccountButton: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.accountInformaionHeader = page.getByText('Enter Account Information');
    this.titleMr = page.locator('#id_gender1');
    this.titleMrs = page.locator('#id_gender2');
    this.nameInput = page.locator('[data-qa="name"]');
    this.emailInput = page.locator('[data-qa="email"]');
    this.passwordInput = page.locator('[data-qa="password"]');
    this.daysSelect = page.locator('[data-qa="days"]');
    this.monthsSelect = page.locator('[data-qa="months"]');
    this.yearsSelect = page.locator('[data-qa="years"]');
    this.newsletterCheckbox = page.locator('#newsletter');
    this.optinCheckbox = page.locator('#optin');

    this.firstNameInput = page.locator('[data-qa="first_name"]');
    this.lastNameInput = page.locator('[data-qa="last_name"]');
    this.companyInput = page.locator('[data-qa="company"]');
    this.address1Input = page.locator('[data-qa="address"]');
    this.address2Input = page.locator('[data-qa="address2"]');
    this.countrySelect = page.locator('[data-qa="country"]');
    this.stateInput = page.locator('[data-qa="state"]');
    this.cityInput = page.locator('[data-qa="city"]');
    this.zipcodeInput = page.locator('[data-qa="zipcode"]');
    this.mobileNumberInput = page.locator('[data-qa="mobile_number"]');
    this.createAccountButton = page.locator('[data-qa="create-account"]');
    this.continueButton = page.getByRole('link', { name: 'Continue' });
  }

  async selectTitle(gender: 'Mr' | 'Mrs') {
    if (gender === 'Mr') {
      await this.titleMr.check();
    } else {
      await this.titleMrs.check();
    }
  }

  async fillAccountInfo({ name, password, day, month, year, subscribe, offers }: {
    name: string;
    password: string;
    day: string;
    month: string;
    year: string;
    subscribe?: boolean;
    offers?: boolean;
  }) {
    await this.nameInput.fill(name);
    await this.passwordInput.fill(password);
    await this.daysSelect.selectOption(day);
    await this.monthsSelect.selectOption(month);
    await this.yearsSelect.selectOption(year);

    if (subscribe) await this.newsletterCheckbox.check();
    if (offers) await this.optinCheckbox.check();
  }

  async fillAddressInfo(data: {
    firstName: string;
    lastName: string;
    company?: string;
    address1: string;
    address2?: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
  }) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    if (data.company) await this.companyInput.fill(data.company);
    await this.address1Input.fill(data.address1);
    if (data.address2) await this.address2Input.fill(data.address2);
    await this.countrySelect.selectOption({ label: data.country });
    await this.stateInput.fill(data.state);
    await this.cityInput.fill(data.city);
    await this.zipcodeInput.fill(data.zipcode);
    await this.mobileNumberInput.fill(data.mobileNumber);
  }

  async submitForm() {
    await this.createAccountButton.click();
  }
}
