import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReduxDayScheduleState } from "./types";

const now = new Date(Date.now());

const initialState: ReduxDayScheduleState = {
    date:now.toString(),
    tasksList: []
  };
  
  const slice = createSlice({
    name: 'TaskEditDrawer-slice',
    initialState: initialState,
    reducers: {
      updateData(state, action: PayloadAction<ReduxDayScheduleState>) {
        const {tasksList,date}= action.payload;
        state.tasksList = tasksList;
        state.date = date;
      },
    },
  });
  
  export const DayScheduleReducer = slice.reducer;
  export const  DayScheduleAction = slice.actions;