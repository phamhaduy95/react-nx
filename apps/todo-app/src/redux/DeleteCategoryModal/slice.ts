import { createSlice } from "@reduxjs/toolkit";
import { DeleteCategoryModalState, DeleteCategoryAction } from './type';

const initialState:DeleteCategoryModalState ={
    taskToDelete:"",
}  

const slice = createSlice({
    name:"delete-category",
    initialState:initialState,
    reducers:{
        deleteCategory:(state,action:DeleteCategoryAction)=>{
            const categoryId = action.payload;
            state.taskToDelete = categoryId;
        }
    }
});

export const DeleteCategoryModalReducer = slice.reducer;
export const DeleteCategoryModalAction = slice.actions;