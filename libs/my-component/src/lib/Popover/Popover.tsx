import React, { useEffect, useRef, useState } from 'react';
import { Placement, Point } from '../ContextMenu/utils';
import { useMovePopoverOnScroll } from './useMovePopoverOnScroll';
import { usePopoverPlacement } from './usePopoverPlacement';
import { useEffectSkipFirstRender } from '../utils/useEffectSkipFirstRender';
import classNames from 'classnames';
import { createPortal } from 'react-dom';
import { ClickOutSideWatcher } from '../ClickOutsideWatcher';
import "./Popover.scss"

export type PopoverProps = {
  children: JSX.Element;
  className?: string;
  placement?: Placement;
  /** clientPosition in pixel */
  basePosition: Point;
  isOpen: boolean;
  onOpen?: (isOpen: boolean) => void;
  forceMount?: boolean;
  fixedOnScroll?:boolean
};

type key = 'children' | 'isOpen' | 'basePosition';

const defaultProps: Required<Omit<PopoverProps, key>> = {
  className: '',
  placement: 'bottom-right',
  onOpen(isOpen) {},
  forceMount: false,
  fixedOnScroll:false,
};

export function Popover(props: PopoverProps) {
  const newProps = { ...defaultProps, ...props };
  const {
    children,
    placement,
    basePosition,
    isOpen: openSignal,
    onOpen,
    className,
    forceMount,
    fixedOnScroll
  } = newProps;
  const [isOpen, setOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
 


  useEffectSkipFirstRender(() => {
    onOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    setOpen(openSignal);
  }, [openSignal]);

  usePopoverPlacement(popupRef, placement, basePosition, isOpen);
  useMovePopoverOnScroll(popupRef, isOpen,fixedOnScroll);

  const rootClassName = classNames('Popover', className, {
    ['is-open']: isOpen,
  });
  const handleClickOutSide = () => {
        onOpen(false);
        setOpen(false)
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
