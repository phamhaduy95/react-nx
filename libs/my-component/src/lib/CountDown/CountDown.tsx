import dayjs from 'dayjs';

import React, { useEffect, useMemo, useState } from 'react';
import { CountDownHandler } from './CountDownHandler';
import { useEffectSkipFirstRender } from '../utils/useEffectSkipFirstRender';
import "./CountDown.scss"
// users are able to stop ,pause and start countdown manually
// users can set the initial time for counter to operate.
// users able to change the date time format of the count down
// notes: input time in second or milliseconds.
// what the CountDown responses when new deadline is set.

export interface CountDownProps {
  className?: string;
  deadline: number;
  valueFormat?: (value: number) => string;
  /** intervalTime in milliseconds */
  timeInterval: number;
  onPause?: () => void;
  onChange?: (value: number) => void;
  onFinish?: CountDownHandler['onFinish'];
  title?: string;
  status: CountDownHandler['status'] | 'reset';
  dir?: CountDownHandler['dir'];
}

const CountDownDefaultProps: Required<CountDownProps> = {
  className: '',
  deadline: 0,
  title: '',
  onChange(value) {},
  onFinish() {},
  onPause() {},
  status: 'run',
  valueFormat(value) {
    return value.toString();
  },
  timeInterval: 1000,
  dir: 'descend',
};

export function CountDown(props: CountDownProps) {
  const newProps = { ...CountDownDefaultProps, ...props };
  const {
    title,
    deadline,
    status,
    onChange,
    valueFormat,
    timeInterval,
    onFinish,
    onPause,
    dir,
  } = newProps;
  const [value, setValue] = useState(0);

  const countDownHandler = useMemo(() => {
    return new CountDownHandler(timeInterval, deadline,dir);
  }, []);

  countDownHandler.onChange = (value) => {
    setValue(value);
    onChange(value);
  };

  useEffectSkipFirstRender(()=>{
    countDownHandler.stop();
    countDownHandler.dir = dir;
    countDownHandler.run();
  },[dir])

  countDownHandler.onFinish = onFinish;
  countDownHandler.onPause = onPause;

  useEffect(() => {
    countDownHandler.updateDeadLine(deadline);
  }, [deadline]);

  useEffect(() => {
    countDownHandler.changeStatus(status);
  }, [status]);

  useEffect(() => {
    return () => {
      countDownHandler.stop();
    };
  }, []);

  return (
    <div className="CountDown">
      <p className="CountDown__Title">{title}</p>
      <p className="CountDown__Value">{valueFormat(value)}</p>
    </div>
  );
}
