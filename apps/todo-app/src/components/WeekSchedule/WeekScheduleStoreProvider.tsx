import dayjs from 'dayjs';
import { createContext, useContext, useMemo } from 'react';
import { createStore, StoreApi, useStore } from 'zustand';
import { TaskDataType } from '../../type/model';
import {
  sortTasksBaseOnStartDateAndThenLength,
  organizeTasksIntoSeriesOfTaskLine,
} from '../utils';

// the State Store keeps all tasks assigned within one specific month. when user request for other month then all existing data will be wiped out so that new tasks form the other month can replaced.

export type WeekScheduleState = {
  range: { startDate: Date; endDate: Date };
  tasks: TaskDataType[];
  weekTaskLines: TaskDataType[][];
  action: {
    updateWeekTaskData(
      range: WeekScheduleState['range'],
      tasks: TaskDataType[]
    ): void;
  };
};

type ContextValueType = {
  store: StoreApi<WeekScheduleState>;
} | null;

const StoreContext = createContext<ContextValueType>(null);

type Props = {
  children: JSX.Element;
};

export function WeekScheduleStoreProvider(props: Props) {
  const { children } = props;
  const store = useMemo(
    () =>
      createStore<WeekScheduleState>((set) => ({
        range: getDateRangeOfThisWeek(),
        tasks: [],
        weekTaskLines: [],
        action: {
          updateWeekTaskData(range, tasks) {
            set((state) => {
              const sortedTask = sortTasksBaseOnStartDateAndThenLength(tasks);
              const taskLines = organizeTasksIntoSeriesOfTaskLine(sortedTask);
              return {
                range: range,
                tasks: sortedTask,
                weekTaskLines: taskLines,
              };
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

export function useWeekScheduleStore<U>(
  selector: (state: WeekScheduleState) => U,
  equalFunc?: (a: U, b: U) => boolean
): U {
  const value = useContext(StoreContext);
  if (value === null) throw new Error('MonthScheduleStore context is null');
  const { store } = value;
  return useStore(store, selector, equalFunc);
}

function getDateRangeOfThisWeek(): WeekScheduleState['range'] {
  const startOfWeek = dayjs().startOf('week').toDate();
  const endOfWeek = dayjs().endOf('week').toDate();
  return {
    startDate: startOfWeek,
    endDate: endOfWeek,
  };
}
