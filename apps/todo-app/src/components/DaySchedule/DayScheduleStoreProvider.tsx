import dayjs from 'dayjs';
import React, { createContext, useContext, useMemo } from 'react';
import { createStore, StoreApi, useStore } from 'zustand';
import { TaskDataType } from '../../type/model';
import {
  organizeTasksIntoSeriesOfTaskLine,
  sortTasksBaseOnStartDateAndThenLength,
} from '../utils';

export type DayScheduleState = {
  date: Date;
  tasks: TaskDataType[];
  tasksLine: TaskDataType[][];
  action: {
    updateDayData(month: Date, tasks: TaskDataType[]): void;
  };
};

type ContextValueType = {
  store: StoreApi<DayScheduleState>;
} | null;

const StoreContext = createContext<ContextValueType>(null);

type Props = {
  children: JSX.Element;
};

export function DayScheduleStoreProvider(props: Props) {
  const { children } = props;
  const store = useMemo(
    () =>
      createStore<DayScheduleState>((set) => ({
        date: dayjs().toDate(),
        tasks: [],
        tasksLine: [],
        action: {
          updateDayData(date, tasks) {
            set((state) => {
              const sortedTask = sortTasksBaseOnStartDateAndThenLength(tasks);
              const tasksLines = organizeTasksIntoSeriesOfTaskLine(sortedTask);
              return { date: date, tasks: sortedTask, tasksLine: tasksLines };
            });
          },
        },
      })),
    []
  );

  return (
    <StoreContext.Provider value={{ store }}>{children}</StoreContext.Provider>
  );
}

export function useDayScheduleStore<U>(
  selector: (state: DayScheduleState) => U,
  equalFunc?: (a: U, b: U) => boolean
): U {
  const value = useContext(StoreContext);
  if (value === null) throw new Error('MonthScheduleStore context is null');
  const { store } = value;
  return useStore(store, selector, equalFunc);
}
