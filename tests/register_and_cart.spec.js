import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { ProductPage } from '../pages/ProductPage.js';
import { CartPage } from '../pages/CartPage.js';

test.describe('Q2: Register and Add Product to Cart', () => {
  let homePage;
  let registerPage;
  let productPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    registerPage = new RegisterPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    await homePage.navigate('https://demowebshop.tricentis.com');
  });

  test('Should register user, fill recipient details, add to cart, and verify', async ({ page }) => {
    const timestamp = Date.now();
    const user = {
      firstName: 'demo',
      lastName: 'user',
      email: `demouser_${timestamp}@test.com`,
      password: 'Password123!'
    };

    // 1. Register New User
    await homePage.navigateToRegister();
    await registerPage.registerUser(user);
    await expect(registerPage.resultMessage).toHaveText('Your registration completed');
    await registerPage.clickContinue();

    // 2. Open Gift Card Product Page
    await homePage.selectVirtualGiftCardProduct();

    // 3. Fill Recipient Details and Add to Cart
    await productPage.fillGiftCardDetails('asdas', user.email);
    await productPage.addToCart();

    // 4. Navigate to Cart & Assert Details
    await productPage.goToCart();
    const itemTitle = await cartPage.getCartProductTitle();
    const itemQuantity = await cartPage.getCartProductQuantity();

    expect(itemTitle).toContain('$25 Virtual Gift Card');
    expect(itemQuantity).toBe('1');
  });
});