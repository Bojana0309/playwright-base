import { test, expect, APIResponse } from '@playwright/test';
import { error } from '../../../utils/constants';
import { invalidData, roomData } from '../../../utils/test-data';

test.describe('GET /room', () => {
  let response: APIResponse;
  let resBody;
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

    resBody = await response.json();
    roomid = resBody.roomid;
  });

  test.afterAll(async ({ request }) => {
    response = await request.delete(`room/${roomid}`);
    expect(response.status()).toBe(202);
  });

  test('GET /room', async ({ request }) => {
    response = await request.get('room/');
    expect(response.status()).toBe(200);

    resBody = await response.json();
    expect(resBody.rooms.length).toBeGreaterThan(1);
  });

  test('GET /room/roomid', async ({ request }) => {
    response = await request.get(`room/${roomid}`);
    expect(response.status()).toBe(200);

    resBody = await response.json();
    expect(resBody.roomName).toEqual(roomData.roomName);
    expect(resBody.type).toEqual(roomData.type);
    expect(resBody.accessible).toEqual(roomData.accessible);
    expect(resBody.roomPrice).toEqual(roomData.roomPrice);
    expect(resBody.features[0]).toEqual(roomData.features[0]);
    expect(resBody.features[1]).toEqual(roomData.features[1]);
    expect(resBody.features[2]).toEqual(roomData.features[2]);
    expect(resBody.image).toEqual(roomData.image);
    expect(resBody.description).toEqual(roomData.description);
  });

  test('GET /room/roomid - invalid roomid value', async ({ request }) => {
    response = await request.get(`room/${invalidData.idNum}`);
    expect(response.status()).toBe(500);

    resBody = await response.json();
    expect(resBody.error).toEqual(error.internalServerError);
  });

  test('GET /room/roomid - invalid roomid format (string)', async ({
    request
  }) => {
    response = await request.get(`room/${invalidData.idStr}`);
    expect(response.status()).toBe(404);

    resBody = await response.json();
    expect(resBody.error).toEqual(error.notFound);
  });

  test('GET /room/roomid - invalid roomid format (special characters)', async ({
    request
  }) => {
    response = await request.get(`room/${invalidData.idSpecChar}`);
    expect(response.status()).toBe(404);

    resBody = await response.json();
    expect(resBody.error).toEqual(error.notFound);
  });
});
