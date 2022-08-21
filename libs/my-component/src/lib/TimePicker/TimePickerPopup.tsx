import React from 'react';
import PopupElement from '../Popup/PopupElement';
import { useTimePickerContext } from './TimePickerContext';
import { TimePanel, TimePanelProps } from '../TimePanel';
import dayjs from 'dayjs';

interface TimePickerPopupProps {
  targetRef: React.MutableRefObject<HTMLElement | null>;
  isSecondInCluded: boolean;
  disabledHour: TimePanelProps['disabledHour'];
  disabledMinute: TimePanelProps['disabledMinute'];
  disabledSecond: TimePanelProps['disabledSecond'];
}

export default function TimePickerPopup(props: TimePickerPopupProps) {
  const {
    targetRef,
    isSecondInCluded,
    disabledHour,
    disabledMinute,
    disabledSecond,
  } = props;
  const { state, action } = useTimePickerContext();

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

  const value = getTimeFormDate(state.selectTime);

  return (
    <PopupElement
      targetRef={targetRef}
      isShowed={state.isPopupOpen}
      placement="bottomLeft"
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
        disabledHour={disabledHour}
        disabledMinute={disabledMinute}
        disabledSecond={disabledSecond}
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
