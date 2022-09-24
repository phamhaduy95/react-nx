import { DateTimeRangeInput } from './DateTimeRangeInput';
import { DateTimeRangePickerStoreProvider, useDateTimeRangePickerStore } from './DateTimeRangePickerStoreProvider';
export type DateTimeRangePickerProps = {
  className?: string;
};

export function DateTimeRangePicker(props: DateTimeRangePickerProps) {
  return (
    <DateTimeRangePickerStoreProvider>
      <WrappedComponent />
    </DateTimeRangePickerStoreProvider>
  );
}

function WrappedComponent(props: DateTimeRangePickerProps) {
  const action = useDateTimeRangePickerStore((state) => state.action);
  const handleStartDateSelect = (date: Date | null) => {
    action.selectStartDate(date);
  };
  const handleEndDateSelect = (date: Date | null) => {
    action.selectEndDate(date);
  };

  return (
    <div className="DateTimeRangePicker">
      <DateTimeRangeInput
        mode="selectStart"
        label=""
        onDateSelect={handleStartDateSelect}
      />
      <DateTimeRangeInput
        mode="selectEnd"
        label=""
        onDateSelect={handleEndDateSelect}
      />
    </div>
  );
}
