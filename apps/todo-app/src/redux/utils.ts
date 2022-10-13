import dayjs from 'dayjs';
import { TaskDataType } from '../type/model';
import { ReduxTaskData } from './types';
export function convertTaskDataIntoReduxState(
  taskData: TaskDataType
): ReduxTaskData {
  const startDate = taskData.startTime.toString();
  const endDate = taskData.endTime.toString();
  return {
    ...taskData,
    startTime: startDate,
    endTime: endDate,
  } as ReduxTaskData;
}

export function convertTaskDataReduxIntoTaskData(
  taskRedux: ReduxTaskData
): TaskDataType {
  const startDate = new Date(taskRedux.startTime);
  const endDate = new Date(taskRedux.endTime);
  return { ...taskRedux, startTime: startDate, endTime: endDate };
}


export function isTimeWithInMonth(time:Date,month:Date){
    dayjs()
}