import React, {  } from 'react';
import PopupElement from '../Popup/PopupElement';
import { DatePickerProps } from './DatePicker';
import { useDatePickerStore } from './DatePickerStoreProvider';

interface DatePickerPopup {
  targetRef: React.MutableRefObject<HTMLElement | null>,
  PanelComponent: NonNullable<DatePickerProps['PanelComponent']>,
  disabledDate:NonNullable<DatePickerProps["disabledDate"]>,
}

export default function DatePickerPopup(props: DatePickerPopup) {
  const { targetRef, PanelComponent,disabledDate } = props;

  const isPopupOpen = useDatePickerStore((state)=>(state.isPopupOpen));
  const action = useDatePickerStore((state)=>(state.action));

  const handleDateChanged = (date: Date|null) => {
    action.selectDate(date);
    // action.togglePopup(false);
  };


  const nowDate =  useDatePickerStore((state) => state.selectedDate,(a,b)=>{
    return a?.toDateString() === b?.toDateString()
  });

  const handleClickOutsidePopup = () => {
    action.togglePopup(false);
  };

  return (
    <PopupElement
      triggerRef={targetRef}
      isShowed={isPopupOpen}
      placement="bottom-center"
      width="fit-content"
      className="DatePicker__Popup"
      onClickOutside={handleClickOutsidePopup}
      padding={8}
    >
      {PanelComponent({dateValue:nowDate,onSelect:handleDateChanged,disabledDate})}
    </PopupElement>
  );
}
