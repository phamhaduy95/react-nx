import React, { memo } from 'react';
import classNames from 'classnames';
import './LoadingSpinner.scss';
import { LoadingSpinnerProps } from './type';


export const defaultSpinnerProps:Required<LoadingSpinnerProps> =Object.freeze({
  className:"",
  variant:"default",
});

export const LoadingSpinnerV1 = memo((props: LoadingSpinnerProps) => {
  const newProps = {...defaultSpinnerProps,...props};
  const { className, variant } = newProps;
  const rootClassName = classNames(
    'LoadingSpinnerV1',
    className,
    `--${variant}`
  );
  return <div className={rootClassName}></div>;
});
