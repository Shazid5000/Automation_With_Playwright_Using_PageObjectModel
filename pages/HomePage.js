import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    this.registerLink = page.locator('a.ico-register');
    this.loginLink = page.locator('a.ico-login');
  }

  async navigateToRegister() {
    await this.clickElement(this.registerLink);
  }

  async selectVirtualGiftCardProduct() {
    await this.page.goto('https://demowebshop.tricentis.com/25-virtual-gift-card');
  }
}