import React, { useEffect, useRef } from 'react';
import PopupElement from '../Popup/PopupElement';
import { useDropDownStore } from './DropDownStoreProvider';
import { useSwitchFocus } from '../utils/hooks';
import classNames from 'classnames';

type DropDownMenuProps = {
  targetRef: React.MutableRefObject<HTMLElement | null>;
  children: React.ReactNode;
};

export function DropDownMenu(props: DropDownMenuProps) {
  const { targetRef, children } = props;
  
  const menuRef = useRef<HTMLDivElement>(null);
  const action = useDropDownStore((state) => state.action);
  const isPopupOpen = useDropDownStore((state) => state.isPopupOpen);
  const handleClickOutSidePopup = () => {
    action.togglePopup(false);
  };
  const isMenuFocused = useDropDownStore((state) => {
    return state.isPopupOpen === true && state.highLightedItem === null;
  });

  useSwitchFocus(menuRef, isMenuFocused);

  useEffect(() => {
    if (isPopupOpen) return;
    action.highlightOne(null);
    switchFocus(targetRef, true);
  }, [isPopupOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.preventDefault();
    const key = e.key;
    switch (key) {
      case 'ArrowDown': {
        action.highlightNext();
        return;
      }
      case 'ArrowUp': {
        action.highlightPrev();
        return;
      }
      case 'Escape':
      case 'Enter': {
        action.togglePopup(false);
      }
    }
  };

  return (
    <PopupElement
      className="DropDown__Popup"
      placement="bottomLeft"
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

function switchFocus(
  ref: React.MutableRefObject<HTMLElement | null>,
  isFocus: boolean
) {
  const el = ref.current;
  if (el === null) return;
  if (isFocus) {
    el.focus();
    return;
  }
  el.blur();
}
