import React from 'react';
import PopupElement from '../Popup/PopupElement';
import { TimePanel, TimePanelProps } from '../TimePanel';
import dayjs from 'dayjs';
import { useTimePickerStore } from './TimePickerStoreProvider';

interface TimePickerPopupProps {
  targetRef: React.MutableRefObject<HTMLElement | null>;
  isSecondInCluded: boolean;
  selectedTime:Date;
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
    const { hour, minute, second } = time;
    const selectedTime = dayjs()
      .hour(hour)
      .minute(minute)
      .second(second)
      .toDate();
    action.selectTime(selectedTime);
  };

  const value = getTimeFormDate(selectedTime);

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
        value={value}
      ></TimePanel>
    </PopupElement>
  );
}

function getTimeFormDate(date: Date) {
  const hour = date.getHours();
  const second = date.getSeconds();
  const minute = date.getMinutes();
  return { hour, second, minute };
}
