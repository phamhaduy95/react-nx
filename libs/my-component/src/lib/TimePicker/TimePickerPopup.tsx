import React from 'react';
import PopupElement from '../Popup/PopupElement';
import { TimePanel, TimePanelProps } from '../TimePanel';
import { useTimePickerStore } from './TimePickerStoreProvider';
import { Time } from '../TimePanel/types';
import { memo } from 'react';


interface TimePickerPopupProps {
  targetRef: React.MutableRefObject<HTMLElement | null>;
  isSecondInCluded: boolean;
}

export const TimePickerPopup = memo((props: TimePickerPopupProps)=> {
  const {
    targetRef,
    isSecondInCluded,
  } = props;

  const action = useTimePickerStore((state)=>(state.action));
  const isPopupOpen = useTimePickerStore((state)=>(state.isPopupOpen));

  const displayedTimeOnPanel = useTimePickerStore((state)=>state.selectedTime);

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
        value={displayedTimeOnPanel}
        onSubmit={handleTimeSubmit}
      ></TimePanel>
    </PopupElement>
  );
});

