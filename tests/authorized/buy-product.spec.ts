import { faker } from "@faker-js/faker";
import { CartPage } from "@pages/cart.page";
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
  const cartPage = new CartPage(page);

  const checkoutPage = await cartPage.proceedToCheckout();

  expect(page.getByRole("heading", { name: "Your delivery address" }))
    .toBeVisible;
  await expect(page.getByText("Your billing address Mr.")).toBeVisible();

  const paymentPage = await checkoutPage.placeOrder();

  const expiryDate = new Date();

  await paymentPage.fillPaymentDetails(
    faker.person.fullName(),
    faker.finance.creditCardNumber(),
    faker.finance.creditCardCVV(),
    faker.date.month(),
    expiryDate.getFullYear() + 1
  );
  await paymentPage.payAndConfirmOrderButton.click();
  expect(page.getByText("Congratulations! Your order has been confirmed!"));
});
