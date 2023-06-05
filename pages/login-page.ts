import { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  readonly username = process.env.PW_USERNAME;
  readonly password = process.env.PW_PASSWORD;

  readonly loginHeader: Locator;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginHeader = page.getByTestId('login-header');
    this.usernameField = page.getByTestId('username');
    this.passwordField = page.getByTestId('password');
    this.loginButton = page.getByTestId('submit');
  }

  async enterUsername(username: string) {
    await this.usernameField.fill(username);
  }

  async enterPassword(password: string) {
    await this.passwordField.fill(password);
  }

  async login(username: string, password: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.loginButton.click();
  }
}
