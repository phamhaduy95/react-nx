import React, { useEffect, useRef, useState } from 'react';
import './ToolTips.scss';
import PopupElement from '../Popup/PopupElement';
import { Placement } from '../Popup/types';
import {GlobalStyleProvider} from '../GlobalStyleProvider';
import classNames from 'classnames';

type Props = {
  children: JSX.Element;
  className?: string;
  text: string;
  placement?: Placement;
  padding?: number;
  enterDelay?: number;
  leaveDelay?: number;
  enabledOnFocus?: boolean;
};

const defaultPropsValue: Required<Props> = {
  children: <></>,
  className: '',
  text: 'tooltips',
  placement: 'bottom-left',
  padding: 5,
  enterDelay: 100,
  leaveDelay: 100,
  enabledOnFocus: true,
};

export function ToolTips(props: Props) {
  const newProps = { ...defaultPropsValue, ...props };
  const {
    children,
    text,
    placement,
    className,
    padding,
    enterDelay,
    leaveDelay,
    enabledOnFocus,
  } = newProps;
  const triggerRef = useRef(null);
  const [openSignal, setOpenSignal] = useState(false);
  const [isShowed, setShowed] = useState(false);

  useEffect(() => {
    if (isShowed) return;
    if (!openSignal) return;
    const timeout = setTimeout(() => {
      setShowed(true);
      clearTimeout(timeout);
    }, enterDelay);
    return () => {
      clearTimeout(timeout);
    };
  }, [isShowed, enterDelay, openSignal]);

  useEffect(() => {
    if (!isShowed) return;
    if (openSignal) return;
    const timeout = setTimeout(() => {
      setShowed(false);
      clearTimeout(timeout);
    }, leaveDelay);
    return () => {
      clearTimeout(timeout);
    };
  }, [isShowed, openSignal, leaveDelay]);

  const rootClassName = classNames('ToolTips__Trigger', className);

  const handleMouseOver = (e: React.MouseEvent) => {
    setOpenSignal(true);
  };

  const handleMouseOut = (e: React.MouseEvent) => {
    setOpenSignal(false);
  };

  const handleFocus = () => {
    if (!enabledOnFocus) return;
    setOpenSignal(true);
  };

  const handleBlur = () => {
    if (!enabledOnFocus) return;
    setOpenSignal(false);
  };

  return (
    <GlobalStyleProvider>
      <div
        tabIndex={-1}
        className={rootClassName}
        ref={triggerRef}
        onMouseOut={handleMouseOut}
        onMouseOver={handleMouseOver}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {children}
        <PopupElement
          isShowed={isShowed}
          placement={placement}
          padding={padding}
          triggerRef={triggerRef}
          arrowEnable
          className="Tooltips__Popup"
        >
          {text}
        </PopupElement>
      </div>
    </GlobalStyleProvider>
  );
}
