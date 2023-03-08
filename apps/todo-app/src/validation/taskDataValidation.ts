import dayjs from 'dayjs';
import { object, SchemaOf, string, date } from 'yup';
import { TaskDataType } from '../type/model';
import { validateDataBasedOnSchema } from './validation';
import { validationMessage } from './validationMessage';

export type TaskDataSchema = Omit<
  TaskDataType,
  'startTime' | 'endTime' | 'userId' | 'taskId'
> & {
  startTime: Date | null;
  endTime: Date | null;
  categoryId: string;
};

const schema: SchemaOf<TaskDataSchema> = object().shape({
  title: string()
    .required(validationMessage.required)
    .max(50, validationMessage.maxString),
  categoryId: string().required(validationMessage.required),
  startTime: date()
    .nullable()
    .defined()
    .test('test-non-nullable', validationMessage.required, (value) => {
      return value !== null;
    }),
  endTime: date()
    .nullable()
    .defined()
    .test(
      'compare-end-date-with-start-date',
      validationMessage.endDateInvalidMessage,
      (value, context) => {
        const data = context.parent as TaskDataSchema;
        const { startTime, endTime } = data;
        if (startTime === null || endTime === null) return true;
        return dayjs(endTime).isAfter(startTime, 'minute');
      }
    )
    .test('test-non-nullable', validationMessage.required, (value) => {
      return value !== null;
    }),
  description: string().defined(),
});

export async function validateTaskData(taskData: TaskDataSchema) {
  return await validateDataBasedOnSchema<TaskDataSchema>(taskData, schema);
}
