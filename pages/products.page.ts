import { Locator, Page } from "@playwright/test";
import { ProductAddedModal } from "@pages/product-added.modal";

export class ProductsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addItemById(id: number) {
    await this.page.locator(`a[data-product-id="${id}"]`).first().click();
    return new ProductAddedModal(this.page);
  }
}
