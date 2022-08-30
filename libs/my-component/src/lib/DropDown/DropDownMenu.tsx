import { range } from 'd3';
import React, { useEffect } from 'react';
import { useStore } from 'zustand';
import PopupElement from '../Popup/PopupElement';
import { useDropDownStore } from './DropDownStoreProvider';
import { PopupElementProps } from '../Popup/PopupElement';

type DropDownMenuProps = {
  targetRef: React.MutableRefObject<HTMLElement | null>;
  children: React.ReactNode;
};

export function DropDownMenu(props: DropDownMenuProps) {
  const { targetRef, children } = props;
  const store = useDropDownStore();
  const action = useStore(store, (state) => state.action);
  const isPopupOpen = useStore(store, (state) => state.isPopupOpen);
  const handleClickOutSidePopup = () => {
    action.togglePopup(false);
  };

  useEffect(()=>{
    if (isPopupOpen) return;
    action.changeHighLightItem(null);

  },[isPopupOpen])


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
        // onKeyDown={handleKeyPressed}
   
      >
        {children}
      </div>
    </PopupElement>
  );
}
