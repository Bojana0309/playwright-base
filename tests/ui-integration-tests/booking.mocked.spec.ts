import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home-page';
import { bookingData } from '../../utils/test-data';
import { rooms } from '../../mocks/rooms';

test.describe('Booking - mocked API', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    // Mock GET /room request
    await page.route('room/', async (route) => {
      route.fulfill({
        body: JSON.stringify(rooms)
      });
    });

    // Navigate to the home page
    await page.goto(homePage.path);

    // Assert that room is mocked successfully
    await expect(page.getByText('This is first mocked room')).toBeVisible();
  });

  test('Booking the room is successful', async ({ page }) => {
    homePage = new HomePage(page);

    await homePage.bookRoom(
      bookingData.firstname,
      bookingData.lastname,
      bookingData.email,
      bookingData.phone,
      bookingData.checkinDay,
      bookingData.checkoutDay
    );

    // Assert that booking was successful
    await expect(homePage.dialog).toBeVisible();
    await expect(homePage.successfulBookingText).toBeVisible();

    // Close the dialog
    await homePage.closeButton.click();
    await expect(homePage.dialog).toBeHidden();
  });
});
