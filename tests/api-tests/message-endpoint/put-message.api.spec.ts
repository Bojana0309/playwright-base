import { test, expect, APIResponse } from '@playwright/test';
import { messageData } from '../../../utils/test-data';

test.describe('PUT /message', () => {
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

  test.afterAll(async ({ request }) => {
    response = await request.delete(`message/${messageid}`);
    expect(response.status()).toBe(202);
  });

  test('PUT /message/messageid/read', async ({ request }) => {
    response = await request.put(`message/${messageid}/read`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    expect(response.status()).toBe(202);
  });
});
