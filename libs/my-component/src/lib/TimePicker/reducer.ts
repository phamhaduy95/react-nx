import { useReducer } from 'react';

export type TimePickerState = {
  selectTime: {
    hour:number,
    minute:number,
    second:number,
  },
  isPopupOpen:boolean,
};

type SelectHourAction = {
  type: 'SELECT_HOUR';
  payload: {
     hour:number,
  };
};

type SelectMinuteAction = {
    type:"SELECT_MINUTE",
    payload: {
        minute: number
    }
}

type SelectSecondAction = {
  type:"SELECT_SECOND",
  payload: {
    second : number;
  }
}

type TogglePopupAction = {
    type:"TOGGLE_POPUP",
    payload:{
        state:boolean,
    }
}

type ActionType = SelectHourAction|SelectMinuteAction|TogglePopupAction|SelectSecondAction;

export type TimePickerActionMethod = {
  selectHour: (hour: number) => void;
  selectMinute:(min:number)=>void,
  selectSecond:(second:number)=>void,
  togglePopup: (state:boolean)=>void
};

type Dispatcher = React.Dispatch<ActionType>;

function getActionMethod(dispatch: Dispatcher): TimePickerActionMethod {
  return {
    selectHour(hour) {
      dispatch({ type: 'SELECT_HOUR', payload: {  hour} });
    },
    selectMinute(minute) {
        dispatch({type:"SELECT_MINUTE",payload:{minute}})
    },
    selectSecond(second){
      dispatch({type:"SELECT_SECOND",payload:{second}})
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
    case 'SELECT_HOUR': {
        const hour = action.payload.hour;
        if (state.selectTime.hour === hour) return state;
        const selectTime = {...state.selectTime,hour}
        return {...state,selectTime} 
    }
    case "SELECT_MINUTE":{
        const minute = action.payload.minute;
        if (state.selectTime.minute === minute) return state;
        const selectTime = {...state.selectTime,minute}
        return {...state,selectTime}
    }

    case "SELECT_SECOND":{
      const second = action.payload.second;
      if (state.selectTime.second === second) return state;
      const selectTime = {...state.selectTime,second}
      return {...state,selectTime}
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
