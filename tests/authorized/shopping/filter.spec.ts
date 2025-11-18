import { expect, test } from "@fixtures/auth-fixture";

test.describe("Shopping Filters Tests", () => {
  test.describe("Womens filters", () => {
    test("User should be able to filter by dress", async ({ page }) => {
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

  test.describe("Mens filters", () => {});

  test.describe("Kids filters", () => {});
});
