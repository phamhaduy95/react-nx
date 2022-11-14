import { object, SchemaOf, string, ValidationError } from 'yup';
import { MixedLocale, StringLocale } from 'yup/lib/locale';
import {
  ErrorObject,
  PasswordInput,
  ErrorMessage,
  PasswordErrorCode,
} from './type';

function createErrorFlagsFromValidationError(error: any) {
  let ErrorMessage: ErrorMessage<PasswordInput> = {
    newPassword: false,
    confirmPassword: false,
    oldPassword: false,
  };
  const errors = error.errors as ErrorObject[];
  for (let error of errors) {
    if (error.key in ErrorMessage) {
      ErrorMessage = { ...ErrorMessage, [`${error.key}`]: error.message };
    }
  }
  return ErrorMessage as ErrorMessage<PasswordInput>;
}

const requiredMessage: MixedLocale['required'] = (a) => ({
  key: a.path,
  message: `${a.path} is required`,
});

const minMessage: StringLocale['min'] = (a) => ({
  key: a.path,
  message: `${a.path} length must be greater than ${a.min}`,
});

const mustContainLowerMessage: StringLocale['matches'] = (a) => ({
  key: a.path,
  message: `${a.path} must contain lowercase`,
});

const mustContainUpperMessage: StringLocale['matches'] = (a) => ({
  key: a.path,
  message: `${a.path} must contain uppercase`,
});

const mustContainSpecialMessage: StringLocale['matches'] = (a) => ({
  key: a.path,
  message: `${a.path} must contain special character`,
});

const mustContainNumberMessage: StringLocale['matches'] = (a) => ({
  key: a.path,
  message: `${a.path} must contain number`,
});

const confirmPasswordCheckMessage: MixedLocale['required'] = (a) => ({
  key: a.path,
  message: 'confirmed password is not same as password.',
});

const schema: SchemaOf<PasswordInput> = object().shape({
  oldPassword: string().required(requiredMessage),
  newPassword: string()
    .matches(/[a-z]+/g, mustContainLowerMessage)
    .matches(/\d+/g, mustContainNumberMessage)
    .matches(/[A-Z]+/, mustContainUpperMessage)
    .matches(
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/,
      mustContainSpecialMessage
    )
    .min(8, minMessage)
    .required(requiredMessage),
  confirmPassword: string()
    .test(
      'is-same-with-password',
      confirmPasswordCheckMessage,
      (value, context) => {
        const data = context.parent as PasswordInput;
        return value === data.newPassword;
      }
    )
    .required(requiredMessage),
});

export async function validatePasswordData(data: PasswordInput) {
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
    error: ErrorMessage<PasswordInput>;
  };
}
