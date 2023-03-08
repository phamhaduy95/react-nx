import { ReduxTaskData } from '../../redux';
import { TaskDataSchema } from '../../validation/taskDataValidation';

export function convertTaskReduxDataIntoTaskDataInput(
  reduxTaskData: ReduxTaskData
): TaskDataSchema {
  const { startTime: startDate, endTime: endDate, categoryId } = reduxTaskData;

  const startDateObject = startDate === '' ? null : new Date(startDate);
  const endDateObject = endDate === '' ? null : new Date(endDate);
  const categoryValue = categoryId === null ? 'null' : categoryId;
  const newData = {
    title: reduxTaskData.title,
    categoryId: categoryValue,
    description: reduxTaskData.description,
    startTime: startDateObject,
    endTime: endDateObject,
  } as TaskDataSchema;
  return newData;
}
