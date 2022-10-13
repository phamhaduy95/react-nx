import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query/react';
import { useMemo } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  TaskEditDrawerAction,
  TaskEditDrawerReducer,
} from '../components/TaskEditDrawer/redux';

import {
  saveDateArgReducer,
  saveDateArgAction,
} from './saveDateArgStore/slice';
import { taskApi } from './taskApi';

export const rootStore = configureStore({
  reducer: {
    taskEditDrawer: TaskEditDrawerReducer,

    saveDateArg: saveDateArgReducer,
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(taskApi.middleware),
});

setupListeners(rootStore.dispatch);

export type RootState = ReturnType<typeof rootStore.getState>;
type AppDispatch = typeof rootStore.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const rootAction = Object.freeze({
  taskEditDrawer: TaskEditDrawerAction,
  saveDateArg: saveDateArgAction,
});

export function useAppAction() {
  const action = useMemo(() => {
    return rootAction;
  }, []);
  return action;
}
