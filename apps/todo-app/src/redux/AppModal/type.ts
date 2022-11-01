import { PayloadAction } from '@reduxjs/toolkit';

export enum ModalType {
  none,
  success,
  error,
  loading,
  addAndUpdateTask,
  deleteTask,
  addCategory,
  updateCategory,
}

export type AppModalState = {
  isOpen: boolean;
  closeOnClickOutside: boolean;
  modalType: ModalType;
};

export type ToggleModalOpenAction = PayloadAction<
  ModalType
>;
export type ToggleCloseOnClickOutsideAction = PayloadAction<boolean>;
