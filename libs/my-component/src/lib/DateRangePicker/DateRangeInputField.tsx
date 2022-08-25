import { useDateRangePickerContext } from './DataRangePickerContextProvider';
import { DateRangePanel, DateRangePanelProps } from '../DateRangePanel';
import { DatePicker, DatePickerProps } from '../DatePicker';
import { useMemo } from 'react';
import dayjs from 'dayjs';

export interface DateRangeInputFieldProps {
  label: string;
  mode: NonNullable<DateRangePanelProps['mode']>;
  onDateSelect: DatePickerProps['onSelect'];
}

export default function DateRangeInputField(props: DateRangeInputFieldProps) {
  const { label, mode, onDateSelect } = props;
  const { state, action } = useDateRangePickerContext();

  const InputDatePanel: DatePickerProps['PanelComponent'] = useMemo(() => {
    return (props) => {
      const { state, action, } = useDateRangePickerContext();
      const { dateValue, onSelect,disabledDate } = props;
      const range: DateRangePanelProps['range'] = {
        startDate: mode === 'selectStart' ? dateValue : state.startDate,
        endDate: mode === 'selectEnd' ? dateValue : state.endDate,
      };
      const handleDateSelect: DateRangePanelProps['onSelect'] = (
        type,
        value
      ) => {
        if (mode === type) onSelect(value);
        return;
      };

      return (
        <DateRangePanel
          mode={mode}
          range={range}
          onSelect={handleDateSelect}
          showedMonth={dateValue}
          disabledDate={disabledDate}
        />
      );
    };
  }, [mode]);

  const disabledDate:DatePickerProps["disabledDate"] =(curr)=>{
    if (mode === "selectEnd") 
        return dayjs(curr).isBefore(state.startDate);
    if (mode === "selectStart")
       return dayjs(curr).isAfter(state.endDate);
    return false
  } 

  return (
    <div className={'DateRangePicker__Input'} tabIndex={1}>
      <DatePicker
        className={'DateRangePicker__StartDateInput'}
        label={label}
        PanelComponent={InputDatePanel}
        onSelect={onDateSelect}
        disabledDate = {disabledDate}
      />
    </div>
  );
}
