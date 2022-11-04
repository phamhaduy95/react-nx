import { object, SchemaOf, string, ValidationError } from 'yup';
import { MixedLocale, StringLocale } from 'yup/lib/locale';
import { CategorySchema, ErrorsMessage } from './type';

function createErrorFlagsFromValidationError(error: any) {
  let ErrorMessage: ErrorsMessage = {
    name: false,
    color: false,
    description: false,
  };
  const errors = error.errors as ErrorObject[];
  for (let error of errors) {
    if (error.key in ErrorMessage) {
      ErrorMessage = { ...ErrorMessage, [`${error.key}`]: error.message };
    }
  }
  return ErrorMessage as ErrorsMessage;
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

const schema: SchemaOf<CategorySchema> = object().shape({
  name: string().required(requiredMessage).max(50, stringMaxMessage),
  color: string().required(requiredMessage),
  description: string().defined().max(200, stringMaxMessage),
});

export async function validateCategoryData(taskData: CategorySchema) {
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
    error: ErrorsMessage;
  };
}
