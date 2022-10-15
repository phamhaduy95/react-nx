import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query/react';
import { useMemo } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { TaskEditModalAction, TaskEditModalReducer } from '../components/TaskEditModal/redux';

import { appApi } from './appApi';
import {
  saveDateArgReducer,
  saveDateArgAction,
} from './saveDateArgStore/slice';

export const rootStore = configureStore({
  reducer: {
    saveDateArg: saveDateArgReducer,
    taskEditModal: TaskEditModalReducer,
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

const rootAction = {
  taskEditModal: TaskEditModalAction,
  saveDateArg: saveDateArgAction,
};


export function useAppAction() {
  const action = useMemo(() => {
    return rootAction;
  }, []);
  return action;
}
