import { TimePanelState } from './reducer';
import {
  TimePanelContextProvider,
  useTimePanelContext,
} from './TimePanelContext';

import './TimePanel.scss';
import TimePanelDataColumn from './TimePanelDataColumn';
import { useColumnDataGenerator } from './utils';
import classNames from 'classnames';

type TimePanelProps = {
  className?: string;
  isSecondInclude?: boolean;
  numberOfShowedItem?: number;
  onTimeSelect?: (date: Date) => void;
};

const defaultProps: Required<TimePanelProps> = {
  className: '',
  isSecondInclude: true,
  numberOfShowedItem: 7,
  onTimeSelect: () => {},
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
  const { className, isSecondInclude, numberOfShowedItem, onTimeSelect } =
    newProps;
  const { state, action } = useTimePanelContext();
  const { selectTime } = state;
  const rootClassName = classNames("TimePanel",className,{
    "isSecondIncluded":isSecondInclude
  });
  const hourData = useColumnDataGenerator('hour');
  const secondData = useColumnDataGenerator('second');
  const minuteData = useColumnDataGenerator('minute');

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
      <div className="TimePanel__Header">
        Time
      </div>
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
