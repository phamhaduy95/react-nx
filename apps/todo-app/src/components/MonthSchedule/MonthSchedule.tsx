import dayjs from 'dayjs';
import { useEffect } from 'react';
import MonthScheduleHeader from './MonthScheduleHeader';
import {
  MonthScheduleStoreProvider,
  MonthScheduleState,
  useMonthScheduleStore,
} from './MonthScheduleStoreProvider';
import { MonthScheduleTableCell } from './MonthScheduleTableCell';
import {
  useGenerateCalendarData,
  CalendarTableData,
} from './useGenerateCalendarData';
import './MonthSchedule.scss';
import { TaskDataType } from '../../type/model';
import { MonthScheduleContextProvider } from './MonthScheduleContextProvider';
import classNames from 'classnames';

export type MonthScheduleProps = {
  className?: string;
  isLoading?: boolean;
  tasksList: MonthScheduleState['tasks'];
  date: MonthScheduleState['month'];
  onTaskSelect?: (taskData: TaskDataType) => void;
  onDateSelect?: (date: Date) => void;
};

export function MonthSchedule(props: MonthScheduleProps) {
  return (
    <MonthScheduleContextProvider elProps={props}>
      <MonthScheduleStoreProvider>
        <WrappedMonthSchedule {...props} />
      </MonthScheduleStoreProvider>
    </MonthScheduleContextProvider>
  );
}

const defaultProps: Required<Omit<MonthScheduleProps, 'className' | 'date'>> = {
  isLoading: false,
  tasksList: [],
  onDateSelect(date) {},
  onTaskSelect(taskData) {},
};

function WrappedMonthSchedule(props: MonthScheduleProps) {
  const newProps = {...defaultProps,...props};
  const { tasksList, isLoading, date,className} = newProps;
  const action = useMonthScheduleStore((state) => state.action);

  useEffect(() => {
    // const tasks = isLoading ? [] : tasksList;
    action.updateMonthData(date, tasksList);
  }, [tasksList, isLoading,date]);

  const month = useMonthScheduleStore(
    (state) => state.month,
    (a, b) => {
      return dayjs(a).isSame(b, 'month');
    }
  );
  const calendarTable = useGenerateCalendarData(month);
  const rootClassName = classNames('MonthSchedule', className);

  return (
    <table className={rootClassName}>
      <MonthScheduleHeader />
      <tbody>{renderCalendarTable(calendarTable)}</tbody>
    </table>
  );
}

const renderCalendarTable = (calendarTable: CalendarTableData) => {
  return calendarTable.map((row, i) => {
    const rows = row.map((cell, j) => {
      const { date, isDayWithinMonth } = cell;
      return (
        <MonthScheduleTableCell
          date={date}
          isDayWithinMonth={isDayWithinMonth}
          key={`${i}-${j}`}
        />
      );
    });
    return <tr key={`${i}`}>{rows}</tr>;
  });
};
