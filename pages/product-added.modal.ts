import { Locator, Page } from "@playwright/test";

export class ProductAddedModal {
  readonly page: Page;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.continueShoppingButton = page.getByRole("button", {
      name: "Continue Shopping",
    });
  }
}
