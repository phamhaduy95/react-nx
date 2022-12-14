import { PayloadAction } from '@reduxjs/toolkit';

export enum ModalType {
  none,
  success,
  error,
  loading,
  addAndUpdateTask,
  deleteTask,
  addAndUpdateCategory,
  manageCategories,
  deleteCategory,
  filterCategory
}

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