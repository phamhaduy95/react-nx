import { PayloadAction } from "@reduxjs/toolkit";

export type AddCategoryModalState = {
    isOpen:boolean;
}

export type ToggleModalOpenAction = PayloadAction<boolean>;
