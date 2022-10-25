import { Action, PayloadAction } from '@reduxjs/toolkit';
import { ReduxTaskData } from 'apps/todo-app/src/redux/types';
import {
  ErrorsMessage,
  TaskDataSchema,
} from '../../components/TaskEditModal/types';

export type TaskEditModalState = {
  type: 'update' | 'add' | 'delete';
  state: 'idle' | 'loading' | 'success' | 'error';
  taskData: ReduxTaskData;
  errorMessages: ErrorsMessage<TaskDataSchema>;
  isOpen: boolean;
  restrictClose: boolean;
};

export type SwitchModalStateAction = PayloadAction<TaskEditModalState['state']>;
export type SwitchModalTypeAction =  PayloadAction<TaskEditModalState['type']>;