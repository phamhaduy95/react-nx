import { object, SchemaOf, string } from 'yup';
import { ReduxCategoryData } from '../redux/types';
import { validateDataBasedOnSchema } from './validation';
import { validationMessage } from './validationMessage';

export type CategorySchema = Omit<ReduxCategoryData, 'categoryId'>;

const schema: SchemaOf<CategorySchema> = object().shape({
  name: string()
    .required(validationMessage.required)
    .max(50, validationMessage.maxString),
  color: string().required(validationMessage.required),
  description: string().defined().max(200, validationMessage.maxString),
});

export async function validateCategoryData(taskData: CategorySchema) {
  return validateDataBasedOnSchema<CategorySchema>(taskData, schema);
}
