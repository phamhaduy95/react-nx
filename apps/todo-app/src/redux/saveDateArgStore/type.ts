import {
  GetDayScheduleDataArg,
  GetMonthScheduleDataArg,
  GetWeekScheduleDataArg,
} from '../taskApi/type';
export type State = {
  monthArg: GetMonthScheduleDataArg|null;
  dateArg: GetDayScheduleDataArg|null;
  weekArg: GetWeekScheduleDataArg|null;
};
