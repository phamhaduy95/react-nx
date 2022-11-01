import { object, SchemaOf, string, ValidationError } from 'yup';
import { MixedLocale, StringLocale } from 'yup/lib/locale';
import { ErrorObject, ErrorsMessage, SignUpData } from './type';

function createErrorFlagsFromValidationError(error: any) {
  let ErrorMessage: ErrorsMessage = {
    email: false,
    password: false,
    confirmPassword: false,
    userName: false,
    connection:false,
  };
  const errors = error.errors as ErrorObject[];
  for (let error of errors) {
    if (error.key in ErrorMessage) {
      ErrorMessage = { ...ErrorMessage, [`${error.key}`]: error.message };
    }
  }
  return ErrorMessage as ErrorsMessage;
}

const requiredMessage: MixedLocale['required'] = (a) => ({
  key: a.path,
  message: `this field is required.`,
});

const minStrLengthMessage: StringLocale['min'] = (a) => ({
  key: a.path,
  message: `must contain at least ${a.min} characters.`,
});

const maxStrLengthMessage: StringLocale['max'] = (a) => ({
  key: a.path,
  message: `must contain at most ${a.max} characters.`,
});

const upperCaseRequiredMessage: StringLocale['matches'] = (a) => ({
  key: a.path,
  message: 'must contain one or more uppercase characters.',
});

const numberRequiredMessage: StringLocale['matches'] = (a) => ({
  key: a.path,
  message: 'must contain one or more number digits.',
});

const letterRequiredMessage: StringLocale['matches'] = (a) => ({
  key: a.path,
  message: ' must contain one or more letters',
});

const specialCharacterRequiredMessage: StringLocale['matches'] = (a) => ({
  key: a.path,
  message: 'must contain one or more special character.',
});

const emailCheckMessage: StringLocale['email'] = (a) => ({
  key: a.path,
  message: ' provided email is not correct.',
});

const confirmPasswordCheckMessage: MixedLocale['required'] = (a) => ({
  key: a.path,
  message: 'confirmed password is not same as password.',
});

const schema: SchemaOf<SignUpData> = object().shape({
  email: string().required(requiredMessage).email(emailCheckMessage),
  password: string()
    .matches(/[A-Z]+/, upperCaseRequiredMessage)
    .matches(/[1-9]+/, numberRequiredMessage)
    .matches(/[!@#$%^&*(),.?":{}|<>]/, specialCharacterRequiredMessage)
    .min(8, minStrLengthMessage)
    .required(requiredMessage),
  confirmPassword: string()
    .test(
      'is-same-with-password',
      confirmPasswordCheckMessage,
      (value, context) => {
        const data = context.parent as SignUpData;
        return value === data.password;
      }
    )
    .required(requiredMessage),
  userName: string()
    .max(20, maxStrLengthMessage)
    .matches(/[A-Za-z]+/, letterRequiredMessage)
    .required(requiredMessage),
});

export async function validateSignUpData(loginData: SignUpData) {
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
    error: ErrorsMessage;
  };
}
