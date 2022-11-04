import { PayloadAction } from '@reduxjs/toolkit';
import { ReduxCategoryData } from '../types';

export type AddCategoryModalState = {
  type :"add"|"update",
  data: ReduxCategoryData;
  errorMessage: ErrorsMessage;
};

export type ErrorsMessage = {
  name: string | false;
  color: string | false;
  description: string | false;
};

export type UpdateCategoryDataAction = PayloadAction<
  Partial<AddCategoryModalState["data"]>
>;
export type UpdateErrorMessageAction = PayloadAction<Partial<ErrorsMessage>>;
export type ToggleModalOpenAction = PayloadAction<boolean>;
export type UpdateCategoryAction = PayloadAction<ReduxCategoryData>;