import { ReduxTaskData } from '../../redux';
import { TaskDataSchema, TaskDataInput } from './types';

export function convertTaskReduxDataIntoTaskDataInput(
  reduxTaskData: ReduxTaskData
): TaskDataInput {
  const { startTime: startDate, endTime: endDate } = reduxTaskData;

  const startDateObject = startDate === '' ? null : new Date(startDate);
  const endDateObject = endDate === '' ? null : new Date(endDate);
  const newData = {
    title: reduxTaskData.title,
    categoryId: reduxTaskData.categoryId,
    description: reduxTaskData.description,
    startTime: startDateObject,
    endTime: endDateObject,
  } as TaskDataInput;
  return newData;
}
