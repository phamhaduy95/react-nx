import { GetDayScheduleDataArg, GetMonthScheduleDataArg, GetWeekScheduleDataArg } from "../appApi";

export type State = {
  monthArg: GetMonthScheduleDataArg;
  dateArg: GetDayScheduleDataArg;
  weekArg: GetWeekScheduleDataArg;
};
