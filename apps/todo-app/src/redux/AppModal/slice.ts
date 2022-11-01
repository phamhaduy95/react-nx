import { createSlice } from '@reduxjs/toolkit';
import {
  AppModalState,
  ModalType,
  ToggleModalOpenAction,
  ToggleCloseOnClickOutsideAction,
} from './type';

const initialState: AppModalState = {
  isOpen: false,
  modalType: ModalType.none,
  closeOnClickOutside: true,
};

const slice = createSlice({
  name: 'App-modal',
  initialState: initialState,
  reducers: {
    openModal: (state, action: ToggleModalOpenAction) => {
      const  modalType  = action.payload;
      state.isOpen = true;
      state.modalType = modalType;
    },
    toggleCloseOnClickOutside: (
      state,
      action: ToggleCloseOnClickOutsideAction
    ) => {
      const flag = action.payload;
      state.closeOnClickOutside = flag;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.closeOnClickOutside = false;
    },
  },
});

export const AppModalReducer = slice.reducer;
export const AppModalActions = slice.actions;
