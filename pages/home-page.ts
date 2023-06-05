import { Locator, Page, expect } from '@playwright/test';
import { roomData } from '../utils/test-data';
import { errorMessage, message } from '../utils/constants';

let checkinDate: Locator;
let checkoutDate: Locator;

export class HomePage {
  readonly page: Page;
  readonly path = '/';

  readonly adminPanelLink: Locator;
  readonly roomInfo: Locator;
  readonly roomDescription: Locator;

  // Room booking
  readonly bookThisRoomButton: Locator;
  readonly calendarTable: Locator;
  readonly firstnameField: Locator;
  readonly lastnameField: Locator;
  readonly emailField: Locator;
  readonly phoneField: Locator;
  readonly nextButton: Locator;
  readonly monthRow: Locator;
  readonly availableDates: Locator;
  readonly selectedDateRange: Locator;
  readonly bookButton: Locator;
  readonly dialog: Locator;
  readonly successfulBookingText: Locator;
  readonly closeButton: Locator;
  readonly accessibilityIcon: Locator;
  readonly emptyFirstnameValidationText: Locator;
  readonly emptyLastnameValidationText: Locator;
  readonly emptyEmailOrPhoneValidationText: Locator;
  readonly emptyDatesValidationText: Locator;
  readonly invalidFirstnameValidationText: Locator;
  readonly invalidLastnameValidationText: Locator;
  readonly invalidPhoneValidationText: Locator;

  // Message sending
  readonly contactSection: Locator;
  readonly contactNameField: Locator;
  readonly contactEmailField: Locator;
  readonly contactPhoneField: Locator;
  readonly contactSubjectField: Locator;
  readonly contactMessageField: Locator;
  readonly submitButton: Locator;
  readonly successfulMessageSentText: Locator;
  readonly emptyNameValidationText: Locator;
  readonly emptyEmailValidationText: Locator;
  readonly emptyPhoneValidationText: Locator;
  readonly emptySubjectValidationText: Locator;
  readonly emptyMessageValidationText: Locator;
  readonly invalidEmailValidationText: Locator;
  readonly invalidPhoneNumberValidationText: Locator;
  readonly invalidSubjectValidationText: Locator;
  readonly invalidMessageValidationText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.adminPanelLink = page.getByAltText('Link to admin page');
    this.roomInfo = page.locator('.row.hotel-room-info');
    this.roomDescription = page.getByText(roomData.description);

    // Room booking
    this.bookThisRoomButton = page.getByRole('button', {
      name: 'Book this room'
    });
    this.calendarTable = page.getByRole('table');
    this.firstnameField = page.getByPlaceholder('Firstname');
    this.lastnameField = page.getByPlaceholder('Lastname');
    this.emailField = page.locator('.form-control.room-email');
    this.phoneField = page.locator('.form-control.room-phone');
    this.nextButton = page.getByRole('button', { name: 'Next' });
    this.availableDates = page.locator('.rbc-day-bg:not(.rbc-off-range-bg)');
    this.selectedDateRange = page.getByTitle('7 night(s)');
    this.bookButton = page.getByRole('button', { name: 'Book' });
    this.dialog = page.getByRole('dialog');
    this.successfulBookingText = page
      .getByRole('heading')
      .getByText(message.successfulBooking);
    this.closeButton = page.getByRole('button', { name: 'Close' });
    this.accessibilityIcon = page.locator('.fa.fa-wheelchair.wheelchair');
    this.emptyFirstnameValidationText = page.getByText(
      errorMessage.emptyFirstname
    );
    this.emptyLastnameValidationText = page.getByText(
      errorMessage.emptyLastname
    );
    this.emptyEmailOrPhoneValidationText = page.getByText(
      errorMessage.emptyEmailOrPhoneField
    );
    this.emptyDatesValidationText = page.getByText(
      errorMessage.emptyCheckinOrCheckout
    );
    this.invalidFirstnameValidationText = page.getByText(
      errorMessage.invalidFirstname
    );
    this.invalidLastnameValidationText = page.getByText(
      errorMessage.invalidLastname
    );
    this.invalidPhoneValidationText = page.getByText(errorMessage.invalidPhone);

