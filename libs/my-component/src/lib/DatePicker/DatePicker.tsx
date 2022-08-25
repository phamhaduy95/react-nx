import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import './DatePicker.scss';
import CalendarPopup from './DatePickerPopup';
import DatePickerContextProvider, {
  useDatePickerContext,
} from './DatePickerContextProvider';
import { DatePickerState } from './reducer';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { TextField } from '../TextField';
import { useEffectSkipFirstRender } from '../utils/useEffectSkipFirstRender';
import { DatePanelSingle } from '../DatePanelSingle/DatePanelSingle';
dayjs.extend(customParseFormat);

export interface DatePickerProps {
  className?: string | false;
  dateFormat?: string;
  label?: string;
  onSelect?: (date: Date | null) => void;
  PanelComponent?: (props: {
    dateValue: Date | null;
    onSelect: (date: Date | null) => void;
  }) => JSX.Element;
}
const defaultPropsValue: Required<DatePickerProps> = {
  className: false,
  dateFormat: 'DD/MM/YYYY',
  label: '',
  onSelect(date) {},
  PanelComponent(props) {
    return <DatePanelSingle {...props} />;
  },
};

export function DatePicker(props: DatePickerProps) {
  const initialState: DatePickerState = {
    isPopupOpen: false,
    selectedDate: null,
  };

  return (
    <DatePickerContextProvider initialState={initialState}>
      <WrappedDatePicker {...props} />
    </DatePickerContextProvider>
  );
}

function WrappedDatePicker(props: DatePickerProps) {
  const newProps = { ...defaultPropsValue, ...props };
  const { dateFormat, className, label, onSelect, PanelComponent } = newProps;

  const rootClassName = classNames('DatePicker', {
    [`${className}`]: className,
  });
  const targetRef = useRef(null);

  const { state, action } = useDatePickerContext();
  const { selectedDate } = state;
  const [inputValue, setInputValue] = useState('');

  useEffectSkipFirstRender(() => {
    onSelect(state.selectedDate);
  }, [state.selectedDate?.toDateString()]);

  useEffect(() => {
    if (selectedDate === null) {
      setInputValue("");
      return;
    }
    const newValue = dayjs(selectedDate).format(dateFormat);
    setInputValue(newValue);
  }, [selectedDate?.toDateString()]);

  useEffect(() => {
    if (inputValue === "") {
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
    <div className={rootClassName} tabIndex={1}>
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
      <CalendarPopup
        targetRef={targetRef}
        isShowed={state.isPopupOpen}
        PanelComponent={PanelComponent}
      />
    </div>
  );
}

const isDateInputValid = (input: string, dateFormat: string) => {
  return dayjs(input, dateFormat, true).isValid();
};

export default DatePicker;
