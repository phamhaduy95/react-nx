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

export type TimePickerProps = {
  className?: string;
  isSecondIncluded?: boolean;
  delimiter?: string;
};

const DefaultProps: Required<TimePickerProps> = {
  className: '',
  isSecondIncluded: true,
  delimiter: ':',
};

export function TimePicker(props: TimePickerProps) {
  const initialState: TimePickerState = {
    isPopupOpen: false,
    selectTime: {
      hour: 0,
      minute: 0,
      second: 0,
    },
  };

  return (
    <TimePickerContextProvider initialState={initialState}>
      <WrappedTimePicker {...props} />
    </TimePickerContextProvider>
  );
}

function WrappedTimePicker(props: TimePickerProps) {
  const newProps = { ...DefaultProps, ...props };
  const { className, delimiter, isSecondIncluded } = newProps;
  const timeFormat = getTimeFormat(isSecondIncluded, delimiter);

  const ref = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const { state, action } = useTimePickerContext();
  useEffect(() => {
    const { hour, minute, second } = state.selectTime;
    const time = dayjs().hour(hour).minute(minute).second(second);
    const timeStr = time.format(timeFormat);
    setInputValue(timeStr);
  }, [state.selectTime, delimiter, isSecondIncluded]);

  const handleInputChange = (e: React.FormEvent) => {
    const input = e.target as HTMLInputElement;
    const value = input.value;
    setInputValue(value);
    const time = dayjs(value, timeFormat, true);
    if (!time.isValid()) return;
    const hour = time.hour();
    action.selectHour(hour);
    const minute = time.minute();
    action.selectMinute(minute);
  };

  const handleClickToOpenPopup = () => {
    action.togglePopup(true);
  };

  return (
    <div className="TimePicker" onClick={handleClickToOpenPopup}>
      <div className="TimePicker__InputField" ref={ref}>
        <input
          className="TimePicker__Input"
          type={'tel'}
          autoComplete="hidden"
          onChange={handleInputChange}
          value={inputValue}
        />
        <div className="TimePicker__InputIcon">
          <AvTimerIcon />
        </div>
      </div>
      <TimePickerPopup targetRef={ref} isSecondInCluded={isSecondIncluded} />
    </div>
  );
}

function getTimeFormat(isSecondIncluded: boolean, delimiter: string) {
  if (isSecondIncluded) return ['HH', 'mm', 'ss'].join(delimiter);
  return ['HH', 'mm'].join(delimiter);
}

export default TimePicker;
