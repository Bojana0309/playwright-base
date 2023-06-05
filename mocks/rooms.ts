import { generateRandomNumber } from '../utils/helpers';

export const rooms = {
  rooms: [
    {
      roomid: 101,
      roomName: 'Mocked room - 101',
      type: 'Family',
      accessible: false,
      image: 'https://www.mwtestconsultancy.co.uk/img/room1.jpg',
      description: 'This is first mocked room',
      features: ['Safe', 'Views'],
      roomPrice: 95
    },
    {
      roomid: generateRandomNumber(100, 999),
      roomName: 'Mocked room - random id',
      type: 'Family',
      accessible: false,
      image: 'https://www.mwtestconsultancy.co.uk/img/room1.jpg',
      description: 'This is second mocked room',
      features: ['WiFi', 'Radio'],
      roomPrice: 100
    }
  ]
};
