import { Calendar, CalendarProps } from '../Calendar';
import { DatePanelDateCell } from './DatePanelDateCell';
import classNames from 'classnames';
import { useEffectSkipFirstRender } from '../utils/useEffectSkipFirstRender';
import './DatePanelSingle.scss';
import {
  DatePanelStoreProvider,
  useDatePanelStore,
} from './DatePanelStoreProvider';

export type DatePanelSingleProps = {
  className?: string;
  dateValue?: Date | null;
  onSelect?: (date: Date | null) => void;
  onSubmit?: (date: Date | null) => void;
  onClear?: () => void;
  disabledDate?: CalendarProps['disabledDate'];
  onClickToSelect?: (date: Date | null) => void;
  actionEnabled?: boolean;
};

const defaultProps: Required<DatePanelSingleProps> = {
  className: '',
  dateValue: null,
  actionEnabled: true,
  onSelect(date) {},
  disabledDate(currentDate) {
    return false;
  },
  onClickToSelect(date) {},
  onSubmit(date) {},
  onClear() {},
};

export function DatePanelSingle(props: DatePanelSingleProps) {
  return (
    <DatePanelStoreProvider>
      <WrappedDatePanelSingle {...props} />
    </DatePanelStoreProvider>
  );
}

function WrappedDatePanelSingle(props: DatePanelSingleProps) {
  const newProps = { ...defaultProps, ...props };
  const {
    dateValue,
    onSelect,
    className,
    disabledDate,
    onSubmit,
    onClickToSelect,
    actionEnabled,
    onClear,
  } = newProps;
  const rootClassName = classNames('DatePanelSingle', className);
  const action = useDatePanelStore((state) => state.action);
  const selectedDate = useDatePanelStore(
    (state) => state.selectedDateTime,
    (a, b) => a?.toDateString() === b?.toDateString()
  );

  useEffectSkipFirstRender(() => {
    onSelect(selectedDate);
  }, [selectedDate?.toDateString()]);

  useEffectSkipFirstRender(() => {
    action.selectDateTime(dateValue);
  }, [dateValue?.toDateString()]);

  const handleClickToClear = () => {
    onClear();
  };

  const handleClickToSubmit = () => {
    onSubmit(selectedDate);
  };

  const renderActionPart = () => {
    if (actionEnabled)
      return (
        <div className="DatePanelSingle__Action">
          <button
            className="DatePanelSingle__Clear"
            onClick={handleClickToClear}
          >
            Clear
          </button>
          <button
            className="DatePanelSingle__Submit"
            onClick={handleClickToSubmit}
          >
            OK
          </button>
        </div>
      );
    return <></>;
  };

  return (
    <div className={rootClassName}>
      <Calendar
        CellComponent={(props) => (
          <DatePanelDateCell {...props} onClickToSelect={onClickToSelect} />
        )}
        className="DatePanelSingle__Calendar"
        selectable
        dateValue={selectedDate}
        disabledDate={disabledDate}
      />
      {renderActionPart()}
    </div>
  );
}
