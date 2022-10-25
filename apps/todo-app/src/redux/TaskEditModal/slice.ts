import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReduxTaskData } from 'apps/todo-app/src/redux/types';
import {
  TaskEditModalState,
  SwitchModalStateAction,
  SwitchModalTypeAction,
} from './types';

const initialState: TaskEditModalState = {
  type: 'add',
  state: 'idle',
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
  isOpen: false,
  restrictClose: false,
};

const slice = createSlice({
  name: 'TaskEditModal',
  initialState: initialState,
  reducers: {
    updateTaskData(state, action: PayloadAction<Partial<ReduxTaskData>>) {
      const partialData = action.payload;
      state.taskData = { ...state.taskData, ...partialData };
    },
    setRestrictClose(
      state,
      action: PayloadAction<TaskEditModalState['restrictClose']>
    ) {
      const restrictCloseFlag = action.payload;
      state.restrictClose = restrictCloseFlag;
    },
    updateErrorMessage(
      state,
      action: PayloadAction<TaskEditModalState['errorMessages']>
    ) {
      const errors = action.payload;
      state.errorMessages = errors;
    },
    toggleDrawerOpen(
      state,
      action: PayloadAction<TaskEditModalState['isOpen']>
    ) {
      let isOpen = action.payload;
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
    switchModalState(state, action: SwitchModalStateAction) {
      const newModalState = action.payload;
      state.state = newModalState;
    },
    switchModalType(state, action: SwitchModalTypeAction) {
      const newType = action.payload;
      if (state.isOpen) {
        state.type = newType;
      }
    },
  },
});

export const TaskEditModalReducer = slice.reducer;
export const TaskEditModalAction = slice.actions;
