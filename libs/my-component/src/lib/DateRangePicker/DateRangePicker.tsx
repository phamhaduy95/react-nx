import DateRangeInputField from './DateRangeInputField';
import {
  DateRangePickerStoreProvider,
  useDateRangePickerStore,
} from './DateRangePickerStoreProvider';

export interface DateRangePickerProps {
  className?: string;
  dateFormat?: string;
  label?: { start: string; end: string };
  onSelect?: (date: Date) => void;
  onPopupToggle?: (isOpen: boolean, mode?: 'selectEnd' | 'selectStart') => void;
}

const defaultProps: Required<DateRangePickerProps> = {
  className: '',
  dateFormat: 'DD/MM/YYYY',
  label: { start: 'startTime', end: 'endTime' },
  onSelect(date) {},
  onPopupToggle(date) {},
};

export function DateRangePicker(props: DateRangePickerProps) {
  return (
    <DateRangePickerStoreProvider>
      <WrappedDateRangePicker {...props} />
    </DateRangePickerStoreProvider>
  );
}

function WrappedDateRangePicker(props: DateRangePickerProps) {
  const newProps = { ...defaultProps, ...props };
  const { onPopupToggle, onSelect, label } = newProps;
  const action = useDateRangePickerStore((state) => state.action);

  const handleStartDateSelect = (date: Date | null) => {
    action.selectStartDate(date);
  };

  const handleEndDateSelect = (date: Date | null) => {
    action.selectEndDate(date);
  };

  return (
    <div className="DateRangePicker">
      <DateRangeInputField
        mode="selectStart"
        label={label.start}
        onDateSelect={handleStartDateSelect}
        onPopupToggle={onPopupToggle}
      />
      <DateRangeInputField
        mode="selectEnd"
        label={label.end}
        onDateSelect={handleEndDateSelect}
        onPopupToggle={onPopupToggle}
      />
    </div>
  );
}
