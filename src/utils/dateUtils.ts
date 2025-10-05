import moment from 'moment';

export const formatDateToIST = (dateString: string): string => {
  return moment(dateString).utcOffset('+05:30').format('DD MMM YYYY, hh:mm A');
};

export const formatTimeToIST = (dateString: string): string => {
  return moment(dateString).utcOffset('+05:30').format('hh:mm A');
};

export const formatDateOnly = (dateString: string): string => {
  return moment(dateString).format('DD MMM YYYY');
};

export const formatDateForCalendar = (dateString: string): string => {
  return moment(dateString).format('YYYY-MM-DD');
};

export const getDateRange = (startDate: string, endDate?: string): string => {
  const start = moment(startDate).format('DD MMM');
  if (endDate) {
    const end = moment(endDate).format('DD MMM YYYY');
    return `${start} - ${end}`;
  }
  return moment(startDate).format('DD MMM YYYY');
};

export const isSameDay = (date1: string, date2: string): boolean => {
  return moment(date1).isSame(moment(date2), 'day');
};

export const getCurrentMonth = (): number => {
  return moment().month() + 1; // moment months are 0-indexed
};

export const getMonthName = (month: number): string => {
  return moment().month(month - 1).format('MMMM');
};