import { createSlice } from '@reduxjs/toolkit';
import { UpdateCategoryAction } from './type';
import {
  AddCategoryModalState,
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
  categoryId: '',
  name: '',
  color: '#B9E0FF',
  description: '',
});

const initialState: AddCategoryModalState = {
  type: 'add',
  data: defaultCategoryData,
  errorMessage: defaultErrorsMessage,
};

const slice = createSlice({
  name: 'addCategoryModal',
  initialState: initialState,
  reducers: {
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
    addCategory: (state) => {
      state.type = 'add';
      state.errorMessage = defaultErrorsMessage;
      state.data = defaultCategoryData;
    },
    updateCategory: (state, action: UpdateCategoryAction) => {
      const data = action.payload;
      state.type = 'update';
      console.log(data);
      state.data = data;
      state.errorMessage = defaultErrorsMessage;
    },
  },
});

export const addCategoryModalReducer = slice.reducer;
export const addCategoryModalActions = slice.actions;
