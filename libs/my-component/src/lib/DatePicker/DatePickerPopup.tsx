import React, { memo, useEffect } from 'react';
import PopupElement from '../Popup/PopupElement';
import { DatePickerProps } from './DatePicker';
import { useDatePickerStore } from './DatePickerStoreProvider';
import { useEffectSkipFirstRender } from '../utils/useEffectSkipFirstRender';

interface DatePickerPopup {
  targetRef: React.MutableRefObject<HTMLElement | null>;
  PanelComponent: NonNullable<DatePickerProps['PanelComponent']>;
  disabledDate: NonNullable<DatePickerProps['disabledDate']>;
  onClickOutSide:(e:MouseEvent)=>void;
  onPopupToggle:NonNullable<DatePickerProps["onPopupToggle"]>;
}

export const DatePickerPopup = memo((props: DatePickerPopup)=>{
  const { targetRef, PanelComponent, disabledDate,onClickOutSide,onPopupToggle } = props;

  const isPopupOpen = useDatePickerStore((state) => state.isPopupOpen);
  const action = useDatePickerStore((state) => state.action);
  

  const displayedDateOnPanel = useDatePickerStore((state)=>{
    const { isPopupOpen, selectedDate, submittedDate } = state;
    if (!isPopupOpen) return submittedDate;
    return selectedDate;
  },(a, b) => {
    return a?.toDateString() === b?.toDateString();
  })

  useEffectSkipFirstRender(()=>{
      onPopupToggle(isPopupOpen);
  },[isPopupOpen])

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
      onClickOutside={onClickOutSide}
      padding={8}
    >
      {PanelComponent({
        dateValue: displayedDateOnPanel,
        onSelect: handleDateChanged,
        disabledDate,
        onSubmit: handleDateSubmit,
        onClear:handleDateClear
      })}
    </PopupElement>
  );
});
