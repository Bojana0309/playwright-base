const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export const generateRandomString = (length: number) => {
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const generateRandomNumber = (minValue: number, maxValue: number) => {
  return Math.round(Math.random() * (maxValue - minValue)) + minValue;
};

export const getDates = (daysToAddForCheckout: number) => {
  const currentDate = new Date();
  const futureDate = new Date(
    currentDate.setDate(currentDate.getDate() + daysToAddForCheckout)
  );

  const currentDay = currentDate.getDate();
  const checkinDay = currentDay >= 10 ? currentDay : `0${currentDay}`;

  const futureDay = futureDate.getDate();
  const checkoutDay = futureDay >= 10 ? futureDay : `0${futureDay}`;

  const currentMonth = currentDate.getMonth() + 1;
  const month = currentMonth >= 10 ? currentMonth : `0${currentMonth}`;

  const year = currentDate.getFullYear();

  return { checkinDay, checkoutDay, month, year };
};

export const setDates = (daysToAddForCheckout: number) => {
  const { checkinDay, checkoutDay, month, year } =
    getDates(daysToAddForCheckout);
  if (daysToAddForCheckout === 0) {
    return `${year}-${month}-${checkinDay}`;
  }
  return `${year}-${month}-${checkoutDay}`;
};
