const { test, expect } = require('@playwright/test');
const SearchPage = require('../pages/SearchPage');
const ProductDetailsPage = require('../pages/ProductDetailsPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');
const LoginPage = require('../pages/LoginPage');
const RegisterPage = require('../pages/RegisterPage');

test.describe('Q3 - Product Search and End-to-End Checkout Flow', () => {
  test('Search product, update quantity, register account, checkout with all fields, and view order details', async ({ page }) => {
    const searchPage = new SearchPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const loginPage = new LoginPage(page);
    const registerPage = new RegisterPage(page);

    const randomEmail = `testuser_${Date.now()}@example.com`;
    const password = 'Password123!';

    await page.goto('/register');
    await registerPage.registerUser({
      firstName: 'Test',
      lastName: 'User',
      email: randomEmail,
      password: password
    });

    await searchPage.searchProduct('Laptop');
    await expect(searchPage.productTitle).toContainText('14.1-inch Laptop');
    await searchPage.selectProduct('14.1-inch Laptop');

    await productDetailsPage.setQuantityAndAddToCart(10);

    await productDetailsPage.goToCart();
    await expect(page).toHaveURL(/.*\/cart/);

    await cartPage.acceptTermsAndCheckout();

    if (page.url().includes('/login')) {
      await loginPage.login(randomEmail, password);
      await cartPage.acceptTermsAndCheckout();
    }

    // Fills all required and optional billing fields
    await checkoutPage.fillBillingAddress({
      company: 'Test Company Ltd',
      country: 'United States',
      state: 'New York',
      city: 'New York',
      address1: '123 Test Street',
      address2: 'Apt 4B',
      zip: '10001',
      phone: '1234567890',
      fax: '0987654321'
    });

    await checkoutPage.completeCheckoutSteps();

    await checkoutPage.goToOrderDetails();
    await expect(page).toHaveURL(/.*\/orderdetails\/\d+/);
  });
});