export const error = {
  _badRequest: 'BAD_REQUEST',
  badRequest: 'Bad Request',
  internalServerError: 'Internal Server Error',
  notFound: 'Not Found'
};

export const errorMessage = {
  emptyRoomName: 'Room name must be set',
  emptyRoomType: 'Type must be set',
  emptyOrInvalidRoomPrice: 'must be greater than or equal to 1',
  invalidRoomType:
    'Type can only contain the room options Single, Double, Twin, Family or Suite',
  emptyFirstname: 'Firstname should not be blank',
  emptyLastname: 'Lastname should not be blank',
  emptyCheckinOrCheckout: 'must not be null',
  invalidFirstname: 'size must be between 3 and 18',
  invalidLastname: 'size must be between 3 and 30',
  invalidEmail: 'must be a well-formed email address',
  invalidPhone: 'size must be between 11 and 21',
  invalidPhoneNumber: 'Phone must be between 11 and 21 characters.',
  emptyName: 'Name may not be blank',
  emptyEmail: 'Email may not be blank',
  emptyEmailOrPhoneField: 'must not be empty',
  emptyPhone: 'Phone may not be blank',
  emptySubject: 'Subject may not be blank',
  emptyMessage: 'Message may not be blank',
  invalidSubject: 'Subject must be between 5 and 100 characters.',
  invalidMessage: 'Message must be between 20 and 2000 characters.'
};

export const message = {
  successfulBooking: 'Booking Successful!',
  successfulMessageSent: 'Thanks for getting in touch'
};
