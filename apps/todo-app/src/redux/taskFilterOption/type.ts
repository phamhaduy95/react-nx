import { PayloadAction } from "@reduxjs/toolkit"

export type TaskFilterOptionState = {
    categories: {categoryId:string}[],
}

export type UpdateFilterCategoryAction = PayloadAction<{categoryId:string}[]>; 
export type AddNewCategoryFilterAction = PayloadAction<{categoryId:string}>;
export type RemoveCategoryFilterAction = PayloadAction<{categoryId:string}>;