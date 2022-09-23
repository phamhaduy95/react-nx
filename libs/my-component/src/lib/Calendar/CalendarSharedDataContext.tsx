import { Settings as SharedData } from '@mui/icons-material';
import React, { useMemo } from 'react';
import { CalendarProps } from './Calendar';

type SharedData = {
  disabledDate: NonNullable<CalendarProps['disabledDate']>;
  selectable: NonNullable<CalendarProps['selectable']>;
  CellComponent: NonNullable<CalendarProps['CellComponent']>;
};
type ContextValue = SharedData | null;

const context = React.createContext<ContextValue>(null);

type Props = {
  children: JSX.Element;
} & SharedData;

export function CalendarSharedDataContextProvider(props: Props) {
  const { children, disabledDate, selectable, CellComponent } = props;
  const sharedData = useMemo(
    () => ({
      disabledDate,
      selectable,
      CellComponent,
    }),
    [disabledDate, selectable]
  );
  return <context.Provider value={sharedData}>{children}</context.Provider>;
}

export function extractSharedDataFromProps(
  props: Required<CalendarProps>
): SharedData {
  const { disabledDate, selectable, CellComponent } = props;
  return { disabledDate, selectable, CellComponent };
}

export function useCalendarSharedData() {
  const value = React.useContext(context) as NonNullable<ContextValue>;
  return value;
}
