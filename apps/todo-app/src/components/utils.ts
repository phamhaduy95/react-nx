import dayjs from 'dayjs';
import { TaskDataType } from '../type/model';

export function sortTasksBaseOnStartDateAndThenLength(
  taskList: TaskDataType[]
) {
  return taskList.sort((a, b) => {
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
