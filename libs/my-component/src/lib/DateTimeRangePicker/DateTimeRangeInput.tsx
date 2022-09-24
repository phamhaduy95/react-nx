import { useMemo } from 'react';
import { DateRangePanel, DateRangePanelProps } from '../DateRangePanel';
import { DateTimePickerProps, DateTimePicker } from '../DateTimePicker';
import { CalendarProps } from '../Calendar';
import dayjs from 'dayjs';
import { useDateTimeRangePickerStore } from './DateTimeRangePickerStoreProvider';

export interface DateTimeRangeInputProps {
  label: DateTimePickerProps['label'];
  onDateSelect: NonNullable<DateTimePickerProps['onSelect']>;
  mode: DateRangePanelProps['mode'];
}

export function DateTimeRangeInput(props: DateTimeRangeInputProps) {
  const { label, onDateSelect, mode } = props;
  const startDate = useDateTimeRangePickerStore(
    (state) => state.startDate,
    (a, b) => a?.toString() === b?.toString()
  );
  const endDate = useDateTimeRangePickerStore(
    (state) => state.endDate,
    (a, b) => a?.toString() === b?.toString()
  );
  const DatePanel: DateTimePickerProps['DatePanel'] = useMemo(() => {
    return (props) => {
      let { dateValue, onSelect, disabledDate, className } = props;
      dateValue = dateValue === undefined ? null : dateValue;

      const startDate = useDateTimeRangePickerStore(
        (state) => state.startDate,
        (a, b) => a?.toString() === b?.toString()
      );
      const endDate = useDateTimeRangePickerStore(
        (state) => state.endDate,
        (a, b) => a?.toString() === b?.toString()
      );

      const range: DateRangePanelProps['range'] = {
        startDate: mode === 'selectStart' ? dateValue : startDate,
        endDate: mode === 'selectEnd' ? dateValue : endDate,
      };

      const handleDateSelect: DateRangePanelProps['onSelect'] = (
        type,
        value
      ) => {
        if (onSelect === undefined) return;
        if (type === mode) onSelect(value);
      };

      return (
        <DateRangePanel
          mode={mode}
          range={range}
          onSelect={handleDateSelect}
          showedMonth={dateValue}
          disabledDate={disabledDate}
          className={className}
        />
      );
    };
  }, [mode]);

  const disabledDate: CalendarProps['disabledDate'] = (curr) => {
    if (mode === 'selectEnd') {
      return dayjs(curr).isBefore(startDate, 'day');
    }
    if (mode === 'selectStart') {
      return dayjs(curr).isAfter(endDate, 'day');
    }

    return false;
  };

  return (
    <DateTimePicker
      className="DateTimeRangePicker__Input"
      label={label}
      onSelect={onDateSelect}
      DatePanel={DatePanel}
      disabledDate={disabledDate}
    />
  );
}
