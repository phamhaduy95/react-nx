import classNames from 'classnames';
import React, {
  MutableRefObject,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import ReactDOM from 'react-dom';
import {
  createPopper,
  BasePlacement,
  VariationPlacement,
} from '@popperjs/core';
import ClickOutSideWatcher from '../ClickOutsideWatcher/ClickOutSideWatcher';
import { GlobalStyleProvider } from '../GlobalStyleProvider';

export type PopupElementProps = {
  className?: string;
  children: JSX.Element[] | JSX.Element | string;
  hideOnClickOutSide: boolean;
  placement: BasePlacement | VariationPlacement;
  padding?: number;
  arrow?: boolean;
  isShowed: boolean;
  triggerRef: MutableRefObject<any>;
  onClickOutside?: (e: MouseEvent) => void;
};

const defaultProps: Required<
  Omit<PopupElementProps, 'placement' | 'isShowed'>
> = {
  className: '',
  hideOnClickOutSide: true,
  children: <></>,
  padding: 5,
  arrow: true,
  triggerRef: React.createRef(),
  onClickOutside: () => {},
};

export const PopupElement = forwardRef<HTMLElement, PopupElementProps>(
  (props, ref) => {
    const newProps = { ...defaultProps, ...props };
    const {
      isShowed,
      placement,
      className,
      children,
      padding,
      arrow: arrowEnable,
      triggerRef,
      onClickOutside,
    } = newProps;

    const arrowRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => popupRef.current as HTMLElement, [
      popupRef.current,
    ]);

    useEffect(() => {
      const triggerEl = triggerRef.current;
      const popupEl = popupRef.current;
      if (triggerEl == null) return;
      if (popupEl === null) return;
      createPopper(triggerEl, popupEl, {
        placement: placement,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, padding],
            },
          },
        ],
      });
    }, []);

    const rootClassName = classNames('Popup', {
      showed: isShowed,
    });

    const PopupContentClassName = classNames('Popup__Content', {
      [`${className}`]: className,
    });

    function renderArrowElement(allowArrow:boolean){
        if (allowArrow) return  <div data-popper-arrow/>
        return <></>;
    }


    return ReactDOM.createPortal(
      <GlobalStyleProvider>
        <ClickOutSideWatcher ref={popupRef} onClickOutSide={onClickOutside}>
          <div className={rootClassName} ref={popupRef}>
            {renderArrowElement(arrowEnable)}
            <div className={PopupContentClassName}>
              <div
                className="Popup__Arrow"
                ref={arrowRef}
                hidden={!arrowEnable}
              />
              {children}
            </div>
          </div>
        </ClickOutSideWatcher>
      </GlobalStyleProvider>,
      document.body
    );
  }
);

export default PopupElement;
