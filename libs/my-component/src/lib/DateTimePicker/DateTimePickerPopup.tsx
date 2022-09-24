import React, { memo, useCallback } from 'react';
import PopupElement from '../Popup/PopupElement';
import { TimePanel, TimePanelProps } from '../TimePanel';
import { extractTimeFromDate } from '../utils/dateTime';
import { DateTimePickerProps } from './DateTimePicker';
import { DatePanelProps } from '../DatePanelSingle/DatePanelSingle';
import { CalendarProps } from '../Calendar/Calendar';
import { useDateTimePickerStore } from './DateTimePickerStoreProvider';
import { checkIsClickOnElement } from '../utils/utils';

interface DateTimePickerPopupProps {
  triggerRef: React.MutableRefObject<HTMLElement | null>;
  isSecondIncluded: boolean;
  DatePanel: NonNullable<DateTimePickerProps['DatePanel']>;
  disabledDate: CalendarProps['disabledDate'];
}

export const DateTimePickerPopup =memo((props: DateTimePickerPopupProps)=>{
  const { triggerRef, DatePanel, disabledDate } = props;
  const action = useDateTimePickerStore((state) => state.action);
  const isOpen = useDateTimePickerStore((state) => state.isPopupOpen);
  const displayDateTime = useDateTimePickerStore(
    (state) => {
      return state.selectedDate;
    },
    (a, b) => a?.toString() === b?.toString()
  );

    console.log("popup rendered")

  const handleClickOutsidePopup = useCallback((e: MouseEvent) => {
    const el = triggerRef.current as HTMLElement;
    if (!checkIsClickOnElement(e, el)) action.togglePopup(false);
  }, []);

  const handleTimeSelect: TimePanelProps['onTimeSelect'] = (time) => {
    action.selectTime(time);
  };

  const handleDateSelect: DatePanelProps['onSelect'] = (date) => {
    action.selectDate(date);
  };

  const handleClearDate = () => {
    action.selectDate(null);
    action.submitDate(null);
  };

  const handleDateSubmit = () => {
    action.submitDate(displayDateTime);
    action.togglePopup(false);
  };

  return (
    <PopupElement
      triggerRef={triggerRef}
      isShowed={isOpen}
      placement="bottom-left"
      padding={8}
      width="fit-content"
      className="DateTimePicker__Popup"
      onClickOutside={handleClickOutsidePopup}
    >
      <div className="DateTimePicker__Popup__Container">
        {DatePanel({
          dateValue: displayDateTime,
          onSelect: handleDateSelect,
          disabledDate: disabledDate,
          className: 'DateTimePicker__DatePanel',
          actionEnabled: false,
        })}
        <TimePanel
          className="DateTimePicker__TimePanel"
          numberOfShowedItem={7}
          isSecondInclude={false}
          onTimeSelect={handleTimeSelect}
          value={getValueForTimePanel(displayDateTime)}
          actionIncluded={false}
        />
      </div>
      <div className="DateTimePicker__Control">
        <button
          className="DateTimePicker__ClearButton"
          onClick={handleClearDate}
        >
          Clear
        </button>
        <button
          className="DateTimePicker__SubmitButton"
          onClick={handleDateSubmit}
        >
          OK
        </button>
      </div>
    </PopupElement>
  );
});

const getValueForTimePanel = (date: Date | null) => {
  if (date === null) return null;
  const { hour, minute, second } = extractTimeFromDate(date);
  return { hour, minute, second };
};
