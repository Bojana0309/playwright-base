import { test, expect, APIResponse, request } from '@playwright/test';
import { error, errorMessage } from '../../../utils/constants';
import { invalidData, messageData } from '../../../utils/test-data';

test.describe('POST /message', () => {
  let response: APIResponse;
  let resBody;

  test.beforeAll(async ({}) => {
    // Create new context with empty storage state
    await request.newContext({
      storageState: '.auth/emptyStorage.json'
    });
  });

  test('POST /message - valid data', async ({ request }) => {
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
    expect(resBody.messageid).not.toBeUndefined();
    expect(resBody.messageid).not.toBeNull();
    expect(resBody.name).toEqual(messageData.name);
    expect(resBody.email).toEqual(messageData.email);
    expect(resBody.phone).toEqual(messageData.phone);
    expect(resBody.subject).toEqual(messageData.subject);
    expect(resBody.description).toEqual(messageData.description);
  });

  test('POST /message - missing name', async ({ request }) => {
    response = await request.post('message/', {
      data: {
        email: messageData.email,
        phone: messageData.phone,
        subject: messageData.subject,
        description: messageData.description
      }
    });
    expect(response.status()).toBe(400);

    resBody = await response.json();
    expect(resBody.error).toEqual(error._badRequest);
    expect(resBody.errorMessage).toContain(errorMessage.emptyName);
  });

  test('POST /message - missing email', async ({ request }) => {
    response = await request.post('message/', {
      data: {
        name: messageData.name,
        phone: messageData.phone,
        subject: messageData.subject,
        description: messageData.description
      }
    });
    expect(response.status()).toBe(400);

    resBody = await response.json();
    expect(resBody.error).toEqual(error._badRequest);
    expect(resBody.errorMessage).toContain(errorMessage.emptyEmail);
  });

  test('POST /message - missing phone', async ({ request }) => {
    response = await request.post('message/', {
      data: {
        name: messageData.name,
        email: messageData.email,
        subject: messageData.subject,
        description: messageData.description
      }
    });
    expect(response.status()).toBe(400);

    resBody = await response.json();
    expect(resBody.error).toEqual(error._badRequest);
    expect(resBody.errorMessage).toContain(errorMessage.emptyPhone);
  });

  test('POST /message - missing subject', async ({ request }) => {
    response = await request.post('message/', {
      data: {
        name: messageData.name,
        email: messageData.email,
        phone: messageData.phone,
        description: messageData.description
      }
    });
    expect(response.status()).toBe(400);

    resBody = await response.json();
    expect(resBody.error).toEqual(error._badRequest);
    expect(resBody.errorMessage).toContain(errorMessage.emptySubject);
  });

  test('POST /message - missing message', async ({ request }) => {
    response = await request.post('message/', {
      data: {
        name: messageData.name,
        email: messageData.email,
        phone: messageData.phone,
        subject: messageData.subject
      }
    });
    expect(response.status()).toBe(400);

    resBody = await response.json();
    expect(resBody.error).toEqual(error._badRequest);
    expect(resBody.errorMessage).toContain(errorMessage.emptyMessage);
  });

  test('POST /message - invalid email format', async ({ request }) => {
    response = await request.post('message/', {
      data: {
        name: messageData.name,
        email: invalidData.email,
        phone: messageData.phone,
        subject: messageData.subject,
        description: messageData.description
      }
    });
    expect(response.status()).toBe(400);

    resBody = await response.json();
    expect(resBody.error).toEqual(error._badRequest);
    expect(resBody.errorMessage).toContain(errorMessage.invalidEmail);
  });

  test('POST /message - invalid phone value (min boundary)', async ({
    request
  }) => {
    response = await request.post('message/', {
      data: {
        name: messageData.name,
        email: messageData.email,
        phone: invalidData.phoneMin,
        subject: messageData.subject,
        description: messageData.description
      }
    });
    expect(response.status()).toBe(400);

    resBody = await response.json();
    expect(resBody.error).toEqual(error._badRequest);
    expect(resBody.errorMessage).toContain(errorMessage.invalidPhoneNumber);
  });

  test('POST /message - invalid phone value (max boundary)', async ({
    request
  }) => {
    response = await request.post('message/', {
      data: {
        name: messageData.name,
        email: messageData.email,
        phone: invalidData.phoneMax,
        subject: messageData.subject,
        description: messageData.description
      }
    });
    expect(response.status()).toBe(400);

    resBody = await response.json();
    expect(resBody.error).toEqual(error._badRequest);
    expect(resBody.errorMessage).toContain(errorMessage.invalidPhoneNumber);
  });

  test('POST /message - invalid subject value (min boundary)', async ({
    request
  }) => {
    response = await request.post('message/', {
      data: {
        name: messageData.name,
        email: messageData.email,
        phone: messageData.phone,
        subject: invalidData.subjectMin,
        description: messageData.description
      }
    });
    expect(response.status()).toBe(400);

    resBody = await response.json();
    expect(resBody.error).toEqual(error._badRequest);
    expect(resBody.errorMessage).toContain(errorMessage.invalidSubject);
  });

  test('POST /message - invalid subject value (max boundary)', async ({
    request
  }) => {
    response = await request.post('message/', {
      data: {
        name: messageData.name,
        email: messageData.email,
        phone: messageData.phone,
        subject: invalidData.subjectMax,
        description: messageData.description
      }
    });
    expect(response.status()).toBe(400);

    resBody = await response.json();
    expect(resBody.error).toEqual(error._badRequest);
    expect(resBody.errorMessage).toContain(errorMessage.invalidSubject);
  });

  test('POST /message - invalid message value (min boundary)', async ({
    request
  }) => {
    response = await request.post('message/', {
      data: {
        name: messageData.name,
        email: messageData.email,
        phone: messageData.phone,
        subject: messageData.subject,
        description: invalidData.descriptionMin
      }
    });
    expect(response.status()).toBe(400);

    resBody = await response.json();
    expect(resBody.error).toEqual(error._badRequest);
    expect(resBody.errorMessage).toContain(errorMessage.invalidMessage);
  });

  test('POST /message - invalid message value (max boundary)', async ({
    request
  }) => {
    response = await request.post('message/', {
      data: {
        name: messageData.name,
        email: messageData.email,
        phone: messageData.phone,
        subject: messageData.subject,
        description: invalidData.descriptionMax
      }
    });
    expect(response.status()).toBe(400);

    resBody = await response.json();
    expect(resBody.error).toEqual(error._badRequest);
    expect(resBody.errorMessage).toContain(errorMessage.invalidMessage);
  });
});
