import dayjs from 'dayjs';
import { TaskDataType } from '../type/model';


export function findAllTasksInADayAmongTasksList(
  date: Date,
  tasksList: TaskDataType[],
): TaskDataType[] {
  return tasksList.filter((task) => {
    const range = { startDate: task.startDate, endDate: task.endDate };
    return isDateWithinRange(date, range);
  });
}

export function isDateWithinRange(
  date: Date,
  range: { startDate: Date; endDate: Date }
) {
  const { startDate, endDate } = range;
  const dayObj = dayjs(date);
  if (dayObj.isSame(startDate, 'day')) return true;
  if (dayObj.isAfter(startDate) && dayObj.isBefore(endDate)) return true;
  if (dayObj.isSame(endDate, 'day')) return true;
  return false;
}

export type IndexTaskType = TaskDataType & { index: number };

export function findsAllShowedTasksInTaskLine(
  taskLine: TaskDataType[][],
  date: Date,
  lineLimit?: number
) {
  const tasksToRender: IndexTaskType[] = [];
  let lineNumber = 0;
  if (isSunDay(date) ) {
    for (let line of taskLine) {
      const task = line.find((task) => {
        const range = { startDate: task.startDate, endDate: task.endDate };
        return isDateWithinRange(date, range);
      });
      if (task !== undefined) {
        const indexTasked = { ...task, index: lineNumber };
        tasksToRender.push(indexTasked);
      }
      lineNumber++;
      if (lineLimit !== undefined && lineNumber === lineLimit) {
        break;
      }
    }
    return tasksToRender;
  }
  for (let line of taskLine) {
    const task = line.find((task) => {
      return dayjs(date).isSame(task.startDate, 'day');
    });
    if (task !== undefined) {
      const indexTasked = { ...task, index: lineNumber };
      tasksToRender.push(indexTasked);
    }
    lineNumber++;
    if (lineLimit !== undefined && lineNumber === lineLimit) {
      break;
    }
  }
  return tasksToRender;
}


export function isSunDay(date: Date) {
  if (date.getDay() === 0) return true;
  return false;
}


export function calculateTaskBarLengthInDayUnit(
  task: TaskDataType,
  cellDate: Date,
  isTaskInSunDay: boolean
) {
  const startDate = isTaskInSunDay ? cellDate : task.startDate;
  const nextSaturDay = findNextSaturday(startDate);
  const endDate = dayjs(nextSaturDay).isBefore(task.endDate, 'day')
    ? nextSaturDay
    : task.endDate;
  const currDayInWeek = startDate.getDay();
  const endDayInWeek = endDate.getDay();
  return endDayInWeek - currDayInWeek + 1;
}


export function findNextSaturday(date: Date) {
  const currDayInWeek = date.getDay();
  const daysToSaturday = 6 - currDayInWeek;
  return dayjs(date).add(daysToSaturday, 'day').toDate();
}


export function sortTasksBaseOnStartDateAndThenLength(
  taskList: TaskDataType[]
) {
  const newTaskList = [...taskList]; // since sort will mutate the original array, get the copied version for taskList.
  return newTaskList.sort((a, b) => {
    if (dayjs(a.startDate).isSame(b.startDate)) {
      if (dayjs(a.endDate).isAfter(b.endDate)) return -1;
      return 1;
    }
    if (dayjs(a.startDate).isBefore(b.startDate)) return -1;
    return 1;
  });
}

type TaskLineListType = TaskDataType[][];

export function organizeTasksIntoSeriesOfTaskLine(taskList: TaskDataType[]) {
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

function isTaskAddableToTaskLine(
  task: TaskDataType,
  taskLine: TaskLineListType[number]
) {
  if (taskLine.length === 0) return true;
  const lastTaskInLine = taskLine[taskLine.length - 1];
  if (dayjs(task.startDate).isAfter(lastTaskInLine.endDate)) return true;
  return false;
}

export type Position = {
  top: string;
  left: string;
  width: string;
  height: string;
};

export function positionElement(el: HTMLElement, pos: Position) {
  el.style.top = pos.top;
  el.style.left = pos.left;
  el.style.width = pos.width;
  el.style.height = pos.height;
}
