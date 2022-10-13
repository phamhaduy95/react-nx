import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query/react';
import { useMemo } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  TaskEditDrawerAction,
  TaskEditDrawerReducer,
} from '../components/TaskEditDrawer/redux';
import { appApi } from './appApi';
import {
  saveDateArgReducer,
  saveDateArgAction,
} from './saveDateArgStore/slice';

export const rootStore = configureStore({
  reducer: {
    taskEditDrawer: TaskEditDrawerReducer,
    saveDateArg: saveDateArgReducer,
    [appApi.reducerPath]: appApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware),
});


setupListeners(rootStore.dispatch);

export type RootState = ReturnType<typeof rootStore.getState>;
type AppDispatch = typeof rootStore.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const rootAction = Object.freeze({
  taskEditDrawer: TaskEditDrawerAction,
  saveDateArg: saveDateArgAction,
  taskApi: appApi.endpoints,
});


export function useAppAction() {
  const action = useMemo(() => {
    return rootAction;
  }, []);
  return action;
}
