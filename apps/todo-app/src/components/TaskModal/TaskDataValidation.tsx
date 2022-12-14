import dayjs from 'dayjs';
import { object, SchemaOf, string, date, ValidationError } from 'yup';
import { MixedLocale, StringLocale } from 'yup/lib/locale';
import type { ErrorsMessage, TaskDataInput, TaskDataSchema } from './types';

function createErrorFlagsFromValidationError(error: any) {
  let ErrorMessage: ErrorsMessage<TaskDataSchema> = {
    title: false,
    categoryId: false,
    startTime: false,
    endTime: false,
    description: false,
  };
  const errors = error.errors as ErrorObject[];
  for (let error of errors) {
    if (error.key in ErrorMessage) {
      ErrorMessage = { ...ErrorMessage, [`${error.key}`]: error.message };
    }
  }
  return ErrorMessage as ErrorsMessage<TaskDataSchema>;
}

type ErrorObject = { key: string; message: string };

const requiredMessage: MixedLocale['required'] = (a) => ({
  key: a.path,
  message: `required`,
});

const stringMaxMessage: StringLocale['max'] = (a) => ({
  key: a.path,
  message: `${a.label} length must smaller than ${a.max}`,
});

const endDateInvalidMessage: MixedLocale['required'] = (a) => ({
  key: a.path,
  message: `task must end after the start time`,
});

const schema: SchemaOf<TaskDataSchema> = object().shape({
  title: string().required(requiredMessage).max(50, stringMaxMessage),
  categoryId: string().required(requiredMessage),
  startTime: date()
    .nullable()
    .defined()
    .test('test-non-nullable', requiredMessage, (value) => {
      return value !== null;
    }),
  endTime: date()
    .nullable()
    .defined()
    .test(
      'compare-end-date-with-start-date',
      endDateInvalidMessage,
      (value, context) => {
        const data = context.parent as TaskDataSchema;
        const { startTime, endTime } = data;
        if (startTime === null || endTime === null) return true;
        return dayjs(endTime).isAfter(startTime, 'minute');
      }
    )
    .test('test-non-nullable', requiredMessage, (value) => {
      return value !== null;
    }),
  description: string().defined(),
});

export async function validateTaskData(taskData: TaskDataInput) {
  let error: any = null;
  let result = true;
  try {
    await schema.validate(taskData, { abortEarly: false });
  } catch (er) {
    if (er instanceof ValidationError) {
      result = false;
      error = createErrorFlagsFromValidationError(er);
    }
  }
  return { result, error } as {
    result: boolean;
    error: ErrorsMessage<TaskDataSchema>;
  };
}
