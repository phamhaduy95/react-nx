import classNames from 'classnames';
import dayjs from 'dayjs';
import { CalendarTableData } from '../Calendar/useGenerateCalendarData';
import { useDatePanelStore } from './DatePanelStoreProvider';

export type CalendarDateCellProps = {
  data: CalendarTableData[number][number];
  isDisabled?: boolean;
};

export function DatePanelDateCell(props: CalendarDateCellProps) {
  const { data, isDisabled } = props;
  const dayNumber = data.date.getDate();
  const { isDayWithinMonth, date } = data;
  const action = useDatePanelStore((state) => state.action);
  const isSelected = useDatePanelStore((state) => {
    return state.selectedDateTime?.toDateString() === date.toDateString();
  });

  const isToday = dayjs().isSame(data.date, 'date');
  const className = classNames('Calendar__Table__DateCell', {
    blurred: !isDayWithinMonth,
    disabled: isDisabled,
    selected: isSelected,
    ['is-today']: isToday,
  });
  const handleClickToSelectDate = () => {
    if (isDisabled) return;
    action.selectDateTime(date);
  };

  return (
    <td className={className} onClick={handleClickToSelectDate}>
      {dayNumber}
    </td>
  );
}
