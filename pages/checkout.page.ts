import { Locator, Page } from "@playwright/test";
import { PaymentPage } from "@pages/payment.page";

export class CheckoutPage {
  readonly page: Page;
  readonly placeOrderLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.placeOrderLink = page.getByRole("link", { name: "Place Order" });
  }

  async placeOrder() {
    await this.placeOrderLink.click();
    return new PaymentPage(this.page);
  }
}
