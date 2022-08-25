import React, { useContext, useEffect } from 'react';
import {
  DateRangePanelState,
  DateRangePanelActionMethod,
  useDateRangePanelReducer,
} from './reducer';

type ContextValue = {
  state: DateRangePanelState;
  action: DateRangePanelActionMethod;
} | null;

const Calendar = React.createContext<ContextValue>(null);

type ContextProviderProps = {
  children: JSX.Element;
  initialState: DateRangePanelState;
};

export default function DatePanelRangeContextProvider(
  props: ContextProviderProps
) {
  const { children, initialState } = props;
  const { state, action } = useDateRangePanelReducer(initialState);
  const contextValue = { state, action };
  return <Calendar.Provider value={contextValue}>{children}</Calendar.Provider>;
}

export function useDateRangePanelSingleContext() {
  const contextValue = useContext(Calendar);
  if (contextValue === null)
    throw new Error('Calendar Context Value must be not mull');
  const { state, action } = contextValue;
  return { state, action };
}
