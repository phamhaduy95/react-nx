import { useReducer } from "react";

export type DatePickerState = {
    selectedDate : Date|null;
    isPopupOpen:boolean,
}

type SelectDateAction = {
    type:"SELECT_DATE",
    payload:{
        newDate:DatePickerState["selectedDate"],
    }
}


type TogglePopupAction = {
    type:"TOGGLE_POPUP",
    payload:{
        isPopupOpen:boolean;
    }
}

type DatePickerAction = SelectDateAction|TogglePopupAction;

export type DatePickerActionMethod = {
    selectDate:(newDate:DatePickerState["selectedDate"])=>void;
    togglePopup:(isPopupOpen:boolean)=>void;
}

type Dispatcher = React.Dispatch<DatePickerAction>;

function getActionMethod(dispatch:Dispatcher):DatePickerActionMethod{
    return {
        selectDate(newDate) {
            dispatch({type:"SELECT_DATE",payload:{newDate}})
        }, 
        togglePopup(isPopupOpen) {
            dispatch({type:"TOGGLE_POPUP",payload:{isPopupOpen}})
        }, 
    }
}

const reducer = (state:DatePickerState,action:DatePickerAction):DatePickerState=>{
    switch(action.type){
        case"SELECT_DATE":{
            const newDate = action.payload.newDate;
            const currDate = state.selectedDate;
            if (newDate?.toDateString() === currDate?.toDateString()) return state;
            return {...state,selectedDate:newDate}
        }
        case "TOGGLE_POPUP":{
            const isOpen = action.payload.isPopupOpen;
            if (isOpen === state.isPopupOpen) return state;
            return {...state,isPopupOpen:isOpen}
        }
        default:{
            return state;
        }
    }
}

export function useDatePickerReducer(initialState:DatePickerState){
    const [state,dispatch] = useReducer(reducer,initialState);
    const action = getActionMethod(dispatch);
    return {state,action};   
}