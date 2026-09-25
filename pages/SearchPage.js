class SearchPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator('#small-searchterms');
    this.searchButton = page.locator('input[value="Search"]');
    this.productTitle = page.locator('.product-item .product-title a');
  }

  async searchProduct(keyword) {
    await this.searchInput.fill(keyword);
    await this.searchButton.click();
  }

  async selectProduct(productName) {
    await this.page.locator(`.product-item .product-title a:has-text("${productName}")`).click();
  }
}

module.exports = SearchPage;