import { useEffect, useMemo } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useGenerateCalendarData } from './useGenerateCalendarData';
import dayjs from 'dayjs';
import './Calendar.scss';
import CalendarContextProvider from './CalendarContextProvider';
import { prepareInitialState } from './reducer';
import { useCalendarContext } from './CalendarContextProvider';
import {
  CalendarSharedDataContextProvider,
  extractSharedDataFromProps,
} from './CalendarSharedDataContext';
import { CalendarTableRow } from './CalendarTableRow';
import { CalendarDateCell, CalendarDateCellProps } from './CalendarDateCell';

function getDateString(year: number, month: number) {
  const date = dayjs().year(year).month(month);
  return date.format('MMMM YYYY');
}

export interface CalendarProps {
  className?: string;
  selectable?: boolean;
  disabledDate?: (currentDate: Date) => boolean;
  CellComponent?:(props:CalendarDateCellProps)=>JSX.Element;
  dateValue?:Date|null;
}

const defaultCalendarProps: Required<CalendarProps> = {
  className: '',
  selectable: false,
  disabledDate(currentDate) {
    return false;
  },
  CellComponent(props) {
      return <CalendarDateCell {...props}/>
  },
  dateValue:new Date(Date.now())
};

export function Calendar(props: CalendarProps) {
  const newProps = { ...defaultCalendarProps, ...props };
  const sharedData = extractSharedDataFromProps(newProps);
  const initialState = prepareInitialState();

  return (
    <CalendarSharedDataContextProvider {...sharedData}>
      <CalendarContextProvider initialState={initialState}>
        <WrappedCalendar {...props} />
      </CalendarContextProvider>
    </CalendarSharedDataContextProvider>
  );
}

function WrappedCalendar(props: CalendarProps) {
  const newProps = {...defaultCalendarProps,...props};
  const {dateValue} = newProps;
  const { state, action } = useCalendarContext();
  const { year, month } = state.currentMonth;
  useEffect(()=>{
    if (dateValue === null) return;
      const month = dateValue.getMonth();
      const year = dateValue.getFullYear();
      action.selectNewMonth(year,month);
  },[dateValue?.getMonth(),dateValue?.getFullYear()])



  const calendarData = useGenerateCalendarData(year, month);
  const CalendarRows = useMemo(() => {
    return calendarData.map((rowData, index) => {
      return <CalendarTableRow rowData={rowData} key={index} />;
    });
  }, [year, month]);

  const handleClickNextMonth = () => {
    action.goToNextMonth();
  };

  const handleClickPrevMonth = () => {
    action.goToPreviousMonth();
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
      <table className="Calendar_Table">
        <CalendarTableHeader />
        <tbody className="Calendar__Table__Body">{CalendarRows}</tbody>
      </table>
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
