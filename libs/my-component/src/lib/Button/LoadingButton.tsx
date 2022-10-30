import React from 'react';
import { LoadingButtonProps } from './type';
import classNames from 'classnames';
import { Button } from './Button';
import { forwardRef } from 'react';
import { LoadingSpinnerV1 } from '../LoadingSpinner/LoadingSpinnerV1';
import { LoadingSpinnerProps } from '../LoadingSpinner/type';
import './LoadingButton.scss';

const defaultProps: Required<Omit<LoadingButtonProps, 'children'>> =
  Object.freeze({
    className: '',
    onClick(e) {},
    type: 'filled',
    variant: 'primary',
    disabled: false,
    isLoading: false,
    loadingIcon: 'end',
  });

export const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  (props, ref) => {
    let newProps = { ...defaultProps, ...props };
    const {
      className,
      children,
      isLoading,
      type,
      variant,
      loadingIcon,
      onClick,
    } = newProps;
    const rootClassName = classNames('LoadingButton', className);
    const renderLoadingIcon = () => {
      if (!isLoading) return children;
      if (loadingIcon === 'none') return children;
      const spinnerVariant: LoadingSpinnerProps['variant'] =
        type === 'filled' ? 'default' : variant;
      const spinnerClassName = `LoadingButton__Spinner --${loadingIcon}`;
      if (loadingIcon === 'end')
        return (
          <>
            {children}
            <LoadingSpinnerV1
              className={spinnerClassName}
              variant={spinnerVariant}
            />
          </>
        );
      return (
        <>
          <LoadingSpinnerV1
            className={spinnerClassName}
            variant={spinnerVariant}
          />
          {children}
        </>
      );
    };

    return (
      <Button
        className={rootClassName}
        type={type}
        variant={variant}
        ref={ref}
        onClick={onClick}
        disabled={isLoading}
      >
        {renderLoadingIcon()}
      </Button>
    );
  }
);
