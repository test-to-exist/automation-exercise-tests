import { Locator, Page } from "@playwright/test";

export class ShoppingCartPage {
  readonly page: Page;
  readonly proceedToCheckoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.proceedToCheckoutButton = page.getByRole("button", {
      name: "Continue Shopping",
    });
  }
}
