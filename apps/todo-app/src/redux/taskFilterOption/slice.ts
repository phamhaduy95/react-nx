import { createSlice } from "@reduxjs/toolkit";
import { AddNewCategoryFilterAction, RemoveCategoryFilterAction, TaskFilterOptionState, UpdateFilterCategoryAction } from './type';

const initialState:TaskFilterOptionState = {
    categories:[],
}


const slice = createSlice({
    name:"taskFilter",
    initialState:initialState,
    reducers:{
        updateCategoryFilter:(state,action:UpdateFilterCategoryAction)=>{
            const newFilter = action.payload;
            state.categories = newFilter;
        },
        addNewCategoryFilter:(state,action:AddNewCategoryFilterAction)=>{
            const  category = action.payload;
            state.categories.push(category);
        },
        removeCategoryFilter:(state,action:RemoveCategoryFilterAction)=>{
            const id = action.payload.categoryId;
            state.categories = state.categories.filter(e=>e.categoryId !== id);
        }
    }

});

export const taskFilterOptionReducer = slice.reducer;
export const taskFilterOptionAction  = slice.actions;