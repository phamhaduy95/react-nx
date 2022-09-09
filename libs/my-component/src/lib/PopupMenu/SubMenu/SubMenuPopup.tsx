import React, { useEffect, useRef } from 'react';
import { useSubMenuStore } from './SubMenuStoreProvider';
import classNames from 'classnames';
import { useSwitchFocus } from '../../utils/hooks';
import { useSubMenuPlacement } from './useSubMenuPlacement';

type SubMenuProps = {
  children: JSX.Element[] | JSX.Element;
  triggerRef: React.MutableRefObject<HTMLElement | null>;
};

export function SubMenuPopup(props: SubMenuProps) {
  const { children, triggerRef } = props;
  const popupRef = useRef<HTMLDivElement>(null);
  const action = useSubMenuStore((state) => state.action);
  const isOpen = useSubMenuStore((state) => state.isPopupOpen);

  useSubMenuPlacement(triggerRef, popupRef, isOpen);
  // set highlight item is null when
  useEffect(() => {
    if (!isOpen) action.highlightOne(null);
  }, [isOpen]);

  const isMenuFocused = useSubMenuStore((state) => {
    return state.isPopupOpen === true && state.highLightedItem === null;
  });

  useSwitchFocus(popupRef, isMenuFocused);

  const rootClassName = classNames('PopupMenu__SubMenu__Popup', {
    [`is-showed`]: isOpen,
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation();
    const key = e.key;
    switch (key) {
      case 'Escape': {
        action.togglePopup(false);
        return;
      }
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
      case 'ArrowLeft': {
        e.preventDefault();
        action.togglePopup(false);
      }
    }
  };

  return (
    <div
      className={rootClassName}
      ref={popupRef}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="SubMenu__Menu">{children}</div>
    </div>
  );
}
