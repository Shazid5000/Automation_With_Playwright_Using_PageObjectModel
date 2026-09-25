class ProductDetailsPage {
  constructor(page) {
    this.page = page;
    this.quantityInput = page.locator('.qty-input');
    this.addToCartButton = page.locator('input[id^="add-to-cart-button"]');
    this.shoppingCartLink = page.locator('#topcartlink a');
    this.notificationSuccess = page.locator('#bar-notification .content');
  }

  async setQuantityAndAddToCart(qty) {
    await this.quantityInput.clear();
    await this.quantityInput.fill(qty.toString());
    await this.addToCartButton.click();
    await this.notificationSuccess.waitFor({ state: 'visible' });
  }

  async goToCart() {
    await this.shoppingCartLink.click();
  }
}

module.exports = ProductDetailsPage;