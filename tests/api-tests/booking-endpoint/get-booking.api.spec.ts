import { test, expect, APIResponse } from '@playwright/test';
import { error } from '../../../utils/constants';
import { bookingData, invalidData, roomData } from '../../../utils/test-data';

test.describe('GET /booking', () => {
  let roomResponse: APIResponse;
  let bookingResponse: APIResponse;
  let resBody;
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

    resBody = await bookingResponse.json();
    bookingid = resBody.bookingid;
  });

  test.afterAll(async ({ request }) => {
    roomResponse = await request.delete(`room/${roomid}`);
    expect(roomResponse.status()).toBe(202);
  });

  test('GET /booking/?roomid=roomid', async ({ request }) => {
    bookingResponse = await request.get(`booking/?roomid=${roomid}`);
    expect(bookingResponse.status()).toBe(200);

    resBody = await bookingResponse.json();
    console.log('resbody', resBody);
    expect(resBody.bookings.length).toEqual(1);
    expect(resBody.bookings[0].roomid).toEqual(roomid);
    expect(resBody.bookings[0].bookingid).toEqual(bookingid);
    expect(resBody.bookings[0].firstname).toEqual(bookingData.firstname);
    expect(resBody.bookings[0].lastname).toEqual(bookingData.lastname);
    expect(resBody.bookings[0].depositpaid).toEqual(false);
    expect(resBody.bookings[0].bookingdates.checkin).toEqual(
      bookingData.checkin
    );
    expect(resBody.bookings[0].bookingdates.checkout).toEqual(
      bookingData.checkout
    );
  });

  test('GET /booking/?roomid=roomid - invalid roomid value', async ({
    request
  }) => {
    bookingResponse = await request.get(`booking/?roomid=${invalidData.idNum}`);
    expect(bookingResponse.status()).toBe(200);

    resBody = await bookingResponse.json();
    expect(resBody.bookings.length).toEqual(0);
  });

  test('GET /booking/?roomid=roomid - invalid roomid format (string)', async ({
    request
  }) => {
    bookingResponse = await request.get(`booking/?roomid=${invalidData.idStr}`);
    expect(bookingResponse.status()).toBe(500);

    resBody = await bookingResponse.json();
    expect(resBody.error).toEqual(error.internalServerError);
  });

  test('GET /room/roomid - invalid roomid format (special characters)', async ({
    request
  }) => {
    bookingResponse = await request.get(
      `booking/?roomid=${invalidData.idSpecChar}`
    );
    expect(bookingResponse.status()).toBe(500);

    resBody = await bookingResponse.json();
    expect(resBody.error).toEqual(error.internalServerError);
  });
});
