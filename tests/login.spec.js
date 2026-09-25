import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { LoginPage } from '../pages/LoginPage.js';

test.describe('Part A — UI Automation: Q1. Invalid Login Scenarios', () => {
  let homePage;
  let loginPage;

  test.beforeEach(async ({ page }) => {
    // Class Object instantiation
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);

    // Each test executes independently
    await homePage.navigate();
    await homePage.clickLogin();
  });

  test('TC01: Verify error message for invalid registered credentials format', async () => {
    await loginPage.login('dfgdfg@gmail.com', 'invalidPassword123');

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Login was unsuccessful. Please correct the errors and try again.');
    expect(errorMessage).toContain('The credentials provided are incorrect');

    const isLoggedIn = await loginPage.isUserLoggedIn();
    expect(isLoggedIn).toBeFalsy();
  });

  test('TC02: Verify error message when providing an invalid email format', async () => {
    await loginPage.login('dfgdfg', '123456');

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Please enter a valid email address.');

    const isLoggedIn = await loginPage.isUserLoggedIn();
    expect(isLoggedIn).toBeFalsy();
  });

  test('TC03: Verify error message when attempting login with empty credentials', async () => {
    await loginPage.login('', '');

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Login was unsuccessful. Please correct the errors and try again.');

    const isLoggedIn = await loginPage.isUserLoggedIn();
    expect(isLoggedIn).toBeFalsy();
  });
});