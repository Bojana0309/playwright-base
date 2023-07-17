import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home-page';
import { LoginPage } from '../../pages/login-page';
import { RoomsPage } from '../../pages/rooms-page';

test.describe('Login @login', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let roomsPage: RoomsPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);

    // Clear the cookies in order to user wouldn't be logged in already
    await page.context().clearCookies();

    // Navigate to the admin panel
    await page.goto(homePage.path);
    await homePage.adminPanelLink.click();

    // Assert that the admin panel is shown
    await expect(page).toHaveURL('#/admin');
    await expect(loginPage.loginHeader).toBeVisible();
  });

  test('Login with valid username and password is successful @smoke', async ({
    page
  }) => {
    loginPage = new LoginPage(page);
    roomsPage = new RoomsPage(page);

    await loginPage.login(process.env.PW_USERNAME, process.env.PW_PASSWORD);

    // Assert that login was successful
    await expect(roomsPage.homePageLink).toBeVisible();
    await expect(roomsPage.logOutLink).toBeVisible();
  });
});
