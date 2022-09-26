import { useEffect, useRef, useState, useCallback } from 'react';
import classNames from 'classnames';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { DatePickerPopup } from './DatePickerPopup';
import { TextField } from '../TextField';
import { useEffectSkipFirstRender } from '../utils/useEffectSkipFirstRender';
import {
  DatePanelSingle,
  DatePanelProps,
} from '../DatePanelSingle/DatePanelSingle';
import { CalendarProps } from '../Calendar';
import {
  DatePickerStoreProvider,
  useDatePickerStore,
} from './DatePickerStoreProvider';
import './DatePicker.scss';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { checkIsClickOnElement, isElementFocus } from '../utils/utils';
import { useStoreDirectly } from './DatePickerStoreProvider';
dayjs.extend(customParseFormat);

export interface DatePickerProps {
  className?: string | false;
  dateFormat?: string;
  label?: string;
  disabledDate?: CalendarProps['disabledDate'];
  onSelect?: (date: Date | null) => void;
  PanelComponent?: (props: DatePanelProps) => JSX.Element;
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
  const textFieldRef = useRef<HTMLDivElement>(null);
  const store = useStoreDirectly();

  const submittedDate = useDatePickerStore(
    (state) => state.submittedDate,
    (a, b) => {
      return a?.toDateString() === b?.toDateString();
    }
  );

  const displayDate = useDatePickerStore(
    (state) => {
      const { isPopupOpen, selectedDate, submittedDate } = state;
      if (!isPopupOpen) return submittedDate;
      return selectedDate;
    },
    (a, b) => a?.toDateString() === b?.toDateString()
  );

  const action = useDatePickerStore((state) => state.action);
  const isPopupOpen = useDatePickerStore((state)=>state.isPopupOpen);

  useEffectSkipFirstRender(()=>{
    if (isPopupOpen) return;
    if (submittedDate === null) {
      setInputValue('');
      return;
    }
    const newValue = dayjs(submittedDate).format(dateFormat);
    setInputValue(newValue); 
  },[isPopupOpen]);

  const [inputValue, setInputValue] = useState('');

  // trigger onSelect when the selectedDate is updated
  useEffectSkipFirstRender(() => {
    onSelect(submittedDate);
  }, [submittedDate?.toDateString()]);

  // change the inputValue when the selectedDate in store is updated
  useEffect(() => {
    if (displayDate === null) {
      setInputValue('');
      return;
    }
    const newValue = dayjs(displayDate).format(dateFormat);
    setInputValue(newValue);
  }, [displayDate?.toDateString()]);

  useEffect(() => {
    if (inputValue === '') {
      action.selectDate(null);
      return;
    }
    if (isDateInputValid(inputValue, dateFormat)) {
      const date = dayjs(inputValue, dateFormat).toDate();
      action.selectDate(date);
    }
  }, [inputValue]);

  const handleInputChanged = (value: string) => {
    setInputValue(value);
  };

  const handleClickToTogglePopup = () => {
    action.togglePopup(true);
  };

  const handleClickOutSide = useCallback((e: MouseEvent) => {
    const textFieldEl = textFieldRef.current as HTMLDivElement;
    const inputEl = textFieldEl.querySelector('input');

    if (!checkIsClickOnElement(e, textFieldEl) && !isElementFocus(inputEl))
      action.togglePopup(false);
  }, []);

  const IconField = () => {
    return (
      <div className="DatePicker__InputIcon">
        <CalendarMonthIcon />
      </div>
    );
  };

  const handleOnKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation();
    const { isPopupOpen, selectedDate } = store.getState();
    const key = e.key;
    switch (key) {
      case 'Enter': {
        if (!isPopupOpen) {
          action.togglePopup(true);
          return;
        }
        action.submitDate(selectedDate);
        action.togglePopup(false);
        return;
      }
      case 'Escape': {
        action.togglePopup(false);
        return;
      }
    }
  };

  return (
    <div className={rootClassName}>
      <TextField
        className="DatePicker__TextField"
        label={label}
        onClick={handleClickToTogglePopup}
        onKeyDown={handleOnKeyDown}
        placeHolder={dateFormat}
        onChange={handleInputChanged}
        type={'tel'}
        value={inputValue}
        suffix={<IconField />}
        autoFocusWhenChanged
        ref={textFieldRef}
      />
      <DatePickerPopup
        targetRef={textFieldRef}
        disabledDate={disabledDate}
        PanelComponent={PanelComponent}
        onClickOutSide={handleClickOutSide}
      />
    </div>
  );
}

const isDateInputValid = (input: string, dateFormat: string) => {
  return dayjs(input, dateFormat, true).isValid();
};

export default DatePicker;
