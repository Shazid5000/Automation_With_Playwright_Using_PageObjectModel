export class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async navigateTo(path = '/') {
    await this.page.goto(path);
  }

  async getElementText(locator) {
    return (await locator.textContent()).trim();
  }

  async isElementVisible(locator) {
    return await locator.isVisible();
  }
}