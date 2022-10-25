import dayjs from 'dayjs';

import {
  GetDayScheduleDataArg,
  GetWeekScheduleDataArg,
  GetMonthScheduleDataArg,
} from '../../../redux/appApi';



export const getDayString = (dayArg: GetDayScheduleDataArg) => {
  const date = new Date(dayArg.year, dayArg.month - 1, dayArg.date);
  const dayStr = dayjs(date).format('MMM D YYYY');
  return dayStr;
};

export const getWeekString = (weekArg: GetWeekScheduleDataArg) => {
  const firstDayStr = dayjs(weekArg.startDate).format('MMM D');
  const endDayStr = dayjs(weekArg.endDate).format('- MMM D, YYYY');
  const str = firstDayStr.concat(endDayStr);
  return str;
};

export function getMonthString(monthArg: GetMonthScheduleDataArg) {
  const date = new Date(monthArg.year, monthArg.month - 1);
  const dayStr = dayjs(date).format('MMM YYYY');
  return dayStr;
}
