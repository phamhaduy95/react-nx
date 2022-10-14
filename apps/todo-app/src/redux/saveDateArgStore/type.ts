import { GetDayScheduleDataArg, GetMonthScheduleDataArg, GetWeekScheduleDataArg } from "../appApi";

export type State = {
  monthArg: GetMonthScheduleDataArg|null;
  dateArg: GetDayScheduleDataArg|null;
  weekArg: GetWeekScheduleDataArg|null;
};
