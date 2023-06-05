import { test, expect, APIResponse } from '@playwright/test';
import { error, errorMessage } from '../../../utils/constants';
import { bookingData, invalidData, roomData } from '../../../utils/test-data';

test.describe('POST /booking', () => {
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

  test('POST /booking - valid data', async ({ request }) => {
    response = await request.post('booking/', {
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

    expect(response.status()).toBe(201);

    const resBody = await response.json();
    expect(resBody.bookingid).not.toBeUndefined();
    expect(resBody.bookingid).not.toBeNull();
    expect(resBody.booking.firstname).toEqual(bookingData.firstname);
    expect(resBody.booking.lastname).toEqual(bookingData.lastname);
    expect(resBody.booking.bookingdates.checkin).toEqual(bookingData.checkin);
    expect(resBody.booking.bookingdates.checkout).toEqual(bookingData.checkout);
  });

  test('POST /booking - missing firstname', async ({ request }) => {
    response = await request.post('booking/', {
      data: {
        roomid: roomid,
        lastname: bookingData.lastname,
        email: bookingData.email,
        phone: bookingData.phone,
        bookingdates: {
          checkin: bookingData.checkin,
          checkout: bookingData.checkout
        }
      }
    });
    expect(response.status()).toBe(400);

    resBody = await response.json();
    expect(resBody.error).toEqual(error._badRequest);
    expect(resBody.errorMessage).toContain(errorMessage.emptyFirstname);
  });

  test('POST /booking - missing lastname', async ({ request }) => {
    response = await request.post('booking/', {
      data: {
        roomid: roomid,
        firstname: bookingData.firstname,
        email: bookingData.email,
        phone: bookingData.phone,
        bookingdates: {
          checkin: bookingData.checkin,
          checkout: bookingData.checkout
        }
      }
    });
    expect(response.status()).toBe(400);

    resBody = await response.json();
    expect(resBody.error).toEqual(error._badRequest);
    expect(resBody.errorMessage).toContain(errorMessage.emptyLastname);
  });

  test('POST /booking - missing checkin date', async ({ request }) => {
    response = await request.post('booking/', {
      data: {
        roomid: roomid,
        firstname: bookingData.firstname,
        lastname: bookingData.lastname,
        email: bookingData.email,
        phone: bookingData.phone,
        bookingdates: {
          checkout: bookingData.checkout
        }
      }
    });
    expect(response.status()).toBe(400);

    resBody = await response.json();
    expect(resBody.error).toEqual(error._badRequest);
    expect(resBody.errorMessage).toContain(errorMessage.emptyCheckinOrCheckout);
  });

  test('POST /booking - missing checkout date', async ({ request }) => {
    response = await request.post('booking/', {
      data: {
        roomid: roomid,
        firstname: bookingData.firstname,
        lastname: bookingData.lastname,
        email: bookingData.email,
        phone: bookingData.phone,
        bookingdates: {
          checkin: bookingData.checkin
        }
      }
    });
    expect(response.status()).toBe(400);

    resBody = await response.json();
    expect(resBody.error).toEqual(error._badRequest);
    expect(resBody.errorMessage).toContain(errorMessage.emptyCheckinOrCheckout);
  });

  test('POST /booking - invalid roomid format (string)', async ({
    request
  }) => {
    response = await request.post('booking/', {
      data: {
        roomid: invalidData.idStr,
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
    expect(response.status()).toBe(400);

    resBody = await response.json();
    expect(resBody.error).toEqual(error.badRequest);
  });

  test('POST /booking - invalid roomid format (special characters)', async ({
    request
  }) => {
    response = await request.post('booking/', {
      data: {
        roomid: invalidData.idSpecChar,
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
    expect(response.status()).toBe(400);

    resBody = await response.json();
    expect(resBody.error).toEqual(error.badRequest);
  });

  test('POST /booking - invalid firstname value (min boundary)', async ({
    request
  }) => {
    response = await request.post('booking/', {
      data: {
        roomid: roomid,
        firstname: invalidData.firstnameMin,
        lastname: bookingData.lastname,
        email: bookingData.email,
        phone: bookingData.phone,
        bookingdates: {
          checkin: bookingData.checkin,
          checkout: bookingData.checkout
        }
      }
    });
    expect(response.status()).toBe(400);

    resBody = await response.json();
    expect(resBody.error).toEqual(error._badRequest);
    expect(resBody.errorMessage).toContain(errorMessage.invalidFirstname);
  });

  test('POST /booking - invalid firstname value (max boundary)', async ({
    request
  }) => {
    response = await request.post('booking/', {
      data: {
        roomid: roomid,
        firstname: invalidData.firstnameMax,
        lastname: bookingData.lastname,
        email: bookingData.email,
        phone: bookingData.phone,
        bookingdates: {
          checkin: bookingData.checkin,
          checkout: bookingData.checkout
        }
      }
    });
    expect(response.status()).toBe(400);

    resBody = await response.json();
    expect(resBody.error).toEqual(error._badRequest);
    expect(resBody.errorMessage).toContain(errorMessage.invalidFirstname);
  });

  test('POST /booking - invalid lastname value (min boundary)', async ({
    request
  }) => {
    response = await request.post('booking/', {
      data: {
        roomid: roomid,
        firstname: bookingData.firstname,
        lastname: invalidData.lastnameMin,
        email: bookingData.email,
        phone: bookingData.phone,
        bookingdates: {
          checkin: bookingData.checkin,
          checkout: bookingData.checkout
        }
      }
    });
    expect(response.status()).toBe(400);

    resBody = await response.json();
    expect(resBody.error).toEqual(error._badRequest);
    expect(resBody.errorMessage).toContain(errorMessage.invalidLastname);
  });

  test('POST /booking - invalid lastname value (max boundary)', async ({
    request
  }) => {
    response = await request.post('booking/', {
      data: {
        roomid: roomid,
        firstname: bookingData.firstname,
        lastname: invalidData.lastnameMax,
        email: bookingData.email,
        phone: bookingData.phone,
        bookingdates: {
          checkin: bookingData.checkin,
          checkout: bookingData.checkout
        }
      }
    });
    expect(response.status()).toBe(400);

    resBody = await response.json();
    expect(resBody.error).toEqual(error._badRequest);
    expect(resBody.errorMessage).toContain(errorMessage.invalidLastname);
  });

  test('POST /booking - invalid email format', async ({ request }) => {
    response = await request.post('booking/', {
      data: {
        roomid: roomid,
        firstname: bookingData.firstname,
        lastname: bookingData.lastname,
        email: invalidData.email,
        phone: bookingData.phone,
        bookingdates: {
          checkin: bookingData.checkin,
          checkout: bookingData.checkout
        }
      }
    });
    expect(response.status()).toBe(400);

    resBody = await response.json();
    expect(resBody.error).toEqual(error._badRequest);
    expect(resBody.errorMessage).toContain(errorMessage.invalidEmail);
  });

  test('POST /booking - invalid phone value (min boundary)', async ({
    request
  }) => {
    response = await request.post('booking/', {
      data: {
        roomid: roomid,
        firstname: bookingData.firstname,
        lastname: bookingData.lastname,
        email: bookingData.email,
        phone: invalidData.phoneMin,
        bookingdates: {
          checkin: bookingData.checkin,
          checkout: bookingData.checkout
        }
      }
    });
    expect(response.status()).toBe(400);

    resBody = await response.json();
    expect(resBody.error).toEqual(error._badRequest);
    expect(resBody.errorMessage).toContain(errorMessage.invalidPhone);
  });

  test('POST /booking - invalid phone value (max boundary)', async ({
    request
  }) => {
    response = await request.post('booking/', {
      data: {
        roomid: roomid,
        firstname: bookingData.firstname,
        lastname: bookingData.lastname,
        email: bookingData.email,
        phone: invalidData.phoneMax,
        bookingdates: {
          checkin: bookingData.checkin,
          checkout: bookingData.checkout
        }
      }
    });
    expect(response.status()).toBe(400);

    resBody = await response.json();
    expect(resBody.error).toEqual(error._badRequest);
    expect(resBody.errorMessage).toContain(errorMessage.invalidPhone);
  });

  test('POST /booking - invalid checkin date format', async ({ request }) => {
    response = await request.post('booking/', {
      data: {
        roomid: roomid,
        firstname: bookingData.firstname,
        lastname: bookingData.lastname,
        email: bookingData.email,
        phone: bookingData.phone,
        bookingdates: {
          checkin: invalidData.checkin,
          checkout: bookingData.checkout
        }
      }
    });
    expect(response.status()).toBe(400);

    resBody = await response.json();
    expect(resBody.error).toEqual(error.badRequest);
  });

  test('POST /booking - invalid checkout date format', async ({ request }) => {
    response = await request.post('booking/', {
      data: {
        roomid: roomid,
        firstname: bookingData.firstname,
        lastname: bookingData.lastname,
        email: bookingData.email,
        phone: bookingData.phone,
        bookingdates: {
          checkin: bookingData.checkin,
          checkout: invalidData.checkout
        }
      }
    });
    expect(response.status()).toBe(400);

    resBody = await response.json();
    expect(resBody.error).toEqual(error.badRequest);
  });
});
