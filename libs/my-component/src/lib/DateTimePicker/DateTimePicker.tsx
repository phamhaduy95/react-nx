import classNames from 'classnames';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { TextField } from '../TextField';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useEffectSkipFirstRender } from '../utils/useEffectSkipFirstRender';
import {
  DatePanelSingle,
  DatePanelSingleProps,
} from '../DatePanelSingle/DatePanelSingle';
import { CalendarProps } from '../Calendar';
import { DateTimePickerPopup } from './DateTimePickerPopup';
import {
  DateTimePickerStoreProvider,
  useDateTimePickerStore,
} from './DateTimePickerStoreProvider';
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
  return (
    <DateTimePickerStoreProvider>
      <WrappedDateTimePicker {...props} />
    </DateTimePickerStoreProvider>
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
  const triggerRef = useRef(null);
  const action = useDateTimePickerStore((state) => state.action);
  const displayedDate = useDateTimePickerStore(
    (state) => {
      const { selectedDate, submittedDate, isPopupOpen } = state;
      if (!isPopupOpen) return submittedDate;
      return selectedDate;
    },
    (a, b) => a?.toString() === b?.toString()
  );

  const submittedDate = useDateTimePickerStore(
    (state) => state.submittedDate,
    (a, b) => a?.toString() === b?.toString()
  );
  // trigger onSelect declared outside when the new date value is submitted
  useEffectSkipFirstRender(() => {
    onSelect(submittedDate);
  }, [submittedDate?.toString()]);

  const [inputValue, setInputValue] = useState('');
  // set new input value for textField when the new dateTime is selected via Panel.
  useEffect(() => {
    if (displayedDate === null) {
      setInputValue('');
      return;
    }
    const newValue = dayjs(displayedDate).format(dateTimeFormat);
    setInputValue(newValue);
  }, [displayedDate?.toString()]);

  // update dateTime when text input inside textField is valid as Date.
  useEffect(() => {
    if (inputValue === '') {
      action.selectDate(null);
      return;
    }
   
    if (isDateInputValid(inputValue, dateTimeFormat)) {
      const date = dayjs(inputValue, dateTimeFormat).toDate();
      action.selectDateTime(date);
      return;
    }
  }, [inputValue]);


  const handleInputChanged = (value: string) => {
    setInputValue(value);
  };

  const handleClickToTogglePopup = () => {
    action.togglePopup(true);

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
        ref={triggerRef}
        autoFocusWhenChanged={true}
      />
      <DateTimePickerPopup
        isSecondIncluded={isSecondIncluded}
        triggerRef={triggerRef}
        DatePanel={DatePanel}
        disabledDate={disabledDate}
      />
    </div>
  );
}

const isDateInputValid = (input: string, dateFormat: string) => {
  return dayjs(input, dateFormat,true).isValid();
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
