import moment from 'moment';

export const getDayName = date => {
  return moment(modifyDate(date)).format('dddd');
};

export const modifyDate = (currentTrDate) => {
  const day = currentTrDate?.slice(0, 2)
  const month = currentTrDate?.slice(3, 5)
  const year = currentTrDate?.slice(6, 10)
  const currentEnDate = year + "-" + month + "-" + day
  return currentEnDate
}

export const getMeaningfulDayNames = dayName => {
  switch (dayName) {
    case 'Monday':
      return 'Pazartesi';
    case 'Tuesday':
      return 'Salı';
    case 'Wednesday':
      return 'Çarşamba';
    case 'Thursday':
      return 'Perşembe';
    case 'Friday':
      return 'Cuma';
    case 'Saturday':
      return 'Cumartesi';
    case 'Sunday':
      return 'Pazar';
    default:
      return dayName;
  }
};
