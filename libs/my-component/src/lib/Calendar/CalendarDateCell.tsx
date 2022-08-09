import React from 'react';
import { CalendarTableData } from './useGenerateCalendarData';

type CalendarDateCellProps = {
  data: CalendarTableData[number][number];
};

export function CalendarDateCell(props: CalendarDateCellProps) {
  const { data } = props;
  const dayNumber = data.date.getDate();
  const applyStyleForNonMonthDay = () => {
    if (!data.isDayWithinMonth) return 'blurred';
    return '';
  };

  return (
    <td className={`Calendar__Table__DateCell ${applyStyleForNonMonthDay()}`}>
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
