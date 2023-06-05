import {
  generateRandomNumber,
  generateRandomString,
  setDates
} from './helpers';

export const roomData = {
  roomName: 'Apartment',
  type: 'Family',
  accessible: false,
  roomPrice: 80,
  features: ['WiFi', 'Safe', 'Views'],
  image:
    // eslint-disable-next-line max-len
    'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  description:
    // eslint-disable-next-line max-len
    'Cozy family apartment provides accommodation with a garden, free WiFi and a terrace. The apartment consists of 3 bedrooms, a living room, a fully equipped kitchen with a fridge and a coffee machine, and 1 bathroom with a shower and free toiletries. Towels and bed linen are featured in the apartment.',
  forBooking: 'For booking tests'
};

export const bookingData = {
  firstname: 'Playwright',
  lastname: 'Test',
  email: 'book@email.com',
  phone: '123456789012',
  checkin: setDates(2), // used for API tests
  checkout: setDates(3), // used for API tests
  checkinDay: 1, // used for UI tests
  checkoutDay: 8, // used for UI tests
  depositpaid: true
};

export const messageData = {
  name: 'Playwright',
  email: 'message@email.com',
  phone: '123456789012',
  subject: 'Test Subject',
  description: 'This is text of the message sent'
};

export const invalidData = {
  username: 'addmin',
  password: 'passw',
  idNum: generateRandomNumber(10000, 99999),
  idStr: 'one',
  idSpecChar: '*',
  roomPriceStr: 'one hundred',
  roomPriceNum: 0,
  roomAccessibility: 'yes',
  roomType: 'Apartment',
  firstnameMin: generateRandomString(2),
  firstnameMax: generateRandomString(19),
  lastnameMin: generateRandomString(2),
  lastnameMax: generateRandomString(31),
  email: 'invalid.email@',
  phoneMin: generateRandomNumber(1000000000, 9999999999),
  phoneMax:
    // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
    '+' + generateRandomNumber(111111111111111111111, 999999999999999999999),
  checkin: '2023-13-04',
  checkout: '13-04-2023',
  depositpaid: 'yes',
  subjectMin: generateRandomString(4),
  subjectMax: generateRandomString(101),
  descriptionMin: generateRandomString(19),
  descriptionMax: generateRandomString(2001)
};
