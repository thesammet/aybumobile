import moment from 'moment';

export const getDay = date => {
  return moment(date.replace(/\./g, '-')).weekday();
};

export const getDayName = date => {
  return moment(new Date(date.replace(/\./g, '-'))).format('dddd');
};

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
