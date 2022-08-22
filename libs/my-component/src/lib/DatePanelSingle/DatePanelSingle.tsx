import { Calendar, CalendarProps } from '../Calendar';
import DatePanelSingleContextProvider from './DataPanelContextProvider';
import { DatePanelDateCell } from './DatePanelDateCell';
import { DatePanelSingleState } from './reducer';
import { useDatePanelSingleContext } from './DataPanelContextProvider';
import classNames from 'classnames';
import { useEffectSkipFirstRender } from '../utils/useEffectSkipFirstRender';

export type DatePanelSingleProps = {
  className?: string;
  dateValue?: Date;
  onSelect?: (date: Date) => void;
  disabledDate?: CalendarProps['disabledDate'];
  onClickToSelect?: (date: Date) => void;
};

const defaultProps: Required<DatePanelSingleProps> = {
  className: '',
  dateValue: new Date(Date.now()),
  onSelect(date) {},
  disabledDate(currentDate) {
    return false;
  },
  onClickToSelect(date) {},
};

export function DatePanelSingle(props: DatePanelSingleProps) {
  const newProps = { ...defaultProps, ...props };
  const initialState: DatePanelSingleState = {
    selectedDate: newProps.dateValue,
  };
  return (
    <DatePanelSingleContextProvider initialState={initialState}>
      <WrappedDatePanelSingle {...props} />
    </DatePanelSingleContextProvider>
  );
}

function WrappedDatePanelSingle(props: DatePanelSingleProps) {
  const newProps = { ...defaultProps, ...props };
  const { dateValue, onSelect, className, disabledDate, onClickToSelect } =
    newProps;
  const rootClassName = classNames('DatePanelSingle', className);
  const { state, action } = useDatePanelSingleContext();
  useEffectSkipFirstRender(() => {
    onSelect(state.selectedDate);
  }, [state.selectedDate.toDateString()]);

  useEffectSkipFirstRender(() => {
    action.selectNewDate(dateValue);
  }, [dateValue.toDateString()]);

  return (
    <div className={rootClassName}>
      <Calendar
        CellComponent={(props) => (
          <DatePanelDateCell {...props} onClickToSelect={onClickToSelect} />
        )}
        className="DatePanelSingle__Calendar"
        selectable
        dateValue={state.selectedDate}
        disabledDate={disabledDate}
      />
    </div>
  );
}
