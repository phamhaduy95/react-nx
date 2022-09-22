import { useEffect, useRef, useState } from 'react';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import TimePickerPopup from './TimePickerPopup';
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
dayjs.extend(customParseFormat);

export type TimePickerProps = {
  className?: string;
  isSecondIncluded?: boolean;
  delimiter?: string;
  disabled?: boolean;
  label?: TextFieldProps['label'];
  helperText?: TextFieldProps['helperText'];
  onTimeSelect?: (time: Time | null) => void;
};

const DefaultProps: Required<TimePickerProps> = {
  className: '',
  isSecondIncluded: false,
  delimiter: ':',
  onTimeSelect(time) {},
  disabled: false,
  label: '',
  helperText: null,
};

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
    delimiter,
    isSecondIncluded,
    onTimeSelect,
    label,
    helperText,
  } = newProps;
  const rootClassName = classNames('TimePicker', className);

  const timeFormat = getTimeFormat(isSecondIncluded, delimiter);

  const ref = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const action = useTimePickerStore((state) => state.action);
  const displayTime = useTimePickerStore((state) => {
    const { isPopupOpen, selectedTime, submittedTime } = state;
    if (!isPopupOpen) return submittedTime;
    return selectedTime;
  }, shallow);

  useEffect(() => {
    if (displayTime === null) {
      setInputValue('');
      return;
    }
    const dateObj = convertTimeToDateType(displayTime);
    const time = dayjs(dateObj);
    const timeStr = time.format(timeFormat);
    setInputValue(timeStr);
  }, [displayTime, delimiter, isSecondIncluded]);

  useEffectSkipFirstRender(() => {
    onTimeSelect(displayTime);
  }, [displayTime]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (value === '') {
      action.selectTime(null);
    }
    const time = dayjs(value, timeFormat, true);
    if (!time.isValid()) return;
    const dateObj = time.toDate();
    const timeObj = convertDateToTimeObject(dateObj);
    action.selectTime(timeObj);
  };

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
        onChange={handleInputChange}
        ref={ref}
        onClick={handleClickToOpenPopup}
        suffix={<IconField />}
        helperText={helperText}
        autoFocusWhenChanged
      />
      <TimePickerPopup
        targetRef={ref}
        isSecondInCluded={isSecondIncluded}
        selectedTime={displayTime}
      />
    </div>
  );
}

function getTimeFormat(isSecondIncluded: boolean, delimiter: string) {
  if (isSecondIncluded) return ['HH', 'mm', 'ss'].join(delimiter);
  return ['HH', 'mm'].join(delimiter);
}

export default TimePicker;
