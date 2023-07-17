import { test, expect } from '@playwright/test';
import { RoomsPage } from '../../pages/rooms-page';
import { bookingData, roomData } from '../../utils/test-data';
import { HomePage } from '../../pages/home-page';

test.describe('Create room @rooms', () => {
  let roomsPage: RoomsPage;

  test.beforeEach(async ({ page }) => {
    roomsPage = new RoomsPage(page);

    // Navigate to rooms page
    await page.goto('#/admin');
    await expect(roomsPage.logOutLink).toBeVisible();
  });

  test.afterEach(async ({ page, request }) => {
    roomsPage = new RoomsPage(page);

    const roomidString = await roomsPage.roomRow.last().getAttribute('id');
    const roomid = parseInt(roomidString.replace('room', ''));

    const response = await request.delete(`room/${roomid}`);
    expect(response.status()).toBe(202);
  });

  test('Creating room with valid data and some room features selected is successful @smoke', async ({
    page
  }) => {
    roomsPage = new RoomsPage(page);

    await roomsPage.createRoom(
      'Room with features',
      roomData.type,
      String(roomData.accessible),
      String(roomData.roomPrice),
      roomData.features[0],
      null,
      null,
      null,
      roomData.features[1],
      roomData.features[2]
    );

    // Assert that the room is created successfully
    await expect(roomsPage.roomRow.last()).toContainText('Room with features');
    await expect(roomsPage.roomRow.last()).toContainText('WiFi, Safe, Views');
  });

  test('Creating room with valid data and accessibility chosen is successful', async ({
    page
  }) => {
    roomsPage = new RoomsPage(page);

    await roomsPage.createRoom(
      'Room accessible for the disabled',
      roomData.type,
      String(true),
      String(roomData.roomPrice)
    );

    // Assert that the room is created successfully
    await expect(roomsPage.roomRow.last()).toContainText(
      'Room accessible for the disabled'
    );
    await expect(
      roomsPage.roomRow.last().filter({ has: roomsPage.accessibilityTrueText })
    ).toBeVisible();
  });
});

test.describe('Create and book the room', () => {
  let roomid: number;

  test.afterEach(async ({ request }) => {
    const response = await request.delete(`room/${roomid}`);
    expect(response.status()).toBe(202);
  });

  test('Creating room with one user and booking the newly created room with other user is successful', async ({
    browser
  }) => {
    // Create two isolated browser contexts
    const hostUserContext = await browser.newContext();
    const guestUserContext = await browser.newContext();

    // Create pages and interact with contexts independently
    const hostUserPage = await hostUserContext.newPage();
    const guestUserPage = await guestUserContext.newPage();

    const hostUserRoomsPage = new RoomsPage(hostUserPage);
    const guestUserHomePage = new HomePage(guestUserPage);

    // Navigate to rooms page with host user
    await hostUserPage.goto('#/admin');
    await expect(hostUserRoomsPage.logOutLink).toBeVisible();

    // Create new room
    await hostUserRoomsPage.createRoom(
      roomData.forBooking,
      roomData.type,
      String(roomData.accessible),
      String(roomData.roomPrice)
    );
    // Assert that the room is created successfully
    await expect(hostUserRoomsPage.roomRow.last()).toContainText(
      roomData.forBooking
    );
    // Get the roomid, so the room can be deleted in afterAll hook
    const roomidString = await hostUserRoomsPage.roomRow
      .last()
      .getAttribute('id');
    roomid = parseInt(roomidString.replace('room', ''));

    // Navigate to home page with guest user
    await guestUserPage.goto(guestUserHomePage.path);

    // Confirm that guest user can see the newly created room
    await expect(
      guestUserPage.getByAltText(`Preview image of room${roomData.forBooking}`)
    ).toBeVisible();

    // Booking the room
    await guestUserHomePage.bookRoom(
      bookingData.firstname,
      bookingData.lastname,
      bookingData.email,
      bookingData.phone,
      bookingData.checkinDay,
      bookingData.checkoutDay
    );
    // Assert that booking was successful
    await expect(guestUserHomePage.dialog).toBeVisible();
    await expect(guestUserHomePage.successfulBookingText).toBeVisible();
  });
});
