import dayjs from 'dayjs';
import {
  GetDayScheduleDataArg,
  GetMonthScheduleDataArg,
  GetWeekScheduleDataArg,
  ReduxTaskData,
} from '../appApi';
import { CalendarAppState } from './type';

export function addDayToDayArg(
  dayArg: GetDayScheduleDataArg,
  days: number
): GetDayScheduleDataArg {
  const { date, month, year } = dayArg;
  const currDate = new Date(year, month - 1, date);
  const nextDate = dayjs(currDate).add(days, 'day');
  return {
    date: nextDate.date(),
    month: nextDate.month() + 1,
    year: nextDate.year(),
  };
}

export function addMonthToMonthArg(
  monthArg: GetMonthScheduleDataArg,
  months: number
): GetMonthScheduleDataArg {
  const { month, year } = monthArg;
  const currMonth = new Date(year, month - 1);
  const nextMonth = dayjs(currMonth).add(months, 'month');
  return {
    month: nextMonth.month() + 1,
    year: nextMonth.year(),
  };
}

export function addWeekToWeekArg(
  weekArg: GetWeekScheduleDataArg,
  weeks: number
): GetWeekScheduleDataArg {
  const { startDate, endDate } = weekArg;
  const elapsedWeeksDay = weeks * 7;
  const nextStartDate = dayjs(startDate).add(elapsedWeeksDay, 'day');
  const nextEndDate = dayjs(endDate).add(elapsedWeeksDay, 'day');
  return {
    endDate: nextEndDate.toISOString(),
    startDate: nextStartDate.toISOString(),
  };
}

export function createPredicateFunctionFromFilterOptions(
  options: CalendarAppState['taskFilterOptions']
) {
  const { categories } = options;
  const predicate = (task: ReduxTaskData) => {
    let result = false;
    for (let c of categories) {
      if (c.categoryId === String(task.categoryId)) {
        result = true;
        break;
      }
    }
    return result;
  };

  return predicate;
}
