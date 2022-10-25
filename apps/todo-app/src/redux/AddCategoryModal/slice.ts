import { createSlice } from '@reduxjs/toolkit';
import { AddCategoryModalState, ToggleModalOpenAction } from './type';

const initialState: AddCategoryModalState = {
  isOpen: false,
};

const slice = createSlice({
  name: 'addCategoryModal',
  initialState: initialState,
  reducers: {
    toggleOpen: (state, action: ToggleModalOpenAction) => {
      const isOpen = action.payload;
      state.isOpen = isOpen;
    },
  },
});

export const addCategoryModalReducer = slice.reducer;
export const addCategoryModalActions = slice.actions;
