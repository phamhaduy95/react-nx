import classNames from 'classnames';
import React from 'react';
import {GlobalStyleProvider} from '../GlobalStyleProvider';
import { IconButtonProps } from './type';
import { forwardRef } from 'react';
import './IconButton.scss';

const defaultProps: Required<Omit<IconButtonProps, 'children'>> = Object.freeze({
  className: '',
  disabled: false,
  onClick(e) {},
  variant: 'primary',
});

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    const newProps = { ...defaultProps, ...props };
    const { children, className, disabled, onClick, variant } = newProps;
    const rootClassName = classNames('IconButton', className, `--${variant}`, {
      ['disabled']: disabled,
    });

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
