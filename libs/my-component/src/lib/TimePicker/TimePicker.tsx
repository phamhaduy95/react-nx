import React, { useRef, useState, useEffect } from 'react';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import TimePickerPopup from './TimePickerPopup';
import {
  TimePickerContextProvider,
  useTimePickerContext,
} from './TimePickerContext';
import { TimePickerState } from './reducer';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
import './TimePicker.scss';
import TextField from '../TextField/TextField';
import { TextFieldProps } from '../TextField/TextField';
import classNames from 'classnames';
import { TimePanelProps } from '../TimePanel';
import { useEffectSkipFirstRender } from '../utils/useEffectSkipFirstRender';

export type TimePickerProps = {
  className?: string;
  isSecondIncluded?: boolean;
  delimiter?: string;
  disabled?: boolean;
  label?: TextFieldProps['label'];
  helperText?: TextFieldProps['helperText'];
  onTimeSelect?: (time: Date) => void;
  disabledHour?: TimePanelProps['disabledHour'];
  disabledMinute?: TimePanelProps['disabledMinute'];
  disabledSecond?: TimePanelProps['disabledSecond'];
};

const DefaultProps: Required<TimePickerProps> = {
  className: '',
  isSecondIncluded: false,
  delimiter: ':',
  onTimeSelect(time) {},
  disabled: false,
  label: '',
  helperText: null,
  disabledHour: [],
  disabledMinute: [],
  disabledSecond: [],
};

export function TimePicker(props: TimePickerProps) {
  const initialState: TimePickerState = {
    isPopupOpen: false,
    selectTime: dayjs().hour(0).minute(0).second(0).toDate(),
  };

  return (
    <TimePickerContextProvider initialState={initialState}>
      <WrappedTimePicker {...props} />
    </TimePickerContextProvider>
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
    disabledHour,
    disabledMinute,
    disabledSecond,
  } = newProps;
  const rootClassName = classNames('TimePicker', className);

  const timeFormat = getTimeFormat(isSecondIncluded, delimiter);

  const ref = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const { state, action } = useTimePickerContext();
  useEffectSkipFirstRender(() => {
    const time = dayjs(state.selectTime);
    const timeStr = time.format(timeFormat);
    setInputValue(timeStr);
  }, [state.selectTime, delimiter, isSecondIncluded]);

  useEffectSkipFirstRender(() => {
    onTimeSelect(state.selectTime);
  }, [state.selectTime]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    const time = dayjs(value, timeFormat, true);
    if (!time.isValid()) return;
    const dateObj = time.toDate();
    action.selectTime(dateObj);
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
      />
      <TimePickerPopup
        targetRef={ref}
        isSecondInCluded={isSecondIncluded}
        disabledHour={disabledHour}
        disabledMinute={disabledMinute}
        disabledSecond={disabledSecond}
      />
    </div>
  );
}

function getTimeFormat(isSecondIncluded: boolean, delimiter: string) {
  if (isSecondIncluded) return ['HH', 'mm', 'ss'].join(delimiter);
  return ['HH', 'mm'].join(delimiter);
}

export default TimePicker;
