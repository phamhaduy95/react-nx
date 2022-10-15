import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';
import ClickOutSideWatcher from '../ClickOutsideWatcher/ClickOutSideWatcher';
import classNames from 'classnames';
import { usePopupMenuStore } from './PopupMenuStoreProvider';
import './PopupMenu.scss';

type ContextMenuPopupProps = {
  targetRef: React.MutableRefObject<HTMLElement | null>;
  className?: string;
  children: JSX.Element[] | JSX.Element;
};

const defaultProps: Omit<Required<ContextMenuPopupProps>, 'targetRef'> = {
  children: <></>,
  className: '',
};

export const PopupMenu = forwardRef<
  HTMLDivElement | null,
  ContextMenuPopupProps
>((props, ref) => {
  const newProps = { ...defaultProps, ...props };
  const { targetRef, className, children } = newProps;
  const action = usePopupMenuStore((state) => state.action);
  const isOpen = usePopupMenuStore((state) => state.isPopupOpen);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const PopupClassName = classNames('PopupMenu', className, {
    [`is-showed`]: isOpen,
  });

  useImperativeHandle(ref, () => {
    return popupRef.current as HTMLDivElement;
  });
  // hide the context menu when window is scrolling
  useEffect(() => {
    const popupEl = popupRef.current;
    if (popupEl === null) return;
    const callback = () => {
      action.togglePopup(false);
    };
    window.addEventListener('scroll', callback);
    return () => {
      window.removeEventListener('scroll', callback);
    };
  }, []);
  // show ContextMenu Popup when  right clicked
  useEffect(() => {
    const targetEl = targetRef.current;
    if (targetEl === null) return;
    const callback = () => {
      action.togglePopup(true);
      action.highlightOne(null);
    };
    targetEl.addEventListener('contextmenu', callback);
    return () => {
      targetEl.removeEventListener('contextmenu', callback);
    };
  }, []);
  // set highlight item is null when
  useEffect(() => {
    if (!isOpen) action.highlightOne(null);
  }, [isOpen]);

  const handleClickOutSide = useCallback(() => {
    action.togglePopup(false);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const key = e.key;
    switch (key) {
      case 'Escape': {
        action.togglePopup(false);
        return;
      }
      case 'ArrowRight':
      case 'ArrowDown': {
        e.preventDefault();
        action.highlightNext();
        return;
      }
      case 'ArrowLeft':
      case 'ArrowUp': {
        e.preventDefault();
        action.highlightPrev();
        return;
      }
    }
  };

  return createPortal(
    <ClickOutSideWatcher ref={ref} onClickOutSide={handleClickOutSide}>
      <div
        className={PopupClassName}
        ref={popupRef}
        onContextMenu={(e) => {
          e.preventDefault();
        }}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>
    </ClickOutSideWatcher>,
    document.body
  );
});
