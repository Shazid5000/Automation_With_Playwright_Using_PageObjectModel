import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.emailInput = this.page.locator('#Email');
    this.passwordInput = this.page.locator('#Password');
    this.loginButton = this.page.locator('input.button-1.login-button');
    this.validationSummary = this.page.locator('.validation-summary-errors');
    this.fieldValidationError = this.page.locator('.field-validation-error');
    this.logoutLink = this.page.locator('a.ico-logout');
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage() {
    if (await this.isElementVisible(this.validationSummary)) {
      return await this.getElementText(this.validationSummary);
    }
    if (await this.isElementVisible(this.fieldValidationError)) {
      return await this.getElementText(this.fieldValidationError);
    }
    return '';
  }

  async isUserLoggedIn() {
    return await this.isElementVisible(this.logoutLink);
  }
}