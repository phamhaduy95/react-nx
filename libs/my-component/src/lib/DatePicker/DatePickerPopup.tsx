import React, { useMemo, useRef } from 'react';
import PopupElement from '../Popup/PopupElement';
import { useDatePickerContext } from './DatePickerContextProvider';
import { DatePickerProps } from './DatePicker';

interface DatePickerPopup {
  isShowed: boolean,
  targetRef: React.MutableRefObject<HTMLElement | null>,
  PanelComponent: NonNullable<DatePickerProps['PanelComponent']>,
  disabledDate:NonNullable<DatePickerProps["disabledDate"]>,
}

export default function DatePickerPopup(props: DatePickerPopup) {
  const { targetRef, isShowed, PanelComponent,disabledDate } = props;
  const { state, action } = useDatePickerContext();
  const handleDateChanged = (date: Date|null) => {
    action.selectDate(date);
    action.togglePopup(false);
  };

  const handlePanelClickToSelect = (date: Date|null) => {};

  const nowDate = useMemo(() => {
    return state.selectedDate;
  }, [state.selectedDate?.toDateString()]);

  const handleClickOutsidePopup = () => {
    action.togglePopup(false);
  };

  return (
    <PopupElement
      targetRef={targetRef}
      isShowed={isShowed}
      placement="bottomCenter"
      width="fit-content"
      className="DatePicker__Popup"
      onClickOutside={handleClickOutsidePopup}
      padding={8}
    >
      {PanelComponent({dateValue:nowDate,onSelect:handleDateChanged,disabledDate})}
    </PopupElement>
  );
}
