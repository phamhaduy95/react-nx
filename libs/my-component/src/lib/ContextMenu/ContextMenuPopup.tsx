import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import ClickOutSideWatcher from '../ClickOutsideWatcher/ClickOutSideWatcher';
import classNames from 'classnames';
import { useContextMenuStore } from './ContextMenuStoreProvider';
import { Placement, useContextMenuPlacement } from './useContextMenuPlacement';

type ContextMenuPopupProps = {
  targetRef: React.MutableRefObject<HTMLElement | null>;
  className: string;
  initialPlacement: Placement;
  children: JSX.Element[];
};

export function ContextMenuPopup(props: ContextMenuPopupProps) {
  const { targetRef, className, initialPlacement, children } = props;
  const action = useContextMenuStore((state) => state.action);
  const isOpen = useContextMenuStore((state) => state.isPopupOpen);
  const popupRef = useRef<HTMLDivElement>(null);
  useContextMenuPlacement(targetRef, popupRef, initialPlacement,()=>{
    action.highlightOne(null);
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
    };
    targetEl.addEventListener('contextmenu', callback);
    return () => {
      targetEl.removeEventListener('contextmenu', callback);
    };
  }, []);
  // set highlight item is null when
  useEffect(() => {
    if (!isOpen) 
    action.highlightOne(null);
  }, [isOpen]);

  const PopupClassName = classNames('ContextMenu', { [`is-showed`]: isOpen });

  const handleClickOutSide = () => {
    action.togglePopup(false);
  };

  const handleKeyDown = (e:React.KeyboardEvent)=>{
    const key = e.key;
    switch(key){
      case "Escape":{
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
  }

  return createPortal(
    <ClickOutSideWatcher ref={popupRef} onClickOutSide={handleClickOutSide}>
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
}


