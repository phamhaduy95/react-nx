import { object, SchemaOf, string, ValidationError } from 'yup';
import { MixedLocale } from 'yup/lib/locale';
import { ErrorObject, LoginData, LoginErrorsMessage } from './type';

function createErrorFlagsFromValidationError(error: any) {
  let ErrorMessage: LoginErrorsMessage = {
    email: false,
    password: false,
  };
  const errors = error.errors as ErrorObject[];
  for (let error of errors) {
    if (error.key in ErrorMessage) {
      ErrorMessage = { ...ErrorMessage, [`${error.key}`]: error.message };
    }
  }
  return ErrorMessage as LoginErrorsMessage;
}

const requiredMessage: MixedLocale['required'] = (a) => ({
  key: a.path,
  message: `required`,
});

const schema: SchemaOf<LoginData> = object().shape({
  email: string().required(requiredMessage),
  password: string().required(requiredMessage),
});

export async function validateLoginData(loginData: LoginData) {
  let error: any = null;
  let result = true;
  try {
    await schema.validate(loginData, { abortEarly: false });
  } catch (er) {
    if (er instanceof ValidationError) {
      result = false;
      error = createErrorFlagsFromValidationError(er);
    }
  }
  return { result, error } as {
    result: boolean;
    error: LoginErrorsMessage;
  };
}
