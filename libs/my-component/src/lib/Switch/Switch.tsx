import React, { Children, useEffect, useRef, useState, memo } from 'react';
import { useEffectSkipFirstRender } from '../utils/useEffectSkipFirstRender';
import './Switch.scss';
import useSwitchReducer from './useSwitchReducer';
import classNames from 'classnames';
import { GlobalStyleProvider } from '../GlobalStyleProvider';

export type SwitchProps = {
  className?: string;
  disabled?: boolean;
  value: boolean;
  onChange?: (value: boolean) => void;
};

const defaultProps: Required<Omit<SwitchProps, 'className'>> = {
  disabled: false,
  onChange(value) {},
  value: false,
};

export const Switch = memo((props: SwitchProps) => {
  const newProps = { ...defaultProps, ...props };
  const { onChange, value, disabled, className } = newProps;
  const { state, dispatch } = useSwitchReducer(false);
  const { isChecked, phaseName } = state;
  const ref = useRef(null);
  useEffectSkipFirstRender(() => {
    onChange(isChecked);
  }, [isChecked]);

  useEffect(() => {
    dispatch({ type: 'CLICK' });
  }, [value]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (phaseName === 'idle') return;
    addAnimationTo(element, isChecked);
  }, [isChecked, phaseName]);

  const handleClick = () => {
    dispatch({ type: 'CLICK' });
  };

  const handleAnimationEnd = () => {
    dispatch({ type: 'ANIMATION_END' });
  };

  const rootClassName = classNames('Switch', className, {
    ['is-disabled']: disabled,
    ['is-checked']: isChecked,
  });
  return (
    <GlobalStyleProvider>
      <button
        className={rootClassName}
        role="switch"
        aria-checked={isChecked}
        onClick={handleClick}
        disabled={disabled}
      >
        <div
          className={`Switch_Thumb`}
          ref={ref}
          onAnimationEnd={handleAnimationEnd}
        />
      </button>
    </GlobalStyleProvider>
  );
});

function addAnimationTo(element: HTMLElement, isChecked: boolean) {
  element.classList.remove('do-animation');
  void element.offsetWidth;
  element.classList.add('do-animation');
  if (isChecked) {
    element.classList.add('checked');
    element.classList.remove('unchecked');
  } else {
    element.classList.add('unchecked');
    element.classList.remove('checked');
  }
}
