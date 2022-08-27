import { TimePanelState } from './reducer';
import {
  TimePanelContextProvider,
  useTimePanelContext,
} from './TimePanelContext';
import TimePanelDataColumn from './TimePanelDataColumn';
import { useColumnDataGenerator } from './utils';
import classNames from 'classnames';
import { useEffect, useMemo } from 'react';
import './TimePanel.scss';
import { useEffectSkipFirstRender } from '../utils/useEffectSkipFirstRender';
import { range } from '../utils/range';
import { extractTimeFromDate } from '../utils/dateTime';
import dayjs from 'dayjs';

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
  maxTime?: Date | null;
  minTime?: Date | null;
};

const defaultProps: Required<TimePanelProps> = {
  value: null,
  className: '',
  isSecondInclude: true,
  numberOfShowedItem: 7,
  onTimeSelect: () => {},
  maxTime: null,
  minTime: null,
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
    maxTime,
    minTime,
  } = newProps;
  const { state, action } = useTimePanelContext();
  const { selectTime } = state;
  const { hour, minute, second } = selectTime;

  useEffect(() => {
    if (value === null) return;
    action.selectHour(value.hour);
    action.selectMinute(value.minute);
    action.selectSecond(value.second);
  }, [value?.hour, value?.minute, value?.second]);

  useEffectSkipFirstRender(() => {
    onTimeSelect(state.selectTime);
  }, [hour, minute, second]);

  const rootClassName = classNames('TimePanel', className, {
    isSecondIncluded: isSecondInclude,
  });

  const disabledHour = computeDisableHour(maxTime,minTime);
  console.log(disabledHour)

  const hourData = useColumnDataGenerator('hour', []);
  const secondData = useColumnDataGenerator('second', []);
  const minuteData = useColumnDataGenerator('minute', []);

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

function computeDisableHour(
  maxTime: Required<TimePanelProps>['maxTime'],
  minTime: Required<TimePanelProps>['minTime']
) {
  const hourArray = range(0,23);
  const upperLimit = normalizeDateTime(maxTime);
  const lowerLimit = normalizeDateTime(minTime);

  if (upperLimit === null && lowerLimit === null) return [];
     const filteredArray =  hourArray.filter((e)=>{
        const day = dayjs().hour(e).minute(0).second(0);
        if (upperLimit === null) 
        return day.isBefore(lowerLimit);
        if (lowerLimit === null)
          return day.isAfter(upperLimit);
        return (day.isBefore(lowerLimit)||day.isAfter(upperLimit));
    });
    return filteredArray;
  }
/**
 * ensure result datetime will have the same date which is Date.now();
 * */
function normalizeDateTime(dateTime: Date | null) {
  if (dateTime === null) return null;
  const time = extractTimeFromDate(dateTime);
  return dayjs()
    .hour(time.hour)
    .minute(time.minute)
    .second(time.second)
    .toDate();
}
