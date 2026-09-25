import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.loginLink = this.page.locator('a.ico-login');
  }

  async navigate() {
    await this.navigateTo('/');
  }

  async clickLogin() {
    await this.loginLink.click();
  }
}