import { test, expect, APIResponse } from '@playwright/test';
import { error, errorMessage } from '../../../utils/constants';
import { invalidData, roomData } from '../../../utils/test-data';

test.describe('POST /room', () => {
  let response: APIResponse;
  let resBody;

  test('POST /room - valid data', async ({ request }) => {
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
    expect(resBody.roomid).not.toBeUndefined();
    expect(resBody.roomid).not.toBeNull();
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

  test('POST /room - missing room name', async ({ request }) => {
    response = await request.post('room/', {
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

  test('POST /room - missing room type', async ({ request }) => {
    response = await request.post('room/', {
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

  test('POST /room - missing room price', async ({ request }) => {
    response = await request.post('room/', {
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

  test('POST /room - invalid room type value', async ({ request }) => {
    response = await request.post('room/', {
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

  test('POST /room - invalid room accessibility value', async ({ request }) => {
    response = await request.post('room/', {
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

  test('POST /room - invalid room price value', async ({ request }) => {
    response = await request.post('room/', {
      data: {
        roomName: roomData.roomName,
        type: roomData.type,
        accessible: roomData.accessible,
        roomPrice: invalidData.roomPriceNum,
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

  test('POST /room - invalid room price format', async ({ request }) => {
    response = await request.post('room/', {
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
});
