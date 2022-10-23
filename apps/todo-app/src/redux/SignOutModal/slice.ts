import { createSlice } from '@reduxjs/toolkit';
import { SignOutModalState, ToggleModalOpenAction } from './type';

const initialState: SignOutModalState = {
  isOpen: false,
};

const slice = createSlice({
  name: 'signOutModal',
  initialState: initialState,
  reducers: {
    toggleOpen: (state, action: ToggleModalOpenAction) => {
      const  isOpen  = action.payload;
      state.isOpen = isOpen;
    },
  },
});


export const signOutModalReducer = slice.reducer;
export const signOutModalActions = slice.actions;