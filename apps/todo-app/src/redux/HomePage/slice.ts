import { createSlice } from '@reduxjs/toolkit';
import { HomePageState, ToggleOpenDrawerAction, SelectNavItemAction } from './type';
const initialState:HomePageState = {
    isDrawerOpen:false,
    navItemSelect:"",
}

const slice = createSlice({
    name:"home-page",
    initialState:initialState,
    reducers: {
        toggleDrawer:(state,action:ToggleOpenDrawerAction)=>{
            state.isDrawerOpen = action.payload;
        },
        selectNavItem:(state,action:SelectNavItemAction)=>{
            state.navItemSelect = action.payload;
        }
    }
})

export const HomePageReducer = slice.reducer;
export const HomePageAction = slice.actions;