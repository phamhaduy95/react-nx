import { Action, PayloadAction } from '@reduxjs/toolkit';
import { ReduxTaskData } from 'apps/todo-app/src/redux/types';
import { ErrorsMessage, TaskDataSchema } from '../../components/TaskModal';

export type TaskEditModalState = {
  type: 'update' | 'add';
  taskData: ReduxTaskData;
  errorMessages: ErrorsMessage<TaskDataSchema>;
};

export type SwitchModalTypeAction = PayloadAction<TaskEditModalState['type']>;
