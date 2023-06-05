import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home-page';
import { invalidData, messageData } from '../../utils/test-data';

test.describe('Message validations', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);

    // Navigate to the home page
    await page.goto(homePage.path);

    // Scroll to the contact form
    await homePage.contactSection.scrollIntoViewIfNeeded();
  });

  test('Sending message with empty name field is not possible', async ({
    page
  }) => {
    homePage = new HomePage(page);

    await homePage.sendMessage(
      '',
      messageData.email,
      messageData.phone,
      messageData.subject,
      messageData.description
    );

    // Assert that message was not sent
    await expect(homePage.successfulMessageSentText).toBeHidden();
    await expect(homePage.emptyNameValidationText).toBeVisible();
  });

  test('Sending message with empty email field is not possible', async ({
    page
  }) => {
    homePage = new HomePage(page);

    await homePage.sendMessage(
      messageData.name,
      '',
      messageData.phone,
      messageData.subject,
      messageData.description
    );

    // Assert that message was not sent
    await expect(homePage.successfulMessageSentText).toBeHidden();
    await expect(homePage.emptyEmailValidationText).toBeVisible();
  });

  test('Sending message with empty phone field is not possible', async ({
    page
  }) => {
    homePage = new HomePage(page);

    await homePage.sendMessage(
      messageData.name,
      messageData.email,
      '',
      messageData.subject,
      messageData.description
    );

    // Assert that message was not sent
    await expect(homePage.successfulMessageSentText).toBeHidden();
    await expect(homePage.emptyPhoneValidationText).toBeVisible();
    await expect(homePage.invalidPhoneNumberValidationText).toBeVisible();
  });

  test('Sending message with empty subject field is not possible', async ({
    page
  }) => {
    homePage = new HomePage(page);

    await homePage.sendMessage(
      messageData.name,
      messageData.email,
      messageData.phone,
      '',
      messageData.description
    );

    // Assert that message was not sent
    await expect(homePage.successfulMessageSentText).toBeHidden();
    await expect(homePage.emptySubjectValidationText).toBeVisible();
    await expect(homePage.invalidSubjectValidationText).toBeVisible();
  });

  test('Sending message with empty message field is not possible', async ({
    page
  }) => {
    homePage = new HomePage(page);

    await homePage.sendMessage(
      messageData.name,
      messageData.email,
      messageData.phone,
      messageData.subject,
      ''
    );

    // Assert that message was not sent
    await expect(homePage.successfulMessageSentText).toBeHidden();
    await expect(homePage.emptyMessageValidationText).toBeVisible();
    await expect(homePage.invalidMessageValidationText).toBeVisible();
  });

  test('Sending message with invalid email format is not possible', async ({
    page
  }) => {
    homePage = new HomePage(page);

    await homePage.sendMessage(
      messageData.name,
      invalidData.email,
      messageData.phone,
      messageData.subject,
      messageData.description
    );

    // Assert that message was not sent
    await expect(homePage.successfulMessageSentText).toBeHidden();
    await expect(homePage.invalidEmailValidationText).toBeVisible();
  });

  test('Sending message with invalid phone number (min boundary) is not possible', async ({
    page
  }) => {
    homePage = new HomePage(page);

    await homePage.sendMessage(
      messageData.name,
      messageData.email,
      String(invalidData.phoneMin),
      messageData.subject,
      messageData.description
    );

    // Assert that message was not sent
    await expect(homePage.successfulMessageSentText).toBeHidden();
    await expect(homePage.invalidPhoneNumberValidationText).toBeVisible();
  });

  test('Sending message with invalid phone number (max boundary) is not possible', async ({
    page
  }) => {
    homePage = new HomePage(page);

    await homePage.sendMessage(
      messageData.name,
      messageData.email,
      String(invalidData.phoneMax),
      messageData.subject,
      messageData.description
    );

    // Assert that message was not sent
    await expect(homePage.successfulMessageSentText).toBeHidden();
    await expect(homePage.invalidPhoneNumberValidationText).toBeVisible();
  });

  test('Sending message with invalid subject (min boundary) is not possible', async ({
    page
  }) => {
    homePage = new HomePage(page);

    await homePage.sendMessage(
      messageData.name,
      messageData.email,
      messageData.phone,
      invalidData.subjectMin,
      messageData.description
    );

    // Assert that message was not sent
    await expect(homePage.successfulMessageSentText).toBeHidden();
    await expect(homePage.invalidSubjectValidationText).toBeVisible();
  });

  test('Sending message with invalid subject (max boundary) is not possible', async ({
    page
  }) => {
    homePage = new HomePage(page);

    await homePage.sendMessage(
      messageData.name,
      messageData.email,
      messageData.phone,
      invalidData.subjectMax,
      messageData.description
    );

    // Assert that message was not sent
    await expect(homePage.successfulMessageSentText).toBeHidden();
    await expect(homePage.invalidSubjectValidationText).toBeVisible();
  });

  test('Sending message with invalid message (min boundary) is not possible', async ({
    page
  }) => {
    homePage = new HomePage(page);

    await homePage.sendMessage(
      messageData.name,
      messageData.email,
      messageData.phone,
      messageData.subject,
      invalidData.descriptionMin
    );

    // Assert that message was not sent
    await expect(homePage.successfulMessageSentText).toBeHidden();
    await expect(homePage.invalidMessageValidationText).toBeVisible();
  });

  test('Sending message with invalid message (max boundary) is not possible', async ({
    page
  }) => {
    homePage = new HomePage(page);

    await homePage.sendMessage(
      messageData.name,
      messageData.email,
      messageData.phone,
      messageData.subject,
      invalidData.descriptionMax
    );

    // Assert that message was not sent
    await expect(homePage.successfulMessageSentText).toBeHidden();
    await expect(homePage.invalidMessageValidationText).toBeVisible();
  });
});
