import React from 'react';
import PopupElement from '../Popup/PopupElement';

interface SelectPopupProps {
  children: JSX.Element[] | JSX.Element;
  isShowed: boolean;
  targetRef: React.MutableRefObject<any>;
}

export const SelectPopup = (props: SelectPopupProps) => {
  const { children, isShowed, targetRef } = props;
  return (
    <PopupElement
      className='Select__Popup'
      targetRef={targetRef}
      placement="bottomCenter"
      padding={8}
      isShowed={isShowed}
      width="auto"
    >
      {children}
    </PopupElement>
  );
};
