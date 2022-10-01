import { DateTimeRangeInput } from './DateTimeRangeInput';
import {
  DateTimeRangePickerStoreProvider,
  useDateTimeRangePickerStore,
} from './DateTimeRangePickerStoreProvider';
import classNames from 'classnames';
export type DateTimeRangePickerProps = {
  className?: string;
};

const defaultProps:Required<DateTimeRangePickerProps> = {
  className:"",
}


export function DateTimeRangePicker(props: DateTimeRangePickerProps) {
  return (
    <DateTimeRangePickerStoreProvider>
      <WrappedComponent {...props}/>
    </DateTimeRangePickerStoreProvider>
  );
}

function WrappedComponent(props: DateTimeRangePickerProps) {
  const newProps = {...defaultProps,...props};
  const { className } = newProps;
  const action = useDateTimeRangePickerStore((state) => state.action);
  const handleStartDateSelect = (date: Date | null) => {
    action.selectStartDate(date);
  };
  const handleEndDateSelect = (date: Date | null) => {
    action.selectEndDate(date);
  };

  const rootClassName = classNames('DateTimeRangePicker', className);

  return (
    <div className={rootClassName}>
      <DateTimeRangeInput
        mode="selectStart"
        label="StartTime"
        onDateSelect={handleStartDateSelect}
      />
      <DateTimeRangeInput
        mode="selectEnd"
        label="EndTime"
        onDateSelect={handleEndDateSelect}
      />
    </div>
  );
}
