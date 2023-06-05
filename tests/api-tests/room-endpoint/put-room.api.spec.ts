import { test, expect, APIResponse } from '@playwright/test';
import { invalidData, roomData } from '../../../utils/test-data';
import { error, errorMessage } from '../../../utils/constants';

test.describe('PUT /room', () => {
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

  test('PUT /room/roomid', async ({ request }) => {
    response = await request.put(`room/${roomid}`, {
      data: {
        roomName: roomData.roomName,
        type: roomData.type,
        accessible: true,
        roomPrice: 90,
        features: roomData.features,
        image: roomData.image,
        description: roomData.description
      }
    });
    expect(response.status()).toBe(202);

    resBody = await response.json();
    expect(resBody.roomName).toEqual(roomData.roomName);
    expect(resBody.type).toEqual(roomData.type);
    expect(resBody.accessible).toEqual(true);
    expect(resBody.roomPrice).toEqual(90);
    expect(resBody.features[0]).toEqual(roomData.features[0]);
    expect(resBody.features[1]).toEqual(roomData.features[1]);
    expect(resBody.features[2]).toEqual(roomData.features[2]);
    expect(resBody.image).toEqual(roomData.image);
    expect(resBody.description).toEqual(roomData.description);
  });

  test('PUT /room/roomid - missing room name', async ({ request }) => {
    response = await request.put(`room/${roomid}`, {
      data: {
        type: roomData.type,
        accessible: roomData.accessible,
        roomPrice: roomData.roomPrice,
        features: roomData.features,
        image: roomData.image,
        description: roomData.description
      }
    });
    expect(response.status()).toBe(400);

    resBody = await response.json();
    expect(resBody.error).toEqual(error._badRequest);
    expect(resBody.errorMessage).toContain(errorMessage.emptyRoomName);
  });

  test('PUT /room/roomid - missing room type', async ({ request }) => {
    response = await request.put(`room/${roomid}`, {
      data: {
        roomName: roomData.roomName,
        accessible: roomData.accessible,
        roomPrice: roomData.roomPrice,
        features: roomData.features,
        image: roomData.image,
        description: roomData.description
      }
    });
    expect(response.status()).toBe(400);

    resBody = await response.json();
    expect(resBody.error).toEqual(error._badRequest);
    expect(resBody.errorMessage).toContain(errorMessage.emptyRoomType);
  });

  test('PUT /room/roomid - missing room price', async ({ request }) => {
    response = await request.put(`room/${roomid}`, {
      data: {
        roomName: roomData.roomName,
        type: roomData.type,
        accessible: roomData.accessible,
        features: roomData.features,
        image: roomData.image,
        description: roomData.description
      }
    });
    expect(response.status()).toBe(400);

    resBody = await response.json();
    expect(resBody.error).toEqual(error._badRequest);
    expect(resBody.errorMessage).toContain(
      errorMessage.emptyOrInvalidRoomPrice
    );
  });

  test('PUT /room/roomid - invalid roomid value', async ({ request }) => {
    response = await request.put(`room/${invalidData.idNum}`, {
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
    expect(response.status()).toBe(404);
  });

  test('PUT /room/roomid - invalid room type value', async ({ request }) => {
    response = await request.put(`room/${roomid}`, {
      data: {
        roomName: roomData.roomName,
        type: invalidData.roomType,
        accessible: roomData.accessible,
        roomPrice: roomData.roomPrice,
        features: roomData.features,
        image: roomData.image,
        description: roomData.description
      }
    });
    expect(response.status()).toBe(400);

    resBody = await response.json();
    expect(resBody.error).toEqual(error._badRequest);
    expect(resBody.errorMessage).toContain(errorMessage.invalidRoomType);
  });

  test('PUT /room/roomid - invalid room accessibility format', async ({
    request
  }) => {
    response = await request.put(`room/${roomid}`, {
      data: {
        roomName: roomData.roomName,
        type: roomData.type,
        accessible: invalidData.roomAccessibility,
        roomPrice: roomData.roomPrice,
        features: roomData.features,
        image: roomData.image,
        description: roomData.description
      }
    });
    expect(response.status()).toBe(400);

    resBody = await response.json();
    expect(resBody.error).toEqual(error.badRequest);
  });

  test('PUT /room/roomid - invalid room price format', async ({ request }) => {
    response = await request.put(`room/${roomid}`, {
      data: {
        roomName: roomData.roomName,
        type: roomData.type,
        accessible: roomData.accessible,
        roomPrice: invalidData.roomPriceStr,
        features: roomData.features,
        image: roomData.image,
        description: roomData.description
      }
    });
    expect(response.status()).toBe(400);

    resBody = await response.json();
    expect(resBody.error).toEqual(error.badRequest);
  });

  test('PUT /room/roomid - invalid roomid format (string)', async ({
    request
  }) => {
    response = await request.put(`room/${invalidData.idStr}`, {
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
    expect(response.status()).toBe(404);
  });

  test('PUT /room/roomid - invalid roomid format (special characters)', async ({
    request
  }) => {
    response = await request.put(`room/${invalidData.idSpecChar}`, {
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
    expect(response.status()).toBe(404);
  });
});
