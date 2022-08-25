import { DateRangePanelState } from './reducer';
import DatePanelRangeContextProvider from './DataRangePanelContextProvider';
import classNames from 'classnames';
import { Calendar, CalendarProps } from '../Calendar';
import { DateRangePanelDateCell } from './DateRangePanelDateCell';
import { DateRangePanelSharedDataContext } from './DateRangePanelSharedDataContext';
import { useDateRangePanelSingleContext } from './DataRangePanelContextProvider';
import './DateRangePanel.scss';
import { useEffectSkipFirstRender } from '../utils/useEffectSkipFirstRender';
import { useEffect } from 'react';

export interface DateRangePanelProps {
  range?: Pick<DateRangePanelState, 'endDate' | 'startDate'>;
  className?: string;
  showedMonth?: Date|null;
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
  const initialState: DateRangePanelState = {
    endDate: newProps.range.endDate,
    startDate: newProps.range.startDate,
  };


  return (
    <DatePanelRangeContextProvider initialState={initialState}>
      <DateRangePanelSharedDataContext {...newProps}>
        <WrappedElement {...props} />
      </DateRangePanelSharedDataContext>
    </DatePanelRangeContextProvider>
  );
}

function WrappedElement(props: DateRangePanelProps) {
  const newProps = { ...defaultProps, ...props };
  const { range, mode, disabledDate,className, showedMonth, onSelect } = newProps;

 
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
    onSelect("selectStart", startDate);
  }, [state.startDate?.toDateString()]);

  useEffectSkipFirstRender(() => {
    const endDate = state.endDate;
    onSelect("selectEnd", endDate);
  }, [state.endDate?.toDateString()]);

  useEffect(()=>{console.log("ss")},[])

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
