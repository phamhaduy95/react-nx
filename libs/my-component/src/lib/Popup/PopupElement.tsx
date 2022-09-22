import classNames from 'classnames';
import React, { MutableRefObject, useImperativeHandle, useRef } from 'react';
import ReactDOM from 'react-dom';
import ClickOutSideWatcher from '../ClickOutsideWatcher/ClickOutSideWatcher';
import { Placement } from './types';
import { usePopupPlacement } from './usePopupPlacement';
import { useMovePopupOnScroll } from './useMovePopupOnScroll';
import usePopupPadding from './usePopupPadding';
import './PopupElement.scss';
import { forwardRef } from 'react';
import { useRepositionPopupOnResize } from './useRepositionPopupOnResize';
import usePopupWidthHandler from './usePopupWidthHandler';


export type PopupElementProps = {
  className?: string;
  children: JSX.Element[] | JSX.Element | string;
  padding?: number;
  placement: Placement;
  arrowEnable?: boolean;
  isShowed: boolean;
  triggerRef: MutableRefObject<any>;
  width?: 'auto' | 'fit-content' | number;
  onClickOutside?: () => void;
};

const defaultProps: Required<PopupElementProps> = {
  className: '',
  children: <></>,
  padding: 5,
  placement: 'bottom-center',
  arrowEnable: true,
  isShowed: false,
  triggerRef: React.createRef(),
  width: 'fit-content',
  onClickOutside: () => {},
};

export const PopupElement = forwardRef<HTMLElement,PopupElementProps>((props,ref) => {
  const newProps = { ...defaultProps, ...props };
  const {
    isShowed,
    className,
    children,
    padding,
    placement,
    arrowEnable,
    triggerRef,
    width,
    onClickOutside,
  } = newProps;

  const arrowRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref,()=>popupRef.current as HTMLElement,[popupRef.current])


  usePopupPlacement(triggerRef, popupRef, placement, isShowed);
  useMovePopupOnScroll(triggerRef,popupRef,placement,isShowed);
  usePopupWidthHandler(triggerRef,popupRef,width,placement);
  useRepositionPopupOnResize(triggerRef,popupRef,placement,isShowed);
  usePopupPadding(popupRef,placement,padding);


  const rootClassName = classNames('Popup', {
    showed: isShowed,
  });

  const PopupContentClassName = classNames('Popup__Content', {
    [`${className}`]: className,
  });

  return ReactDOM.createPortal(
    <ClickOutSideWatcher ref={popupRef} onClickOutSide={onClickOutside}>
      <div className={rootClassName} ref={popupRef}>
        <div className={PopupContentClassName}>
          <div className="Popup__Arrow" ref={arrowRef} hidden={!arrowEnable} />
          {children}
        </div>
      </div>
    </ClickOutSideWatcher>,
    document.body
  );
});

export default PopupElement;
