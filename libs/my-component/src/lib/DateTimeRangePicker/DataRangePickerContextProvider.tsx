import React, { useContext, useEffect } from 'react';
import { DateTimeRangePickerActionMethod, DateTimeRangePickerState, useDateTimeRangePickerReducer } from './reducer';



type ContextValue = {
  state: DateTimeRangePickerState;
  action: DateTimeRangePickerActionMethod;
} | null;

const Calendar = React.createContext<ContextValue>(null);

type ContextProviderProps = {
  children: JSX.Element;
  initialState: DateTimeRangePickerState;
};

export  function DateTimeRangePickerContextProvider(
  props: ContextProviderProps
) {
  const { children, initialState } = props;
  const { state, action } = useDateTimeRangePickerReducer(initialState);
  const contextValue = { state, action };
  return <Calendar.Provider value={contextValue}>{children}</Calendar.Provider>;
}

export function useDateTimeRangePickerContext() {
  const contextValue = useContext(Calendar);
  if (contextValue === null)
    throw new Error('DateTimeRangePicker Context Value must be not mull');
  const { state, action } = contextValue;
  return { state, action };
}
