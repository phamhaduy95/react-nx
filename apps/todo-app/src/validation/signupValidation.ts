import { object, SchemaOf, string } from 'yup';
import { MixedLocale } from 'yup/lib/locale';
import { validateDataBasedOnSchema } from './validation';
import { validationMessage } from './validationMessage';

export type SignUpSchema = {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const confirmPasswordCheckMessage: MixedLocale['required'] = (a) => ({
  key: a.path,
  message: 'confirmed password is not same as password.',
});

const schema: SchemaOf<SignUpSchema> = object().shape({
  email: string()
    .email(validationMessage.validEmail)
    .required(validationMessage.required),
  password: string()
    .matches(/[A-Z]+/, validationMessage.upperCaseRequired)
    .matches(/[1-9]+/, validationMessage.numberRequired)
    .matches(
      /[!@#$%^&*(),.?":{}|<>]+/,
      validationMessage.specialCharacterRequired
    )
    .min(8, validationMessage.minString)
    .required(validationMessage.required),
  confirmPassword: string()
    .test(
      'is-same-with-password',
      confirmPasswordCheckMessage,
      (value, context) => {
        const data = context.parent as SignUpSchema;
        return value === data.password;
      }
    )
    .required(validationMessage.required),
  displayName: string()
    .matches(/[A-Za-z]+/, validationMessage.letterRequired)
    .max(20, validationMessage.maxString)
    .required(validationMessage.required),
});

export async function validateSignUpData(signUpData: SignUpSchema) {
  return await validateDataBasedOnSchema<SignUpSchema>(signUpData, schema);
}
