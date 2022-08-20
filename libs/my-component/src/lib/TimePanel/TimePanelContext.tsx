import React from 'react';
import { TimePanelActionMethod, TimePanelState, useTimePanelReducer } from './reducer';



type ContextValueType = {
  state: TimePanelState;
  action: TimePanelActionMethod;
} | null;

const TimePickerContext = React.createContext<ContextValueType>(null);

type ContextProviderProps = {
  initialState: TimePanelState;
  children: JSX.Element;
};

export function TimePanelContextProvider(props: ContextProviderProps) {
  const { initialState, children } = props;
  const { state, action } = useTimePanelReducer(initialState);

  return (
    <TimePickerContext.Provider value={{ state, action }}>
      {children}
    </TimePickerContext.Provider>
  );
}

export function useTimePanelContext() {
  const value = React.useContext(TimePickerContext);
  if (value === null) throw new Error('TimePicker context value is null');
  const { state, action } = value;
  return { state, action };
}
