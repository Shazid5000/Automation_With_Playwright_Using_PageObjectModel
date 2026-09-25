import { BasePage } from './BasePage.js';

export class RegisterPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    this.genderMaleRadio = page.locator('#gender-male');
    this.firstNameInput = page.locator('#FirstName');
    this.lastNameInput = page.locator('#LastName');
    this.emailInput = page.locator('#Email');
    this.passwordInput = page.locator('#Password');
    this.confirmPasswordInput = page.locator('#ConfirmPassword');
    this.registerButton = page.locator('#register-button');
    this.continueButton = page.locator('input.button-1.register-continue-button');
    this.resultMessage = page.locator('.result');
  }

  async registerUser(userData) {
    await this.clickElement(this.genderMaleRadio);
    await this.fillField(this.firstNameInput, userData.firstName);
    await this.fillField(this.lastNameInput, userData.lastName);
    await this.fillField(this.emailInput, userData.email);
    await this.fillField(this.passwordInput, userData.password);
    await this.fillField(this.confirmPasswordInput, userData.password);
    await this.clickElement(this.registerButton);
  }

  async clickContinue() {
    await this.clickElement(this.continueButton);
  }
}