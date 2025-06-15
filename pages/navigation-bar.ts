import { Locator, Page } from "@playwright/test";

export class NavigationBar {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly productsLink: Locator;
  readonly cartLink: Locator;
  readonly logoutLink: Locator;
  readonly deleteAccountLink: Locator;
  readonly testCasesLink: Locator;
  readonly apiTestingLink: Locator;
  readonly videoTutorialsLink: Locator;
  readonly contactUsLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = page.getByRole("link", { name: "Home" });
    this.productsLink = page.getByRole("link", { name: "Products" });
    this.cartLink = page.getByRole("link", { name: "Cart" });
    this.logoutLink = page.getByRole("link", { name: "Logout" });
    this.deleteAccountLink = page.getByRole("link", { name: "Delete Account" });
    this.testCasesLink = page.getByRole("link", { name: "Test Cases" });
    this.apiTestingLink = page.getByRole("link", { name: "API Testing" });
    this.videoTutorialsLink = page.getByRole("link", {
      name: "Video Tutorials",
    });
    this.contactUsLink = page.getByRole("link", { name: "Contact us" });
  }
}
