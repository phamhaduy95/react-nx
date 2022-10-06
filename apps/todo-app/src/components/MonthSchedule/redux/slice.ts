import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReduxMonthScheduleState } from './types';

const now = new Date(Date.now());

const initialState: ReduxMonthScheduleState = {
  month: now.toString(),
  tasks: [],
};

const slice = createSlice({
  name: 'MonthSchedule',
  initialState: initialState,
  reducers: {
    updateData(state, action: PayloadAction<ReduxMonthScheduleState>) {
      const { tasks, month } = action.payload;
      state.tasks = tasks;
      state.month = month;
    },
  },
});

export const MonthScheduleReducer = slice.reducer;
export const MonthScheduleAction = slice.actions;
