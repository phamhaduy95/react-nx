import { DateRangePanelState } from './reducer';
import DatePanelRangeContextProvider from './DataRangePanelContextProvider';
import classNames from 'classnames';
import { Calendar, CalendarProps } from '../Calendar';
import { DateRangePanelDateCell } from './DateRangePanelDateCell';
import { DateRangePanelSharedDataContext } from './DateRangePanelSharedDataContext';
import { useDateRangePanelSingleContext } from './DataRangePanelContextProvider';
import './DateRangePanel.scss';
import { useEffectSkipFirstRender } from '../utils/useEffectSkipFirstRender';


export interface DateRangePanelProps {
  range?: Pick<DateRangePanelState, 'endDate' | 'startDate'>;
  className?: string;
  showedMonth?: Date;
  mode?: 'selectStart' | 'selectEnd';
  onSelect?: (type: 'selectStart' | 'selectEnd', value: Date | null) => void;
  onClickToSelect?: (
    type: 'selectStart' | 'selectEnd',
    value: Date | null
  ) => void;
  disabledDate?:CalendarProps["disabledDate"],
}

const defaultProps: Required<DateRangePanelProps> = {
  className: '',
  range: {
    startDate: null,
    endDate: null,
  },
  showedMonth: new Date(Date.now()),
  mode: 'selectStart',
  onSelect(type, value) {},
  onClickToSelect(type, value) {},
  disabledDate(currentDate) {
      return false;
  },
};

export  function DateRangePanel(props: DateRangePanelProps) {
  const newProps = { ...defaultProps, ...props };
  const initialState: DateRangePanelState = {
    endDate: newProps.range.endDate,
    startDate: newProps.range.startDate,
  };

  return (
    <DatePanelRangeContextProvider initialState={initialState}>
      <DateRangePanelSharedDataContext {...newProps}>
        <WrappedElement {...newProps} />
      </DateRangePanelSharedDataContext>
    </DatePanelRangeContextProvider>
  );
}

function WrappedElement(props: DateRangePanelProps) {
  const newProps = { ...defaultProps, ...props };
  const { range, mode,disabledDate } = newProps;
  const { className, showedMonth, onSelect } = newProps;
  const rootClassName = classNames('DateRangePanel', className);
  const { state, action } = useDateRangePanelSingleContext();
  useEffectSkipFirstRender(() => {
    action.selectEndDate(range.endDate);
  }, [range.endDate?.toDateString()]);
  useEffectSkipFirstRender(() => {
    action.selectStartDate(range.startDate);
  }, [range.startDate?.toDateString()]);

  useEffectSkipFirstRender(() => {
    const startDate = state.startDate;
    onSelect(mode, startDate);
  }, [state.startDate?.toDateString()]);

  useEffectSkipFirstRender(() => {
    const endDate = state.endDate;
    onSelect(mode, endDate);
  }, [state.endDate?.toDateString()]);

  

  return (
    <div className={rootClassName}>
      <Calendar
        CellComponent={(props) => <DateRangePanelDateCell {...props} />}
        className="DatePanelSingle__Calendar"
        selectable
        dateValue={showedMonth}
        disabledDate={disabledDate}
      />
    </div>
  );
}
