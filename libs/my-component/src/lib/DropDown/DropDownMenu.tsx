import React, { useEffect, useRef } from 'react';
import PopupElement from '../Popup/PopupElement';
import { useDropDownStore } from './DropDownStoreProvider';
import { useSwitchFocus } from '../utils/hooks';
import { useEffectSkipFirstRender } from '../utils/useEffectSkipFirstRender';
import { checkIsClickOnElement } from '../utils/utils';
import { useCallback } from 'react';
import { DropDownProps } from './DropDown';

type DropDownMenuProps = {
  triggerRef: React.MutableRefObject<HTMLElement | null>;
  children: React.ReactNode;
  onPopupToggle: NonNullable<DropDownProps['onPopupToggle']>;
  placement:NonNullable<DropDownProps["popupPlacement"]>,
};

export function DropDownMenu(props: DropDownMenuProps) {
  const { triggerRef, children, onPopupToggle,placement } = props;

  const menuRef = useRef<HTMLDivElement>(null);
  const action = useDropDownStore((state) => state.action);
  const isPopupOpen = useDropDownStore((state) => state.isPopupOpen);

  useEffect(() => {
    onPopupToggle(isPopupOpen);
  }, [isPopupOpen]);

  const isMenuFocused = useDropDownStore((state) => {
    return state.isPopupOpen === true && state.highLightedItem === null;
  });

  useSwitchFocus(menuRef, isMenuFocused);

  useEffectSkipFirstRender(() => {
    if (isPopupOpen) return;
    action.highlightOne(null);
    switchFocus(triggerRef, true);
  }, [isPopupOpen]);

  const handleClickOutSidePopup = useCallback((e: MouseEvent) => {
    const el = triggerRef.current as HTMLElement;
    if (!checkIsClickOnElement(e, el)) action.togglePopup(false);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation();
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
      placement={placement}
      triggerRef={triggerRef}
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
