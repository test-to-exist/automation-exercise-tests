import { expect, type Locator, type Page } from '@playwright/test';
import { AccountInformationPage } from './account-information.page';

export class SignupPage {
  readonly page: Page;
  readonly signupHeader: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly signupButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signupHeader = page.getByText('New User Signup!');
    this.nameInput = page.locator('[data-qa="signup-name"]');
    this.emailInput = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.locator('[data-qa="signup-button"]');
  }

  async goto() {
    await this.page.goto(`${process.env.BASE_URL}/login`);
    await this.page.getByRole('button', { name: 'Consent'}).click();
    await expect(this.signupHeader).toBeVisible();
  }

  async signUp(name: string, email: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.signupButton.click();
    return new AccountInformationPage(this.page);
  }
}
