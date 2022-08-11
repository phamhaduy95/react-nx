import React from 'react';
import { CalendarTableData } from './useGenerateCalendarData';
import { useCalendarContext } from './CalendarContextProvider';
import classNames from 'classnames';

type CalendarDateCellProps = {
  data: CalendarTableData[number][number];
};

export function CalendarDateCell(props: CalendarDateCellProps) {
  const { data } = props;
  const dayNumber = data.date.getDate();
  const { date, isDayWithinMonth } = data;

  const { state, action } = useCalendarContext();
  const applyStyleForNonMonthDay = () => {
    if (!isDayWithinMonth) return 'blurred';
    return '';
  };

  const isSelected = state.selectedDate.toDateString() === date.toDateString();

  const className = classNames('Calendar__Table__DateCell', {
    blurred: !isDayWithinMonth,
    selected: isSelected,
  });

  const handleSelectDate = (e: React.MouseEvent) => {
    if (!state.selectable) return;
    console.log(state.selectable)
    if (!isDayWithinMonth) {
      const result = compareMonthFor2DateObject(date, state.selectedDate);
      if (result === 1) action.goToNextMonth();
      else if (result === -1) action.goToPreviousMonth();
    }
    action.selectNewDate(date.toDateString());
  };

  return (
    <td className={className} onClick={handleSelectDate}>
      {dayNumber}
    </td>
  );
}

type CalendarTableRowProps = {
  rowData: CalendarTableData[number];
};

export function CalendarTableRow(props: CalendarTableRowProps) {
  const { rowData } = props;
  const renderRowData = () => {
    return rowData.map((data, index) => {
      const id = data.date.toISOString();
      return <CalendarDateCell data={data} key={id} />;
    });
  };

  return <tr className="Calendar__Table__Row">{renderRowData()}</tr>;
}

function compareMonthFor2DateObject(date1: Date, date2: Date) {
  const month1 = date1.getMonth();
  const month2 = date2.getMonth();
  if (month1 === month2) return 0;
  if (month1 > month2) return 1;
  return -1;
}
