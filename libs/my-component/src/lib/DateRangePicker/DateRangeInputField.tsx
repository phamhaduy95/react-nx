import { DateRangePanel, DateRangePanelProps } from '../DateRangePanel';
import { DatePicker, DatePickerProps } from '../DatePicker';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import { defaultDatePanelProps } from '../DatePanelSingle/DatePanelSingle';
import { useDateRangePickerStore } from './DateRangePickerStoreProvider';
import { useDatePickerStore } from '../DatePicker/DatePickerStoreProvider';
import { DateRangePickerProps } from './DateRangePicker';

export interface DateRangeInputFieldProps {
  label: string;
  mode: NonNullable<DateRangePanelProps['mode']>;
  onDateSelect: DatePickerProps['onSelect'];
  onPopupToggle:NonNullable<DateRangePickerProps["onPopupToggle"]>
}

export default function DateRangeInputField(props: DateRangeInputFieldProps) {
  const { label, mode, onDateSelect,onPopupToggle } = props;
  const startDate = useDateRangePickerStore((state)=>state.startDate,(a,b)=>a?.toDateString() === b?.toDateString());
  const endDate = useDateRangePickerStore((state)=>state.endDate,(a,b)=>a?.toDateString() === b?.toDateString());

  const InputDatePanel: DatePickerProps['PanelComponent'] = useMemo(() => {
    return (props) => {
      const newProps = {...defaultDatePanelProps,...props};
      const action = useDatePickerStore((state)=>state.action);
      const { dateValue, onSelect,disabledDate, } = newProps;
      const range: DateRangePanelProps['range'] = {
        startDate: mode === 'selectStart' ? dateValue : startDate,
        endDate: mode === 'selectEnd' ? dateValue : endDate,
      };
      const handleDateSelect: DateRangePanelProps['onSelect'] = (
        type,
        dateValue
      ) => {
        if (mode === type) {
          action.selectDate(dateValue);
          action.submitDate(dateValue);
          action.togglePopup(false);
        }
        return;
      };

      return (
        <DateRangePanel
          mode={mode}
          range={range}
          onClickToSelect={handleDateSelect}
          showedMonth={dateValue}
          disabledDate={disabledDate}
        />
      );
    };
  }, [mode,startDate,endDate]);

  const disabledDate:DatePickerProps["disabledDate"] =(curr)=>{
    if (mode === "selectEnd") 
        return dayjs(curr).isBefore(startDate);
    if (mode === "selectStart")
       return dayjs(curr).isAfter(endDate);
    return false
  } 

  const handlePopupToggle = (isOpen:boolean)=>{
    onPopupToggle(isOpen,mode);
  }

  return (
    <div className={'DateRangePicker__Input'} tabIndex={1}>
      <DatePicker
        className={'DateRangePicker__StartDateInput'}
        label={label}
        PanelComponent={InputDatePanel}
        onSelect={onDateSelect}
        disabledDate = {disabledDate}
        onPopupToggle={handlePopupToggle}
      />
    </div>
  );
}
