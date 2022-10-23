import { TaskDataType } from '../type/model';

export type ReduxTaskData = Omit<TaskDataType, 'startTime' | 'endTime'> & {
  startTime: string;
  endTime: string;
};

export type ReduxCategoryData = {
  name: string;
  id: string;
  color: string;
};

export type ReduxUserData = {
  id: string;
  userName: string;
  email: string;
};
