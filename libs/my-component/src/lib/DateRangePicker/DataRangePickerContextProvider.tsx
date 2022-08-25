import React, { useContext, useEffect } from 'react';
import { DateRangePickerActionMethod, DateRangePickerState, useDateRangePickerReducer } from './reducer';

type ContextValue = {
  state: DateRangePickerState;
  action: DateRangePickerActionMethod;
} | null;

const Calendar = React.createContext<ContextValue>(null);

type ContextProviderProps = {
  children: JSX.Element;
  initialState: DateRangePickerState;
};

export  function DateRangePickerContextProvider(
  props: ContextProviderProps
) {
  const { children, initialState } = props;
  const { state, action } = useDateRangePickerReducer(initialState);
  const contextValue = { state, action };
  return <Calendar.Provider value={contextValue}>{children}</Calendar.Provider>;
}

export function useDateRangePickerContext() {
  const contextValue = useContext(Calendar);
  if (contextValue === null)
    throw new Error('Calendar Context Value must be not mull');
  const { state, action } = contextValue;
  return { state, action };
}
