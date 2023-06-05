import { test, expect, APIResponse } from '@playwright/test';
import { HomePage } from '../../pages/home-page';
import { bookingData, roomData } from '../../utils/test-data';

test.describe('Booking', () => {
  let response: APIResponse;
  let homePage: HomePage;
  let roomid: number;

  test.beforeAll(async ({ request }) => {
    response = await request.post('room/', {
      data: {
        roomName: roomData.roomName,
        type: roomData.type,
        accessible: roomData.accessible,
        roomPrice: roomData.roomPrice,
        features: roomData.features,
        image: roomData.image,
        description: roomData.forBooking
      }
    });
    expect(response.status()).toBe(201);
    const resBody = await response.json();
    roomid = resBody.roomid;
  });

  test.afterAll(async ({ request }) => {
    response = await request.delete(`room/${roomid}`);
    expect(response.status()).toBe(202);
  });
  test('Booking the room is successful', async ({ page }) => {
    homePage = new HomePage(page);

    // Navigate to the home page
    await page.goto(homePage.path);

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
