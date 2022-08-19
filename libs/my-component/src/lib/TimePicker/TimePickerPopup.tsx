import React from 'react';
import PopupElement from '../Popup/PopupElement';
import {TimePickerHourColumn} from './TimePickerHourColumn';
import { TimePickerMinuteColumn } from './TimePickerMinuteColumn';
import { useTimePickerContext } from './TimePickerContext';
import { TimePickerSecondColumn } from './TimePickerSecondColumn';

interface TimePickerPopupProps {
  targetRef: React.MutableRefObject<HTMLElement | null>;
  isSecondInCluded:boolean,
}

export default function TimePickerPopup(props: TimePickerPopupProps) {
  const { targetRef,isSecondInCluded } = props;
  const {state,action} = useTimePickerContext();

  const handleClickOutsidePopup = ()=>{
      action.togglePopup(false);
  }

  const renderColumnForSecond = ()=>{
    if (isSecondInCluded) return (
      <TimePickerSecondColumn/>
    )
    return <></>
  }


  return (
    <PopupElement
      targetRef={targetRef}
      isShowed={state.isPopupOpen}
      placement="bottomLeft"
      width="fit-content"
      className="TimePicker__Popup"
      onClickOutside={handleClickOutsidePopup}
    >
      <div className="TimePicker__Popup__TimeColumns">
        <TimePickerHourColumn />
        <TimePickerMinuteColumn  />
        {renderColumnForSecond()}
      </div>
    </PopupElement>
  );
}
