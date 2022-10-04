import { createContext, useMemo, useContext } from 'react';
import { MonthScheduleProps } from './MonthSchedule';

type SharedDataType = {
  onDateSelect: NonNullable<MonthScheduleProps['onDateSelect']>;
  onTaskSelect: NonNullable<MonthScheduleProps['onTaskSelect']>;
};

type ContextValueType = SharedDataType | null;

const Context = createContext<ContextValueType>(null);

type Props = {
  children: JSX.Element;
  elProps: MonthScheduleProps;
};

const defaultValue: Required<SharedDataType> = {
  onDateSelect(date) {},
  onTaskSelect(task) {},
};

export function MonthScheduleContextProvider(props: Props) {
  const { children,elProps } = props;
  const {onTaskSelect, onDateSelect} = {...defaultValue,...elProps};
  const sharedData: SharedDataType = useMemo(() => {
    return { onDateSelect, onTaskSelect };
  }, [onTaskSelect, onDateSelect]);
  return <Context.Provider value={sharedData}>{children}</Context.Provider>;
}

export function useMonthScheduleSharedData() {
  const value = useContext(Context);
  if (value === null) throw new Error('Context is null');
  return value;
}
