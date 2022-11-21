import { createSlice } from '@reduxjs/toolkit';
import { UpdateMessagesAction } from './type';
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
  messages: [],
};

const slice = createSlice({
  name: 'App-modal',
  initialState: initialState,
  reducers: {
    openModal: (state, action: ToggleModalOpenAction) => {
      const type = action.payload;
      state.isOpen = true;
      state.modalType = type;
      state.messages = [];
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
    updateMessages: (state, action: UpdateMessagesAction) => {
      const message = action.payload;
      state.messages = message;
    },
  },
});

export const AppModalReducer = slice.reducer;
export const AppModalActions = slice.actions;
