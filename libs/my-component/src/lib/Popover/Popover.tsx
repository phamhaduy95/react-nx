import React, { useEffect, useRef, useState, useImperativeHandle } from 'react';

import { useMovePopoverOnScroll } from './useMovePopoverOnScroll';
import {
  Placement,
  Position,
  usePopoverPlacement,
} from './usePopoverPlacement';
import { useEffectSkipFirstRender } from '../utils/useEffectSkipFirstRender';
import classNames from 'classnames';
import { createPortal } from 'react-dom';
import { ClickOutSideWatcher } from '../ClickOutsideWatcher';
import './Popover.scss';
import { forwardRef } from 'react';

export type PopoverProps = {
  children: React.ReactNode;
  className?: string;
  anchorRef?: React.MutableRefObject<HTMLElement | null> | null;
  positionOrigin?: Position;
  placement?: Placement;
  isOpen: boolean;
  onOpen?: (isOpen: boolean) => void;
  forceMount?: boolean;
  fixedOnScroll?: boolean;
};

type key = 'children' | 'isOpen';

const defaultProps: Required<Omit<PopoverProps, key>> = {
  className: '',
  placement: 'bottom-right',
  onOpen(isOpen) {},
  forceMount: false,
  fixedOnScroll: false,
  positionOrigin: { top: 0, left: 0 },
  anchorRef: null,
};

export const Popover = forwardRef<HTMLElement, PopoverProps>(
  (props, ref) => {
    const newProps = { ...defaultProps, ...props };
    const {
      children,
      placement,
      positionOrigin,
      anchorRef,
      isOpen: openSignal,
      onOpen,
      className,
      forceMount,
      fixedOnScroll,
    } = newProps;
    const [isOpen, setOpen] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => popupRef.current as HTMLElement, [
      popupRef.current,
    ]);

    useEffectSkipFirstRender(() => {
      onOpen(isOpen);
    }, [isOpen]);

    useEffect(() => {
      setOpen(openSignal);
    }, [openSignal]);

    usePopoverPlacement(popupRef, anchorRef, placement, positionOrigin, isOpen);
    useMovePopoverOnScroll(popupRef, isOpen, fixedOnScroll);

    const rootClassName = classNames('Popover', className, {
      ['is-open']: isOpen,
    });
    const handleClickOutSide = () => {
      onOpen(false);
      setOpen(false);
    };
    return (
      <PortalProvider forceMount={forceMount} isOpen={isOpen}>
        <ClickOutSideWatcher ref={popupRef} onClickOutSide={handleClickOutSide}>
          <div className={rootClassName} ref={popupRef}>
            {children}
          </div>
        </ClickOutSideWatcher>
      </PortalProvider>
    );
  }
);

type PortalProviderProps = {
  forceMount: boolean;
  isOpen: boolean;
  children: JSX.Element;
};

function PortalProvider(props: PortalProviderProps) {
  const { forceMount, isOpen, children } = props;
  if (forceMount && !isOpen) return <></>;
  return createPortal(children, document.body);
}
