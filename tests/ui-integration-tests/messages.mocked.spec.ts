import { test, expect } from '@playwright/test';
import messages from '../../mocks/messages.json';
import { MessagesPage } from '../../pages/messages-page';
import message from '../../mocks/message.json';

test.describe('Messages - mocked API', () => {
  let messagesPage: MessagesPage;

  test.beforeEach(async ({ page }) => {
    messagesPage = new MessagesPage(page);

    // Mock GET /message/count request
    await page.route('message/count', async (route) => {
      route.fulfill({
        body: JSON.stringify({
          count: 1
        })
      });
    });

    // Mock GET /message request
    await page.route('message/', async (route) => {
      route.fulfill({
        body: JSON.stringify(messages)
      });
    });

    // Navigate to the messages page
    await page.goto(messagesPage.path);

    // Assert that messages are mocked successfully
    await expect(page.getByText('Playwright Test 1')).toBeVisible();
    await expect(page.getByText('Playwright Test 2')).toBeVisible();
    await expect(messagesPage.messageNotification).toContainText('1');
  });

  test('Reading the message is successful', async ({ page }) => {
    messagesPage = new MessagesPage(page);

    // Mock GET /message/102 request
    await page.route('message/102', async (route) => {
      route.fulfill({
        body: JSON.stringify(message)
      });
    });

    await page.getByText('Playwright Test 2').click();

    await expect(messagesPage.dialog).toBeVisible();
    await expect(messagesPage.message).toBeVisible();
    await expect(messagesPage.message).toContainText(
      'This is text of the second message'
    );

    // Close the dialog
    await messagesPage.closeButton.click();
    await expect(messagesPage.dialog).toBeHidden();
  });
});
