import { expect, test } from '@playwright/test';
import { STORAGE_STATE } from '../playwright.config';

test('Prepare the storage state', async ({ request }) => {
  // Authentificate the user
  const loginResponse = await request.post('auth/login', {
    data: {
      username: process.env.PW_USERNAME,
      password: process.env.PW_PASSWORD
    }
  });

  expect(loginResponse.status()).toBe(200);

  // Save the storage state so it can be used in all tests
  await request.storageState({ path: STORAGE_STATE });
});
