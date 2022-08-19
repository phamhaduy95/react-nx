import React from 'react';
import {
  TimePickerActionMethod,
  TimePickerState,
  useTimePickerReducer,
} from './reducer';

type ContextValueType = {
  state: TimePickerState;
  action: TimePickerActionMethod;
} | null;

const TimePickerContext = React.createContext<ContextValueType>(null);

type ContextProviderProps = {
  initialState: TimePickerState;
  children: JSX.Element;
};

export function TimePickerContextProvider(props: ContextProviderProps) {
  const { initialState, children } = props;
  const { state, action } = useTimePickerReducer(initialState);

  return (
    <TimePickerContext.Provider value={{ state, action }}>
      {children}
    </TimePickerContext.Provider>
  );
}

export function useTimePickerContext() {
  const value = React.useContext(TimePickerContext);
  if (value === null) throw new Error('TimePicker context value is null');
  const { state, action } = value;
  return { state, action };
}
