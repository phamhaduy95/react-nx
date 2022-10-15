import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { GetDayScheduleDataArg, GetMonthScheduleDataArg, GetWeekScheduleDataArg } from '../appApi';
import { State } from './type';


const now = new Date(Date.now());
const currentWeek: GetWeekScheduleDataArg = {
  startDate: dayjs(now).startOf('week').toDate().toISOString(),
  endDate: dayjs(now).endOf('week').toDate().toISOString(),
};

const initialState: State = {
  dateArg: {
    date: now.getDate(),
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  },
  monthArg: { month: now.getMonth() + 1, year: now.getFullYear() },
  weekArg: currentWeek,
};

const slice = createSlice({
  name: 'SaveDateArg',
  initialState: initialState,
  reducers: {
    gotoNextDay(state) {  
      const newDateArg = addDayToDayArg(state.dateArg, 1);
      console.log(newDateArg)
      state.dateArg = newDateArg;
    },
    gotoPreviousDay(state) {
      const newDateArg = addDayToDayArg(state.dateArg, -1);
      state.dateArg = newDateArg;
    },
    goToNextMonth(state) {
        const newMonthArg = addMonthToMonthArg(state.monthArg,1);
        state.monthArg = newMonthArg;
    },
    goToPreviousMonth(state){
        const newMonthArg = addMonthToMonthArg(state.monthArg,-1);
        state.monthArg = newMonthArg;
    },
    goToNextWeek(state){
        state.weekArg = addWeekToWeekArg(state.weekArg,1);
    },
    goToPreviousWeek(state){
        state.weekArg = addWeekToWeekArg(state.weekArg,-1);
    }
  },

});

function addDayToDayArg(
  dayArg: GetDayScheduleDataArg,
  days: number
): GetDayScheduleDataArg {
  const { date, month, year } = dayArg;
  const currDate = new Date(year, month - 1, date);
  const nextDate = dayjs(currDate).add(days,"day");
  return {
    date: nextDate.date(),
    month: nextDate.month() +1 ,
    year: nextDate.year(),
  };
}

function addMonthToMonthArg(
  monthArg: GetMonthScheduleDataArg,
  months: number
): GetMonthScheduleDataArg {
    const {month,year} = monthArg;
    const currMonth = new Date(year, month - 1);
    const nextMonth = dayjs(currMonth).add(months,"month");
    return {
        month: nextMonth.month() + 1,
        year:nextMonth.year()
    }
}

function addWeekToWeekArg(
    weekArg:GetWeekScheduleDataArg,
    weeks:number
):GetWeekScheduleDataArg{
    const {startDate,endDate} = weekArg;
    const elapsedWeeksDay = weeks*7;
    const nextStartDate = dayjs(startDate).add(elapsedWeeksDay,"day");
    const nextEndDate = dayjs(endDate).add(elapsedWeeksDay,"day");
    return {
        endDate:nextEndDate.toISOString(),
        startDate: nextStartDate.toISOString(),
    }
}

export const saveDateArgAction = slice.actions;
export const saveDateArgReducer = slice.reducer;
