import { PayloadAction } from '@reduxjs/toolkit';
import { ReduxCategoryData } from '../types';

export type AddCategoryModalState = {
  data: Omit<ReduxCategoryData,"categoryId">;
  errorMessage: ErrorsMessage;
  isOpen: boolean;
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
