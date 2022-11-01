import { useEffect, useState, forwardRef } from 'react';
import './Button.scss';
import { ButtonProps } from './type';
import classNames from 'classnames';
import {GlobalStyleProvider} from '../GlobalStyleProvider';

const defaultProps: Required<Omit<ButtonProps, 'children'>> = Object.freeze({
  className: '',
  disabled: false,
  onClick(e) {},
  variant: 'primary',
  type: 'filled',
});

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const newProps = { ...defaultProps, ...props };
    const { children, className, disabled, onClick, type, variant } = newProps;
    const rootClassName = classNames(
      'Button',
      className,
      `--${variant}`,
      `--${type}`,
      {
        ['disabled']: disabled,
      }
    );

    const handleButtonClick = (e: React.MouseEvent) => {
      onClick(e);
    };

    return (
      <GlobalStyleProvider>
        <button ref={ref} className={rootClassName} onClick={handleButtonClick}>
          {children}
        </button>
      </GlobalStyleProvider>
    );
  }
);
