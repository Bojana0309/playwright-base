import { test, expect, APIResponse } from '@playwright/test';
import { error } from '../../../utils/constants';
import { invalidData, messageData } from '../../../utils/test-data';

test.describe('GET /message', () => {
  let response: APIResponse;
  let resBody;
  let messageid: number;

  test.beforeAll(async ({ request }) => {
    response = await request.post('message/', {
      data: {
        name: messageData.name,
        email: messageData.email,
        phone: messageData.phone,
        subject: messageData.subject,
        description: messageData.description
      }
    });
    expect(response.status()).toBe(201);

    resBody = await response.json();
    messageid = resBody.messageid;
  });

  test.afterAll(async ({ request }) => {
    response = await request.delete(`message/${messageid}`);
    expect(response.status()).toBe(202);
  });

  test('GET /message', async ({ request }) => {
    response = await request.get('message/');
    expect(response.status()).toBe(200);

    resBody = await response.json();
    expect(resBody.messages.length).toBeGreaterThan(1);
  });

  test('GET /message/messageid', async ({ request }) => {
    response = await request.get(`message/${messageid}`);
    expect(response.status()).toBe(200);

    resBody = await response.json();
    expect(resBody.name).toEqual(messageData.name);
    expect(resBody.email).toEqual(messageData.email);
    expect(resBody.phone).toEqual(messageData.phone);
    expect(resBody.subject).toEqual(messageData.subject);
    expect(resBody.description).toEqual(messageData.description);
  });

  test('GET /message/messageid - invalid messageid value', async ({
    request
  }) => {
    response = await request.get(`message/${invalidData.idNum}`);
    expect(response.status()).toBe(500);

    resBody = await response.json();
    expect(resBody.error).toEqual(error.internalServerError);
  });

  test('GET /message/messageid - invalid messageid format (string)', async ({
    request
  }) => {
    response = await request.get(`message/${invalidData.idStr}`);
    expect(response.status()).toBe(404);

    resBody = await response.json();
    expect(resBody.error).toEqual(error.notFound);
  });

  test('GET /message/messageid - invalid messageid format (special characters)', async ({
    request
  }) => {
    response = await request.get(`message/${invalidData.idSpecChar}`);
    expect(response.status()).toBe(404);

    resBody = await response.json();
    expect(resBody.error).toEqual(error.notFound);
  });
});
