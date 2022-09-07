import React, { useEffect, useRef } from 'react';
import { useStore } from 'zustand';
import PopupElement from '../Popup/PopupElement';
import { useSelectStore } from './SelectStoreProvider';
import { switchFocus } from './utils';
import { useSwitchFocus } from '../utils/hooks';

interface SelectPopupProps {
  children: JSX.Element[] | JSX.Element;
  targetRef: React.MutableRefObject<any>;
}

export const SelectPopup = (props: SelectPopupProps) => {
  const { children, targetRef } = props;
  const menuRef = useRef<HTMLDivElement>(null);

  const isShowed = useSelectStore((state) => state.isPopupOpen);
  const action = useSelectStore( (state) => state.action);
  const isMenuFocused = useSelectStore((state) => {
    return state.isPopupOpen === true && state.highLightedItem === null;
  });

  const handleClickOutSide = () => {
    action.togglePopup(false);
  };

  useSwitchFocus(menuRef, isMenuFocused);
  // when popup is closed, reset the highlightedItem in store and move focus back to TextField
  useEffect(() => {
    if (isShowed) return;
    action.hightLightItem(null);
    switchFocus(targetRef, true);
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
    }
  };

  return (
    <PopupElement
      className="Select__Popup"
      targetRef={targetRef}
      placement="bottomCenter"
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
