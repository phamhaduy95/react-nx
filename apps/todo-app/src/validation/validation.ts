import { ValidationError, object } from 'yup';
import { ErrorObject, ErrorMessage } from './types';

function generateDefaultErrorObject(schema: ReturnType<typeof object>) {
  type SchemaShape = typeof schema.fields;
  let errorMessageObject = {};
  for (let key in schema.fields) {
    errorMessageObject = { ...errorMessageObject, [`${key}`]: false };
  }
  return errorMessageObject as ErrorMessage<SchemaShape>;
}

export function generateErrorMessage(
  schema: ReturnType<typeof object>,
  error: any
) {
  const errors = error.errors as ErrorObject[];
  let errorObject = generateDefaultErrorObject(schema);
  for (let error of errors) {
    if (error.key in errorObject) {
      errorObject = { ...errorObject, [`${error.key}`]: error.message };
    }
  }
  return errorObject;
}

export async function validateDataBasedOnSchema<T>(
  data: T,
  schema: ReturnType<typeof object>
) {
  let result = true;
  let errors: ErrorMessage<typeof schema.fields> = {};
  try {
    await schema.validate(data, { abortEarly: false });
  } catch (er) {
    if (er instanceof ValidationError) {
      result = false;
      errors = generateErrorMessage(schema, er);
    }
  }
  return { result, errors } as { result: boolean; errors: ErrorMessage<T> };
}
