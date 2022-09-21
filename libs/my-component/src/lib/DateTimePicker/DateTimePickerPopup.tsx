import React, { useMemo, useRef } from 'react';
import PopupElement from '../Popup/PopupElement';
import { TimePanel, TimePanelProps } from '../TimePanel';
import { extractTimeFromDate } from '../utils/dateTime';
import { useDateTimePickerContext } from './DatePickerContextProvider';
import { DateTimePickerProps } from './DateTimePicker';
import { DatePanelSingleProps } from '../DatePanelSingle/DatePanelSingle';
import { CalendarProps } from '../Calendar/Calendar';

interface DateTimePickerPopupProps {
  isShowed: boolean;
  targetRef: React.MutableRefObject<HTMLElement | null>;
  isSecondIncluded: boolean;
  DatePanel: NonNullable<DateTimePickerProps['DatePanel']>;
  disabledDate: CalendarProps['disabledDate'];
}

export function DateTimePickerPopup(props: DateTimePickerPopupProps) {
  const { targetRef, isShowed, DatePanel, disabledDate } = props;
  const { state, action } = useDateTimePickerContext();
  const ref = useRef(null);

  const nowDate = useMemo(() => {
    return state.selectedDateTime;
  }, [state.selectedDateTime?.toDateString()]);

  const handleClickOutsidePopup = () => {
    action.togglePopup(false);
  };
  const handleTimeSelect: TimePanelProps['onTimeSelect'] = (time) => {
    action.selectTime(time);
  };

  const handleDateSelect: DatePanelSingleProps['onSelect'] = (date) => {
    if (date === null) return;
    action.selectDate(date);
  };

  const getValueForTimePanel = () => {
    if (state.selectedDateTime === null) return null;
    const { hour, minute, second } = extractTimeFromDate(
      state.selectedDateTime
    );
    return { hour, minute, second };
  };

  return (
    <PopupElement
      triggerRef={targetRef}
      isShowed={isShowed}
      placement="bottom-left"
      padding={8}
      width="fit-content"
      className="DateTimePicker__Popup"
      onClickOutside={handleClickOutsidePopup}
    >
      <div className="DateTimePicker__Popup__Container">
        {/* <Calendar selectable date={nowDate} onSelect={handleDateChanged} /> */}
        {DatePanel({
          dateValue: nowDate,
          onSelect: handleDateSelect,
          disabledDate: disabledDate,
          className: 'DateTimePicker__Panel',
        })}
        <TimePanel
          numberOfShowedItem={7}
          isSecondInclude={false}
          onTimeSelect={handleTimeSelect}
          value={getValueForTimePanel()}
        />
      </div>
    </PopupElement>
  );
}
