import { useRef, useState } from 'react';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import TimePickerPopup from './TimePickerPopup';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
import './TimePicker.scss';
import TextField from '../TextField/TextField';
import { TextFieldProps } from '../TextField/TextField';
import classNames from 'classnames';
import { useEffectSkipFirstRender } from '../utils/useEffectSkipFirstRender';
import { TimePickerStoreProvider, useTimePickerStore } from './TimePickerStoreProvider';

export type TimePickerProps = {
  className?: string;
  isSecondIncluded?: boolean;
  delimiter?: string;
  disabled?: boolean;
  label?: TextFieldProps['label'];
  helperText?: TextFieldProps['helperText'];
  onTimeSelect?: (time: Date) => void;
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
  const selectedTime = useTimePickerStore(
    (state) => state.selectedTime,
    (a, b) => {
      return a.toTimeString() === b.toTimeString();
    }
  );
  useEffectSkipFirstRender(() => {
    const time = dayjs(selectedTime);
    const timeStr = time.format(timeFormat);
    setInputValue(timeStr);
  }, [selectedTime.toTimeString(), delimiter, isSecondIncluded]);

  useEffectSkipFirstRender(() => {
    onTimeSelect(selectedTime);
  }, [selectedTime.toTimeString()]);

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
        autoFocusWhenChanged
      />
      <TimePickerPopup
        targetRef={ref}
        isSecondInCluded={isSecondIncluded}
        selectedTime={selectedTime}
      />
    </div>
  );
}

function getTimeFormat(isSecondIncluded: boolean, delimiter: string) {
  if (isSecondIncluded) return ['HH', 'mm', 'ss'].join(delimiter);
  return ['HH', 'mm'].join(delimiter);
}

export default TimePicker;
