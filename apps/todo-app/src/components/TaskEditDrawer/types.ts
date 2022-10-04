import { TaskDataType } from '../../type/model';

export type ErrorsMessage<T> = {
  [key in keyof T]: string | false;
};

export type TaskDataInput = Omit<TaskDataType, 'startDate' | 'endDate'> & {
  startDate: Date | null;
  endDate: Date | null;
};

export interface TaskDataSchema {
  title: string;
  category: string;
  startDate: Date | null;
  endDate: Date | null;
  description: string;
}
