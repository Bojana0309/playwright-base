import { test, expect, APIResponse } from '@playwright/test';
import { error, errorMessage } from '../../../utils/constants';
import { bookingData, invalidData, roomData } from '../../../utils/test-data';

test.describe('PUT /booking', () => {
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

  test('PUT /booking - valid data', async ({ request }) => {
    bookingResponse = await request.post('booking/', {
      data: {
        roomid: roomid,
        bookingid: bookingid,
        firstname: bookingData.firstname,
        lastname: bookingData.lastname,
        depositpaid: bookingData.depositpaid,
        bookingdates: {
          checkin: bookingData.checkin,
          checkout: bookingData.checkout
        }
      }
    });

    expect(bookingResponse.status()).toBe(201);

    resBody = await bookingResponse.json();
    expect(resBody.booking.firstname).toEqual(bookingData.firstname);
    expect(resBody.booking.lastname).toEqual(bookingData.lastname);
    expect(resBody.booking.depositpaid).toEqual(bookingData.depositpaid);
    expect(resBody.booking.bookingdates.checkin).toEqual(bookingData.checkin);
    expect(resBody.booking.bookingdates.checkout).toEqual(bookingData.checkout);
  });

  test('PUT /booking - missing firstname', async ({ request }) => {
    bookingResponse = await request.post('booking/', {
      data: {
        roomid: roomid,
        bookingid: bookingid,
        lastname: bookingData.lastname,
        bookingdates: {
          checkin: bookingData.checkin,
          checkout: bookingData.checkout
        }
      }
    });
    expect(bookingResponse.status()).toBe(400);

    resBody = await bookingResponse.json();
    expect(resBody.error).toEqual(error._badRequest);
    expect(resBody.errorMessage).toContain(errorMessage.emptyFirstname);
  });

  test('PUT /booking - missing lastname', async ({ request }) => {
    bookingResponse = await request.post('booking/', {
      data: {
        roomid: roomid,
        bookingid: bookingid,
        firstname: bookingData.firstname,
        bookingdates: {
          checkin: bookingData.checkin,
          checkout: bookingData.checkout
        }
      }
    });
    expect(bookingResponse.status()).toBe(400);

    resBody = await bookingResponse.json();
    expect(resBody.error).toEqual(error._badRequest);
    expect(resBody.errorMessage).toContain(errorMessage.emptyLastname);
  });

  test('PUT /booking - missing checkin date', async ({ request }) => {
    bookingResponse = await request.post('booking/', {
      data: {
        roomid: roomid,
        bookingid: bookingid,
        firstname: bookingData.firstname,
        lastname: bookingData.lastname,
        bookingdates: {
          checkout: bookingData.checkout
        }
      }
    });
    expect(bookingResponse.status()).toBe(400);

    resBody = await bookingResponse.json();
    expect(resBody.error).toEqual(error._badRequest);
    expect(resBody.errorMessage).toContain(errorMessage.emptyCheckinOrCheckout);
  });

  test('PUT /booking - missing checkout date', async ({ request }) => {
    bookingResponse = await request.post('booking/', {
      data: {
        roomid: roomid,
        bookingid: bookingid,
        firstname: bookingData.firstname,
        lastname: bookingData.lastname,
        bookingdates: {
          checkin: bookingData.checkin
        }
      }
    });
    expect(bookingResponse.status()).toBe(400);

    resBody = await bookingResponse.json();
    expect(resBody.error).toEqual(error._badRequest);
    expect(resBody.errorMessage).toContain(errorMessage.emptyCheckinOrCheckout);
  });

  test('PUT /booking - invalid bookingid format (string)', async ({
    request
  }) => {
    bookingResponse = await request.post('booking/', {
      data: {
        roomid: roomid,
        bookingid: invalidData.idStr,
        firstname: bookingData.firstname,
        lastname: bookingData.lastname,
        bookingdates: {
          checkin: bookingData.checkin,
          checkout: bookingData.checkout
        }
      }
    });
    expect(bookingResponse.status()).toBe(400);

    resBody = await bookingResponse.json();
    expect(resBody.error).toEqual(error.badRequest);
  });

  test('PUT /booking - invalid bookingid format (special characters)', async ({
    request
  }) => {
    bookingResponse = await request.post('booking/', {
      data: {
        roomid: roomid,
        bookingid: invalidData.idSpecChar,
        firstname: bookingData.firstname,
        lastname: bookingData.lastname,
        bookingdates: {
          checkin: bookingData.checkin,
          checkout: bookingData.checkout
        }
      }
    });
    expect(bookingResponse.status()).toBe(400);

    resBody = await bookingResponse.json();
    expect(resBody.error).toEqual(error.badRequest);
  });

  test('PUT /booking - invalid firstname value (min boundary)', async ({
    request
  }) => {
    bookingResponse = await request.post('booking/', {
      data: {
        roomid: roomid,
        bookingid: bookingid,
        firstname: invalidData.firstnameMin,
        lastname: bookingData.lastname,
        bookingdates: {
          checkin: bookingData.checkin,
          checkout: bookingData.checkout
        }
      }
    });
    expect(bookingResponse.status()).toBe(400);

    resBody = await bookingResponse.json();
    expect(resBody.error).toEqual(error._badRequest);
    expect(resBody.errorMessage).toContain(errorMessage.invalidFirstname);
  });

  test('PUT /booking - invalid firstname value (max boundary)', async ({
    request
  }) => {
    bookingResponse = await request.post('booking/', {
      data: {
        roomid: roomid,
        bookingid: bookingid,
        firstname: invalidData.firstnameMax,
        lastname: bookingData.lastname,
        bookingdates: {
          checkin: bookingData.checkin,
          checkout: bookingData.checkout
        }
      }
    });
    expect(bookingResponse.status()).toBe(400);

    resBody = await bookingResponse.json();
    expect(resBody.error).toEqual(error._badRequest);
    expect(resBody.errorMessage).toContain(errorMessage.invalidFirstname);
  });

  test('PUT /booking - invalid lastname value (min boundary)', async ({
    request
  }) => {
    bookingResponse = await request.post('booking/', {
      data: {
        roomid: roomid,
        bookingid: bookingid,
        firstname: bookingData.firstname,
        lastname: invalidData.lastnameMin,
        bookingdates: {
          checkin: bookingData.checkin,
          checkout: bookingData.checkout
        }
      }
    });
    expect(bookingResponse.status()).toBe(400);

    resBody = await bookingResponse.json();
    expect(resBody.error).toEqual(error._badRequest);
    expect(resBody.errorMessage).toContain(errorMessage.invalidLastname);
  });

  test('PUT /booking - invalid lastname value (max boundary)', async ({
    request
  }) => {
    bookingResponse = await request.post('booking/', {
      data: {
        roomid: roomid,
        bookingid: bookingid,
        firstname: bookingData.firstname,
        lastname: invalidData.lastnameMax,
        bookingdates: {
          checkin: bookingData.checkin,
          checkout: bookingData.checkout
        }
      }
    });
    expect(bookingResponse.status()).toBe(400);

    resBody = await bookingResponse.json();
    expect(resBody.error).toEqual(error._badRequest);
    expect(resBody.errorMessage).toContain(errorMessage.invalidLastname);
  });

  test('PUT /booking - invalid depositpaid format', async ({ request }) => {
    bookingResponse = await request.post('booking/', {
      data: {
        roomid: roomid,
        bookingid: bookingid,
        firstname: bookingData.firstname,
        lastname: bookingData.lastname,
        depositpaid: invalidData.depositpaid,
        bookingdates: {
          checkin: bookingData.checkin,
          checkout: bookingData.checkout
        }
      }
    });
    expect(bookingResponse.status()).toBe(400);

    resBody = await bookingResponse.json();
    expect(resBody.error).toEqual(error.badRequest);
  });

  test('PUT /booking - invalid checkin date format', async ({ request }) => {
    bookingResponse = await request.post('booking/', {
      data: {
        roomid: roomid,
        bookingid: bookingid,
        firstname: bookingData.firstname,
        lastname: bookingData.lastname,
        bookingdates: {
          checkin: invalidData.checkin,
          checkout: bookingData.checkout
        }
      }
    });
    expect(bookingResponse.status()).toBe(400);

    resBody = await bookingResponse.json();
    expect(resBody.error).toEqual(error.badRequest);
  });

  test('PUT /booking - invalid checkout date format', async ({ request }) => {
    bookingResponse = await request.post('booking/', {
      data: {
        roomid: roomid,
        bookingid: bookingid,
        firstname: bookingData.firstname,
        lastname: bookingData.lastname,
        bookingdates: {
          checkin: bookingData.checkin,
          checkout: invalidData.checkout
        }
      }
    });
    expect(bookingResponse.status()).toBe(400);

    resBody = await bookingResponse.json();
    expect(resBody.error).toEqual(error.badRequest);
  });
});
