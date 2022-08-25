import classNames from 'classnames';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { TextField } from '../TextField';
import {
  DateTimePickerContextProvider,
  useDateTimePickerContext,
} from './DatePickerContextProvider';
import { DateTimePickerState } from './reducer';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { useEffectSkipFirstRender } from '../utils/useEffectSkipFirstRender';
import {
  DatePanelSingle,
  DatePanelSingleProps,
} from '../DatePanelSingle/DatePanelSingle';
import { CalendarProps } from '../Calendar';
import { DateTimePickerPopup } from './DateTimePickerPopup';
import './DateTimePicker.scss';

export interface DateTimePickerProps {
  className?: string;
  dateFormat?: string;
  isSecondIncluded?: boolean;
  label?: string;
  timeDelimiters?: string;
  onSelect?: (dateTime: Date | null) => void;
  DatePanel?: (props: DatePanelSingleProps) => JSX.Element;
  disabledDate?: CalendarProps['disabledDate'];
}

const defaultProps: Required<DateTimePickerProps> = {
  className: '',
  dateFormat: 'DD/MM/YYYY',
  isSecondIncluded: false,
  label: '',
  timeDelimiters: ':',
  disabledDate(currentDate) {
    return false;
  },
  onSelect: () => {},
  DatePanel(props) {
    return <DatePanelSingle {...props} />;
  },
};

export function DateTimePicker(props: DateTimePickerProps) {
  const initialState: DateTimePickerState = {
    isPopupOpen: false,
    selectedDateTime: null,
  };

  return (
    <DateTimePickerContextProvider initialState={initialState}>
      <WrappedDateTimePicker {...props} />
    </DateTimePickerContextProvider>
  );
}

function WrappedDateTimePicker(props: DateTimePickerProps) {
  const newProps = { ...defaultProps, ...props };
  const {
    dateFormat,
    className,
    label,
    timeDelimiters,
    isSecondIncluded,
    onSelect,
    DatePanel,
    disabledDate,
  } = newProps;
  const dateTimeFormat = getDateTimeFormat(
    dateFormat,
    isSecondIncluded,
    timeDelimiters
  );

  const rootClassName = classNames('DateTimePicker', {
    [`${className}`]: className,
  });
  const targetRef = useRef(null);
  const { state, action } = useDateTimePickerContext();
  useEffectSkipFirstRender(() => {
    const date = state.selectedDateTime;
    onSelect(date);
  }, [state.selectedDateTime?.toString()]);

  const { selectedDateTime: selectedDate } = state;
  const [inputValue, setInputValue] = useState('');

  useEffectSkipFirstRender(() => {
    const newValue = dayjs(selectedDate).format(dateTimeFormat);
    setInputValue(newValue);
  }, [selectedDate?.toString()]);

  useEffect(() => {
    if (isDateInputValid(inputValue, dateTimeFormat)) {
      const date = dayjs(inputValue, dateTimeFormat).toDate();
      action.selectDate(date);
      return;
    }
  }, [inputValue]);

  const handleInputChanged = (value: string) => {
    setInputValue(value);
  };

  const handleClickToTogglePopup = () => {
    action.togglePopup(!state.isPopupOpen);
  };

  const IconField = () => {
    return (
      <div className="DatePicker__InputIcon">
        <CalendarMonthIcon />
      </div>
    );
  };

  return (
    <div className={rootClassName}>
      <TextField
        className="DateTimePicker__TextField"
        label={label}
        onClick={handleClickToTogglePopup}
        placeHolder={dateTimeFormat}
        onChange={handleInputChanged}
        type={'tel'}
        value={inputValue}
        suffix={<IconField />}
        ref={targetRef}
        autoFocusWhenChanged={true}
      />
      <DateTimePickerPopup
        isSecondIncluded={isSecondIncluded}
        targetRef={targetRef}
        isShowed={state.isPopupOpen}
        DatePanel={DatePanel}
        disabledDate={disabledDate}
      />
    </div>
  );
}

const isDateInputValid = (input: string, dateFormat: string) => {
  return dayjs(input, dateFormat, true).isValid();
};

const getDateTimeFormat = (
  dateFormat: string,
  isSecondIncluded: boolean,
  delimiter: string
) => {
  let timeFormat = '';
  if (isSecondIncluded) timeFormat = ['HH', 'mm', 'ss'].join(delimiter);
  else timeFormat = ['HH', 'mm'].join(delimiter);
  const datetimeFormat = dateFormat.concat(' ').concat(timeFormat);
  return datetimeFormat;
};

export default DateTimePicker;
