import { object, SchemaOf, string, ValidationError } from 'yup';
import { MixedLocale, StringLocale } from 'yup/lib/locale';
import { UserEmailInput } from './type';
import { ErrorObject, ErrorMessage } from './type';

function createErrorFlagsFromValidationError(error: any) {
  let ErrorMessage: ErrorMessage<UserEmailInput> = {
    newEmail: false,
    password: false,
  };
  const errors = error.errors as ErrorObject[];
  for (let error of errors) {
    if (error.key in ErrorMessage) {
      ErrorMessage = { ...ErrorMessage, [`${error.key}`]: error.message };
    }
  }
  return ErrorMessage as ErrorMessage<UserEmailInput>;
}

const requiredMessage: MixedLocale['required'] = (a) => ({
  key: a.path,
  message: `${a.path} is required`,
});

const emailMessage: StringLocale['email'] = (a) => ({
  key: a.path,
  message: `${a.path} is not email format`,
});

const schema: SchemaOf<UserEmailInput> = object().shape({
  newEmail: string().email(emailMessage).required(requiredMessage),
  password: string().required(requiredMessage),
});

export async function validateEmailData(data: UserEmailInput) {
  let error: any = null;
  let result = true;
  try {
    await schema.validate(data, { abortEarly: false });
  } catch (er) {
    if (er instanceof ValidationError) {
      result = false;
      error = createErrorFlagsFromValidationError(er);
    }
  }
  return { result, error } as {
    result: boolean;
    error: ErrorMessage<UserEmailInput>;
  };
}
