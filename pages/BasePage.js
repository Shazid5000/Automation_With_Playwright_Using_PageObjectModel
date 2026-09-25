export class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async navigate(url = 'https://demowebshop.tricentis.com') {
    await this.page.goto(url);
  }

  async clickElement(locator) {
    await locator.waitFor({ state: 'visible', timeout: 10000 });
    await locator.click();
  }

  async fillField(locator, value) {
    await locator.waitFor({ state: 'visible', timeout: 10000 });
    await locator.fill(value);
  }

  async getText(locator) {
    await locator.waitFor({ state: 'visible', timeout: 10000 });
    return (await locator.textContent()).trim();
  }

  async isElementVisible(locator) {
    try {
      return await locator.isVisible();
    } catch {
      return false;
    }
  }
}