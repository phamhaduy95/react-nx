import { TaskDataType } from '../../type/model';

export type ReduxCategoryData = {
  categoryId: string;
  name: string;
};

export type ResponseCategoryData = {
  categoryId: string;
  name: string;
  userId: string;
};

export type ReduxTaskData = Omit<TaskDataType, 'startTime' | 'endTime'> & {
  startTime: string;
  endTime: string;
};

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
  startDate: DateStr;
  endDate: DateStr;
  tasks: ReduxTaskData[];
};
