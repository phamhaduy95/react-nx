import DateRangeInputField from './DateRangeInputField';
import { DateRangePickerStoreProvider, useDateRangePickerStore } from './DateRangePickerStoreProvider';

export interface DateRangePickerProps {
  className?: string;
  dateFormat?: string;
  label?: string;
  onSelect?: (date: Date) => void;
}

const defaultProps: Required<DateRangePickerProps> = {
  className: '',
  dateFormat: 'DD/MM/YYYY',
  label: '',
  onSelect(date) {},
};

export function DateRangePicker(props: DateRangePickerProps) {
  return (
    <DateRangePickerStoreProvider>
      <WrappedDateRangePicker {...props} />
    </DateRangePickerStoreProvider>
  );
}

function WrappedDateRangePicker(props: DateRangePickerProps) {
  const newProps = {...defaultProps,...props};
  const action = useDateRangePickerStore(state=>state.action);

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
        label=""
        onDateSelect={handleStartDateSelect}
      />
      <DateRangeInputField
        mode="selectEnd"
        label=""
        onDateSelect={handleEndDateSelect}
      />
    </div>
  );
}
