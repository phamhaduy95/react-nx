import React, { useContext, useEffect } from 'react';
import {
  CalendarActionMethod,
  DatePanelSingleState,
  useDatePanelReducer,
} from './reducer';

type ContextValue = {
  state: DatePanelSingleState;
  action: CalendarActionMethod;
} | null;

const Calendar = React.createContext<ContextValue>(null);

type CalendarContextProviderProps = {
  children: JSX.Element;
  initialState: DatePanelSingleState;
};

export default function DatePanelSingleContextProvider(
  props: CalendarContextProviderProps
) {
  const { children, initialState } = props;
  const { state, action } = useDatePanelReducer(initialState);
  const contextValue = { state, action };

  return <Calendar.Provider value={contextValue}>{children}</Calendar.Provider>;
}

export function useDatePanelSingleContext() {
  const contextValue = useContext(Calendar);
  if (contextValue === null)
    throw new Error('Calendar Context Value must be not mull');
  const { state, action } = contextValue;
  return { state, action };
}
