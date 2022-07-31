const getCurrentYear = () => new Date().getFullYear();

const listMonthsAsDigitStrings = () => {
  return Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    return month <= 9 ? `0${month}` : `${month}`;
  });
};

const createYearsListFromNum = (num) => {
  const yearsList = [];
  for (let i = 0; i < num; i++) {
    yearsList.push(getCurrentYear() + i);
  }
  return yearsList;
};

export { getCurrentYear, listMonthsAsDigitStrings, createYearsListFromNum };
