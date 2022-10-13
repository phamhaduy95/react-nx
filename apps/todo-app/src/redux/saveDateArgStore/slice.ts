import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State } from "./type";

const initialState:State ={
    dateArg:null,
    monthArg:null,
    weekArg:null,
}

const slice = createSlice({
    name:"saveDateArg",
    initialState:initialState,
    reducers:{
        updateArg(state,action:PayloadAction<Partial<State>>){
                const data = action.payload;
                state = {...state,...data};               
        }
    }
})


export const saveDateArgAction = slice.actions;
export const saveDateArgReducer = slice.reducer; 

