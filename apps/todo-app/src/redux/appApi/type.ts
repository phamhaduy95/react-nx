import { TaskDataType } from '../../type/model';
import { ReduxCategoryData, ReduxUserData } from '../types';

export type ResponseCategoryData = ReduxCategoryData;

export type UpdateCategoryArgs = Partial<ReduxCategoryData> & {
  categoryId: string;
};

export type AddCategoryArgs = Omit<ReduxCategoryData, 'categoryId'>;
/* #endregion */

/* #region  taskApi */
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

export interface ServerResponseType {
  message: string;
}

export interface AddTaskResponse {
  taskId: string;
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
/* #endregion */

/* #region  loginApi */

export type LoginArg = {
  email: string;
  password: string;
};

export type SignUpArg = {
  displayName: string;
  email: string;
  password: string;
};

/* #endregion */

export type UpdateUserArg = Partial<ReduxUserData>;

export type ChangePasswordArg = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type ChangeEmailArg = {
  newEmail: string;
  password: string;
};
