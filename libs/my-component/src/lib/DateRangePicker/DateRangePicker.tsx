import DateRangeInputField from './DateRangeInputField';
import { DateRangePickerState } from './reducer';
import { DateRangePickerContextProvider, useDateRangePickerContext } from './DataRangePickerContextProvider';


export interface DateRangePickerProps {
    className?: string ;
    dateFormat?: string;
    label?: string;
    onSelect?: (date: Date) => void;
  }

const defaultProps:Required<DateRangePickerProps>= {
  className:"",
  dateFormat:"DD/MM/YYYY",
  label:"",
  onSelect(date) {
  },
}

export function DateRangePicker(props:DateRangePickerProps){
    const initialState:DateRangePickerState = {
      endDate:null,
      startDate:null,
      endDatePopup:false,
      startDatePopup:false
    }
    return (
      <DateRangePickerContextProvider initialState={initialState}>
        <WrappedDateRangePicker {...props}/>
      </DateRangePickerContextProvider>
    )

}


function WrappedDateRangePicker(props:DateRangePickerProps) {
    
  const {state,action} = useDateRangePickerContext();

  const handleStartDateSelect = (date:Date|null)=>{
    // console.log("aa")    
    action.selectStartDate(date);
    }  

    const handleEndDateSelect = (date:Date|null)=>{
      // console.log("bb")  
      action.selectEndDate(date);
    }

    return (
    <div className='DateRangePicker'>
      <DateRangeInputField mode='selectStart' label='' onDateSelect={handleStartDateSelect} key={1}/>
      <DateRangeInputField mode='selectEnd' label='' onDateSelect={handleEndDateSelect} key={2}/>
    </div>
  )
}
