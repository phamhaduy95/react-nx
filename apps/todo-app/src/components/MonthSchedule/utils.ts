import dayjs from 'dayjs';
import { MonthScheduleState, TaskDataType } from './MonthScheduleStoreProvider';

export function findAllTasksInADayAmongTasksList(
  date: Date,
  tasksList: MonthScheduleState['tasks']
): TaskDataType[] {
  return tasksList.filter((task) => {
    const range = { startDate: task.startDate, endDate: task.endDate };
    return isDateWithinRange(date, range);
  });
}

export function isFirstDateOfTheMonth(date: Date) {
  if (date.getDate() === 1) return true;
  return false;
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
/** in ascend order */
export function sortTaskListBaseOnItsTimeLength(
  tasksList: MonthScheduleState['tasks']
) {
  return tasksList.sort((a, b) => {
    if (dayjs(a.endDate).isAfter(b.endDate, 'day')) return 1;
    return -1;
  });
}

export function isSunDay(date: Date) {
  if (date.getDay() === 0) return true;
  return false;
}

export type IndexTaskType = TaskDataType & { index: number };

export function findsAllShowedTasksInTaskLine(
  taskLine: MonthScheduleState['taskLines'],
  date: Date,
  lineLimit?: number
) {
  const tasksToRender: IndexTaskType[] = [];
  let lineNumber = 0;
  if (isSunDay(date) || isFirstDateOfTheMonth(date)) {
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
      return dayjs(date).isSame(task.startDate, 'date');
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