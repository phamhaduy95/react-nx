import React from 'react';
import PopupElement from '../Popup/PopupElement';
import { useSelectContext } from './SelectContextProvider';

interface SelectPopupProps {
  children: JSX.Element[] | JSX.Element;
  isShowed: boolean;
  targetRef: React.MutableRefObject<any>;
}

export const SelectPopup = (props: SelectPopupProps) => {
  const { children, isShowed, targetRef } = props;
  const {state,action} = useSelectContext();
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
