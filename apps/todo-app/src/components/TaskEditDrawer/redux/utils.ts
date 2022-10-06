import { ReduxTaskData } from 'apps/todo-app/src/redux/types';
import { TaskDataInput } from '../types';
export function convertTaskReduxDataIntoTaskDataInput(
  reduxTaskData: ReduxTaskData
): TaskDataInput {
  const { startDate, endDate } = reduxTaskData;

  const startDateObject = startDate === '' ? null : new Date(startDate);
  const endDateObject = endDate === '' ? null : new Date(endDate);
  const newData = {
    ...reduxTaskData,
    startDate: startDateObject,
    endDate: endDateObject,
  } as TaskDataInput;
  return newData;
}
