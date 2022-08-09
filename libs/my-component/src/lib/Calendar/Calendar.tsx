import React, { useMemo, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useGenerateCalendarData } from './useGenerateCalendarData';
import { CalendarTableRow } from './CalendarDateCell';
import dayjs from 'dayjs';
import './Calendar.scss';
import CalendarContextProvider from './CalendarContextProvider';
import { CalendarState } from './reducer';
import { useCalendarContext } from './CalendarContextProvider';

function getDateString(year: number, month: number) {
  const date = dayjs().year(year).month(month);
  return date.format('MMMM YYYY');
}

export interface CalendarProps {
  className?: string;
  selectable?: boolean;
  date?: Date;
  onSelect?: (date: Date) => void;
}

const defaultCalendarProps: Required<CalendarProps> = {
  className: '',
  selectable: false,
  date: new Date(Date.now()),
  onSelect(date) {},
};

export function Calendar(props: CalendarProps) {
  const newProps = { ...defaultCalendarProps, ...props };
  const { date } = newProps;
  const currentMonth = dayjs(date);
  const initialState: CalendarState = {
    currentMonth: {
      year: currentMonth.year(),
      month: currentMonth.month(),
    },
    selectedDate: dayjs().toDate(),
  };

  return (
    <CalendarContextProvider initialState={initialState}>
      <WrappedCalendar {...newProps} />
    </CalendarContextProvider>
  );
}

function WrappedCalendar(props: CalendarProps) {
  const { onSelect } = props;
  const { state, action } = useCalendarContext();
  const { year, month } = state.currentMonth;

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
