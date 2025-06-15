import { faker } from "@faker-js/faker";
import { NavigationBar } from "@pages/navigation-bar";
import { ProductsPage } from "@pages/products.page";
import { test, expect, Page } from "@playwright/test";

test("Add product to cart and checkout", async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  const navigationBar = new NavigationBar(page);
  await navigationBar.productsLink.click();

  const productsPage = new ProductsPage(page);
  const productAddedModal = await productsPage.addItemById(1);
  await productAddedModal.continueShoppingButton.click();

  await navigationBar.cartLink.click();

  await page.getByText("Proceed To Checkout").click();
  expect(page.getByRole("heading", { name: "Your delivery address" }))
    .toBeVisible;
  await expect(page.getByText("Your billing address Mr.")).toBeVisible();
  await page.getByRole("link", { name: "Place Order" }).click();
  await page.locator('[data-qa="name-on-card"]').fill(faker.person.fullName());
  await page
    .locator('[data-qa="card-number"]')
    .fill(faker.finance.creditCardNumber());
  await page.locator('[data-qa="cvc"]').fill(faker.finance.creditCardCVV());
  await page.locator('[data-qa="expiry-month"]').fill(faker.date.month());
  const expiryDate = new Date();
  await page
    .locator('[data-qa="expiry-year"]')
    .fill((expiryDate.getFullYear() + 1).toString());
  await page.getByRole("button", { name: "Pay and Confirm Order" }).click();

  expect(page.getByText("Congratulations! Your order has been confirmed!"));
});

async function addItemById(id: number, page: Page) {
  await page.locator(`a[data-product-id="${id}"]`).first().click();
}
