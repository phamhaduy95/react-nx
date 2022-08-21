import { useReducer } from 'react';
import dayjs from 'dayjs';

export type TimePickerState = {
  selectTime: Date;
  isPopupOpen:boolean,
};

type SelectTimeAction = {
  type: 'SELECT_TIME';
  payload: {
     time:Date;
  };
};


type TogglePopupAction = {
    type:"TOGGLE_POPUP",
    payload:{
        state:boolean,
    }
}

type ActionType =SelectTimeAction|TogglePopupAction;

export type TimePickerActionMethod = {
  selectTime: (time: Date) => void;
  
  togglePopup: (state:boolean)=>void
};

type Dispatcher = React.Dispatch<ActionType>;

function getActionMethod(dispatch: Dispatcher): TimePickerActionMethod {
  return {
    selectTime(time) {
      dispatch({ type: 'SELECT_TIME', payload: {  time} });
    },
    togglePopup(state) {
        dispatch({type:"TOGGLE_POPUP",payload:{state}})
    },
  };
}

const reducer = (
  state: TimePickerState,
  action: ActionType
): TimePickerState => {
  switch (action.type) {
    case "SELECT_TIME":{
      const newTime = action.payload.time; 
      if (compareTwoDateObject(newTime,state.selectTime) === 0 ) return state;
      return {...state,selectTime:newTime};
    }
    case "TOGGLE_POPUP":{
        const isOpen = action.payload.state;
        if (isOpen === state.isPopupOpen) return state;
        return {...state,isPopupOpen:isOpen}
    }

    default:
      return state;
  }
};

export const useTimePickerReducer = (initialState: TimePickerState) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const action = getActionMethod(dispatch);
  return { state, action };
};

function compareTwoDateObject(date1:Date,date2:Date){
    const day1 = dayjs(date1);
    const day2 = dayjs(date2);
    if (day1.isSame(day2)) return 0;
    if (day1.isAfter(day2)) return 1;
    return -1;
}