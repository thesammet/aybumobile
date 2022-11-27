import moment from 'moment';

export const getDay = date => {
  return moment(date.replace(/\./g, '-')).weekday();
};

export const getDayName = date => {
  console.log('d: ', date);
  return moment(new Date(date.replace(/\./g, '-'))).format('dddd');
};
