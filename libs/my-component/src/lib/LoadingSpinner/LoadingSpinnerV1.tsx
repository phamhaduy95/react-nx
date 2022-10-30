import React, { memo } from 'react';
import classNames from 'classnames';
import './LoadingSpinner.scss';
import { LoadingSpinnerProps } from './type';

export const LoadingSpinnerV1 = memo((props: LoadingSpinnerProps) => {
  const { className, variant } = props;
  const rootClassName = classNames(
    'LoadingSpinnerV1',
    className,
    `--${variant}`
  );
  return <div className={rootClassName}></div>;
});
