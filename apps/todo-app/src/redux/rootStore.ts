import { configureStore } from '@reduxjs/toolkit'
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { TaskEditDrawerAction, TaskEditDrawerReducer } from '../components/TaskEditDrawer/redux'

// ...
export const rootStore = configureStore({
  reducer: {
    taskEditDrawer:TaskEditDrawerReducer,
  },  
})

export type RootState = ReturnType<typeof rootStore.getState>
type AppDispatch = typeof rootStore.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

const rootAction = Object.freeze({
    taskEditDrawer:TaskEditDrawerAction,
});


export function useAppAction(){
    const action = useMemo(()=>{ return rootAction },[]);
    return action
}