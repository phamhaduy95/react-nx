import { PayloadAction } from "@reduxjs/toolkit";

export type HomePageState = {
    isDrawerOpen:boolean,
    navItemSelect:string;
};

export type ToggleOpenDrawerAction = PayloadAction<boolean>;
export type SelectNavItemAction = PayloadAction<string>;
