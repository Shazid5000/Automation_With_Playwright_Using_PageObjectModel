// pages/ProductPage.js
import { BasePage } from './BasePage.js';

export class ProductPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    this.recipientNameInput = page.locator('#giftcard_2_RecipientName');
    this.recipientEmailInput = page.locator('#giftcard_2_RecipientEmail');
    this.addToCartButton = page.locator('#add-to-cart-button-2');
    
    // Targeted specifically to the top navigation header to prevent strict mode errors
    this.shoppingCartLink = page.locator('#topcartlink a.ico-cart');
    
    this.notificationBar = page.locator('#bar-notification');
    this.notificationCloseButton = page.locator('#bar-notification .close');
  }

  async fillGiftCardDetails(recipientName, recipientEmail) {
    await this.fillField(this.recipientNameInput, recipientName);
    await this.fillField(this.recipientEmailInput, recipientEmail);
  }

  async addToCart() {
    await this.clickElement(this.addToCartButton);
    await this.notificationBar.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    if (await this.notificationCloseButton.isVisible()) {
      await this.notificationCloseButton.click();
    }
  }

  async goToCart() {
    await this.clickElement(this.shoppingCartLink);
  }
}