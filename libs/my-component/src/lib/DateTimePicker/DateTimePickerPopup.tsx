import React, { useMemo, useRef } from 'react';
import { Calendar } from '../Calendar'
import PopupElement from '../Popup/PopupElement';
import { TimePanel, TimePanelProps } from '../TimePanel';
import { extractTimeFromDate } from '../utils/dateTime';
import { useDateTimePickerContext } from './DatePickerContextProvider';
import dayjs from 'dayjs';
import { DateTimePickerProps } from './DateTimePicker';
import { DatePanelSingleProps } from '../DatePanelSingle/DatePanelSingle';


interface DateTimePickerPopupProps {
  isShowed: boolean;
  targetRef: React.MutableRefObject<HTMLElement | null>;
  isSecondIncluded: boolean;
  DatePanel:NonNullable<DateTimePickerProps["DatePanel"]>,
}

export default function DateTimePickerPopup(props: DateTimePickerPopupProps) {
  const { targetRef, isShowed,DatePanel } = props;
  const { state, action } = useDateTimePickerContext();
  const ref = useRef(null);
  const handleDateChanged = (date: Date) => {
    const {hour,minute,second} = extractTimeFromDate(state.selectedDateTime);
    const newDay = dayjs(date).hour(hour).minute(minute).second(second).toDate(); 
    action.selectDate(newDay);
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

  const handleDateSelect:DatePanelSingleProps["onSelect"] = (date)=>{
    if (date === null) return;
    action.selectDate(date)
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
        {/* <Calendar selectable date={nowDate} onSelect={handleDateChanged} /> */}
        {DatePanel({dateValue:nowDate,onSelect:handleDateSelect})}
        <TimePanel 
          numberOfShowedItem={7} 
          isSecondInclude={false}  
          onTimeSelect={handleTimeSelect}
          value = {extractTimeFromDate(state.selectedDateTime)}
          />
      </div>
    </PopupElement>
  );
}

