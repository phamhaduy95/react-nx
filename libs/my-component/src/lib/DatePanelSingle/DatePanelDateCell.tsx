import React, { useEffect } from 'react'
import classNames from 'classnames';
import { CalendarTableData } from '../Calendar/useGenerateCalendarData';
import { useDatePanelSingleContext } from './DataPanelContextProvider';
import { DatePanelSingleProps } from './DatePanelSingle';


export type CalendarDateCellProps = {
  data: CalendarTableData[number][number];
  isDisabled?: boolean;
  onClickToSelect:NonNullable<DatePanelSingleProps["onClickToSelect"]>
};

export function DatePanelDateCell(props: CalendarDateCellProps) {
  const { data, isDisabled,onClickToSelect } = props;
  const dayNumber = data.date.getDate();
  const { isDayWithinMonth,date } = data;
  const {state,action} = useDatePanelSingleContext();
  const isSelected = state.selectedDate?.toDateString() ===  date.toDateString();

  
  const className = classNames('Calendar__Table__DateCell', {
    blurred: !isDayWithinMonth,
    disabled: isDisabled,
    selected: isSelected,
  });

  const handleClickToSelectDate = ()=>{
    if (isDisabled) return;
    action.selectNewDate(date);
    onClickToSelect(data.date);
  }

  return (
    <td className={className} onClick={handleClickToSelectDate} >
      {dayNumber}
    </td>
  );
}