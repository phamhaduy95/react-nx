import { DateTimeRangeInput } from './DateTimeRangeInput';
import {
  DateTimeRangePickerStoreProvider,
  useDateTimeRangePickerStore,
} from './DateTimeRangePickerStoreProvider';
import classNames from 'classnames';
import { TextFieldProps } from '../TextField';
import { useEffectSkipFirstRender } from '../utils/useEffectSkipFirstRender';
import { useEffect } from 'react';

type TextFieldHelperText<T> = { start: T; end: T };

export type DateTimeRangePickerProps = {
  className?: string;
  onStartTimeChange?: (date: Date | null) => void;
  onEndTimeChange?: (date: Date | null) => void;
  error?: TextFieldHelperText<TextFieldProps['error']>;
  success?: TextFieldHelperText<TextFieldProps['success']>;
  helperText?: TextFieldHelperText<TextFieldProps['helperText']>;
  startDate?: Date | null;
  endDate?: Date | null;
};

const defaultProps: Required<DateTimeRangePickerProps> = {
  className: '',
  onEndTimeChange(date) {},
  onStartTimeChange(date) {},
  success: { start: false, end: false },
  error: { start: false, end: false },
  helperText: { start: null, end: null },
  startDate: null,
  endDate: null,
};

export function DateTimeRangePicker(props: DateTimeRangePickerProps) {
  return (
    <DateTimeRangePickerStoreProvider>
      <WrappedComponent {...props} />
    </DateTimeRangePickerStoreProvider>
  );
}

function WrappedComponent(props: DateTimeRangePickerProps) {
  const newProps = { ...defaultProps, ...props };
  const {
    className,
    onEndTimeChange,
    onStartTimeChange,
    success,
    error,
    helperText,
    startDate,
    endDate,
  } = newProps;
  const action = useDateTimeRangePickerStore((state) => state.action);

  const handleStartDateSelect = (date: Date | null) => {
    action.selectStartDate(date);
    onStartTimeChange(date);
  };
  const handleEndDateSelect = (date: Date | null) => {
    action.selectEndDate(date);
    onEndTimeChange(date);
  };

  const rootClassName = classNames('DateTimeRangePicker', className);

  return (
    <div className={rootClassName}>
      <DateTimeRangeInput
        mode="selectStart"
        label="Start time"
        onDateSelect={handleStartDateSelect}
        success={success.start}
        error={error.start}
        helperText={helperText.start}
        value={startDate}
      />
      <DateTimeRangeInput
        mode="selectEnd"
        label="End time"
        onDateSelect={handleEndDateSelect}
        success={success.end}
        error={error.end}
        helperText={helperText.end}
        value={endDate}
      />
    </div>
  );
}
