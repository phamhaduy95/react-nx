
import classNames from 'classnames';
import { Calendar, CalendarProps } from '../Calendar';
import { DateRangePanelDateCell } from './DateRangePanelDateCell';
import { DateRangePanelSharedDataContext } from './DateRangePanelSharedDataContext';
import './DateRangePanel.scss';
import { useEffectSkipFirstRender } from '../utils/useEffectSkipFirstRender';
import { DateRangePanelState, DateRangePanelStoreProvider, useDateRangePanelStore } from './DateRangePanelStoreProvider';

export interface DateRangePanelProps {
  range?: Pick<DateRangePanelState, 'endDate' | 'startDate'>;
  className?: string;
  showedMonth?: Date | null;
  mode?: 'selectStart' | 'selectEnd';
  onSelect?: (type: 'selectStart' | 'selectEnd', value: Date | null) => void;
  onClickToSelect?: (
    type: 'selectStart' | 'selectEnd',
    value: Date | null
  ) => void;
  disabledDate?: CalendarProps['disabledDate'];
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

export function DateRangePanel(props: DateRangePanelProps) {
  const newProps = { ...defaultProps, ...props };


  return (
 
      <DateRangePanelSharedDataContext {...newProps}>
        <DateRangePanelStoreProvider>
        <WrappedElement {...props} />
        </DateRangePanelStoreProvider>
      </DateRangePanelSharedDataContext>
 
  );
}

function WrappedElement(props: DateRangePanelProps) {
  const newProps = { ...defaultProps, ...props };
  const { range, mode, disabledDate, className, showedMonth, onSelect } =
    newProps;

  const rootClassName = classNames('DateRangePanel', className);
  const action = useDateRangePanelStore((state)=>(state.action));
  const startDate = useDateRangePanelStore((state) => state.startDate,(a,b)=>{
    return a?.toDateString() === b?.toDateString()
  });
  const endDate =useDateRangePanelStore((state) => state.endDate,(a,b)=>{
    return a?.toDateString() === b?.toDateString()
  });
  // update startDate and endDate when the props value is changed 
  useEffectSkipFirstRender(() => {
    if (checkIsDateInputDisabled(range.endDate, disabledDate)) return;
    action.selectEndDate(range.endDate);
  }, [range.endDate?.toDateString()]);
  useEffectSkipFirstRender(() => {
    if (checkIsDateInputDisabled(range.startDate, disabledDate)) return;
    action.selectStartDate(range.startDate);
  }, [range.startDate?.toDateString()]);

  useEffectSkipFirstRender(() => {
    onSelect('selectStart', startDate);
  }, [startDate?.toDateString()]);

  useEffectSkipFirstRender(() => {
    onSelect('selectEnd', endDate);
  }, [endDate?.toDateString()]);


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

function checkIsDateInputDisabled(
  date: Date | null,
  disabledCheck: NonNullable<CalendarProps['disabledDate']>
): boolean {
  if (date === null) return false;
  if (disabledCheck(date)) return true;
  return false;
}
