import { test, expect, APIResponse } from '@playwright/test';
import { invalidData, roomData } from '../../../utils/test-data';

test.describe('DELETE /room', () => {
  let response: APIResponse;
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
        description: roomData.description
      }
    });
    expect(response.status()).toBe(201);

    const resBody = await response.json();
    roomid = resBody.roomid;
  });

  test('DELETE /room/roomid', async ({ request }) => {
    response = await request.delete(`room/${roomid}`);
    expect(response.status()).toBe(202);
  });

  test('DELETE /room/roomid - invalid roomid value', async ({ request }) => {
    response = await request.delete(`room/${invalidData.idNum}`);
    expect(response.status()).toBe(404);
  });
});
