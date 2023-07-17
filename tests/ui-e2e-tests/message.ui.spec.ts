import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home-page';
import { messageData } from '../../utils/test-data';

test.describe('Message @message', () => {
  let homePage: HomePage;

  test('Sending message with valid data is successful @smoke', async ({
    page
  }) => {
    homePage = new HomePage(page);

    // Navigate to the home page
    await page.goto(homePage.path);

    // Scroll to the contact form
    await homePage.contactSection.scrollIntoViewIfNeeded();

    await homePage.sendMessage(
      messageData.name,
      messageData.email,
      messageData.phone,
      messageData.subject,
      messageData.description
    );

    // Assert that message was sent successfuly
    await expect(homePage.successfulMessageSentText).toBeVisible();
  });
});
