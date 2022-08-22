import React, { useMemo, useRef } from 'react';

import { ClickOutSideHandler } from '../ClickOutsideWatcher/ClickOutSideHandler';
import { DatePanelSingle } from '../DatePanelSingle';
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
    action.togglePopup(false)
  }
  
  const handlePanelClickToSelect = (date:Date)=>{
    
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
      padding={8}
    >
      <DatePanelSingle 
        dateValue={nowDate} 
        // onSelect={handleDateChanged}
        onClickToSelect={handleDateChanged}
        />
      {/* <Calendar selectable date={nowDate}  onSelect={handleDateChanged} /> */}
    </PopupElement>
  );
}
