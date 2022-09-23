import {TimePanelDataColumn} from './TimePanelDataColumn';
import { useColumnDataGenerator, getDefaultTimeValue } from './utils';
import classNames from 'classnames';
import { useCallback, useEffect, useMemo } from 'react';
import './TimePanel.scss';
import { range } from '../utils/range';
import { extractTimeFromDate } from '../utils/dateTime';
import dayjs from 'dayjs';
import { Time } from './types';
import {
  TimePanelStoreProvider,
  useTimePanelStore,
} from './TimePanelStoreProvider';
import shallow from 'zustand/shallow';

export type TimePanelProps = {
  value?: Time | null;
  className?: string;
  isSecondInclude?: boolean;
  numberOfShowedItem?: number;
  onTimeSelect?: (time: Time | null) => void;
  onSubmit?: (time: Time | null) => void;
  maxTime?: Date | null;
  minTime?: Date | null;
  actionIncluded?: boolean;
};

const defaultProps: Required<TimePanelProps> = {
  value: null,
  className: '',
  isSecondInclude: true,
  numberOfShowedItem: 7,
  onTimeSelect: () => {},
  onSubmit(time) {},
  maxTime: null,
  minTime: null,
  actionIncluded: true,
};

export function TimePanel(props: TimePanelProps) {
  return (
    <TimePanelStoreProvider>
      <WrappedTimePanel {...props} />
    </TimePanelStoreProvider>
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
    onSubmit,
    actionIncluded,
  } = newProps;
  const action = useTimePanelStore((state) => state.action);

  const selectedTime = useTimePanelStore(
    (state) => state.selectedTime,
    shallow
  );

  useEffect(() => {
    action.selectTime(value);
  }, [value?.hour, value?.minute, value?.second]);


  useEffect(() => {
    onTimeSelect(selectedTime);
  }, [selectedTime]);

  const rootClassName = classNames('TimePanel', className, {
    isSecondIncluded: isSecondInclude,
  });
  // this emptyArray is used as the temporary disabled value for time. 
  const emptyArray = useMemo(()=>[],[]);

  const hourData = useColumnDataGenerator('hour', emptyArray);
  const secondData = useColumnDataGenerator('second', emptyArray);
  const minuteData = useColumnDataGenerator('minute', emptyArray);

  const handleHourSelect = useCallback((value: any) => {
    action.selectHour(value);
  },[])

  const handleMinuteSelect = useCallback((value: any) => {
    action.selectMinute(value);
  },[]);

  const handleSecondSelect = useCallback((value: any) => {
    action.selectSecond(value);
  },[]);

  const renderColumnForSecond = () => {
    if (isSecondInclude)
      return (
        <TimePanelDataColumn
          className="TimePanel__HourColumn"
          dataSet={secondData}
          numberShowedItem={numberOfShowedItem}
          onSelect={handleSecondSelect}
          value={selectedTime?.second}
        />
      );
    return <></>;
  };

  const handleTimeSubmit = () => {
    if (value === null && shallow(selectedTime, getDefaultTimeValue())) {
      onSubmit(null);
      return;
    }
    onSubmit(selectedTime);
  };

  const renderActionPart = () => {
    if (actionIncluded)
      return (
        <div className="TimePanel__Footer">
          <button className="TimePanel__Submit" onClick={handleTimeSubmit}>
            OK
          </button>
        </div>
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
          value={selectedTime?.hour}
        />
        <TimePanelDataColumn
          className="TimePanel__MinuteColumn"
          dataSet={minuteData}
          numberShowedItem={numberOfShowedItem}
          onSelect={handleMinuteSelect}
          value={selectedTime?.minute}
        />
        {renderColumnForSecond()}
      </div>
      {renderActionPart()}
    </div>
  );
}

function computeDisableHour(
  maxTime: Required<TimePanelProps>['maxTime'],
  minTime: Required<TimePanelProps>['minTime']
) {
  const hourArray = range(0, 23);
  const upperLimit = normalizeDateTime(maxTime);
  const lowerLimit = normalizeDateTime(minTime);

  if (upperLimit === null && lowerLimit === null) return [];
  const filteredArray = hourArray.filter((e) => {
    const day = dayjs().hour(e).minute(0).second(0);
    if (upperLimit === null) return day.isBefore(lowerLimit);
    if (lowerLimit === null) return day.isAfter(upperLimit);
    return day.isBefore(lowerLimit) || day.isAfter(upperLimit);
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
