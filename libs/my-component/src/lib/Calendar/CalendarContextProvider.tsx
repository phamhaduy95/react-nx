import React, { useContext, useEffect } from 'react';
import {
  CalendarActionMethod,
  CalendarState,
  useCalendarReducer,
} from './reducer';

type CalendarContextValue = {
  state: CalendarState;
  action: CalendarActionMethod;
} | null;

const CalendarContext = React.createContext<CalendarContextValue>(null);

type CalendarContextProviderProps = {
  children: JSX.Element;
  initialState: CalendarState;
};

export default function CalendarContextProvider(
  props: CalendarContextProviderProps
) {
  const { children, initialState } = props;
  const { state, action } = useCalendarReducer(initialState);
  const contextValue = { state, action };
  const date = initialState.selectedDate;

  useEffect(() => {
    const dateStr = date.toDateString();
    action.selectNewDate(dateStr);
    action.selectNewMonth(date.getFullYear(), date.getMonth());
  }, [date.toDateString()]);

  useEffect(() => {
    action.makeSelectable(initialState.selectable);
  }, [initialState.selectable]);

  return (
    <CalendarContext.Provider value={contextValue}>
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendarContext() {
  const contextValue = useContext(CalendarContext);
  if (contextValue === null)
    throw new Error('Calendar Context Value must be not mull');
  const { state, action } = contextValue;
  return { state, action };
}
