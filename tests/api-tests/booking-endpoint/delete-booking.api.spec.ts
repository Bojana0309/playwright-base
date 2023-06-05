import { test, expect, APIResponse } from '@playwright/test';
import { bookingData, invalidData, roomData } from '../../../utils/test-data';

test.describe('DELETE /booking', () => {
  let roomResponse: APIResponse;
  let bookingResponse: APIResponse;
  let roomid: number;
  let bookingid: number;

  test.beforeAll(async ({ request }) => {
    roomResponse = await request.post('room/', {
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
    expect(roomResponse.status()).toBe(201);

    const responseBody = await roomResponse.json();
    roomid = responseBody.roomid;

    bookingResponse = await request.post('booking/', {
      data: {
        roomid: roomid,
        firstname: bookingData.firstname,
        lastname: bookingData.lastname,
        email: bookingData.email,
        phone: bookingData.phone,
        bookingdates: {
          checkin: bookingData.checkin,
          checkout: bookingData.checkout
        }
      }
    });

    expect(bookingResponse.status()).toBe(201);

    const resBody = await bookingResponse.json();
    bookingid = resBody.bookingid;
  });

  test.afterAll(async ({ request }) => {
    roomResponse = await request.delete(`room/${roomid}`);
    expect(roomResponse.status()).toBe(202);
  });

  test('DELETE /booking/bookingid', async ({ request }) => {
    bookingResponse = await request.delete(`booking/${bookingid}`);
    expect(bookingResponse.status()).toBe(202);
  });

  test('DELETE /booking/bookingid - invalid roomid value', async ({
    request
  }) => {
    bookingResponse = await request.delete(`booking/${invalidData.idNum}`);
    expect(bookingResponse.status()).toBe(404);
  });
});
