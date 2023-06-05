import { test, expect, request, APIResponse } from '@playwright/test';
import { invalidData } from '../../../utils/test-data';

test.describe('POST /login', () => {
  let response: APIResponse;

  test.beforeAll(async ({}) => {
    // Create new context with empty storage state
    await request.newContext({
      storageState: '.auth/emptyStorage.json'
    });
  });

  test('POST auth/login - valid username and password', async ({ request }) => {
    response = await request.post('auth/login', {
      data: {
        username: process.env.PW_USERNAME,
        password: process.env.PW_PASSWORD
      }
    });
    expect(response.status()).toBe(200);
  });

  test('POST auth/login - missing username', async ({ request }) => {
    response = await request.post('auth/login', {
      data: { password: process.env.PW_PASSWORD }
    });
    expect(response.status()).toBe(403);
  });

  test('POST auth/login - missing password', async ({ request }) => {
    response = await request.post('auth/login', {
      data: { username: process.env.PW_USERNAME }
    });
    expect(response.status()).toBe(403);
  });

  test('POST auth/login - invalid username value', async ({ request }) => {
    response = await request.post('auth/login', {
      data: {
        username: invalidData.username,
        password: process.env.PW_PASSWORD
      }
    });
    expect(response.status()).toBe(403);
  });

  test('POST auth/login - invalid password value', async ({ request }) => {
    response = await request.post('auth/login', {
      data: {
        username: process.env.PW_USERNAME,
        password: invalidData.password
      }
    });
    expect(response.status()).toBe(403);
  });
});
