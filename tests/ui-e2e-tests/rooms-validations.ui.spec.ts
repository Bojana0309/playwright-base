import { test, expect } from '@playwright/test';
import { RoomsPage } from '../../pages/rooms-page';
import { invalidData, roomData } from '../../utils/test-data';

test.describe('Rooms validations', () => {
  let roomsPage: RoomsPage;

  test.beforeEach(async ({ page }) => {
    roomsPage = new RoomsPage(page);

    // Navigate to rooms page
    await page.goto('#/admin');
    await expect(roomsPage.logOutLink).toBeVisible();
  });

  test('Creating room with empty room name field is not possible', async ({
    page
  }) => {
    roomsPage = new RoomsPage(page);

    await roomsPage.createRoom(
      '',
      roomData.type,
      String(roomData.accessible),
      String(roomData.roomPrice)
    );

    // Assert that room creation was not successful
    await expect(roomsPage.emptyRoomNameValidationText).toBeVisible();
  });

  test('Creating room with empty room price field is not possible', async ({
    page
  }) => {
    roomsPage = new RoomsPage(page);

    await roomsPage.createRoom(
      roomData.roomName,
      roomData.type,
      String(roomData.accessible),
      ''
    );

    // Assert that room creation was not successful
    await expect(roomsPage.emptyOrInvalidRoomPriceValidationText).toBeVisible();
  });

  test('Creating room with invalid room price is not possible', async ({
    page
  }) => {
    roomsPage = new RoomsPage(page);

    await roomsPage.createRoom(
      roomData.roomName,
      roomData.type,
      String(roomData.accessible),
      String(invalidData.roomPriceNum)
    );

    // Assert that room creation was not successful
    await expect(roomsPage.emptyOrInvalidRoomPriceValidationText).toBeVisible();
  });
});
