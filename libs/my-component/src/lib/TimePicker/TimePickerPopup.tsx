import React from 'react';
import PopupElement from '../Popup/PopupElement';
import { TimePanel, TimePanelProps } from '../TimePanel';
import { useTimePickerStore } from './TimePickerStoreProvider';
import { Time } from '../TimePanel/types';
import shallow from 'zustand/shallow';

interface TimePickerPopupProps {
  targetRef: React.MutableRefObject<HTMLElement | null>;
  isSecondInCluded: boolean;
  selectedTime:Time|null;
}

export default function TimePickerPopup(props: TimePickerPopupProps) {
  const {
    targetRef,
    isSecondInCluded,
    selectedTime
  } = props;

  const action = useTimePickerStore((state)=>(state.action));
  const isPopupOpen = useTimePickerStore((state)=>(state.isPopupOpen));

  

  const handleClickOutsidePopup = () => {
    action.togglePopup(false);
  };

  const handleTimeSelect: TimePanelProps['onTimeSelect'] = (time) => {
    action.selectTime(time);
  };

  const handleTimeSubmit:TimePanelProps["onSubmit"] = (time)=>{
    action.submitTime(time)
    action.togglePopup(false);
  }

  return (
    <PopupElement
      triggerRef={targetRef}
      isShowed={isPopupOpen}
      placement="bottom-left"
      width="fit-content"
      className="TimePicker__Popup"
      onClickOutside={handleClickOutsidePopup}
    >
      <TimePanel
        className="TimePicker__TimePanel"
        isSecondInclude={isSecondInCluded}
        numberOfShowedItem={7}
        onTimeSelect={handleTimeSelect}
        value={selectedTime}
        onSubmit={handleTimeSubmit}
      ></TimePanel>
    </PopupElement>
  );
}

