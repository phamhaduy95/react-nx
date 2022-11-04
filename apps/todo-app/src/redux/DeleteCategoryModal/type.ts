import { PayloadAction } from "@reduxjs/toolkit";

export type DeleteCategoryModalState = {
    taskToDelete:string;
}

export type DeleteCategoryAction = PayloadAction<string>;
