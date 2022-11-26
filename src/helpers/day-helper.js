import moment from 'moment';

export const getDay = date => {
  return moment(date.replace(/\./g, '-')).weekday();
};

export const getDayName = date => {
  return moment(date.replace(/\./g, '-')).format('dddd');
};
