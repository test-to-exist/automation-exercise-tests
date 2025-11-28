import { expect, test } from "@fixtures/auth-fixture";
import { ProductsPage } from "@pages/products.page";

test.describe("Shopping Filters Tests", () => {
  test.describe("Womens filters", () => {
    test("User should be able to filter by Womens dress", async ({ page }) => {
      await page.goto(`${process.env.BASE_URL}`);
      const productsPage = new ProductsPage(page);
      await productsPage.categoryWomens.click();
      await productsPage.womensCategories.dress.click();
      const productNames = await productsPage.productName.count();
      for (let i = 0; i < productNames; i++) {
        await expect(productsPage.productName.nth(i)).toContainText("Dress");
      }
    });
  });

  test.describe("Mens filters", () => {
    test("User should be able to filter by Mens t-shirts", async ({ page }) => {
      await page.goto(`${process.env.BASE_URL}`);
      const productsPage = new ProductsPage(page);
      await productsPage.categoryMens.click();
      await productsPage.mensCategories.tshirts.click();
      const productNames = await productsPage.productName.count();
      for (let i = 0; i < productNames; i++) {
        await expect(productsPage.productName.nth(i)).toContainText(
          /(Tshirt|T-Shirt|T\sSHIRT)/
        );
      }
    });
  });

  test.describe("Kids filters", () => {
    test("User should be able to filter by kids tops & shirts", async ({
      page,
    }) => {
      await page.goto(`${process.env.BASE_URL}`);
      const productsPage = new ProductsPage(page);
      await productsPage.categoryKids.click();
      await productsPage.kidsCategories.topsAndShirts.click();
      const productNames = await productsPage.productName.count();
      for (let i = 0; i < productNames; i++) {
        await expect(productsPage.productName.nth(i)).toContainText(
          /(Top|Shirt)/i
        );
      }
    });
  });
});
