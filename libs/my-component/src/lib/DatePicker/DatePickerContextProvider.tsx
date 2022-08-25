import React, { useEffect } from 'react'
import { DatePickerActionMethod, DatePickerState, useDatePickerReducer } from './reducer';


type DatePickerContextValue = {
    state:DatePickerState,
    action:DatePickerActionMethod
}|null;

const DatePickerContext = React.createContext<DatePickerContextValue>(null);

type Props = {
    children:JSX.Element;
    initialState:DatePickerState;
}

export default function DatePickerContextProvider(props:Props) {
    const {children,initialState} = props;
    const {state,action} = useDatePickerReducer(initialState);

    return (
    <DatePickerContext.Provider value={{state,action}}>
        {children}
    </DatePickerContext.Provider>
  )
}


export function useDatePickerContext(){
    const value = React.useContext(DatePickerContext) as NonNullable<DatePickerContextValue>
    if (value === null) throw new Error("Date Picker Context value is null");
    return value; 
}