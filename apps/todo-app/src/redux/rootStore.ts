import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query/react';
import { useMemo } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  addCategoryModalActions,
  addCategoryModalReducer,
} from './AddCategoryModal';

import { appApi } from './appApi';
import {
  saveDateArgReducer,
  saveDateArgAction,
} from './saveDateArgStore/slice';
import { TaskEditModalAction, TaskEditModalReducer } from './TaskEditModal';
import { signOutModalReducer, signOutModalActions } from './SignOutModal/slice';

export const rootStore = configureStore({
  reducer: {
    saveDateArg: saveDateArgReducer,
    taskEditModal: TaskEditModalReducer,
    addCategoryModal: addCategoryModalReducer,
    signOutModal: signOutModalReducer,
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
  addCategoryModal: addCategoryModalActions,
  signOutModal:signOutModalActions,
};

export function useAppAction() {
  const action = useMemo(() => {
    return rootAction;
  }, []);
  return action;
}
