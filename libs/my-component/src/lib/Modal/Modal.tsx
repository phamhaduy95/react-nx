import React, { useCallback, useEffect, useRef } from 'react';
import ClickOutSideWatcher from '../ClickOutsideWatcher/ClickOutSideWatcher';
import { createPortal } from 'react-dom';
import { ModalStoreProvider, useModalStore } from './ModalStoreProvider';
import './Modal.scss';
import { useEffectSkipFirstRender } from '../utils/useEffectSkipFirstRender';
import classNames from 'classnames';
import {GlobalStyleProvider} from '../GlobalStyleProvider';

export type ModalProps = {
  children: JSX.Element[] | JSX.Element;
  className?: string;
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
  timeToExpire?: number;
  closeIcon?: React.ReactNode | false;
  forceMount?: boolean;
  clickOutsideToClose?: boolean;
};

const defaultPropsValue: Required<Omit<ModalProps, 'children'>> = {
  className: '',
  isOpen: false,
  onToggle(isOpen) {},
  timeToExpire: 0,
  closeIcon: true,
  forceMount: false,
  clickOutsideToClose: true,
};

export function Modal(props: ModalProps) {
  return (
    <GlobalStyleProvider>
      <ModalStoreProvider>
        <WrappedModal {...props} />
      </ModalStoreProvider>
    </GlobalStyleProvider>
  );
}

function WrappedModal(props: ModalProps) {
  const newProps = { ...defaultPropsValue, ...props };
  const {
    children,
    className,
    isOpen: openSignal,
    onToggle,
    timeToExpire,
    forceMount,
    closeIcon,
    clickOutsideToClose,
  } = newProps;
  // provide default value incase no user input for these properties
  const action = useModalStore((state) => state.action);
  const isOpen = useModalStore((state) => state.isOpen);
  const ref = useRef(null);
  const modalRef = useRef<HTMLDivElement>(null);
  // make Modal open when the outside signal isOpen is on.
  useEffect(() => {
    action.toggleOpen(openSignal);
  }, [openSignal]);

  // trigger onToggle when internal state isOpen changes
  useEffectSkipFirstRender(() => {
    onToggle(isOpen);
  }, [isOpen]);

  // set automatic turn-off feature when time is expired
  useEffect(() => {
    if (timeToExpire === 0 || timeToExpire === undefined) return;
    if (isOpen) {
      setTimeout(() => {
        action.toggleOpen(false);
      }, timeToExpire);
    }
  }, [isOpen, timeToExpire]);

  const rootClassName = classNames('Modal', className, {
    ['is-open']: isOpen,
  });

  const handleClickOutSide = useCallback(() => {
    if (!clickOutsideToClose) return;
    action.toggleOpen(false);
  }, [clickOutsideToClose]);

  const handleCloseModal = () => {
    action.toggleOpen(false);
  };

  const renderCloseIcon = () => {
    if (closeIcon)
      return (
        <div className="Modal__CloseIcon" onClick={handleCloseModal}>
          {closeIcon}
        </div>
      );
    return <></>;
  };

  useEffect(() => {
    const el = modalRef.current;
    if (el === null) return;
    if (isOpen) {
      document.body.style.setProperty('overflow', 'hidden');
      document.body.style.setProperty('overscroll-behavior', 'contain');
      return;
    }
    document.body.style.overflow = '';
  }, [isOpen]);

  const handleScroll = (e: React.UIEvent) => {
    if (isOpen) e.preventDefault();
  };

  return (
    <ModalPortal forceMount={forceMount} isShowed={isOpen}>
      <div className={rootClassName} ref={modalRef} onScroll={handleScroll}>
        <ClickOutSideWatcher ref={ref} onClickOutSide={handleClickOutSide}>
          <div className="Modal__Dialog" ref={ref}>
            {renderCloseIcon()}
            {children}
          </div>
        </ClickOutSideWatcher>
      </div>
    </ModalPortal>
  );
}
type ModalPortalProps = {
  isShowed: boolean;
  forceMount: boolean;
  children: JSX.Element;
};

function ModalPortal(props: ModalPortalProps) {
  const { isShowed, forceMount, children } = props;
  if (forceMount && !isShowed) return <></>;
  return createPortal(children, document.body);
}
