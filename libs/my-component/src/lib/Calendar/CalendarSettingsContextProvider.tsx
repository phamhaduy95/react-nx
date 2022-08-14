import { Settings } from '@mui/icons-material';
import React from 'react';
import { CalendarProps } from './Calendar';

type Settings = Omit<CalendarProps, 'date' | 'selectable' | 'className'>;
type ContextValue = Settings | null;

const CalendarSettingContext = React.createContext<ContextValue>(null);

type Props = {
  children: JSX.Element;
} & Settings;

export function CalendarSettingsContextProvider(props: Props) {
  const { onSelect, children } = props;
  return (
    <CalendarSettingContext.Provider value={{ onSelect }}>
      {children}
    </CalendarSettingContext.Provider>
  );
}

export function useCalendarSettings() {
  const value = React.useContext(
    CalendarSettingContext
  ) as NonNullable<ContextValue>;
  return value;
}
