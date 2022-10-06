import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DayScheduleState } from "./types";

const initialState: DayScheduleState = {
    date:new Date(),
    tasksList: []
  };
  
  const slice = createSlice({
    name: 'TaskEditDrawer-slice',
    initialState: initialState,
    reducers: {
      updateData(state, action: PayloadAction<DayScheduleState>) {
        const {tasksList,date}= action.payload;
        state.tasksList = tasksList;
        state.date = date;
      },
    },
  });
  
  export const DayScheduleReducer = slice.reducer;
  export const  DayScheduleAction = slice.actions;