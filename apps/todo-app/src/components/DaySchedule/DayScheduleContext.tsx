import { createContext, useMemo, useContext } from 'react';
import { DayScheduleProps } from './DaySchedule';
type SharedDataType = {
  onDateSelect: NonNullable<DayScheduleProps['onDateSelect']>;
  onTaskSelect: NonNullable<DayScheduleProps['onTaskSelect']>;
};

type ContextValueType = SharedDataType | null;

const Context = createContext<ContextValueType>(null);

type Props = {
  children: JSX.Element;
  elProps: DayScheduleProps;
};

const defaultValue: Required<SharedDataType> = {
  onDateSelect(date) {},
  onTaskSelect(task) {},
};

export function DayScheduleContextProvider(props: Props) {
  const { children,elProps } = props;
  const {onTaskSelect, onDateSelect} = {...defaultValue,...elProps};
  const sharedData: SharedDataType = useMemo(() => {
    return { onDateSelect, onTaskSelect };
  }, [onTaskSelect, onDateSelect]);
  return <Context.Provider value={sharedData}>{children}</Context.Provider>;
}

export function useDayScheduleSharedData() {
  const value = useContext(Context);
  if (value === null) throw new Error('Context is null');
  return value;
}
