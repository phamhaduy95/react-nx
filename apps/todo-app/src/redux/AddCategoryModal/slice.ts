import { createSlice } from '@reduxjs/toolkit';
import {
  AddCategoryModalState,
  ToggleModalOpenAction,
  UpdateCategoryDataAction,
  UpdateErrorMessageAction,
} from './type';

const defaultErrorsMessage: AddCategoryModalState['errorMessage'] =
  Object.freeze({
    name: false,
    color: false,
    description: false,
  });

const defaultCategoryData: AddCategoryModalState['data'] = Object.freeze({
  name: '',
  color: '#B9E0FF',
  description: '',
});

const initialState: AddCategoryModalState = {
  isOpen: false,
  data: defaultCategoryData,
  errorMessage: defaultErrorsMessage,
};

const slice = createSlice({
  name: 'addCategoryModal',
  initialState: initialState,
  reducers: {
    toggleOpen: (state, action: ToggleModalOpenAction) => {
      const isOpen = action.payload;
      state.isOpen = isOpen;
    },
    updateCategoryData: (state, action: UpdateCategoryDataAction) => {
      const data = action.payload;
      state.data = { ...state.data, ...data };
    },
    updateErrorMessage: (state, action: UpdateErrorMessageAction) => {
      const errors = action.payload;
      state.errorMessage = { ...state.errorMessage, ...errors };
    },
    clearErrorMessage: (state) => {
      state.errorMessage = { ...defaultErrorsMessage };
    },
    clearCategoryData: (state) => {
      state.data = defaultCategoryData;
    },
  },
});

export const addCategoryModalReducer = slice.reducer;
export const addCategoryModalActions = slice.actions;
