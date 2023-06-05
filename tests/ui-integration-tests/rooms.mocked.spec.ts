import { test, expect } from '@playwright/test';
import { rooms } from '../../mocks/rooms';
import { RoomPage } from '../../pages/room-page';
import updatedRoom from '../../mocks/updatedRoom.json';

test.describe('Rooms - mocked API', () => {
  test.describe('Update room details', () => {
    let roomPage: RoomPage;

    test.beforeEach(async ({ page }) => {
      // Mock GET /room request
      await page.route('room/', async (route) => {
        route.fulfill({
          body: JSON.stringify(rooms)
        });
      });

      // Navigate to rooms page
      await page.goto('#/admin');

      // Assert that GET /room request is mocked successfully
      await expect(page.getByText('Mocked room - 101')).toBeVisible();
      await expect(page.getByText('Mocked room - random id')).toBeVisible();

      // Mock GET /room/roomid request
      await page.route('room/101', async (route) => {
        console.log('room101', rooms.rooms[0]);
        route.fulfill({
          status: 200,
          body: JSON.stringify(rooms.rooms[0])
        });
      });

      // Navigate to rooms' page
      await page.getByText('Mocked room - 101').click();

      // Assert that GET /room/roomid request is mocked successfully
      await expect(page.getByText('This is first mocked room')).toBeVisible();
    });

    test('Updating room with valid data is successful', async ({ page }) => {
      roomPage = new RoomPage(page);

      await roomPage.editButton.click();

      await roomPage.updateRoom(
        'Mocked room - 101 IS EDITED',
        'Twin',
        String(true),
        String(110),
        'WIFi',
        'TV',
        'Radio',
        null,
        null,
        null,
        'This room is EDITED',
        null
      );

      // Mock PUT /room/roomid request
      await page.route('room/101', async (route) => {
        route.fulfill({
          status: 202,
          body: JSON.stringify(updatedRoom)
        });
      });

      await roomPage.updateButton.click();

      // Mock GET /room/roomid request
      await page.route('room/101', async (route) => {
        route.fulfill({
          status: 200,
          body: JSON.stringify(updatedRoom)
        });
      });

      // Assert that the room is edited successfully
      await expect(
        page.getByText('Room: Mocked room - 101 IS EDITED')
      ).toBeVisible();
      await expect(
        page.getByText('WiFi, TV, Radio, Safe, Views')
      ).toBeVisible();
    });
  });
});
