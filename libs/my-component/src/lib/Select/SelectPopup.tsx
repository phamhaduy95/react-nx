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
      targetRef={targetRef}
      placement="bottomCenter"
      padding={5}
      isShowed={isShowed}
    >
      {children}
    </PopupElement>
  );
};
