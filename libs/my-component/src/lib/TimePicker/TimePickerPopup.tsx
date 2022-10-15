import React from 'react';
import PopupElement from '../Popup/PopupElement';
import { TimePanel, TimePanelProps } from '../TimePanel';
import { useTimePickerStore } from './TimePickerStoreProvider';
import { memo } from 'react';
import { checkIsClickOnElement } from '../utils/utils';
import { useEffectSkipFirstRender } from '../utils/useEffectSkipFirstRender';
import { TimePickerProps } from './TimePicker';

interface TimePickerPopupProps {
  targetRef: React.MutableRefObject<HTMLElement | null>;
  isSecondInCluded: boolean;
  onPopupToggle: NonNullable<TimePickerProps['onPopupToggle']>;
}

export const TimePickerPopup = memo((props: TimePickerPopupProps) => {
  const { targetRef, isSecondInCluded, onPopupToggle } = props;

  const action = useTimePickerStore((state) => state.action);
  const isPopupOpen = useTimePickerStore((state) => state.isPopupOpen);

  const displayedTimeOnPanel = useTimePickerStore(
    (state) => state.selectedTime
  );
  useEffectSkipFirstRender(() => {
    onPopupToggle(isPopupOpen);
  }, [isPopupOpen]);

  const handleClickOutsidePopup = (e: MouseEvent) => {
    const targetEl = targetRef.current as HTMLElement;
    if (!checkIsClickOnElement(e, targetEl)) action.togglePopup(false);
  };

  const handleTimeSelect: TimePanelProps['onTimeSelect'] = (time) => {
    action.selectTime(time);
  };

  const handleTimeSubmit: TimePanelProps['onSubmit'] = (time) => {
    action.submitTime(time);
    action.togglePopup(false);
  };

  return (
    <PopupElement
      triggerRef={targetRef}
      isShowed={isPopupOpen}
      placement="bottom-left"
      width="fit-content"
      className="TimePicker__Popup"
      onClickOutside={handleClickOutsidePopup}
    >
      <TimePanel
        className="TimePicker__TimePanel"
        isSecondInclude={isSecondInCluded}
        numberOfShowedItem={7}
        onTimeSelect={handleTimeSelect}
        value={displayedTimeOnPanel}
        onSubmit={handleTimeSubmit}
      ></TimePanel>
    </PopupElement>
  );
});
