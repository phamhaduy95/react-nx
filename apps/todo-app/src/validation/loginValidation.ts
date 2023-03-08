import { object, SchemaOf, string } from 'yup';
import { validateDataBasedOnSchema } from './validation';
import { validationMessage } from './validationMessage';

export type LoginSchema = {
  email: string;
  password: string;
};

const schema: SchemaOf<LoginSchema> = object().shape({
  email: string().required(validationMessage.required),
  password: string().required(validationMessage.required),
});

export async function validateLoginData(loginData: LoginSchema) {
  return await validateDataBasedOnSchema<LoginSchema>(loginData, schema);
}
