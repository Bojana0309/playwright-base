import { Locator, Page } from '@playwright/test';

export class MessagesPage {
  readonly page: Page;
  readonly path = '#/admin/messages';
  readonly messageNotification: Locator;
  readonly dialog: Locator;
  readonly message: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.messageNotification = page.locator('.notification');
    this.dialog = page.getByRole('dialog');
    this.message = page.getByTestId('message');
    this.closeButton = page.getByRole('button', { name: 'Close' });
  }
}
