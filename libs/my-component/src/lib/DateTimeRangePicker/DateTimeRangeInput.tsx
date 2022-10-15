import { useMemo } from 'react';
import { DateRangePanel, DateRangePanelProps } from '../DateRangePanel';
import { DateTimePickerProps, DateTimePicker } from '../DateTimePicker';
import { CalendarProps } from '../Calendar';
import dayjs from 'dayjs';
import { useDateTimeRangePickerStore } from './DateTimeRangePickerStoreProvider';
import { TextFieldProps } from '../TextField';
import { DateTimeRangePickerProps } from './DateTimeRangePicker';

export interface DateTimeRangeInputProps {
  label: DateTimePickerProps['label'];
  onDateSelect: NonNullable<DateTimePickerProps['onSelect']>;
  mode: NonNullable<DateRangePanelProps['mode']>,
  error: TextFieldProps['error'];
  success: TextFieldProps['success'];
  helperText: TextFieldProps['helperText'];
  value: Date | null;
  onPopupToggle: NonNullable<DateTimeRangePickerProps['onPopupToggle']>;
}

export function DateTimeRangeInput(props: DateTimeRangeInputProps) {
  const {
    label,
    onDateSelect,
    mode,
    error,
    success,
    helperText,
    value,
    onPopupToggle,
  } = props;
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

  const handlePopupToggle = (isOpen:boolean)=>{
    onPopupToggle(isOpen,mode);
  }

  return (
    <DateTimePicker
      className="DateTimeRangePicker__Input"
      value={value}
      label={label}
      onSelect={onDateSelect}
      DatePanel={DatePanel}
      disabledDate={disabledDate}
      success={success}
      error={error}
      helperText={helperText}
      onPopupToggle={handlePopupToggle}
    />
  );
}
