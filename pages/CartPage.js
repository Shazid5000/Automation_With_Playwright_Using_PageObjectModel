import { BasePage } from './BasePage.js';

export class CartPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    this.cartProductTitle = page.locator('a.product-name');
    this.cartProductQty = page.locator('input.qty-input');
  }

  async getCartProductTitle() {
    return await this.getText(this.cartProductTitle);
  }

  async getCartProductQuantity() {
    await this.cartProductQty.waitFor({ state: 'visible', timeout: 10000 });
    return await this.cartProductQty.getAttribute('value');
  }
}