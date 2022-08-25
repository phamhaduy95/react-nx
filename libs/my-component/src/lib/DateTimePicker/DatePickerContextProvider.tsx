import React, { useEffect } from 'react';
import {
  DateTimePickerActionMethod,
  DateTimePickerState,
  useDateTimePickerReducer,
} from './reducer';

type ContextValueType = {
  state: DateTimePickerState;
  action: DateTimePickerActionMethod;
} | null;

const DateTimePickerContext = React.createContext<ContextValueType>(null);

type Props = {
  children: JSX.Element;
  initialState: DateTimePickerState;
};

export function DateTimePickerContextProvider(props: Props) {
  const { children, initialState } = props;
  const { state, action } = useDateTimePickerReducer(initialState);

  return (
    <DateTimePickerContext.Provider value={{ state, action }}>
      {children}
    </DateTimePickerContext.Provider>
  );
}

export function useDateTimePickerContext() {
  const value = React.useContext(
    DateTimePickerContext
  ) as NonNullable<ContextValueType>;
  if (value === null) throw new Error('DateTimePicker Context value is null');
  return value;
}
