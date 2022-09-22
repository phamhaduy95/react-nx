import classNames from 'classnames';
import { CalendarTableData } from '../Calendar/useGenerateCalendarData';
import { DatePanelSingleProps } from './DatePanelSingle';
import { useDatePanelStore } from './DatePanelStoreProvider';

export type CalendarDateCellProps = {
  data: CalendarTableData[number][number];
  isDisabled?: boolean;
  onClickToSelect: NonNullable<DatePanelSingleProps['onClickToSelect']>;
};

export function DatePanelDateCell(props: CalendarDateCellProps) {
  const { data, isDisabled, onClickToSelect } = props;
  const dayNumber = data.date.getDate();
  const { isDayWithinMonth, date } = data;
  const action = useDatePanelStore((state) => state.action);
  const isSelected = useDatePanelStore(
    (state) => state.selectedDateTime?.toDateString() === date.toDateString()
  );

  const className = classNames('Calendar__Table__DateCell', {
    blurred: !isDayWithinMonth,
    disabled: isDisabled,
    selected: isSelected,
  });

  const handleClickToSelectDate = () => {
    if (isDisabled) return;
    action.selectDateTime(date)
    onClickToSelect(data.date);
  };

  return (
    <td className={className} onClick={handleClickToSelectDate}>
      {dayNumber}
    </td>
  );
}
