import { ReduxTaskData } from 'apps/todo-app/src/redux/types';
import { TaskDataInput } from '../types';
export function convertTaskReduxDataIntoTaskDataInput(
  reduxTaskData: ReduxTaskData
): TaskDataInput {
  const { startTime: startDate, endTime: endDate } = reduxTaskData;

  const startDateObject = startDate === '' ? null : new Date(startDate);
  const endDateObject = endDate === '' ? null : new Date(endDate);
  const newData = {
    ...reduxTaskData,
    startTime: startDateObject,
    endTime: endDateObject,
  } as TaskDataInput;
  return newData;
}
