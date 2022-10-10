import React, { useEffect, useRef } from 'react';
import PopupElement from '../Popup/PopupElement';
import { useSelectStore } from './SelectStoreProvider';
import { switchFocus } from './utils';
import { useSwitchFocus } from '../utils/hooks';
import { checkIsClickOnElement } from '../utils/utils';

interface SelectPopupProps {
  children: JSX.Element[] | JSX.Element;
  targetRef: React.MutableRefObject<any>;
}

export const SelectPopup = (props: SelectPopupProps) => {
  const { children, targetRef } = props;
  const menuRef = useRef<HTMLDivElement>(null);

  const isShowed = useSelectStore((state) => state.isPopupOpen);
  const action = useSelectStore((state) => state.action);
  const isMenuFocused = useSelectStore((state) => {
    return state.isPopupOpen === true && state.highLightedItem === null;
  });

  useSwitchFocus(menuRef, isMenuFocused);
  // when popup is closed, reset the highlightedItem in store and move focus back to TextField
  useEffect(() => {
    const textFieldEl = targetRef.current as HTMLElement;
    if (isShowed) return;
    action.highlightOne(null);
    const inputEl = textFieldEl.querySelector('input') as HTMLElement;
    switchFocus(inputEl, true);
  }, [isShowed]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const key = e.key;
    switch (key) {
      case 'ArrowDown': {
        e.preventDefault();
        action.highlightNext();
        return;
      }
      case 'ArrowUp': {
        e.preventDefault();
        action.highlightPrev();
        return;
      }
      case 'Enter': {
        action.togglePopup(false);
        return;
      }
      case 'Escape': {
        action.togglePopup(false);
        return;
      }
      case 'Tab': {
        action.togglePopup(false);
        return;
      }
    }
  };

  const handleClickOutSide = (e: MouseEvent) => {
    const el = targetRef.current as HTMLElement;
    if (!checkIsClickOnElement(e, el)) action.togglePopup(false);
  };

  return (
    <PopupElement
      className="Select__Popup"
      triggerRef={targetRef}
      placement="bottom-center"
      padding={8}
      isShowed={isShowed}
      width="auto"
      onClickOutside={handleClickOutSide}
    >
      <div
        className="Select__Menu"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        ref={menuRef}
      >
        {children}
      </div>
    </PopupElement>
  );
};
