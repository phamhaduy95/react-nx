import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorsMessage, TaskDataInput } from '../types';
import {
  TaskEditDrawerState,
  UpdateTaskDataAction,
  UpdateErrorsMessage,
  ToggleDrawerAction,
} from './types';

const initialState: TaskEditDrawerState = {
  taskData: {
    id: '',
    title: '',
    category: '',
    description: '',
    endDate: null,
    startDate: null,
  },
  errorMessages: {
    title: false,
    category: false,
    description: false,
    endDate: false,
    startDate: false,
  },
  isOpen: false,
};

const slice = createSlice({
  name: 'TaskEditDrawer-slice',
  initialState: initialState,
  reducers: {
    updateTaskData(state, action: PayloadAction<Partial<TaskDataInput>>) {
      const partialData = action.payload;
      state.taskData = { ...state.taskData, ...partialData };
    },
    updateErrorMessage(
      state,
      action: PayloadAction<TaskEditDrawerState['errorMessages']>
    ) {
      const errors = action.payload;
      state.errorMessages = errors;
    },
    toggleDrawerOpen(
      state,
      action: PayloadAction<TaskEditDrawerState['isOpen']>
    ) {
      const isOpen = action.payload;
      state.isOpen = isOpen;
    },
    clearErrorMessage(state) {
      state.errorMessages = initialState.errorMessages;
    },
    clearTaskData(state) {
      state.taskData = initialState.taskData;
    },
  },
});

export const TaskEditDrawerReducer = slice.reducer;
export const TaskEditDrawerAction = slice.actions;
