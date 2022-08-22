import React, { useEffect } from 'react'

import classNames from 'classnames';
import { CalendarTableData } from '../Calendar/useGenerateCalendarData';
import { useDatePanelSingleContext } from './DataPanelContextProvider';
import { useCalendarContext } from '../Calendar/CalendarContextProvider';
import { useEffectSkipFirstRender } from '../utils/useEffectSkipFirstRender';

export type CalendarDateCellProps = {
  data: CalendarTableData[number][number];
  isDisabled?: boolean;
};

export function DatePanelDateCell(props: CalendarDateCellProps) {
  const { data, isDisabled } = props;
  const dayNumber = data.date.getDate();
  const { isDayWithinMonth,date } = data;
  const {state,action} = useDatePanelSingleContext();
  const calendarContext = useCalendarContext();
  
  const isSelected = state.selectedDate.toDateString() ===  date.toDateString();

  const className = classNames('Calendar__Table__DateCell', {
    blurred: !isDayWithinMonth,
    disabled: isDisabled,
    selected: isSelected,
  });

  const handleClickToSelectDate = ()=>{
    action.selectNewDate(date);
  }

  return (
    <td className={className} onClick={handleClickToSelectDate} >
      {dayNumber}
    </td>
  );
}