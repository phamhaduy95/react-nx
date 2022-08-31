import classNames from 'classnames';
import React, { MutableRefObject, useRef } from 'react';
import ReactDOM from 'react-dom';
import ClickOutSideWatcher from '../ClickOutsideWatcher/ClickOutSideWatcher';
import usePopupPadding from '../usePopupPlacement/usePopupPadding';
import usePopupPlacement from '../usePopupPlacement/usePopUpPlacement';
import './PopupElement.scss';
import usePopupWidthHandler from './usePopupWidthHandler';

type Placement =
  | 'bottomRight'
  | 'bottomLeft'
  | 'bottomCenter'
  | 'topLeft'
  | 'topRight'
  | 'topCenter'
  | 'leftTop'
  | 'leftCenter'
  | 'leftBottom'
  | 'rightTop'
  | 'rightCenter'
  | 'rightBottom';

export type PopupElementProps = {
  className?: string;
  children: JSX.Element[] | JSX.Element | string;
  padding?: number;
  placement: Placement;
  arrowEnable?: boolean;
  isShowed: boolean;
  targetRef: MutableRefObject<any>;
  width?: 'auto' | 'fit-content' | number;
  onClickOutside?:()=>void;
};

const defaultProps: Required<PopupElementProps> = {
  className: '',
  children: <></>,
  padding: 5,
  placement: 'topCenter',
  arrowEnable: true,
  isShowed: false,
  targetRef: React.createRef(),
  width: 'fit-content',
  onClickOutside:()=>{}
};

const PopupElement = (props: PopupElementProps) => {
  const newProps = { ...defaultProps, ...props };

  const {
    isShowed,
    className,
    children,
    padding,
    placement,
    arrowEnable,
    targetRef,
    width,
    onClickOutside
  } = newProps;

  const arrowRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  usePopupWidthHandler(targetRef, popupRef, width, placement);
  usePopupPlacement(targetRef, popupRef, placement);
  usePopupPadding(popupRef, placement, padding);

  const rootClassName = classNames('Popup', {
    showed: isShowed,
  });

  const PopupContentClassName = classNames('Popup__Content', {
    [`${className}`]: className,
  });



  return ReactDOM.createPortal(
   <ClickOutSideWatcher ref={popupRef} onClickOutSide={onClickOutside}>
    <div className={rootClassName} ref={popupRef} >
      <div className={PopupContentClassName}>
        <div className="Popup__Arrow" ref={arrowRef} hidden={!arrowEnable} />
        {children}
      </div>
    </div>
    </ClickOutSideWatcher>,
    document.body
  );
};

export default PopupElement;
