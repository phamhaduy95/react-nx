import { useEffect, useRef, useState } from 'react';
import AvTimerIcon from '@mui/icons-material/AvTimer';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import './TimePicker.scss';
import TextField from '../TextField/TextField';
import { TextFieldProps } from '../TextField/TextField';
import classNames from 'classnames';
import { useEffectSkipFirstRender } from '../utils/useEffectSkipFirstRender';
import {
  TimePickerStoreProvider,
  useTimePickerStore,
} from './TimePickerStoreProvider';
import shallow from 'zustand/shallow';
import { convertDateToTimeObject, convertTimeToDateType } from './utils';
import { Time } from '../TimePanel/types';
import { TimePickerPopup } from './TimePickerPopup';
dayjs.extend(customParseFormat);

export type TimePickerProps = {
  className?: string;
  isSecondIncluded?: boolean;
  value?: Time | null;
  delimiter?: string;
  disabled?: boolean;
  label?: TextFieldProps['label'];
  helperText?: TextFieldProps['helperText'];
  onTimeSelect?: (time: Time | null) => void;
  onPopupToggle?: (isOpen: boolean) => void;
};

const DefaultProps: Required<TimePickerProps> = Object.freeze({
  className: '',
  value: null,
  isSecondIncluded: false,
  delimiter: ':',
  onTimeSelect(time) {},
  disabled: false,
  label: '',
  helperText: null,
  onPopupToggle(isOpen) {},
});

export function TimePicker(props: TimePickerProps) {
  return (
    <TimePickerStoreProvider>
      <WrappedTimePicker {...props} />
    </TimePickerStoreProvider>
  );
}

function WrappedTimePicker(props: TimePickerProps) {
  const newProps = { ...DefaultProps, ...props };
  const {
    className,
    value,
    delimiter,
    isSecondIncluded,
    onTimeSelect,
    label,
    helperText,
    onPopupToggle,
  } = newProps;
  const rootClassName = classNames('TimePicker', className);
  const timeFormat = getTimeFormat(isSecondIncluded, delimiter);

  const textFieldRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  // update internal state when initial value is provided
  useEffect(() => {
    action.submitTime(value);
  }, [value?.hour, value?.minute, value?.second]);

  const action = useTimePickerStore((state) => state.action);
  const displayedTime = useTimePickerStore((state) => {
    const { isPopupOpen, selectedTime, submittedTime } = state;
    if (!isPopupOpen) return submittedTime;
    return selectedTime;
  }, shallow);
  // update the time text in input field when the time value is updated.
  useEffect(() => {
    if (displayedTime === null) {
      setInputValue('');
      return;
    }
    const dateObj = convertTimeToDateType(displayedTime);
    const time = dayjs(dateObj);
    const timeStr = time.format(timeFormat);
    setInputValue(timeStr);
  }, [displayedTime, delimiter, isSecondIncluded]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (value === '') {
      action.selectTime(null);
      return;
    }
    const time = dayjs(value, timeFormat, true);
    if (!time.isValid()) return;
    const dateObj = time.toDate();
    const timeObj = convertDateToTimeObject(dateObj);
    action.selectTime(timeObj);
  };

  const submittedDate = useTimePickerStore(
    (state) => state.submittedTime,
    shallow
  );
  // trigger onTimeSelect when new time is submitted
  useEffectSkipFirstRender(() => {
    onTimeSelect(submittedDate);
  }, [submittedDate]);

  const handleClickToOpenPopup = () => {
    action.togglePopup(true);
  };

  const IconField = () => {
    return (
      <div className="TimePicker__InputIcon">
        <AvTimerIcon />
      </div>
    );
  };

  return (
    <div className={rootClassName}>
      <TextField
        className="TimePicker__InputField"
        value={inputValue}
        placeHolder={timeFormat}
        label={label}
        onValueChange={handleInputChange}
        ref={textFieldRef}
        onClick={handleClickToOpenPopup}
        suffix={<IconField />}
        helperText={helperText}
        autoFocusWhenChanged
      />
      <TimePickerPopup
        targetRef={textFieldRef}
        isSecondInCluded={isSecondIncluded}
        onPopupToggle={onPopupToggle}
      />
    </div>
  );
}

function getTimeFormat(isSecondIncluded: boolean, delimiter: string) {
  if (isSecondIncluded) return ['HH', 'mm', 'ss'].join(delimiter);
  return ['HH', 'mm'].join(delimiter);
}

export default TimePicker;
