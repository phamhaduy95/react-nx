import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReduxTaskData } from 'apps/todo-app/src/redux/types';
import { TaskEditDrawerState } from './types';

const initialState: TaskEditDrawerState = {
  type: 'add',
  taskData: {
    taskId: '',
    title: '',
    categoryId: '',
    description: '',
    endTime: '',
    startTime: '',
    userId:'',
  },
  errorMessages: {
    title: false,
    categoryId: false,
    description: false,
    endTime: false,
    startTime: false,
  },
  isOpen: false,
};

const slice = createSlice({
  name: 'TaskEditDrawer',
  initialState: initialState,
  reducers: {
    updateTaskData(state, action: PayloadAction<Partial<ReduxTaskData>>) {
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
    reset(state) {
      state.errorMessages = initialState.errorMessages;
      state.taskData = initialState.taskData;
    },
    editTask(state, action: PayloadAction<ReduxTaskData>) {
      state.errorMessages = initialState.errorMessages;
      state.taskData = initialState.taskData;
      state.isOpen = true;
      state.type = 'update';
      state.taskData = action.payload;
    },
    addTask(state, action: PayloadAction<Partial<ReduxTaskData>>) {
      const partialData = action.payload;
      state.errorMessages = initialState.errorMessages;
      state.taskData = initialState.taskData;
      state.isOpen = true;
      state.type = 'add';
      state.taskData = { ...state.taskData, ...partialData };
    },
  },
});

export const TaskEditDrawerReducer = slice.reducer;
export const TaskEditDrawerAction = slice.actions;
