import React from 'react';
import { useStore } from 'zustand';
import PopupElement from '../Popup/PopupElement';
import { useSelectStore } from './SelectStoreProvider';

interface SelectPopupProps {
  children: JSX.Element[] | JSX.Element;
  targetRef: React.MutableRefObject<any>;
}

export const SelectPopup = (props: SelectPopupProps) => {
  const { children, targetRef } = props;
  const store = useSelectStore();
  const isShowed = useStore(store,(state)=>state.isPopupOpen);
  const action = useStore(store,(state)=>state.action);
  const handleClickOutSide = ()=>{
    action.togglePopup(false)
  }

  
  return (
    <PopupElement
      className='Select__Popup'
      targetRef={targetRef}
      placement="bottomCenter"
      padding={8}
      isShowed={isShowed}
      width="auto"
      onClickOutside={handleClickOutSide}
    >
      {children}
    </PopupElement>
  );
};
