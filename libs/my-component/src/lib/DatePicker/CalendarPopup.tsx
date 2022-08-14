import React, { useMemo, useRef } from 'react';
import { Calendar } from '../Calendar';
import { ClickOutSideHandler } from '../ClickOutsideWatcher/ClickOutSideHandler';
import PopupElement from '../Popup/PopupElement';
import { useDatePickerContext } from './DatePickerContextProvider';

interface CalendarPopupProps {
  isShowed: boolean;
  targetRef: React.MutableRefObject<HTMLElement | null>;
}

export default function CalendarPopup(props: CalendarPopupProps) {
  const { targetRef,isShowed } = props;
  const {state,action} = useDatePickerContext();
  const ref = useRef(null);
  const handleDateChanged = (date:Date)=>{ 
    action.selectDate(date);
    action.togglePopup(false);
  }
   
  const nowDate = useMemo(()=>{
        return state.selectedDate;
  },[state.selectedDate.toDateString()])

  const handleClickOutsidePopup = ()=>{
      action.togglePopup(false); 
  }

  return (
    <PopupElement
      targetRef={targetRef}
      isShowed={isShowed}
      placement="bottomCenter"
      width="fit-content"
      className='DatePicker__Popup'
      onClickOutside={handleClickOutsidePopup}
    >
      <Calendar selectable date={nowDate}  onSelect={handleDateChanged} />
    </PopupElement>
  );
}
