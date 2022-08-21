import { TimePanelState } from './reducer';
import {
  TimePanelContextProvider,
  useTimePanelContext,
} from './TimePanelContext';
import TimePanelDataColumn from './TimePanelDataColumn';
import { useColumnDataGenerator } from './utils';
import classNames from 'classnames';
import { useEffect } from 'react';
import './TimePanel.scss';
import { useEffectSkipFirstRender } from '../utils/useEventCallback';

type Time = {
  hour: number;
  minute: number;
  second: number;
};

export type TimePanelProps = {
  value?: Time | null;
  className?: string;
  isSecondInclude?: boolean;
  numberOfShowedItem?: number;
  onTimeSelect?: (time: Time) => void;
  disabledHour?: number[];
  disabledMinute?: number[];
  disabledSecond?: number[];
};

const defaultProps: Required<TimePanelProps> = {
  value: null,
  className: '',
  isSecondInclude: true,
  numberOfShowedItem: 7,
  onTimeSelect: () => {},
  disabledHour: [],
  disabledMinute: [],
  disabledSecond: [],
};

export function TimePanel(props: TimePanelProps) {
  const initialState: TimePanelState = {
    selectTime: {
      hour: 0,
      minute: 0,
      second: 0,
    },
  };

  return (
    <TimePanelContextProvider initialState={initialState}>
      <WrappedTimePanel {...props} />
    </TimePanelContextProvider>
  );
}

export function WrappedTimePanel(props: TimePanelProps) {
  const newProps = { ...defaultProps, ...props };
  const {
    className,
    isSecondInclude,
    numberOfShowedItem,
    onTimeSelect,
    value,
    disabledHour,
    disabledMinute,
    disabledSecond,
  } = newProps;
  const { state, action } = useTimePanelContext();
  const { selectTime } = state;
  const { hour, minute, second } = selectTime;
  
  useEffect(() => {
    console.log(value)
    if (value === null) return;
    action.selectHour(value.hour);
    action.selectMinute(value.minute);
    action.selectSecond(value.second);
  }, [value?.hour, value?.minute, value?.second]);

  useEffectSkipFirstRender(()=>{
    onTimeSelect(state.selectTime);
  }, [hour, minute, second]);

  const rootClassName = classNames('TimePanel', className, {
    isSecondIncluded: isSecondInclude,
  });
  const hourData = useColumnDataGenerator('hour',disabledHour);
  const secondData = useColumnDataGenerator('second',disabledMinute);
  const minuteData = useColumnDataGenerator('minute',disabledSecond);

  const handleHourSelect = (value: any) => {
    action.selectHour(value);
  };

  const handleMinuteSelect = (value: any) => {
    action.selectMinute(value);
  };

  const handleSecondSelect = (value: any) => {
    action.selectSecond(value);
  };

  const renderColumnForSecond = () => {
    if (isSecondInclude)
      return (
        <TimePanelDataColumn
          className="TimePanel__HourColumn"
          dataSet={secondData}
          numberShowedItem={numberOfShowedItem}
          onSelect={handleSecondSelect}
          value={selectTime.second}
        />
      );
    return <></>;
  };

  return (
    <div className={rootClassName}>
      <div className="TimePanel__Header">Time</div>
      <div className="TimePanel__Container">
        <TimePanelDataColumn
          className="TimePanel__HourColumn"
          dataSet={hourData}
          numberShowedItem={numberOfShowedItem}
          onSelect={handleHourSelect}
          value={selectTime.hour}
        />
        <TimePanelDataColumn
          className="TimePanel__MinuteColumn"
          dataSet={minuteData}
          numberShowedItem={numberOfShowedItem}
          onSelect={handleMinuteSelect}
          value={selectTime.minute}
        />
        {renderColumnForSecond()}
      </div>
    </div>
  );
}
