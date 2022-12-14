import { TaskDataType } from '../type/model';
export * from './AppModal/type';

export type ReduxTaskData = Omit<TaskDataType, 'startTime' | 'endTime'> & {
  startTime: string;
  endTime: string;
};

export type ReduxCategoryData = {
  name: string;
  categoryId: string;
  color: string;
  description: string;
};

export type ReduxUserData = {
  displayName: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  organization: string;
  address: string;
};
