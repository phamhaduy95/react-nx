import { DateTimeRangePickerState } from './reducer';
import {
  DateTimeRangePickerContextProvider,
  useDateTimeRangePickerContext,
} from './DataRangePickerContextProvider';
import { DateTimeRangeInput } from './DateTimeRangeInput';
export type DateTimeRangePickerProps = {
  className?: string;
};

export function DateTimeRangePicker() {
  const initialState: DateTimeRangePickerState = {
    startDate: null,
    endDate: null,
  };

  return (
    <DateTimeRangePickerContextProvider initialState={initialState}>
      <WrappedComponent />
    </DateTimeRangePickerContextProvider>
  );
}

function WrappedComponent() {
  const { state, action } = useDateTimeRangePickerContext();
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
