import { ReduxCategoryData } from '../../redux';

export type CategoryDataInput = Omit<ReduxCategoryData, 'categoryId'>;

export type CategorySchema = Omit<ReduxCategoryData, 'categoryId'>;

export type ErrorsMessage = {
  name: string | false;
  color: string | false;
  description: string | false;
};
