import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query/react';
import { useMemo } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  addCategoryModalActions,
  addCategoryModalReducer,
} from './AddCategoryModal';
import { appApi } from './appApi';
import { TaskEditModalAction, TaskEditModalReducer } from './TaskEditModal';
import { signOutModalReducer, signOutModalActions } from './SignOutModal/slice';
import { CalendarAppReducer, CalendarAppAction } from './CalendarApp/slice';
import { AppModalReducer, AppModalActions } from './AppModal/slice';
import { HomePageReducer, HomePageAction } from './HomePage/slice';
import {
  DeleteCategoryModalReducer,
  DeleteCategoryModalAction,
} from './DeleteCategoryModal/slice';

export const rootStore = configureStore({
  reducer: {
    AppModal: AppModalReducer,
    AddAndUpdateCategoryModal: addCategoryModalReducer,
    DeleteCategoryModal: DeleteCategoryModalReducer,
    TaskEditModal: TaskEditModalReducer,
    SignOutModal: signOutModalReducer,
    CalendarApp: CalendarAppReducer,
    HomePage: HomePageReducer,
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
  AppModal: AppModalActions,
  TaskEditModal: TaskEditModalAction,
  SignOutModal: signOutModalActions,
  CalendarApp: CalendarAppAction,
  HomePage: HomePageAction,
  AddAndUpdateCategoryModal: addCategoryModalActions,
  DeleteCategoryModal: DeleteCategoryModalAction,
};

export function useAppAction() {
  const action = useMemo(() => {
    return rootAction;
  }, []);
  return action;
}
