import { PayloadAction } from '@reduxjs/toolkit';
import {
  GetDayScheduleDataArg,
  GetMonthScheduleDataArg,
  GetWeekScheduleDataArg,
} from '../appApi';

export type CalendarAppState = {
  taskFilterOptions: {
    categories: { categoryId: string }[];
  };
  dateArgs: {
    monthArg: GetMonthScheduleDataArg;
    dateArg: GetDayScheduleDataArg;
    weekArg: GetWeekScheduleDataArg;
  };
  currentCalendarType: 'month' | 'week' | 'day';
};

export type UpdateFilterCategoryAction = PayloadAction<
  { categoryId: string }[]
>;
export type AddNewCategoryFilterAction = PayloadAction<{ categoryId: string }>;
export type RemoveCategoryFilterAction = PayloadAction<{ categoryId: string }>;

export type GoToNextAction = PayloadAction<
  CalendarAppState['currentCalendarType']
>;
export type GotoPreviousAction = PayloadAction<
  CalendarAppState['currentCalendarType']
>;

export type ChangeCalendarTypeAction = PayloadAction<
  CalendarAppState['currentCalendarType']
>;
