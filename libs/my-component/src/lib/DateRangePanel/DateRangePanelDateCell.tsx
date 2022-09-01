import classNames from 'classnames';
import dayjs from 'dayjs';
import { memo } from 'react';
import { CalendarTableData } from '../Calendar/useGenerateCalendarData';
import { useDateRangePanelStore } from './DateRangePanelStoreProvider';
import { DateRangePanelProps } from './DateRangePanel';
import { useDateRangePanelSharedData } from './DateRangePanelSharedDataContext';

export type CalendarDateCellProps = {
  data: CalendarTableData[number][number];
  isDisabled?: boolean;
};

export const DateRangePanelDateCell=memo((props: CalendarDateCellProps)=> {
  const { data, isDisabled } = props;
  const dayNumber = data.date.getDate();
  const { isDayWithinMonth, date } = data;
  const sharedData = useDateRangePanelSharedData();
  const action = useDateRangePanelStore((state) => state.action);
  const isStartDate = useDateRangePanelStore((state) => {
    return state.startDate?.toDateString() === date.toDateString();
  });

  const isEndDate = useDateRangePanelStore((state) => {
    return state.endDate?.toDateString() === date.toDateString();
  });

  const isDateInRange = useDateRangePanelStore((state) => {
    const {startDate,endDate} = state;
    return checkIsDateInRange(date, { startDate, endDate });
  });

  const className = classNames('Calendar__Table__DateCell', {
    blurred: !isDayWithinMonth,
    disabled: isDisabled,
    [`is-end-date`]: isEndDate,
    [`is-start-date`]: isStartDate,
    [`is-date-in-range`]: isDateInRange,
  });

  const handleClickToSelectDate = () => {
    if (isDisabled) return;
    if (sharedData.mode === 'selectEnd') {
      action.selectEndDate(date);
      sharedData.onClickToSelect(sharedData.mode, date);
      return;
    }
    if (sharedData.mode === 'selectStart') {
      action.selectStartDate(date);
      sharedData.onClickToSelect(sharedData.mode, date);
      return;
    }
  };

  return (
    <td className={className} onClick={handleClickToSelectDate}>
      {dayNumber}
    </td>
  );
});

function checkIsDateInRange(
  date: Date,
  dateRange: NonNullable<DateRangePanelProps['range']>
) {
  const { startDate, endDate } = dateRange;
  if (startDate === null || endDate === null) return false;

  const currDayjs = dayjs(date);
  if (currDayjs.isAfter(startDate, 'day') && currDayjs.isBefore(endDate, 'day'))
    return true;
  return false;
}
