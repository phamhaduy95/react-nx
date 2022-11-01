import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReduxTaskData } from 'apps/todo-app/src/redux/types';
import { TaskEditModalState, SwitchModalTypeAction } from './types';

const initialState: TaskEditModalState = {
  type: 'add',
  taskData: {
    taskId: '',
    title: '',
    categoryId: '',
    description: '',
    endTime: '',
    startTime: '',
    userId: '',
  },
  errorMessages: {
    title: false,
    categoryId: false,
    description: false,
    endTime: false,
    startTime: false,
  },
};

const slice = createSlice({
  name: 'TaskEditModal',
  initialState: initialState,
  reducers: {
    updateTaskData(state, action: PayloadAction<Partial<ReduxTaskData>>) {
      const partialData = action.payload;
      state.taskData = { ...state.taskData, ...partialData };
    },

    updateErrorMessage(
      state,
      action: PayloadAction<TaskEditModalState['errorMessages']>
    ) {
      const errors = action.payload;
      state.errorMessages = errors;
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
      state.type = 'update';
      state.taskData = action.payload;
    },
    addTask(state, action: PayloadAction<Partial<ReduxTaskData>>) {
      const partialData = action.payload;
      state.errorMessages = initialState.errorMessages;
      state.taskData = initialState.taskData;
      state.type = 'add';
      state.taskData = { ...state.taskData, ...partialData };
    },
    switchModalType(state, action: SwitchModalTypeAction) {
      const newType = action.payload;
      state.type = newType;
    },
  },
});

export const TaskEditModalReducer = slice.reducer;
export const TaskEditModalAction = slice.actions;
