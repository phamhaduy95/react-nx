import { Calendar } from '../Calendar';
import DatePanelSingleContextProvider from './DataPanelContextProvider';
import { DatePanelDateCell } from './DatePanelDateCell';
import { DatePanelSingleState } from './reducer';
import { useDatePanelSingleContext } from './DataPanelContextProvider';

export type DatePanelSingleProps = {
  className?: string;
  value?: Date;
  onSelect?: (date: Date) => void;
};

const defaultProps: Required<DatePanelSingleProps> = {
  className: '',
  value: new Date(Date.now()),
  onSelect(date) {},
};

export function DatePanelSingle(props: DatePanelSingleProps) {
  const newProps = { ...defaultProps, ...props };
  const initialState: DatePanelSingleState = {
    selectedDate: newProps.value,
  };
  return (
    <DatePanelSingleContextProvider initialState={initialState}>
      <WrappedDatePanelSingle {...props} />
    </DatePanelSingleContextProvider>
  );
}

function WrappedDatePanelSingle(props:DatePanelSingleProps) {
  const newProps = { ...defaultProps, ...props };
  const {state,action} = useDatePanelSingleContext();

  return (
    <div className="DatePanelSingle">
      <Calendar
        CellComponent={(props) => <DatePanelDateCell {...props} />}
        className="DatePanelSingle__Calendar"
        selectable
        dateValue={state.selectedDate}
      />
    </div>
  );
}
