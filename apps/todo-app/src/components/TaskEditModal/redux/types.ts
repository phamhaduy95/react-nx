import { Action } from '@reduxjs/toolkit';
import { ReduxTaskData } from 'apps/todo-app/src/redux/types';
import { ErrorsMessage, TaskDataInput, TaskDataSchema } from '../types';

export type TaskEditModalState = {
  type: 'update' | 'add';
  taskData: ReduxTaskData;
  errorMessages: ErrorsMessage<TaskDataSchema>;
  isOpen: boolean;
  restrictClose:boolean,
};
