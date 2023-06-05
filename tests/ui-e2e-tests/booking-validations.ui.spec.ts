import { test, expect, APIResponse } from '@playwright/test';
import { HomePage } from '../../pages/home-page';
import { bookingData, invalidData, roomData } from '../../utils/test-data';

test.describe('Booking validations', () => {
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
        description: 'For booking validation tests'
      }
    });
    expect(response.status()).toBe(201);
    const resBody = await response.json();
    roomid = resBody.roomid;
  });
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);

    // Navigate to the home page
    await page.goto(homePage.path);
  });

  test.afterAll(async ({ request }) => {
    response = await request.delete(`room/${roomid}`);
    expect(response.status()).toBe(202);
  });

  test('Booking the room with empty firstname field is not possible', async ({
    page
  }) => {
    homePage = new HomePage(page);

    await homePage.bookRoom(
      '',
      bookingData.lastname,
      bookingData.email,
      bookingData.phone,
      bookingData.checkinDay,
      bookingData.checkoutDay
    );

    // Assert that booking was not successful
    await expect(homePage.dialog).toBeHidden();
    await expect(homePage.emptyFirstnameValidationText).toBeVisible();
    await expect(homePage.invalidFirstnameValidationText).toBeVisible();
  });

  test('Booking the room with empty lastname field is not possible', async ({
    page
  }) => {
    homePage = new HomePage(page);

    await homePage.bookRoom(
      bookingData.firstname,
      '',
      bookingData.email,
      bookingData.phone,
      bookingData.checkinDay,
      bookingData.checkoutDay
    );

    // Assert that booking was not successful
    await expect(homePage.dialog).toBeHidden();
    await expect(homePage.emptyLastnameValidationText).toBeVisible();
    await expect(homePage.invalidLastnameValidationText).toBeVisible();
  });

  test('Booking the room with empty email field is not possible', async ({
    page
  }) => {
    homePage = new HomePage(page);

    await homePage.bookRoom(
      bookingData.firstname,
      bookingData.lastname,
      '',
      bookingData.phone,
      bookingData.checkinDay,
      bookingData.checkoutDay
    );

    // Assert that booking was not successful
    await expect(homePage.dialog).toBeHidden();
    await expect(homePage.emptyEmailOrPhoneValidationText).toBeVisible();
  });

  test('Booking the room with empty phone field is not possible', async ({
    page
  }) => {
    homePage = new HomePage(page);

    await homePage.bookRoom(
      bookingData.firstname,
      bookingData.lastname,
      bookingData.email,
      '',
      bookingData.checkinDay,
      bookingData.checkoutDay
    );

    // Assert that booking was not successful
    await expect(homePage.dialog).toBeHidden();
    await expect(homePage.emptyEmailOrPhoneValidationText).toBeVisible();
    await expect(homePage.invalidPhoneValidationText).toBeVisible();
  });

  test('Booking the room without selecting dates is not possible', async ({
    page
  }) => {
    homePage = new HomePage(page);

    await homePage.bookRoom(
      bookingData.firstname,
      bookingData.lastname,
      bookingData.email,
      bookingData.phone
    );

    // Assert that booking was not successful
    await expect(homePage.dialog).toBeHidden();
    await expect(homePage.emptyDatesValidationText).toHaveCount(2);
  });

  test('Booking the room with invalid firstname (min boundary) is not possible', async ({
    page
  }) => {
    homePage = new HomePage(page);

    await homePage.bookRoom(
      invalidData.firstnameMin,
      bookingData.lastname,
      bookingData.email,
      bookingData.phone,
      bookingData.checkinDay,
      bookingData.checkoutDay
    );

    // Assert that booking was not successful
    await expect(homePage.dialog).toBeHidden();
    await expect(homePage.invalidFirstnameValidationText).toBeVisible();
  });

  test('Booking the room with invalid firstname (max boundary) is not possible', async ({
    page
  }) => {
    homePage = new HomePage(page);

    await homePage.bookRoom(
      invalidData.firstnameMax,
      bookingData.lastname,
      bookingData.email,
      bookingData.phone,
      bookingData.checkinDay,
      bookingData.checkoutDay
    );

    // Assert that booking was not successful
    await expect(homePage.dialog).toBeHidden();
    await expect(homePage.invalidFirstnameValidationText).toBeVisible();
  });

  test('Booking the room with invalid lastname (min boundary) is not possible', async ({
    page
  }) => {
    homePage = new HomePage(page);

    await homePage.bookRoom(
      bookingData.firstname,
      invalidData.lastnameMin,
      bookingData.email,
      bookingData.phone,
      bookingData.checkinDay,
      bookingData.checkoutDay
    );

    // Assert that booking was not successful
    await expect(homePage.dialog).toBeHidden();
    await expect(homePage.invalidLastnameValidationText).toBeVisible();
  });

  test('Booking the room with invalid lastname (max boundary) is not possible', async ({
    page
  }) => {
    homePage = new HomePage(page);

    await homePage.bookRoom(
      bookingData.firstname,
      invalidData.lastnameMax,
      bookingData.email,
      bookingData.phone,
      bookingData.checkinDay,
      bookingData.checkoutDay
    );

    // Assert that booking was not successful
    await expect(homePage.dialog).toBeHidden();
    await expect(homePage.invalidLastnameValidationText).toBeVisible();
  });

  test('Booking the room with invalid email is not possible', async ({
    page
  }) => {
    homePage = new HomePage(page);

    await homePage.bookRoom(
      bookingData.firstname,
      bookingData.lastname,
      invalidData.email,
      bookingData.phone,
      bookingData.checkinDay,
      bookingData.checkoutDay
    );

    // Assert that booking was not successful
    await expect(homePage.dialog).toBeHidden();
    await expect(homePage.invalidEmailValidationText).toBeVisible();
  });

  test('Booking the room with invalid phone (min boundary) is not possible', async ({
    page
  }) => {
    homePage = new HomePage(page);

    await homePage.bookRoom(
      bookingData.firstname,
      bookingData.lastname,
      bookingData.email,
      String(invalidData.phoneMin),
      bookingData.checkinDay,
      bookingData.checkoutDay
    );

    // Assert that booking was not successful
    await expect(homePage.dialog).toBeHidden();
    await expect(homePage.invalidPhoneValidationText).toBeVisible();
  });

  test('Booking the room with invalid phone (max boundary) is not possible', async ({
    page
  }) => {
    homePage = new HomePage(page);

    await homePage.bookRoom(
      bookingData.firstname,
      bookingData.lastname,
      bookingData.email,
      String(invalidData.phoneMax),
      bookingData.checkinDay,
      bookingData.checkoutDay
    );

    // Assert that booking was not successful
    await expect(homePage.dialog).toBeHidden();
    await expect(homePage.invalidPhoneValidationText).toBeVisible();
  });
});
