import { expect, Locator, Page } from "@playwright/test";

export class AcceptCookiesPage {
  readonly page: Page;
  readonly consentButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.consentButton = page.getByRole("button", { name: "Consent" });
  }
}
