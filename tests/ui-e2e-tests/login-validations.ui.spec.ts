import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home-page';
import { LoginPage } from '../../pages/login-page';
import { invalidData } from '../../utils/test-data';

test.describe('Login validations', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);

    // Clear the cookies in order to user wouldn't be logged in already
    await page.context().clearCookies();

    // Navigate to the Login form
    await page.goto(homePage.path);
    await homePage.adminPanelLink.click();

    // Assert that the Login form is shown
    await expect(page).toHaveURL('#/admin');
    await expect(loginPage.loginHeader).toBeVisible();
  });

  test('Login with empty username field is not possible', async ({ page }) => {
    loginPage = new LoginPage(page);

    await loginPage.login('', loginPage.password);

    // Assert that login was not successful
    await expect(loginPage.usernameField).toHaveAttribute(
      'style',
      'border: 1px solid red;'
    );
    await expect(loginPage.passwordField).toHaveAttribute(
      'style',
      'border: 1px solid red;'
    );
  });

  test('Login with empty password field is not possible', async ({ page }) => {
    loginPage = new LoginPage(page);

    await loginPage.login(loginPage.username, '');

    // Assert that login was not successful
    await expect(loginPage.usernameField).toHaveAttribute(
      'style',
      'border: 1px solid red;'
    );
    await expect(loginPage.passwordField).toHaveAttribute(
      'style',
      'border: 1px solid red;'
    );
  });

  test('Login with invalid username is not possible', async ({ page }) => {
    loginPage = new LoginPage(page);

    await loginPage.login(invalidData.username, loginPage.password);

    // Assert that login was not successful
    await expect(loginPage.usernameField).toHaveAttribute(
      'style',
      'border: 1px solid red;'
    );
    await expect(loginPage.passwordField).toHaveAttribute(
      'style',
      'border: 1px solid red;'
    );
  });

  test('Login with invalid password is not possible', async ({ page }) => {
    loginPage = new LoginPage(page);

    await loginPage.login(loginPage.username, invalidData.password);

    // Assert that login was not successful
    await expect(loginPage.usernameField).toHaveAttribute(
      'style',
      'border: 1px solid red;'
    );
    await expect(loginPage.passwordField).toHaveAttribute(
      'style',
      'border: 1px solid red;'
    );
  });
});
