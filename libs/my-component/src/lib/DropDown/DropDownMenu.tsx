import { range } from 'd3';
import React, { useEffect, useRef } from 'react';
import { useStore } from 'zustand';
import PopupElement from '../Popup/PopupElement';
import { useDropDownStore } from './DropDownStoreProvider';
import { useSwitchFocus } from '../utils/hooks';

type DropDownMenuProps = {
  targetRef: React.MutableRefObject<HTMLElement | null>;
  children: React.ReactNode;
};

export function DropDownMenu(props: DropDownMenuProps) {
  const { targetRef, children } = props;
  const menuRef = useRef<HTMLDivElement>(null);
  const store = useDropDownStore();
  const action = useStore(store, (state) => state.action);
  const isPopupOpen = useStore(store, (state) => state.isPopupOpen);
  const handleClickOutSidePopup = () => {
    action.togglePopup(false);
  };

  const isPopupFocus = useStore(store, (state) => {
    return state.highLightedItem === null && state.isPopupOpen === true;
  });

  useSwitchFocus(menuRef, isPopupFocus);

  useEffect(() => {
    if (isPopupOpen) return;
    action.changeHighLightItem(null);
    switchFocus(targetRef,true);
  }, [isPopupOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const key = e.key;
    switch (key) {
      case 'ArrowDown': {
        action.hightLightNextItem();
        return;
      }
      case 'ArrowUp': {
        action.hightLightPreviousItem();
        return;
      }
      case "Escape":
      case "Enter":{
        action.togglePopup(false);
  
      }
    }
  };

  return (
    <PopupElement
      className="DropDown__Popup"
      placement="bottomCenter"
      targetRef={targetRef}
      isShowed={isPopupOpen}
      padding={5}
      onClickOutside={handleClickOutSidePopup}
    >
      <div
        className="DropDown__Menu"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        ref={menuRef}
      >
        {children}
      </div>
    </PopupElement>
  );
}

function switchFocus(ref:React.MutableRefObject<HTMLElement|null>,isFocus:boolean){
  const el = ref.current;
  if (el === null) return;
  if (isFocus) {
    el.focus();
    return;
  }
  el.blur();
}