import { test } from "@fixtures/auth-fixture";

test.describe("Shopping Filters Tests", () => {
  test.describe("Womens filters", () => {
    test("User should be able to filter by dress", async ({ page }) => {
      await page.getByRole("link", { name: "Dress" }).click();
    });
  });

  test.describe("Mens filters", () => {});

  test.describe("Kids filters", () => {});
});
