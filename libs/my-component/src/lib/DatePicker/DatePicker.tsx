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
dayjs.extend(customParseFormat);

export interface DatePickerProps {
  className?: string | false;
  dateFormat?: string;
  minDate?: Date | null;
  maxDate?: Date | null;
  label?: string | false;
}
const defaultPropsValue: Required<DatePickerProps> = {
  className: false,
  dateFormat: 'DD/MM/YYYY',
  minDate: null,
  maxDate: null,
  label: false,
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
  const newProps = { ...defaultPropsValue, props };
  const { dateFormat } = newProps;
  const targetRef = useRef(null);
  const { state, action } = useDatePickerContext();
  const { selectedDate } = state;
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    const newValue = dayjs(selectedDate).format(dateFormat);
    setInputValue(newValue);
  }, [selectedDate.toDateString()]);

  useEffect(() => {
    if (isDateInputValid(inputValue, dateFormat)) {
      const date = dayjs(inputValue, dateFormat).toDate();
      action.selectDate(date);
      return;
    }
  }, [inputValue]);

  const handleInputChanged = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement;
    const newValue = target.value;
    setInputValue(newValue);
  };

  const handleClickToTogglePopup = () => {
    action.togglePopup(!state.isPopupOpen);
  };

  return (
    <div className="DatePicker" ref={targetRef}>
      <label className="DatePicker__Label"></label>
      <div
        className="DatePicker__InputField"
        onClick={handleClickToTogglePopup}
      >
        <input
          className="DatePicker__Input"
          type={'tel'}
          autoComplete="hidden"
          placeholder={dateFormat}
          value={inputValue}
          onChange={handleInputChanged}
        />
        <div className="DatePicker__InputIcon">
          <CalendarMonthIcon />
        </div>
      </div>
      <CalendarPopup targetRef={targetRef} isShowed={state.isPopupOpen} />
    </div>
  );
}

const isDateInputValid = (input: string, dateFormat: string) => {
  return dayjs(input, dateFormat, true).isValid();
};

export default DatePicker;
