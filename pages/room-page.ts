import { Locator, Page } from '@playwright/test';
import { RoomsPage } from '../pages/rooms-page';

export class RoomPage extends RoomsPage {
  readonly page: Page;
  readonly editButton: Locator;
  readonly updateButton: Locator;

  constructor(page: Page) {
    super(page);
    this.editButton = page.getByRole('button', { name: 'Edit' });
    this.updateButton = page.getByRole('button', { name: 'Update' });
  }

  async updateName(name: string) {
    await this.nameField.clear();
    await this.nameField.fill(name);
  }

  async updatePrice(price: string) {
    await this.priceField.clear();
    await this.priceField.fill(price);
  }

  async updateDescription(description: string) {
    await this.description.clear();
    await this.description.fill(description);
  }

  async updateImage(image: string) {
    await this.image.clear();
    await this.image.fill(image);
  }

  async updateRoom(
    roomName?: string,
    roomType?: string,
    roomAccessibility?: string,
    roomPrice?: string,
    wifi?: string,
    tv?: string,
    radio?: string,
    refreshments?: string,
    safe?: string,
    views?: string,
    description?: string,
    image?: string
  ) {
    if (roomName != null && roomName) {
      await this.updateName(roomName);
    }

    if (roomType != null && roomType) {
      await this.selectType(roomType);
    }

    if (roomAccessibility != null && roomAccessibility) {
      await this.selectAccessibility(roomAccessibility);
    }

    if (roomPrice != null && roomPrice) {
      await this.updatePrice(roomPrice);
    }

    await this.checkFacilities(wifi, tv, radio, refreshments, safe, views);

    if (description != null && description) {
      await this.updateDescription(description);
    }

    if (image != null && image) {
      await this.updateImage(image);
    }
  }
}
