import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import './DatePicker.scss';
import CalendarPopup from './CalendarPopup';
import DatePickerContextProvider, {
  useDatePickerContext,
} from './DatePickerContextProvider';
import { DatePickerState } from './reducer';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { TextField } from '../TextField';
dayjs.extend(customParseFormat);

export interface DatePickerProps {
  className?: string | false;
  dateFormat?: string;
  minDate?: Date | null;
  maxDate?: Date | null;
  label?: string;
}
const defaultPropsValue: Required<DatePickerProps> = {
  className: false,
  dateFormat: 'DD/MM/YYYY',
  minDate: null,
  maxDate: null,
  label: '',
};

export function DatePicker(props: DatePickerProps) {
  const initialState: DatePickerState = {
    isPopupOpen: false,
    selectedDate: new Date(Date.now()),
  };

  return (
    <DatePickerContextProvider initialState={initialState}>
      <WrappedDatePicker {...props} />
    </DatePickerContextProvider>
  );
}

function WrappedDatePicker(props: DatePickerProps) {
  const newProps = { ...defaultPropsValue, ...props };
  const { dateFormat, className, label } = newProps;

  const rootClassName = classNames('DatePicker', {
    [`${className}`]: className,
  });
  const targetRef = useRef(null);

  const { state, action } = useDatePickerContext();
  const { selectedDate } = state;
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    const newValue = dayjs(selectedDate).format(dateFormat);
    setInputValue(newValue);
    console.log(newValue)
  }, [selectedDate.toDateString()]);

  useEffect(() => {
    if (isDateInputValid(inputValue, dateFormat)) {
      const date = dayjs(inputValue, dateFormat).toDate();
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
    <div className={rootClassName} ref={targetRef}>
      <TextField
        className="DatePicker__TextField"
        label={label}
        onClick={handleClickToTogglePopup}
        placeHolder={dateFormat}
        onChange={handleInputChanged}
        type={'tel'}
        value={inputValue}
        suffix={<IconField />}
      />
      <CalendarPopup targetRef={targetRef} isShowed={state.isPopupOpen} />
    </div>
  );
}

const isDateInputValid = (input: string, dateFormat: string) => {
  return dayjs(input, dateFormat, true).isValid();
};

export default DatePicker;
