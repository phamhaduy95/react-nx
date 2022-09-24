import React, { useMemo } from 'react';
import { DateRangePanel, DateRangePanelProps } from '../DateRangePanel';
import { DateTimePickerProps, DateTimePicker } from '../DateTimePicker';
import { useDateTimeRangePickerContext } from './DataRangePickerContextProvider';
import { CalendarProps } from '../Calendar';
import dayjs from 'dayjs';

export interface DateTimeRangeInputProps {
  label: DateTimePickerProps['label'];
  onDateSelect: NonNullable<DateTimePickerProps['onSelect']>;
  mode: DateRangePanelProps['mode'];
}

export function DateTimeRangeInput(props: DateTimeRangeInputProps) {
  const { label, onDateSelect, mode } = props;
  const { state, action } = useDateTimeRangePickerContext();
  const DatePanel: DateTimePickerProps['DatePanel'] = useMemo(() => {
    return (props) => {
      let { dateValue, onSelect, disabledDate, className } = props;
      dateValue = dateValue === undefined ? null : dateValue;
      const { state, action } = useDateTimeRangePickerContext();
      const range: DateRangePanelProps['range'] = {
        startDate: mode === 'selectStart' ? dateValue : state.startDate,
        endDate: mode === 'selectEnd' ? dateValue : state.endDate,
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
      return dayjs(curr).isBefore(state.startDate, 'day');
    }
    if (mode === 'selectStart') {
      return dayjs(curr).isAfter(state.endDate, 'day');
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
