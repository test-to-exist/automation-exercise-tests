import { Locator, Page } from "@playwright/test";
import { CheckoutPage } from "@pages/checkout.page";

export class CartPage {
  readonly page: Page;
  readonly proceedToCheckoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.proceedToCheckoutButton = page.getByText("Proceed To Checkout");
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
    return new CheckoutPage(this.page);
  }
}
