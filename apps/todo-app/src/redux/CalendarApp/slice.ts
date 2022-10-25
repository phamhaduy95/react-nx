import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { GetWeekScheduleDataArg } from '../appApi';
import {
  AddNewCategoryFilterAction,
  CalendarAppState,
  GoToNextAction,
  RemoveCategoryFilterAction,
  UpdateFilterCategoryAction,
} from './type';
import { addDayToDayArg, addWeekToWeekArg, addMonthToMonthArg } from './utils';
import { GotoPreviousAction, ChangeCalendarTypeAction } from './type';
const now = new Date(Date.now());
const currentWeek: GetWeekScheduleDataArg = {
  startDate: dayjs(now).startOf('week').toDate().toISOString(),
  endDate: dayjs(now).endOf('week').toDate().toISOString(),
};

const initialState: CalendarAppState = {
  currentCalendarType: 'month',
  dateArgs: {
    dateArg: {
      date: now.getDate(),
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    },
    monthArg: { month: now.getMonth() + 1, year: now.getFullYear() },
    weekArg: currentWeek,
  },
  taskFilterOptions: {
    categories: [],
  },
};

const slice = createSlice({
  name: 'CalendarApp',
  initialState: initialState,
  reducers: {
    updateCategoryFilter: (state, action: UpdateFilterCategoryAction) => {
      const newFilter = action.payload;
      state.taskFilterOptions.categories = newFilter;
    },
    addNewCategoryFilter: (state, action: AddNewCategoryFilterAction) => {
      const category = action.payload;
      state.taskFilterOptions.categories.push(category);
    },
    removeCategoryFilter: (state, action: RemoveCategoryFilterAction) => {
      const id = action.payload.categoryId;
      const currentCategoriesFilter = state.taskFilterOptions.categories;
      state.taskFilterOptions.categories = currentCategoriesFilter.filter(
        (e) => e.categoryId !== id
      );
    },
    gotoNext: (state, action: GoToNextAction) => {
      const type = action.payload;
      switch (type) {
        case 'day': {
          const dayArg = state.dateArgs.dateArg;
          state.dateArgs.dateArg = addDayToDayArg(dayArg, 1);
          break;
        }
        case 'week': {
          const weekArg = state.dateArgs.weekArg;
          state.dateArgs.weekArg = addWeekToWeekArg(weekArg, 1);
          break;
        }
        case 'month': {
          const monthArg = state.dateArgs.monthArg;
          state.dateArgs.monthArg = addMonthToMonthArg(monthArg, 1);
          break;
        }
      }
    },
    gotoPrevious: (state, action: GotoPreviousAction) => {
      const type = action.payload;
      switch (type) {
        case 'day': {
          const dayArg = state.dateArgs.dateArg;
          state.dateArgs.dateArg = addDayToDayArg(dayArg, -1);
          break;
        }
        case 'week': {
          const weekArg = state.dateArgs.weekArg;
          state.dateArgs.weekArg = addWeekToWeekArg(weekArg, -1);
          break;
        }
        case 'month': {
          const monthArg = state.dateArgs.monthArg;
          state.dateArgs.monthArg = addMonthToMonthArg(monthArg, -1);
          break;
        }
      }
    },
    changeCalendarType: (state, action: ChangeCalendarTypeAction) => {
      const type = action.payload;
      state.currentCalendarType = type;
    },
  },
});

export const CalendarAppReducer = slice.reducer;
export const CalendarAppAction = slice.actions;
