import { expect, test } from "@fixtures/auth-fixture";

test.describe("Shopping Filters Tests", () => {
  test.describe("Womens filters", () => {
    test("User should be able to filter by Womens dress", async ({ page }) => {
      await page.goto(`${process.env.BASE_URL}`);
      await page.getByRole("link", { name: "Women" }).click();
      await page.getByRole("link", { name: "Dress" }).click();
      const productNames = await page.locator(".product-overlay * p").count();
      for (let i = 0; i < productNames; i++) {
        await expect(page.locator(".product-overlay * p").nth(i)).toContainText(
          "Dress"
        );
      }
    });
  });

  test.describe("Kids filters", () => {
    test("User should be able to filter by kids tops & shirts", async ({
      page,
    }) => {
      await page.goto(`${process.env.BASE_URL}`);
      await page.getByRole("link", { name: "Kids" }).first().click();
      await page.getByRole("link", { name: "Tops & Shirts" }).click();
      const productNames = await page.locator(".product-overlay * p").count();
      for (let i = 0; i < productNames; i++) {
        await expect(page.locator(".product-overlay * p").nth(i)).toContainText(
          /(Top|Shirt)/i
        );
      }
    });
  });

  test.describe("Mens filters", () => {});
});
