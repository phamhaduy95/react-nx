import { TaskDataType } from '../../type/model';

export type ErrorsMessage<T> = {
  [key in keyof T]: string | false;
};

export type TaskDataInput = Omit<
  TaskDataType,
  'startTime' | 'endTime' | 'userId'|"taskId"
> & {
  startTime: Date | null;
  endTime: Date | null;
};

export interface TaskDataSchema {
  title: string;
  category: string;
  startTime: Date | null;
  endTime: Date | null;
  description: string;
}
