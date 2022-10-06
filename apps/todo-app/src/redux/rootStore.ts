import { configureStore } from '@reduxjs/toolkit'
import { useMemo } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { TaskEditDrawerAction, TaskEditDrawerReducer } from '../components/TaskEditDrawer/redux'
import { DayScheduleReducer, DayScheduleAction } from '../components/DaySchedule/redux/slice';
import { MonthScheduleAction, MonthScheduleReducer } from '../components/MonthSchedule/redux/slice';


export const rootStore = configureStore({
  reducer: {
    taskEditDrawer:TaskEditDrawerReducer,
    daySchedule:DayScheduleReducer,
    monthSchedule:MonthScheduleReducer,
  },  
})

export type RootState = ReturnType<typeof rootStore.getState>
type AppDispatch = typeof rootStore.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


const rootAction = Object.freeze({
    taskEditDrawer:TaskEditDrawerAction,
    daySchedule:DayScheduleAction,
    monthSchedule:MonthScheduleAction
});

export function useAppAction(){
    const action = useMemo(()=>{ return rootAction },[]);
    return action
}