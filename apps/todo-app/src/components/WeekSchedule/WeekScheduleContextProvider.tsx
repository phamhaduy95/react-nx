import { createContext, useMemo, useContext } from 'react';
import {  WeekScheduleProps } from "./WeekSchedule"

type SharedDataType = {
  onDateSelect: NonNullable<WeekScheduleProps['onDateSelect']>;
  onTaskSelect: NonNullable<WeekScheduleProps['onTaskSelect']>;
};

type ContextValueType = SharedDataType | null;

const Context = createContext<ContextValueType>(null);

type Props = {
  children: JSX.Element;
  elProps: WeekScheduleProps;
};

const defaultValue: Required<SharedDataType> = {
  onDateSelect(date) {},
  onTaskSelect(task) {},
};

export function WeekScheduleContextProvider(props: Props) {
  const { children,elProps } = props;
  const {onTaskSelect, onDateSelect} = {...defaultValue,...elProps};
  const sharedData: SharedDataType = useMemo(() => {
    return { onDateSelect, onTaskSelect };
  }, [onTaskSelect, onDateSelect]);
  return <Context.Provider value={sharedData}>{children}</Context.Provider>;
}

export function useWeekScheduleSharedData() {
  const value = useContext(Context);
  if (value === null) throw new Error('Context is null');
  return value;
}
