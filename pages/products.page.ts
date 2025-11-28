import { Locator, Page } from "@playwright/test";
import { ProductAddedModal } from "@pages/product-added.modal";

type WomensCategories = {
  dress: Locator;
  tops: Locator;
  saree: Locator;
};

type MensCategories = {
  tshirts: Locator;
  jeans: Locator;
};

type KidsCategories = {
  dress: Locator;
  topsAndShirts: Locator;
};

export class ProductsPage {
  readonly page: Page;
  readonly categoryMens: Locator;
  readonly categoryWomens: Locator;
  readonly categoryKids: Locator;
  readonly mensCategories: MensCategories;
  readonly womensCategories: WomensCategories;
  readonly kidsCategories: KidsCategories;
  readonly productName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.categoryMens = page.getByRole("link", { name: " Men" });
    this.categoryWomens = page.getByRole("link", { name: "Women" });
    this.categoryKids = page.getByRole("link", { name: "Kids" }).first();
    this.womensCategories = {} as WomensCategories;
    this.womensCategories.dress = page.getByRole("link", { name: "Dress" });
    this.mensCategories = {} as MensCategories;
    this.mensCategories.tshirts = page.getByRole("link", { name: "Tshirts" });
    this.kidsCategories = {} as KidsCategories;
    this.kidsCategories.topsAndShirts = page.getByRole("link", {
      name: "Tops & Shirts",
    });
    this.productName = page.locator(".product-overlay * p");
  }

  async addItemById(id: number) {
    await this.page.locator(`a[data-product-id="${id}"]`).first().click();
    return new ProductAddedModal(this.page);
  }
}
