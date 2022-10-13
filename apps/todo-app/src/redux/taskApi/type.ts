import { ReduxTaskData } from '../types';

export type GetMonthScheduleDataArg = { month: number; year: number };

export type GetDayScheduleDataArg = {
  date: number;
  month: number;
  year: number;
};

export type GetWeekScheduleDataArg = { startDate: string; endDate: string };

export interface ErrorResponse {
  message: string;
}

type DateStr = string;

export type ReduxMonthScheduleState = {
  month: DateStr;
  tasks: ReduxTaskData[];
};

export type ReduxDayScheduleState = {
    date: DateStr;
    tasks: ReduxTaskData[];
  };

export type ReduxWeekScheduleState = {
    startDate:DateStr,
    endDate:DateStr,
    tasks: ReduxTaskData[],
}