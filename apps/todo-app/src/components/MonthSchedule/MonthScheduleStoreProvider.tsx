import dayjs from 'dayjs';
import React, { createContext, useContext, useMemo } from 'react';
import { createStore, StoreApi, useStore } from 'zustand';
import { TaskDataType } from '../../type/model';
import { sortTasksBaseOnStartDateAndThenLength, organizeTasksIntoSeriesOfTaskLine } from '../utils';


// the State Store keeps all tasks assigned within one specific month. when user request for other month then all existing data will be wiped out so that new tasks form the other month can replaced.

export type MonthScheduleState = {
  month: Date;
  tasks: TaskDataType[];
  taskLines: TaskDataType[][];
  action: {
    updateMonthData(month: Date, tasks: TaskDataType[]): void;
  };
};

type ContextValueType = {
  store: StoreApi<MonthScheduleState>;
} | null;

const StoreContext = createContext<ContextValueType>(null);

type Props = {
  children: JSX.Element;
};

export function MonthScheduleStoreProvider(props: Props) {
  const { children } = props;
  const store = useMemo(()=>createStore<MonthScheduleState>((set) => ({
    month: dayjs().toDate(),
    tasks: [],
    taskLines: [],
    action: {
      updateMonthData(month, tasks) {
        set((state) => {
          const sortedTask = sortTasksBaseOnStartDateAndThenLength(tasks);
          const taskLines = organizeTasksIntoSeriesOfTaskLine(sortedTask);
          return { month: month, tasks: sortedTask, taskLines };
        });
      },
    },
  })),[]);

  return (
    <StoreContext.Provider value={{ store }}>{children}</StoreContext.Provider>
  );
}

export function useMonthScheduleStore<U>(
  selector: (state: MonthScheduleState) => U,
  equalFunc?: (a: U, b: U) => boolean
): U {
  const value = useContext(StoreContext);
  if (value === null) throw new Error('MonthScheduleStore context is null');
  const { store } = value;
  return useStore(store, selector, equalFunc);
}

