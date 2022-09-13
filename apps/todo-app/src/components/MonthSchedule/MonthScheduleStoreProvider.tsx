import dayjs from 'dayjs';
import React, { createContext, useContext } from 'react';
import { createStore, StoreApi, useStore } from 'zustand';

export type TaskDataType = {
  id: string;
  category: string;
  title: string;
  startDate: Date;
  endDate: Date;
  description: string;
};

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
  const store = createStore<MonthScheduleState>((set) => ({
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
  }));

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

type TaskLineListType = TaskDataType[][];

function organizeTasksIntoSeriesOfTaskLine(taskList: TaskDataType[]) {
  const taskLineList: TaskLineListType = [[]];
  for (let task of taskList) {
    //n*m
    let isAdded = false;
    for (let taskLine of taskLineList) {
      if (!isTaskAddableToTaskLine(task, taskLine)) continue;
      taskLine.push(task);
      isAdded = true;
      break;
    }
    if (isAdded) continue;
    const newLine: TaskLineListType[number] = [];
    newLine.push(task);
    taskLineList.push(newLine);
  }
  return taskLineList;
}

function sortTasksBaseOnStartDateAndThenLength(taskList: TaskDataType[]) {
  return taskList.sort((a, b) => {
    if (dayjs(a.startDate).isSame(b.startDate, 'day')) {
      if (dayjs(a.endDate).isAfter(b.endDate, 'day')) return -1;
      return 1;
    }
    if (dayjs(a.startDate).isBefore(b.startDate, 'day')) return -1;
    return 1;
  });
}

function isTaskAddableToTaskLine(
  task: TaskDataType,
  taskLine: TaskLineListType[number]
) {
  if (taskLine.length === 0) return true;
  const lastTaskInLine = taskLine[taskLine.length - 1];
  if (dayjs(task.startDate).isAfter(lastTaskInLine.endDate, 'day')) return true;
  return false;
}
