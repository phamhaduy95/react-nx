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
  const store = useSelectStore();
  const isShowed = useStore(store, (state) => state.isPopupOpen);
  const action = useStore(store, (state) => state.action);
  const isMenuFocused = useStore(store, (state) => {
    return state.isPopupOpen === true && state.highLightedItem === null;
  });

  const handleClickOutSide = () => {
    action.togglePopup(false);
  };

  useSwitchFocus(menuRef, isMenuFocused);

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
        action.hightLightNextItem();
        return;
      }
      case 'ArrowUp': {
        e.preventDefault();
        action.hightLightPreviousItem();
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
