import classNames from 'classnames';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { TextField } from '../TextField';
import {
  DateTimePickerContextProvider,
  useDateTimePickerContext,
} from './DatePickerContextProvider';
import DateTimePickerPopup from './DateTimePickerPopup';
import { DateTimePickerState } from './reducer';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import "./DateTimePicker.scss"
import { useEventCallback } from '../utils/useEventCallback';

export interface DateTimePickerProps {
  className?: string;
  dateFormat?: string;
  isSecondIncluded?: boolean;
  minDate?: Date | null;
  maxDate?: Date | null;
  label?: string;
  timeDelimiters?: string;
  onSelect?:(dateTime:Date)=>void;
}

const defaultProps: Required<DateTimePickerProps> = {
  className: '',
  dateFormat: 'DD/MM/YYYY',
  isSecondIncluded: false,
  minDate: null,
  maxDate: null,
  label: '',
  timeDelimiters: ':',
  onSelect:()=>{}  
};

export function DateTimePicker(props: DateTimePickerProps) {
  const initialState: DateTimePickerState = {
    isPopupOpen: false,
    selectedDateTime: new Date(Date.now()),
  };

  return (
    <DateTimePickerContextProvider initialState={initialState}>
      <WrappedDateTimePicker {...props} />
    </DateTimePickerContextProvider>
  );
}

function WrappedDateTimePicker(props: DateTimePickerProps) {
  const newProps = { ...defaultProps, ...props };
  const { dateFormat, className, label, timeDelimiters, isSecondIncluded,onSelect } =
    newProps;
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
  useEventCallback(()=>{
    const date = state.selectedDateTime; 
    onSelect(date); 
  },[state.selectedDateTime.toString()])


  const { selectedDateTime: selectedDate } = state;
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    const newValue = dayjs(selectedDate).format(dateTimeFormat);
    setInputValue(newValue);
  }, [selectedDate.toString()]);

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
    <div className={rootClassName} >
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
      />
      <DateTimePickerPopup
        isSecondIncluded={isSecondIncluded}
        targetRef={targetRef}
        isShowed={state.isPopupOpen}
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
