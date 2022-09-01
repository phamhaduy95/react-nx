import { CalendarTableData } from './useGenerateCalendarData';
import classNames from 'classnames';
import { memo } from 'react';


export type CalendarDateCellProps = {
  data: CalendarTableData[number][number];
  isDisabled?: boolean;
};

export const CalendarDateCell = memo((props: CalendarDateCellProps)=>{
  const { data, isDisabled } = props;
  const dayNumber = data.date.getDate();
  const {  isDayWithinMonth } = data;

  const className = classNames('Calendar__Table__DateCell', {
    blurred: !isDayWithinMonth,
    disabled: isDisabled,
  });

  return (
    <td className={className} >
      {dayNumber}
    </td>
  );
});
