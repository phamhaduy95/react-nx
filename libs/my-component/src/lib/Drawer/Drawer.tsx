import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ClickOutSideWatcher } from '../ClickOutsideWatcher';
import { useEffectSkipFirstRender } from '../utils/useEffectSkipFirstRender';
import { DrawerStoreProvider, useDrawerStore } from './DrawerStoreProvider';
import './Drawer.scss';

export type DrawerProps = {
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  forceMouth?: boolean;
  onToggle?: (isOpen: boolean) => void;
  children: JSX.Element[] | JSX.Element;
  isOpen: boolean;
};

const defaultProps: Required<Omit<DrawerProps, 'children'>> = {
  className: '',
  onToggle: () => {},
  forceMouth: false,
  position: 'right',
  isOpen: false,
};

export function Drawer(props: DrawerProps) {
  return (
    <DrawerStoreProvider>
      <WrappedDrawer {...props} />
    </DrawerStoreProvider>
  );
}

export function WrappedDrawer(props: DrawerProps) {
  const newProps = { ...defaultProps, ...props };
  const {
    position,
    onToggle,
    forceMouth,
    className,
    children,
    isOpen: openSignal,
  } = newProps;
  const action = useDrawerStore((state) => state.action);
  const isShowed = useDrawerStore((state) => state.isOpen);
  const popupRef = useRef(null);
  const rootClassName = classNames('Drawer', className, {
    ['is-open']: isShowed,
  });
  const popupClassName = classNames('Drawer__Popup', `--${position}`);

  useEffect(() => {
    if (openSignal) action.toggleOpen(true);
  }, [openSignal]);

  // trigger onToggle when internal state isOpen changes
  useEffectSkipFirstRender(() => {
    onToggle(isShowed);
  }, [isShowed]);


  const positionStyle = positionDrawerPopup(position);
  const handleClickOutsidePopup = () => {
    action.toggleOpen(false);
  };

  return (
    <DrawerPortal isShowed={isShowed} forceMount={forceMouth}>
      <div className={rootClassName}>
        <ClickOutSideWatcher
          ref={popupRef}
          onClickOutSide={handleClickOutsidePopup}
        >
          <div className={popupClassName} style={positionStyle} ref={popupRef}>
            {children}
          </div>
        </ClickOutSideWatcher>
      </div>
    </DrawerPortal>
  );
}

type ModalPortalProps = {
  isShowed: boolean;
  forceMount: boolean;
  children: JSX.Element;
};

function DrawerPortal(props: ModalPortalProps) {
  const { isShowed, forceMount, children } = props;
  if (forceMount && !isShowed) return <></>;
  return createPortal(children, document.body);
}

function positionDrawerPopup(
  position: NonNullable<DrawerProps['position']>
): React.CSSProperties {
  switch (position) {
    case 'bottom': {
      return { bottom: 0, width: '100%' };
    }
    case 'top': {
      return { top: 0, width: '100%' };
    }
    case 'left': {
      return { left: 0,height:"100%" };
    }
    case 'right': {
      return { right: 0,height:"100%" };
    }
  }
}
