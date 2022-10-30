import { Calendar, CalendarProps } from '../Calendar';
import { DatePanelDateCell } from './DatePanelDateCell';
import classNames from 'classnames';
import { useEffectSkipFirstRender } from '../utils/useEffectSkipFirstRender';
import './DatePanelSingle.scss';
import {
  DatePanelStoreProvider,
  useDatePanelStore,
} from './DatePanelStoreProvider';
import { useEffect, useMemo } from 'react';
import GlobalStyleProvider from '../GlobalStyleProvider';
import { Button } from '../Button';

export type DatePanelProps = {
  className?: string;
  dateValue?: Date | null;
  onSelect?: (date: Date | null) => void;
  onSubmit?: (date: Date | null) => void;
  onClear?: () => void;
  disabledDate?: CalendarProps['disabledDate'];
  onClickToSelect?: (date: Date | null) => void;
  actionEnabled?: boolean;
};

export const defaultDatePanelProps: Required<DatePanelProps> = {
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

export function DatePanelSingle(props: DatePanelProps) {
  return (
    <GlobalStyleProvider>
      <DatePanelStoreProvider>
        <WrappedDatePanelSingle {...props} />
      </DatePanelStoreProvider>
    </GlobalStyleProvider>
  );
}

function WrappedDatePanelSingle(props: DatePanelProps) {
  const newProps = { ...defaultDatePanelProps, ...props };
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
          <Button
            className="DatePanelSingle__Clear"
            onClick={handleClickToClear}
            type="outlined"
          >
            Clear
          </Button>
          <Button
            className="DataPanelSingle__Submit"
            onClick={handleClickToSubmit}
          >
            OK
          </Button>
        </div>
      );
    return <></>;
  };

  return (
    <div className={rootClassName}>
      <Calendar
        CellComponent={CellComponent}
        className="DatePanelSingle__Calendar"
        selectable
        dateValue={selectedDate}
        disabledDate={disabledDate}
      />
      {renderActionPart()}
    </div>
  );
}

const CellComponent: CalendarProps['CellComponent'] = (props) => {
  return <DatePanelDateCell {...props} />;
};
