import { useEffect, useMemo } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useGenerateCalendarData } from './useGenerateCalendarData';
import dayjs from 'dayjs';
import './Calendar.scss';
import {
  CalendarSharedDataContextProvider,
  extractSharedDataFromProps,
} from './CalendarSharedDataContext';
import { CalendarTableRow } from './CalendarTableRow';
import { CalendarDateCell, CalendarDateCellProps } from './CalendarDateCell';
import {
  CalendarStoreProvider,
  useCalendarStore,
} from './CalendarStoreProvider';
import shallow from 'zustand/shallow';
import { GlobalStyleProvider } from '../GlobalStyleProvider';
import { useEffectSkipFirstRender } from '../utils/useEffectSkipFirstRender';

function getDateString(year: number, month: number) {
  const date = dayjs().year(year).month(month);
  return date.format('MMMM YYYY');
}

export interface CalendarProps {
  className?: string;
  disabledDate?: (currentDate: Date) => boolean;
  CellComponent?: (
    props: CalendarDateCellProps & { key: string | number }
  ) => JSX.Element;
  dateValue?: Date | null;
  selectable?: boolean;
  onDateSelect?: (date: Date | null) => void;
}

const defaultCalendarProps: Required<CalendarProps> = {
  className: '',
  disabledDate(currentDate) {
    return false;
  },
  CellComponent(props) {
    return <CalendarDateCell {...props} />;
  },
  selectable: false,
  dateValue: new Date(Date.now()),
  onDateSelect(date) {},
};

export function Calendar(props: CalendarProps) {
  const newProps = { ...defaultCalendarProps, ...props };
  const sharedData = extractSharedDataFromProps(newProps);
  return (
    <GlobalStyleProvider>
      <CalendarSharedDataContextProvider {...sharedData}>
        <CalendarStoreProvider>
          <WrappedCalendar {...props} />
        </CalendarStoreProvider>
      </CalendarSharedDataContextProvider>
    </GlobalStyleProvider>
  );
}

function WrappedCalendar(props: CalendarProps) {
  const newProps = { ...defaultCalendarProps, ...props };
  const { dateValue, selectable, onDateSelect } = newProps;
  const selectedDate = useCalendarStore((state) => state.selectedDate);
  const action = useCalendarStore((state) => state.action);
  const currentMonth = useCalendarStore((state) => state.currentMonth, shallow);
  const { year, month } = currentMonth;

  useEffect(() => {
    if (dateValue === null) return;
    const month = dateValue.getMonth();
    const year = dateValue.getFullYear();
    action.selectNewMonth({ year, month });
  }, [dateValue?.getMonth(), dateValue?.getFullYear()]);

  useEffect(() => {
    action.toggleSelectable(selectable);
  }, [selectable]);

  useEffectSkipFirstRender(() => {
    onDateSelect(selectedDate);
  }, [selectedDate]);

  const calendarData = useGenerateCalendarData(year, month);
  const CalendarRows = useMemo(() => {
    return calendarData.map((rowData, index) => {
      return <CalendarTableRow rowData={rowData} key={index} />;
    });
  }, [year, month]);

  const handleClickNextMonth = () => {
    action.gotoNextMonth();
  };

  const handleClickPrevMonth = () => {
    action.gotoPreviousMonth();
  };

  return (
    <div className="Calendar">
      <div className="Calendar__DatePicker">
        <div
          className="Calendar__DatePicker__BackwardArrow"
          onClick={handleClickPrevMonth}
        >
          <ArrowBackIosNewIcon />
        </div>
        <div className="Calendar__DatePicker__DateBrowser">
          {getDateString(year, month)}
        </div>
        <div
          className="Calendar__DatePicker__ForwardArrow"
          onClick={handleClickNextMonth}
        >
          <ArrowForwardIosIcon />
        </div>
      </div>
      <div className="Calendar__TableContainer">
        <table className="Calendar_Table">
          <CalendarTableHeader />
          <tbody className="Calendar__Table__Body">{CalendarRows}</tbody>
        </table>
      </div>
    </div>
  );
}

function CalendarTableHeader() {
  return (
    <thead className="Calendar__Table__HeaderRow">
      <tr>
        <th>Su</th>
        <th>Mo</th>
        <th>Tu</th>
        <th>We</th>
        <th>Th</th>
        <th>Fr</th>
        <th>Sa</th>
      </tr>
    </thead>
  );
}

export default Calendar;
