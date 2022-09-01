import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DatePickerPopup from './DatePickerPopup';
import { TextField } from '../TextField';
import { useEffectSkipFirstRender } from '../utils/useEffectSkipFirstRender';
import { DatePanelSingle } from '../DatePanelSingle/DatePanelSingle';
import { CalendarProps } from '../Calendar';
import {
  DatePickerStoreProvider,
  useDatePickerStore,
} from './DatePickerStoreProvider';
import './DatePicker.scss';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export interface DatePickerProps {
  className?: string | false;
  dateFormat?: string;
  label?: string;
  disabledDate?: CalendarProps['disabledDate'];
  onSelect?: (date: Date | null) => void;
  PanelComponent?: (props: {
    dateValue: Date | null;
    onSelect: (date: Date | null) => void;
    disabledDate?: CalendarProps['disabledDate'];
  }) => JSX.Element;
}
const defaultPropsValue: Required<DatePickerProps> = {
  className: false,
  dateFormat: 'DD/MM/YYYY',
  label: '',
  disabledDate(currentDate) {
    return false;
  },
  onSelect(date) {},
  PanelComponent(props) {
    return <DatePanelSingle {...props} />;
  },
};

export function DatePicker(props: DatePickerProps) {
  return (
    <DatePickerStoreProvider>
      <WrappedDatePicker {...props} />
    </DatePickerStoreProvider>
  );
}

function WrappedDatePicker(props: DatePickerProps) {
  const newProps = { ...defaultPropsValue, ...props };
  const {
    dateFormat,
    className,
    label,
    onSelect,
    PanelComponent,
    disabledDate,
  } = newProps;

  const rootClassName = classNames('DatePicker', {
    [`${className}`]: className,
  });
  const targetRef = useRef(null);

  const selectedDate = useDatePickerStore((state) => state.selectedDate,(a,b)=>{
    return a?.toDateString() === b?.toDateString()
  });

  const action = useDatePickerStore((state) => state.action);

  const [inputValue, setInputValue] = useState('');

  // trigger onSelect when the selectedDate is updated
  useEffectSkipFirstRender(() => {
    onSelect(selectedDate);
  }, [selectedDate?.toDateString()]);

 // change the inputValue when the selectedDate in store is updated
  useEffect(() => {
    if (selectedDate === null) {
      setInputValue('');
      return;
    }
    const newValue = dayjs(selectedDate).format(dateFormat);
    setInputValue(newValue);
  }, [selectedDate?.toDateString()]);

  useEffect(() => {
    if (inputValue === '') {
      action.selectDate(null);
      return;
    }
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
        className="DatePicker__TextField"
        label={label}
        onClick={handleClickToTogglePopup}
        placeHolder={dateFormat}
        onChange={handleInputChanged}
        type={'tel'}
        value={inputValue}
        suffix={<IconField />}
        autoFocusWhenChanged
        ref={targetRef}
      />
      <DatePickerPopup
        targetRef={targetRef}
        disabledDate={disabledDate}
        PanelComponent={PanelComponent}
      />
    </div>
  );
}

const isDateInputValid = (input: string, dateFormat: string) => {
  return dayjs(input, dateFormat, true).isValid();
};

export default DatePicker;
