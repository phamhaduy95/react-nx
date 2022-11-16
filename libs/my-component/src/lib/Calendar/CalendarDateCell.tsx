import { CalendarTableData } from './useGenerateCalendarData';
import classNames from 'classnames';
import { memo } from 'react';
import dayjs from 'dayjs';
import { useCalendarSharedData } from './CalendarSharedDataContext';
import { useCalendarStore } from './CalendarStoreProvider';

export type CalendarDateCellProps = {
  data: CalendarTableData[number][number];
  isDisabled?: boolean;
};

export const CalendarDateCell = memo((props: CalendarDateCellProps) => {
  const { data, isDisabled } = props;
  const action = useCalendarStore((state) => state.action);
  const isSelected = useCalendarStore((state) =>
    dayjs(data.date).isSame(state.selectedDate, 'day')
  );
  const isSelectable = useCalendarStore((state) => state.selectable);
  const dayNumber = data.date.getDate();
  const { isDayWithinMonth } = data;
  const isToday = dayjs().isSame(data.date, 'date');

  const className = classNames('Calendar__Table__DateCell', {
    blurred: !isDayWithinMonth,
    disabled: isDisabled,
    selected: isSelected,
    ['is-today']: isToday,
  });

  const handleDateSelect = () => {
    if (isSelectable) {
      action.selectDate(data.date);
    }
  };

  return (
    <td className={className} onClick={handleDateSelect}>
      {dayNumber}
    </td>
  );
});