    // Message sending
    this.contactSection = page.locator('.row.contact');
    this.contactNameField = page.getByTestId('ContactName');
    this.contactEmailField = page.getByTestId('ContactEmail');
    this.contactPhoneField = page.getByTestId('ContactPhone');
    this.contactSubjectField = page.getByTestId('ContactSubject');
    this.contactMessageField = page.getByTestId('ContactDescription');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.successfulMessageSentText = page.getByRole('heading', {
      name: message.successfulMessageSent
    });
    this.emptyNameValidationText = page.getByText(errorMessage.emptyName);
    this.emptyEmailValidationText = page.getByText(errorMessage.emptyEmail);
    this.emptyPhoneValidationText = page.getByText(errorMessage.emptyPhone);
    this.emptySubjectValidationText = page.getByText(errorMessage.emptySubject);
    this.emptyMessageValidationText = page.getByText(errorMessage.emptyMessage);
    this.invalidEmailValidationText = page.getByText(errorMessage.invalidEmail);
    this.invalidPhoneNumberValidationText = page.getByText(
      errorMessage.invalidPhoneNumber
    );
    this.invalidSubjectValidationText = page.getByText(
      errorMessage.invalidSubject
    );
    this.invalidMessageValidationText = page.getByText(
      errorMessage.invalidMessage
    );
  }

  async enterFirstname(firstname: string) {
    await this.firstnameField.fill(firstname);
  }

  async enterLastname(lastname: string) {
    await this.lastnameField.fill(lastname);
  }

  async enterEmail(email: string) {
    await this.emailField.fill(email);
  }

  async enterPhone(phone: string) {
    await this.phoneField.fill(phone);
  }

  async enterContactName(name: string) {
    await this.contactNameField.fill(name);
  }

  async enterContactEmail(email: string) {
    await this.contactEmailField.fill(email);
  }

  async enterContactPhone(phone: string) {
    await this.contactPhoneField.fill(phone);
  }

  async enterSubject(subject: string) {
    await this.contactSubjectField.fill(subject);
  }

  async enterMessage(message: string) {
    await this.contactMessageField.fill(message);
  }

  async selectDates(checkinDay: number, checkoutDay: number) {
    const browser = this.page.context().browser().browserType().name();

    switch (browser) {
      case 'chromium': {
        checkinDate = this.availableDates.nth(checkinDay - 1);
        checkoutDate = this.availableDates.nth(checkoutDay - 1);
        break;
      }
      case 'firefox': {
        checkinDate = this.availableDates.nth(checkinDay + 7);
        checkoutDate = this.availableDates.nth(checkoutDay + 7);
        break;
      }

      case 'webkit': {
        checkinDate = this.availableDates.nth(checkinDay + 15);
        checkoutDate = this.availableDates.nth(checkoutDay + 15);
        break;
      }
    }

    const startBox = await checkinDate.boundingBox();
    const endBox = await checkoutDate.boundingBox();

    await this.page.mouse.move(
      startBox.x + startBox.width / 2,
      startBox.y + startBox.height / 2
    );
    await this.page.mouse.down();
    await this.page.mouse.move(
      endBox.x + endBox.width / 2,
      endBox.y + endBox.height / 2,
      { steps: 8 }
    );
    await this.page.mouse.up();
  }

  async bookRoom(
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    checkinDay?: number,
    checkoutDay?: number
  ) {
    await this.bookThisRoomButton.last().click();

    // Fill in room booking form
    await this.enterFirstname(firstname);
    await this.enterLastname(lastname);
    await this.enterEmail(email);
    await this.enterPhone(phone);

    if (checkinDay && checkoutDay) {
      await this.calendarTable.scrollIntoViewIfNeeded();
      // Go to next month and choose dates
      await this.nextButton.click();
      await this.selectDates(checkinDay, checkoutDay);
      await expect(this.selectedDateRange).toHaveCount(2);
    }

    await this.bookButton.last().click();
  }

  async sendMessage(
    name: string,
    email: string,
    phone: string,
    subject: string,
    message: string
  ) {
    await this.enterContactName(name);
    await this.enterContactEmail(email);
    await this.enterContactPhone(phone);
    await this.enterSubject(subject);
    await this.enterMessage(message);
    await this.submitButton.click();
  }
}
