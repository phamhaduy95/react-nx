import { Action, PayloadAction } from '@reduxjs/toolkit';
import { ReduxTaskData } from 'apps/todo-app/src/redux/types';
import { TaskDataSchema } from '../../validation/taskDataValidation';
import { ErrorMessage } from '../../validation/types';


export type TaskEditModalState = {
  type: 'update' | 'add';
  taskData: ReduxTaskData;
  errorMessages: ErrorMessage<TaskDataSchema>;
};

export type SwitchModalTypeAction = PayloadAction<TaskEditModalState['type']>;
