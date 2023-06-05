import { test, expect, APIResponse } from '@playwright/test';
import { invalidData, messageData } from '../../../utils/test-data';

test.describe('DELETE /message', () => {
  let response: APIResponse;
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

    const resBody = await response.json();
    messageid = resBody.messageid;
  });

  test('DELETE /message/messageid', async ({ request }) => {
    response = await request.delete(`message/${messageid}`);
    expect(response.status()).toBe(202);
  });

  test('DELETE /message/messageid - invalid roomid value', async ({
    request
  }) => {
    response = await request.delete(`message/${invalidData.idNum}`);
    expect(response.status()).toBe(404);
  });
});
