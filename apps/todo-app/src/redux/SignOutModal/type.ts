import { PayloadAction } from "@reduxjs/toolkit";

export type SignOutModalState = {
    isOpen:boolean;
}

export type ToggleModalOpenAction = PayloadAction<boolean>;
