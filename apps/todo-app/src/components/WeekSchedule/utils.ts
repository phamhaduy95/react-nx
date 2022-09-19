import dayjs from 'dayjs';
import { TaskDataType } from '../../type/model';

export type TaskDataWithWidthType = TaskDataType & { width: number };

export function organizeTasksOnTimeLine(
  tasks: TaskDataType[],
  linesLimit: number
) {
  const linesArray = initialLinesArray(linesLimit); 
  for (let task of tasks) {
    const lineNumber = findAppropriateTaskLineForTask(task, linesArray);
    if (lineNumber === -1) continue;
    const line = linesArray[lineNumber];
    const taskWidth = determineWidthForTaskLine(task,lineNumber,linesArray);
    const taskWithWidth = {...task,width:taskWidth};
    line.push(taskWithWidth);
  }
  return linesArray;
}

function findAppropriateTaskLineForTask(
  task: TaskDataType,
  linesArray: TaskDataWithWidthType[][]
) {
  for (let i = 0; i < linesArray.length; i++) {
    const taskLine = linesArray[i];
    if (taskLine.length === 0) return i;
    const lastTaskInLine = taskLine[taskLine.length - 1];
    if (dayjs(task.startDate).isBefore(lastTaskInLine.endDate, 'minute')) {
      lastTaskInLine.width = 1;
      continue;
    }
    return i;
  }
  return -1;
}

function determineWidthForTaskLine(
  task: TaskDataType,
  lineNumber: number,
  linesArray: TaskDataWithWidthType[][]
){
    let width = 1;
    for (let i = lineNumber+1;i<linesArray.length;i++){
        const comparedLine = linesArray[i];
        if (comparedLine.length === 0){
            width++;
            continue;
        }
        const lastTaskOnLine = comparedLine[comparedLine.length-1];
        if (dayjs(task.startDate).isAfter(lastTaskOnLine.endDate,"minute")) {
                width++;
                continue; 
        }
        return width;
    }
    return width;
}

function addWidthValueToTaskData(
  task: TaskDataType,
  width: number
): TaskDataWithWidthType {
  return { ...task, width: width };
}

function initialLinesArray(numberOfLine: number) {
  const linesArray: TaskDataWithWidthType[][] = [];
  for (let i = 0; i < numberOfLine; i++) {
    const taskLine: TaskDataWithWidthType[] = [];
    linesArray.push(taskLine);
  }
  return linesArray;
}

export function findTaskWhichStartsOnThisDate(
  tasks: TaskDataType[],
  date: Date
) {
  const taskLists = [];
  for (let task of tasks) {
    const { startDate } = task;
    if (dayjs(startDate).isSame(date, 'day')) {
      taskLists.push(task);
    }
  }
  return taskLists;
}
