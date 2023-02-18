import { PayloadAction } from '@reduxjs/toolkit';
import { ModalType } from '../../type/model';

export type AppModalState = {
  isOpen: boolean;
  closeOnClickOutside: boolean;
  modalType: ModalType;
  messages:string[];
};

export type ToggleModalOpenAction = PayloadAction<
  ModalType
>;
export type ToggleCloseOnClickOutsideAction = PayloadAction<boolean>;

export type UpdateMessagesAction =PayloadAction<string[]>