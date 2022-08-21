import React, { useMemo, useRef } from 'react';
import { Calendar } from '../Calendar';
import PopupElement from '../Popup/PopupElement';
import { TimePanel, TimePanelProps } from '../TimePanel';
import { useDateTimePickerContext } from './DatePickerContextProvider';


interface DateTimePickerPopupProps {
  isShowed: boolean;
  targetRef: React.MutableRefObject<HTMLElement | null>;
  isSecondIncluded: boolean;
}

export default function DateTimePickerPopup(props: DateTimePickerPopupProps) {
  const { targetRef, isShowed } = props;
  const { state, action } = useDateTimePickerContext();
  const ref = useRef(null);
  const handleDateChanged = (date: Date) => {
    action.selectDate(date);
    action.togglePopup(false);
  };

  const nowDate = useMemo(() => {
    return state.selectedDateTime;
  }, [state.selectedDateTime.toDateString()]);

  const handleClickOutsidePopup = () => {
    action.togglePopup(false);
  };
  const handleTimeSelect:TimePanelProps["onTimeSelect"] = (time)=>{
    action.selectTime(time);
  }

  return (
    <PopupElement
      targetRef={targetRef}
      isShowed={isShowed}
      placement="bottomLeft"
      padding={8}
      width="fit-content"
      className="DateTimePicker__Popup"
      onClickOutside={handleClickOutsidePopup}
    >
      <div className="DateTimePicker__Popup__Container">
        <Calendar selectable date={nowDate} onSelect={handleDateChanged} />
        <TimePanel 
          numberOfShowedItem={7} 
          isSecondInclude={false}  
          onTimeSelect={handleTimeSelect}
          value = {getTimeFormDate(state.selectedDateTime)}
          />
      </div>
    </PopupElement>
  );
}

function getTimeFormDate(date: Date) {
  const hour = date.getHours();
  const second = date.getSeconds();
  const minute = date.getMinutes();
  return { hour, second, minute };
}