import { Locator, Page } from '@playwright/test';
import { errorMessage } from '../utils/constants';

export class RoomsPage {
  readonly page: Page;

  readonly homePageLink: Locator;
  readonly logOutLink: Locator;
  readonly roomRow: Locator;
  readonly nameField: Locator;
  readonly typeDropdown: Locator;
  readonly accessibilityDropdown: Locator;
  readonly priceField: Locator;
  readonly wifiCheckbox: Locator;
  readonly tvCheckbox: Locator;
  readonly radioCheckbox: Locator;
  readonly refreshmentsCheckbox: Locator;
  readonly safeCheckbox: Locator;
  readonly viewsCheckbox: Locator;
  readonly description: Locator;
  readonly image: Locator;
  readonly createButton: Locator;
  readonly accessibilityTrueText: Locator;
  readonly emptyRoomNameValidationText: Locator;
  readonly emptyOrInvalidRoomPriceValidationText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homePageLink = page.locator('#frontPageLink');
    this.logOutLink = page.getByRole('link', { name: 'Logout' });
    this.roomRow = page.getByTestId('roomlisting');
    this.nameField = page.locator('id=roomName');
    this.typeDropdown = page.locator('id=type');
    this.accessibilityDropdown = page.locator('id=accessible');
    this.priceField = page.locator('id=roomPrice');
    this.wifiCheckbox = page.locator('id=wifiCheckbox');
    this.tvCheckbox = page.locator('id=tvCheckbox');
    this.radioCheckbox = page.locator('id=radioCheckbox');
    this.refreshmentsCheckbox = page.locator('id=refreshCheckbox');
    this.safeCheckbox = page.locator('id=safeCheckbox');
    this.viewsCheckbox = page.locator('id=viewsCheckbox');
    this.description = page.locator('id=description');
    this.image = page.locator('id=image');
    this.createButton = page.getByRole('button', { name: 'Create' });
    this.accessibilityTrueText = page.locator('id=accessibletrue');
    this.emptyRoomNameValidationText = page.getByText(
      errorMessage.emptyRoomName
    );
    this.emptyOrInvalidRoomPriceValidationText = page.getByText(
      errorMessage.emptyOrInvalidRoomPrice
    );
  }

  async enterName(name: string) {
    await this.nameField.fill(name);
  }

  async selectType(type: string) {
    await this.typeDropdown.selectOption(type);
  }

  async selectAccessibility(accessibility: string) {
    await this.accessibilityDropdown.selectOption(accessibility);
  }

  async enterPrice(price: string) {
    await this.priceField.fill(price);
  }

  async checkFacilities(
    wifi?: string,
    tv?: string,
    radio?: string,
    refreshments?: string,
    safe?: string,
    views?: string
  ) {
    if (wifi != null && wifi && !(await this.wifiCheckbox.isChecked())) {
      await this.wifiCheckbox.check();
    }

    if (tv != null && tv && !(await this.tvCheckbox.isChecked())) {
      await this.tvCheckbox.check();
    }

    if (radio != null && radio && !(await this.radioCheckbox.isChecked())) {
      await this.radioCheckbox.check();
    }

    if (
      refreshments != null &&
      refreshments &&
      !(await this.refreshmentsCheckbox.isChecked())
    ) {
      await this.refreshmentsCheckbox.check();
    }

    if (safe != null && safe && !(await this.safeCheckbox.isChecked())) {
      await this.safeCheckbox.check();
    }

    if (views != null && views && !(await this.viewsCheckbox.isChecked())) {
      await this.viewsCheckbox.check();
    }
  }

  async uncheckAllFacilities() {
    if (await this.wifiCheckbox.isChecked()) {
      await this.wifiCheckbox.uncheck();
    }

    if (await this.tvCheckbox.isChecked()) {
      await this.tvCheckbox.uncheck();
    }

    if (await this.radioCheckbox.isChecked()) {
      await this.radioCheckbox.uncheck();
    }

    if (await this.refreshmentsCheckbox.isChecked()) {
      await this.refreshmentsCheckbox.uncheck();
    }

    if (await this.safeCheckbox.isChecked()) {
      await this.safeCheckbox.uncheck();
    }

    if (await this.viewsCheckbox.isChecked()) {
      await this.viewsCheckbox.uncheck();
    }
  }

  async createRoom(
    roomName: string,
    roomType: string,
    roomAccessibility: string,
    roomPrice: string,
    wifi?: string,
    tv?: string,
    radio?: string,
    refreshments?: string,
    safe?: string,
    views?: string
  ) {
    await this.enterName(roomName);
    await this.selectType(roomType);
    await this.selectAccessibility(roomAccessibility);
    await this.enterPrice(roomPrice);
    await this.checkFacilities(wifi, tv, radio, refreshments, safe, views);
    await this.createButton.click();

    /* This step is necessary, because currently there is a bug in the app:
     ** When Create button is clicked, room facilities that was previously checked,
     ** stay checked for the next room that can be created.
     */
    await this.uncheckAllFacilities();
  }
}
