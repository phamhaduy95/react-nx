import { Omit } from "@reduxjs/toolkit/dist/tsHelpers";

export const enum ModalType {
  none = "none",
  success = "success",
  error = "error",
  loading = "loading",
  addAndUpdateTask = "addAndUpdateTask",
  deleteTask = "deleteTask",
  addAndUpdateCategory = "addAndUpdateCategory",
  manageCategories = "manageCategories",
  deleteCategory = "deleteCategory",
  filterCategory = "filterCategory"
}


export type TaskDataType = {
    taskId: string;
    categoryId: string;
    title: string;
    userId:string;
    startTime: Date;
    endTime: Date;
    description: string;
  };

  // since redux does not allow any non-serializable data type ( in this case is Date ). startDate and endDate hove to be string instead.

