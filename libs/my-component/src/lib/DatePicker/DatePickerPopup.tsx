import React, { useEffect } from 'react';
import PopupElement from '../Popup/PopupElement';
import { DatePickerProps } from './DatePicker';
import { useDatePickerStore } from './DatePickerStoreProvider';

interface DatePickerPopup {
  targetRef: React.MutableRefObject<HTMLElement | null>;
  PanelComponent: NonNullable<DatePickerProps['PanelComponent']>;
  disabledDate: NonNullable<DatePickerProps['disabledDate']>;
}

export default function DatePickerPopup(props: DatePickerPopup) {
  const { targetRef, PanelComponent, disabledDate } = props;

  const isPopupOpen = useDatePickerStore((state) => state.isPopupOpen);
  const action = useDatePickerStore((state) => state.action);
  
  const selectedDate = useDatePickerStore(
    (state) => state.selectedDate,
    (a, b) => {
      return a?.toDateString() === b?.toDateString();
    }
  );

  const submittedDate = useDatePickerStore(
    (state) => state.submittedDate,
    (a, b) => {
      return a?.toDateString() === b?.toDateString();
    }
  );
 
  const getDisplayDate = () => {
    if (!isPopupOpen) return submittedDate;
    if (selectedDate === null) return submittedDate;
    return selectedDate;
  };

  const handleClickOutsidePopup = () => {
    action.togglePopup(false);
  };
  const handleDateChanged = (date: Date | null) => {
    action.selectDate(date);
    // action.togglePopup(false);
  };

  const handleDateSubmit = (date: Date | null) => {
    action.submitDate(date);
    action.togglePopup(false);
  };

  const handleDateClear = ()=>{
    action.selectDate(null);
    action.submitDate(null)
  }

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
      {PanelComponent({
        dateValue: getDisplayDate(),
        onSelect: handleDateChanged,
        disabledDate,
        onSubmit: handleDateSubmit,
        onClear:handleDateClear
      })}
    </PopupElement>
  );
}
