import moment from 'moment';
import { strings } from '../constants/localization';

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
      return strings.monday;
    case 'Tuesday':
      return strings.tuesday;
    case 'Wednesday':
      return strings.wednesday;
    case 'Thursday':
      return strings.thursday;
    case 'Friday':
      return strings.friday;
    case 'Saturday':
      return strings.saturday;
    case 'Sunday':
      return strings.sunday
    default:
      return dayName;
  }
};
